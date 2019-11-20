import React, { useState } from 'react';
import './App.css';

import Chess from "chess.js";
import Chessboard from "chessboardjsx";
import ChessWeight from "./ChessWeight";

const minimaxDepth = 3;

export default function App() {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState("start");

    const minimaxRoot = (depth, wantMax) => {
        const moves = game.moves();
        if (game.game_over() || game.in_draw() || moves.length === 0) return;

        let best = -9999;
        let bestMove;
        for (let i = 0; i < moves.length; ++i) {
            game.move(moves[i]);
            const value = minimax(depth - 1, -10000, 10000, !wantMax);
            game.undo();
            
            if (value >= best) {
                best = value;
                bestMove = moves[i];
            }
        }

        game.move(bestMove);
        setFen(game.fen());
        setGame(game);
    };

    const minimax = (depth, alpha, beta, wantMax) => {
        if (depth === 0) return -evalBoard(game);

        var moves = game.moves();
        let best = 9999 * wantMax ? -1 : 1;

        for (let i = 0; i < moves.length; ++i) {
            game.move(moves[i]);
            const bestChild = minimax(depth - 1, alpha, beta, !wantMax);
            game.undo()

            if (wantMax) {
                best = Math.max(best, bestChild);
                alpha = Math.max(alpha, best);
            } else {
                best = Math.min(best, bestChild);
                beta = Math.min(beta, best);
            }

            if (beta <= alpha) return best;
        }
        return best
    }

    const makeMove = () => {
        if (game.game_over()) alert('Game over');
        minimaxRoot(minimaxDepth, true)
    };

    const evalBoard = g => {
        let score = 0;
        for (var i = 0; i < 8; ++i) {
            for (var j = 0; j < 8; ++j) {
                score += evalPiece(g.get(String.fromCharCode(i+0x61) + (8-j)), i ,j);
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
        }).then(setTimeout(makeMove, 300));
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

