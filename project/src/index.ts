import QUEUE from "@common/queue/queue.js";
import { GenerateMapAsync } from "./map/map-service.js";
import LOGGING from "@common/logging/log.js";

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
