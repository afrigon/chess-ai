import React, { useState, useEffect } from 'react';
import './App.css';

import Chess from "chess.js";
import Chessboard from "chessboardjsx";
// import { getBestMove } from "./ai"

// const debug = true;
const algorithm = 'alpha-beta';

export default function App() {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState("start");
    const [worker, setWorker] = useState();

    const workerOnMessage = (event) => {
      console.log('Message received from worker', event);
      const bestMove = event.data
      if (game.move(bestMove)) {
        setFen(game.fen());
        setGame(game);
        if (game.game_over()) {
          alert('Game over');
        }
      } else {
        alert("AI can't play");
      }
    }

    // Set register worker.
    useEffect(() => {
      console.log('useEffect');
      if (window.Worker) {
        const url = `${process.env.PUBLIC_URL}/web-worker-ai.js`;
        console.log(`Register web worker ${url}`)
        const workerInstance = new Worker(url);
        // Web Worker message listener.
        workerInstance.onmessage = workerOnMessage
        setWorker(workerInstance);
      } else {
        console.log('Browser does not support web worker.')
      }
    }, []);

    const onDrop = ({ sourceSquare, targetSquare }) => {
      // Attempts to make the player's move.
      const move = game.move({ from: sourceSquare, to: targetSquare });
      if (!move) return;

      return new Promise(resolve => {
          setFen(game.fen());
          setGame(game);
          resolve();
        }).then(() => {
          setTimeout(() => {
            if (game.game_over()) {
              alert('Game over');
            } else {
              // Get the AI's best move and attempts to make the move.
              // const now = Date.now();
              // const bestMove = getBestMove(game, algorithm);
              if (worker) {
                worker.postMessage({
                  type: "move",
                  payload: { fen: game.fen(), algorithm }
                });
              }
              // const elapsedTimeInSeconds = ((Date.now() - now) / 1000).toFixed(2);
              // if (debug) console.log(`AI tinking time: ${elapsedTimeInSeconds} seconds`);
            }
          }, 300)
      });
    }

    return (
        <div className="App">
            <Chessboard
                draggable={!game.game_over()}
                width={540}
                position={fen}
                onDrop={onDrop}
                transitionDuration={300}
                boardStyle={{ borderRadius: "5px" }}
            />
        </div>
    );
}

