import QUEUE from "../../tickettoride-backend-common/src/queue/queue.mjs";
import { GenerateMapAsync } from "./js/map/map-service.js";
import LOGGING from "../../tickettoride-backend-common/src/logging/log.mjs";

LOGGING.ShowStartInfo("GAME_SERVICE_NAME");

Main();

async function Main() { 
  console.log("Connecting to queue...");
  const connection = await QUEUE.ConnectAsync();
  
  await QUEUE.ConnectToQueueAsync(
    connection,
    process.env.QUEUE_NAME,
    GenerateMapAsync
  );
  console.log("Connected to queue");
}
