import validator from "validator";
import { GenerateAsync } from "./generator.js";
import { SaveFileAsync } from "../../../../tickettoride-backend-common/src/file-store/game-files.mjs";
import { GetFileStoreKey } from "../../../../tickettoride-backend-common/src/file-store/file-store-utils.mjs";

export async function GenerateAndSaveMapBackgroundAsync(params) {
  ValidateParams(params);

  const picture = await GenerateAsync(params);
  const buffer = await picture.toBuffer();
  const resourceName = GetFileStoreKey("background", params.gameId);
  await SaveFileAsync(resourceName, buffer);
}

function ValidateParams(params) {
  console.log("----------------");

  validator.isEmpty(params.gameId);

  validator.isInt(`${params.width}`, { min: 160, max: 640 });
  validator.isInt(`${params.height}`, { min: 120, max: 480 });

  console.log("================");
}
