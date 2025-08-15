import QUEUE from "../tickettoride-backend-common/src/queue/queue.mjs";
import { GenerateMapAsync } from "./js/map/map-service.mjs";

Main();

async function Main() {
  const options = {
    queueName: process.env.QUEUE_NAME,
  };

  await QUEUE.ConnectToQueueAsync(options, GenerateMapAsync);
}
