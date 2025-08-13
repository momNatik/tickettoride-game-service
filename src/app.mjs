import { ConnectToQueueAsync } from "../tickettoride-backend-common/src/queue/consumption.mjs";
import {
  OpenChannelAsync,
  SendMessageToQueue,
} from "../tickettoride-backend-common/src/queue/publisher.mjs";

let mapBackgroundServiceChannelInfo;

Main();

async function Main() {
  const options = {
    queueName: process.env.QUEUE_NAME,
  };

  const mapBackgroundServiceQueueOptions = {
    queueName: process.env.QUEUE_NAME_BACKGROUND,
  };

  await ConnectToQueueAsync(options, ProcessMessageAsync);

  mapBackgroundServiceChannelInfo = await OpenChannelAsync(
    mapBackgroundServiceQueueOptions
  );
}

async function ProcessMessageAsync(msg) {
  const message = GetMapBackgroundServiceMessage(msg);
  await SendMessageToQueue(mapBackgroundServiceChannelInfo, message);
}

function GetMapBackgroundServiceMessage(options) {
  return {
    gameId: options.gameId,
    paletteType: "earth",
    width: options.width,
    height: options.height,
  };
}
