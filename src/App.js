import React, { useState } from 'react';
import './App.css';

import Chess from "chess.js";
import Chessboard from "chessboardjsx";

export default function App() {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState("start");

    const randomMove = () => {
        const moves = game.moves();

        if (game.game_over() || game.in_draw() || moves.length === 0) return;
        const i = Math.floor(Math.random() * moves.length);
        game.move(moves[i]);
        setFen(game.fen());
        setGame(game);
    }

    const makeMove = randomMove

    const onDrop = ({ sourceSquare, targetSquare }) => {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });
        if (!move) return;

        return new Promise(resolve => {
            setFen(game.fen());
            setGame(game);
            resolve();
        }).then(() => setTimeout(makeMove, 300));
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

