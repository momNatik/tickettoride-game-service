import { GenerateAsync } from "./generator.mjs";
import { SaveFileAsync } from "../tickettoride-backend-common/src/file-store/game-files.mjs";
import { GetFileStoreKey } from "../tickettoride-backend-common/src/file-store/file-store-utils.mjs";

export async function GenerateAndSaveMapBackgroundAsync(msg) {
  const picture = await GenerateAsync(msg);
  const buffer = await picture.toBuffer();

  const resourceName = GetFileStoreKey("background", msg.gameId);
  await SaveFileAsync(resourceName, buffer);
}