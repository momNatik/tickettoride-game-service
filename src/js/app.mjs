import { GenerateAsync } from "./generator.mjs";
import { SaveFileAsync } from "../tickettoride-backend-common/src/file-store/game-files.mjs";
import { GetFileStoreKey } from "../tickettoride-backend-common/src/file-store/file-store-utils.mjs";
import { ConnectToQueue } from "../tickettoride-backend-common/src/queue/consumption.mjs";

const options = {
  queueName: process.env.QUEUE_NAME,
};

ConnectToQueue(options, ProcessMessageAsync);

async function ProcessMessageAsync(msg) {
  const picture = await GenerateAsync(msg);
  const buffer = await picture.toBuffer();

  const resourceName = GetFileStoreKey("background", msg.gameId);
  SaveFileAsync(resourceName, buffer);
  await sleep(3000);
  console.log(`File is generated`);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}