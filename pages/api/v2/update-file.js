import * as Strings from "~/common/strings";
import * as Data from "~/node_common/data";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as RequestUtilities from "~/node_common/request-utilities";
import * as Conversions from "~/common/conversions";

import SearchManager from "~/node_common/managers/search";

export default async (req, res) => {
  const userInfo = await RequestUtilities.checkAuthorizationExternal(req, res);
  if (!userInfo) return;
  const { id, key, user } = userInfo;

  if (!req.body?.data?.id) {
    return res.status(500).send({ decorator: "NO_FILE_ID_PROVIDED", error: true });
  }

  //NOTE(martina): cleans the input to remove fields they should not be changing like ownerId, createdAt, filename, size, type etc.
  let updates = {
    id: req.body.data.id,
    name: req.body.data.data?.name,
    body: req.body.data.data?.body,
  };

  const file = await Data.getFileById({ id: updates.id });

  if (file.ownerId !== user.id) {
    return res.status(400).send({
      decorator: "NOT_FILE_OWNER_UPDATE_NOT_PERMITTED",
      error: true,
    });
  }

  let updatedFile = await Data.updateFileById(updates);

  if (!updatedFile || updatedFile.error) {
    return res.status(500).send({ decorator: "UPDATE_FILE_FAILED", error: true });
  }

  SearchManager.updateFile(updatedFile);

  ViewerManager.hydratePartial(user.id, { library: true, slates: true });

  let reformattedFile = Conversions.convertToV2File(updatedFile);

  return res.status(200).send({
    decorator: "UPDATE_FILE",
    file: reformattedFile,
  });
};
