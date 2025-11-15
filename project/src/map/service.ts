import { GenerateAndSaveMapAsync } from "./generator.js";
import DB from "@common/db/provider.js";

export async function GenerateMapAsync(msg) {
  const params = msg;

  try {
    console.log("Generating map...");

    await GenerateAndSaveMapAsync(params);

    const game = {
      _id: msg.gameId,
      status: 1,
    };
    await DB.CreateGameAsync(game);
  } catch (error) {
    console.log(`\x1b[33mERROR: ${error}\x1b[0m`);
  }
}

// TODO
// function GetMapLandscapeServiceMessage(options) {
//   return {
//     gameId: options.gameId,
//     paletteType: "earth",
//     width: options.width,
//     height: options.height,
//   };
// }
