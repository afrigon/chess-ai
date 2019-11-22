console.log('web-worker-ai.js')

importScripts('chess.min.js');
importScripts('ai.js');

const debug = true;

onmessage = function (event) {
  const type = event.data.type
  const payload = event.data.payload
  if (debug) {
    console.log(`[worker] ${event.data.type}`, { payload });
  }
  switch (type) {
    case "move":
      const now = Date.now();
      const move = getBestMove(new Chess(payload.fen), payload.algorithm);
      const elapsedTimeInSeconds = ((Date.now() - now) / 1000).toFixed(2);
      if (debug) {
        console.log(`[worker] move elapsed time: ${elapsedTimeInSeconds} seconds`);
      }
      postMessage(move);
      break;
    default:
      if (debug) {
        console.error(`[worker] invalid message type ${event.data.type}`);
      }
      break;
  }
}
