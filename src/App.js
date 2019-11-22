import React, { useState } from 'react';
import './App.css';

import Chess from "chess.js";
import Chessboard from "chessboardjsx";
import { bestMove } from "./ai"

const minimaxDepth = 3;

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
              game.move(bestMove(game, minimaxDepth));
              setFen(game.fen());
              setGame(game);
            }
          }, 300)
      });
    }

    return (
        <div className="App">
            <Chessboard
                width={540}
                position={fen}
                onDrop={onDrop}
                transitionDuration={300}
                boardStyle={{ borderRadius: "5px" }}
            />
        </div>
    );
}

