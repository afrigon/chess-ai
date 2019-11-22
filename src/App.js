import React, { useState } from 'react';
import './App.css';

import Chess from "chess.js";
import Chessboard from "chessboardjsx";
import { getBestMove } from "./ai"

const debug = true;
const algorithm = 'alpha-beta';

export default function App() {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState("start");

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
              const now = Date.now();
              const bestMove = getBestMove(game, algorithm);
              const elapsedTimeInSeconds = ((Date.now() - now) / 1000).toFixed(2);
              if (debug) console.log(`AI thinking time: ${elapsedTimeInSeconds} seconds`);

              if (game.move(bestMove)) {
                setFen(game.fen());
                setGame(game);
              } else {
                alert("Can't play");
              }
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

