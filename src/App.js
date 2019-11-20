import React, { useState } from 'react';
import './App.css';

import Chess from "chess.js";
import Chessboard from "chessboardjsx";
import ChessWeight from "./ChessWeight";

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

    const greedyMove = () => {
        const moves = game.moves();
        if (game.game_over() || game.in_draw() || moves.length === 0) return;

        let best = 9999;
        let bestMove;
        for (let i = 0; i < moves.length; ++i) {
            game.move(moves[i]);
            const value = evalBoard(game);
            
            if (value < best) {
                best = value;
                bestMove = moves[i];
            }

            game.undo();
        }

        game.move(bestMove);

        setFen(game.fen());
        setGame(game);
    }

    const makeMove = greedyMove

    const evalBoard = g => {
        const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

        let score = 0;
        for (var i = 0; i < 8; ++i) {
            for (var j = 0; j < 8; ++j) {
                score += evalPiece(g.get(columns[i] + (8-j)), i ,j);
            }
        }
        return score;
    }

    const evalPiece = (p, x, y) => {
        if (!p) return 0;

        const value = ChessWeight[p.type][p.color][y][x] + ChessWeight[p.type].modifier;
        return p.color === "w" ? value : -value;
    }

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

