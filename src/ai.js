import ChessWeight from "./ChessWeight";

export function evalPiece (piece, x, y) {
  if (!piece) return 0;

  const value = ChessWeight[piece.type][piece.color][y][x] + ChessWeight[piece.type].modifier;
  return piece.color === "w" ? value : -value;
}

export function evalBoard (game) {
  let score = 0;
  for (var x = 0; x < 8; ++x) {
      for (var y = 0; y < 8; ++y) {
        const square = String.fromCharCode(x + 0x61) + (8-y);
        const piece = game.get(square);
        score += evalPiece(piece, x, y);
      }
  }
  return score;
}

export function minimaxBestMove (game, depth, wantMax) {
  const moves = game.moves();
  if (game.game_over() || game.in_draw() || moves.length === 0) return;

  let best = -9999;
  let bestMove;
  for (let i = 0; i < moves.length; ++i) {
      game.move(moves[i]);
      const value = minimax(game, depth - 1, -10000, 10000, !wantMax);
      game.undo();

      if (value >= best) {
          best = value;
          bestMove = moves[i];
      }
  }
  return bestMove;
};

export function minimax (game, depth, alpha, beta, wantMax) {
  if (depth === 0) return -evalBoard(game);

  var moves = game.moves();
  let best = 9999 * wantMax ? -1 : 1;

  for (let i = 0; i < moves.length; ++i) {
      game.move(moves[i]);
      const bestChild = minimax(game, depth - 1, alpha, beta, !wantMax);
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

export function bestMove (game, minimaxDepth) {
  return minimaxBestMove(game, minimaxDepth, true);
}
