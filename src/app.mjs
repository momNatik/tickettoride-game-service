import QUEUE from "../tickettoride-backend-common/src/queue/queue.mjs";
import { GenerateMapAsync } from "./js/map/map-service.mjs";

Main();

async function Main() { 
  const connection = await QUEUE.ConnectAsync();

  await QUEUE.ConnectToQueueAsync(
    connection,
    process.env.QUEUE_NAME,
    GenerateMapAsync
  );
}
