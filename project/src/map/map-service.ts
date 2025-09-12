import { GenerateAndSaveMapBackgroundAsync } from "./background/service.js";
import DB from "../../../tickettoride-backend-common/project/src/db/provider.js";

export async function GenerateMapAsync(msg) {
  const params = msg;

  try {
    console.log("Generating background map...");
    await GenerateAndSaveMapBackgroundAsync(params);
    // TODO GenerateAndSaveMapTopologyAsync

    const game = {
      _id: msg.gameId,
      status: 1,
    };
    await DB.CreateGameAsync(game);
  } catch (error) {
    console.log(`\x1b[33mERROR: ${error}\x1b[0m`);
  }
}

function GetMapBackgroundServiceMessage(options) {
  return {
    gameId: options.gameId,
    paletteType: "earth",
    width: options.width,
    height: options.height,
  };
}
