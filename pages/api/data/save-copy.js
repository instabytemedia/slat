import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as ViewerManager from "~/node_common/managers/viewer";
import SearchManager from "~/node_common/managers/search";
import * as ArrayUtilities from "~/node_common/array-utilities";
import * as Monitor from "~/node_common/monitor";
import * as RequestUtilities from "~/node_common/request-utilities";

/**
 * Save copy is equivalent to downloading then reuploading. So an entirely new files table entry should
 * be created with a new id, ownerId, and createdAt
 */
export default async (req, res) => {
  const userInfo = await RequestUtilities.checkAuthorizationInternal(req, res);
  if (!userInfo) return;
  const { id, user } = userInfo;

  let decorator = "SERVER_SAVE_COPY";

  let { buckets, bucketKey, bucketRoot } = await Utilities.getBucket({ user });

  if (!buckets) {
    return res.status(500).send({
      decorator: "SERVER_NO_BUCKET_DATA",
      error: true,
    });
  }

  const { files } = req.body.data;
  if (!files?.length) {
    return res.status(400).send({
      decorator: "SERVER_SAVE_COPY_NO_CIDS",
      error: true,
    });
  }

  const slateId = req.body.data.slate?.id;
  let slate;
  if (slateId) {
    slate = await Data.getSlateById({ id: slateId, includeFiles: true });

    if (!slate || slate.error) {
      slate = null;
      decorator = "SERVER_SAVE_COPY_SLATE_NOT_FOUND";
    }
  }

  let { duplicateFiles, filteredFiles } = await ArrayUtilities.removeDuplicateUserFiles({
    files,
    user,
  });

  const foundFiles = await Data.getFilesByCids({ cids: files.map((file) => file.cid) });
  const foundCids = foundFiles.map((file) => file.cid);

  filteredFiles = filteredFiles
    .filter((file) => foundCids.includes(file.cid)) //NOTE(martina): make sure the file being copied exists
    .map(({ createdAt, ownerId, isPublic, downloadCount, saveCount, tags, ...keepAttrs }) => {
      //NOTE(martina): remove the old file's ownerId, createdAt, counts, tags, and privacy so new fields can be used
      return { ...keepAttrs, isPublic: slate?.isPublic || false };
    });

  let copiedFiles = [];

  for (let file of filteredFiles) {
    if (file.isLink) {
      copiedFiles.push(file);
      continue;
    }

    const { id, ...rest } = file; //NOTE(martina): remove the old file's id
    let response = await Utilities.addExistingCIDToData({
      buckets,
      key: bucketKey,
      path: bucketRoot.path,
      cid: rest.cid,
    });
    Data.incrementFileSavecount({ id });
    if (response && !response.error) {
      copiedFiles.push(rest);
    }
  }

  let createdFiles = [];
  if (copiedFiles?.length) {
    createdFiles =
      (await Data.createFile({ owner: user, files: copiedFiles, saveCopy: true })) || [];
  }

  let added = createdFiles?.length || 0;

  //NOTE(martina): adding to the slate if there is one
  const filesToAddToSlate = createdFiles.concat(duplicateFiles); //NOTE(martina): files that are already owned by the user are included in case they aren't yet in that specific slate
  if (slate && filesToAddToSlate.length) {
    const { decorator: returnedDecorator, added: addedToSlate } = await Utilities.addToSlate({
      slate,
      files: filesToAddToSlate,
      user,
      saveCopy: true,
    });

    if (returnedDecorator) {
      decorator = returnedDecorator;
    }
    added = addedToSlate;
  }

  let updatedFiles = await Data.getFilesByIds({ ids: filesToAddToSlate.map((file) => file.id) });
  SearchManager.indexFile(updatedFiles); //NOTE(martina): using createFile instead of updateFile b/c createFile also works for existing files (it just overwrites)

  ViewerManager.hydratePartial(id, { library: true, slates: slate ? true : false });

  if (!slate) {
    Monitor.saveCopy({ user, files: filteredFiles });
  }

  return res.status(200).send({
    decorator,
    data: { added, skipped: files.length - added },
  });
};
