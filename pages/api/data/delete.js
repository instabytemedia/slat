import * as Constants from "~/node_common/constants";
import * as Data from "~/node_common/data";
import * as Utilities from "~/node_common/utilities";
import * as Arrays from "~/common/arrays";
import * as Validations from "~/common/validations";
import * as Social from "~/node_common/social";
import * as ViewerManager from "~/node_common/managers/viewer";
import SearchManager from "~/node_common/managers/search";
import * as RequestUtilities from "~/node_common/request-utilities";

export default async (req, res) => {
  const userInfo = await RequestUtilities.checkAuthorizationInternal(req, res);
  if (!userInfo) return;
  const { id, user } = userInfo;

  let ids;
  if (req.body.data.ids) {
    ids = req.body.data.ids;
  } else if (req.body.data.id) {
    ids = [req.body.data.id];
  }

  if (!ids?.length) {
    return res.status(400).send({ decorator: "SERVER_REMOVE_DATA_NO_IDS", error: true });
  }

  const { buckets, bucketKey } = await Utilities.getBucket({ user });

  if (!buckets) {
    return res.status(500).send({
      decorator: "SERVER_NO_BUCKET_DATA",
      error: true,
    });
  }

  // TODO(jim): Put this call into a file for all Textile related calls.
  let r = null;
  try {
    r = await buckets.list();
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/delete.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.list`,
    });
  }

  if (!r) {
    return res.status(500).send({ decorator: "SERVER_NO_BUCKET_DATA", error: true });
  }

  // TODO(jim): Put this call into a file for all Textile related calls.
  let items = [];
  try {
    for (let i = 0; i < r.length; i++) {
      if (r[i].name === Constants.textile.mainBucket) {
        const next = await buckets.listPath(r[i].key, "/");
        const set = next.item.items;
        items = [...set, ...items];
      }
    }
  } catch (e) {
    Social.sendTextileSlackMessage({
      file: "/pages/api/data/delete.js",
      user,
      message: e.message,
      code: e.code,
      functionName: `buckets.listIpfsPath`,
    });
  }

  if (!items || !items.length) {
    return res.status(500).send({ decorator: "SERVER_NO_BUCKET_DATA", error: true });
  }

  // NOTE(martina): get the cids of the corresponding coverImages that are to be deleted
  let objects = await Data.getFilesByIds({ ids });
  objects = objects.filter((file) => file.ownerId === id);

  if (!objects.length) {
    return res.status(400).send({ decorator: "SERVER_REMOVE_DATA_NOT_ALLOWED", error: true });
  }
  ids = objects.map((file) => file.id);
  const files = Arrays.filterFiles(objects);
  let cids = Arrays.mapToCids(files);
  let coverImageCids = [];
  for (let obj of objects) {
    if (obj.coverImage?.cid) {
      coverImageCids.push(obj.coverImage.cid);
    }
  }

  //NOTE(martina): cover images that also exist in the library should not be deleted
  let filesMatchingCoverImages = await Data.getFilesByCids({
    ownerId: user.id,
    cids: coverImageCids,
  });
  let excludedCoverImageCids = filesMatchingCoverImages.map((file) => file.cid);

  for (let cid of coverImageCids) {
    if (!excludedCoverImageCids.includes(cid)) {
      cids.push(cid);
    }
  }

  let entities = [];
  for (let i = 0; i < items.length; i++) {
    if (cids.includes(items[i].cid)) {
      entities.push(items[i]);
      continue;
    }

    // NOTE(jim): Maybe the CID is missing, but our names/ids are guaranteed to be unique.
    if (ids.includes(items[i].name) || ids.includes(items[i].name.replace("data-", ""))) {
      //NOTE(martina): older file ids were prefixed with "data-", so this is to account for that
      entities.push(items[i]);
      continue;
    }

    // NOTE(jim): Perform path check against cid as a last resort.
    for (let j = 0; j < cids.length; j++) {
      if (items[i].path.includes(cids[j])) {
        entities.push(items[i]);
        continue;
      }
    }

    // NOTE(jim): Perform path check against name as a last resort.
    for (let j = 0; j < ids.length; j++) {
      if (items[i].path.includes(ids[j]) || items[i].path.includes(`data-${ids[j]}`)) {
        //NOTE(martina): older file ids were prefixed with "data-", so this is to account for that
        entities.push(items[i]);
        continue;
      }
    }
  }

  await Data.deleteFilesByIds({ ownerId: id, ids });

  SearchManager.deleteFile(files);

  ViewerManager.hydratePartial(id, { slates: true, library: true });

  res.status(200).send({
    decorator: "SERVER_REMOVE_DATA",
    success: true,
    bucketItems: items,
  });

  if (entities.length) {
    for (let entity of entities) {
      try {
        // NOTE(jim): We use name (aka. what we call id) instead of path because the second argument is for
        // a subpath, not the full path.
        await buckets.removePath(bucketKey, entity.name);
      } catch (e) {
        Social.sendTextileSlackMessage({
          file: "/pages/api/data/delete.js",
          user: user,
          message: e.message,
          code: e.code,
          functionName: `buckets.removePath`,
        });

        continue;
      }
    }
  }
};
