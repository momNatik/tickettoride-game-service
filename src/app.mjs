import { ConnectToQueue } from "../tickettoride-backend-common/src/queue/consumption.mjs";
import {
  OpenChannelAsync,
  SendMessageToQueue,
} from "../tickettoride-backend-common/src/queue/publisher.mjs";

const options = {
  exchangeName: process.env.EXCHANGE_NAME,
  queueName: process.env.QUEUE_NAME,
};

const mapBackgroundServiceQueueOptions = {
  exchangeName: process.env.EXCHANGE_NAME_BACKGROUND,
  queueName: process.env.QUEUE_NAME_BACKGROUND,
};

ConnectToQueue(options, ProcessMessageAsync);

const mapBackgroundServiceChannelInfo = OpenChannelAsync(
  mapBackgroundServiceQueueOptions
);

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
