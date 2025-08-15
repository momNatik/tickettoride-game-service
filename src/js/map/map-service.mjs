import { GenerateAndSaveMapBackgroundAsync } from "./js/map/background/service.mjs";
import DB from "../../../tickettoride-backend-common/src/db/provider.mjs";

export async function GenerateMapAsync(msg) {
  const options = msg;
  await GenerateAndSaveMapBackgroundAsync(options);
// TODO GenerateAndSaveMapTopologyAsync

  const game = {
    id: msg.gameId,
    status: 1,
  };
  await DB.CreateGameAsync(game);
}

function GetMapBackgroundServiceMessage(options) {
  return {
    gameId: options.gameId,
    paletteType: "earth",
    width: options.width,
    height: options.height,
  };
}
