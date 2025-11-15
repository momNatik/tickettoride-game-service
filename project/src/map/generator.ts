import validator from "validator";
import { GenerateAsync as GenerateLandscapeAsync } from "./landscape/generator.js";
import { SaveFileAsync } from "@common/file-store/game-files.js";
import { GetFileStoreKey } from "@common/file-store/file-store-utils.js";

export async function GenerateAndSaveMapAsync(params) {
  ValidateParams(params);

  const picture = await GenerateLandscapeAsync(params);
  const buffer = await picture.toBuffer();

  await SaveResourceAsync(params.gameId, 'background', buffer);
}

async function SaveResourceAsync(gameId, mapResourceId, buffer) {
  const resourceName = GetFileStoreKey(mapResourceId, gameId);
  await SaveFileAsync(resourceName, buffer);
}

function ValidateParams(params) {
  console.log("----------------");

  validator.isEmpty(params.gameId);

  validator.isInt(`${params.width}`, { min: 160, max: 640 });
  validator.isInt(`${params.height}`, { min: 120, max: 480 });

  console.log("================");
}
