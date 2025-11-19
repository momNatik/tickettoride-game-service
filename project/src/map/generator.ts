import validator from "validator";
import LANDSCAPE from "./landscape/generator.js";
import { SaveFileAsync } from "@common/file-store/game-files.js";
import { GetFileStoreKey } from "@common/file-store/file-store-utils.js";
import TOPOLOGY from "@topology/index.js"

export async function CreateAndSaveMapAsync(params) {
  ValidateParams(params);

  const landscapePicture = await CreateAndSaveLandscapeAsync(params);

  await CreateAndSaveTopologyAsync(params, landscapePicture);
}

async function CreateAndSaveLandscapeAsync(params) {
  const picture = await LANDSCAPE.CreateAsync(params);
  const buffer = await picture.toBuffer();

  await SaveResourceAsync(params.gameId, 'landscape', buffer, 'image/png');
  return picture;
}

async function CreateAndSaveTopologyAsync(params, landscapePicture) {
  const svgText = TOPOLOGY.Create(params, landscapePicture);
  await SaveResourceAsync(params.gameId, 'topology', svgText, 'image/svg+xml');
}

async function SaveResourceAsync(gameId, mapResourceId, buffer, contentType) {
  const resourceName = GetFileStoreKey(mapResourceId, gameId);
  await SaveFileAsync(resourceName, buffer, contentType);
}

function ValidateParams(params) {
  console.log("----------------");

  validator.isEmpty(params.gameId);

  validator.isInt(`${params.width}`, { min: 160, max: 640 });
  validator.isInt(`${params.height}`, { min: 120, max: 480 });

  console.log("================");
}
