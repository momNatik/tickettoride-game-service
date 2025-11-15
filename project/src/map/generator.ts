import validator from "validator";
import { GenerateAsync as GenerateLandscapeAsync } from "./landscape/generator.js";
import { SaveFileAsync } from "@common/file-store/game-files.js";
import { GetFileStoreKey } from "@common/file-store/file-store-utils.js";

export async function GenerateAndSaveMapAsync(params) {
  ValidateParams(params);

  const landscapePicture = await GenerateAndSaveLandscapeAsync(params);

  await GenerateAndSaveTopologyAsync(params, landscapePicture);
}

async function GenerateAndSaveLandscapeAsync(params) {
  const picture = await GenerateLandscapeAsync(params);
  const buffer = await picture.toBuffer();

  await SaveResourceAsync(params.gameId, 'background', buffer, 'image/png');
  return picture;
}

async function GenerateAndSaveTopologyAsync(params, landscapePicture) {
  const svgText = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="43" fill="none" stroke="#000" stroke-width="9"/>
  <path d="M50,42c-6-9-20-9,-25,0c-2,5-2,11,0,16c5,9,19,9,25,0l-6-3c-2,5-9,5-11,0c-1-1-1-9,0-10c2-5,9-4,11,0z"/>
  <path d="M78,42c-6-9-20-9,-25,0c-2,5-2,11,0,16c5,9,19,9,25,0l-6-3c-2,5-9,5-11,0c-1-1-1-9,0-10c2-5,9-4,11,0z"/>
</svg>
`;
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
