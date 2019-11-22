import { evalGame } from './ChessEvaluation'

const minimaxDepth = 3;
const alphabetaDepth = 3;

export function getMinimaxBestMove (game, depth, wantMax) {
  const moves = game.moves();
  if (game.game_over() || game.in_draw() || moves.length === 0) return;

  let best = Number.MIN_SAFE_INTEGER;
  let bestMove;
  for (let i = 0; i < moves.length; ++i) {
      game.move(moves[i]);
      const value = minimax(game, depth - 1, !wantMax);
      game.undo();

      if (value >= best) {
          best = value;
          bestMove = moves[i];
      }
  }
  return bestMove;
}

export function minimax (game, depth, wantMax) {
  if (depth === 0) return -evalGame(game);

  var moves = game.moves();
  let best = wantMax ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < moves.length; ++i) {
      game.move(moves[i]);
      const bestChild = minimax(game, depth - 1, !wantMax);
      game.undo()

      if (wantMax) {
          best = Math.max(best, bestChild);
      } else {
          best = Math.min(best, bestChild);
      }
  }
  return best
}

export function getAlphabetaBestMove (game, depth, wantMax) {
  const moves = game.moves();
  if (game.game_over() || game.in_draw() || moves.length === 0) return;

  let best = Number.MIN_SAFE_INTEGER;
  let bestMove;
  for (let i = 0; i < moves.length; ++i) {
      game.move(moves[i]);
      const value = alphabeta(game, depth - 1, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, !wantMax);
      game.undo();

      if (value >= best) {
          best = value;
          bestMove = moves[i];
      }
  }
  return bestMove;
};

export function alphabeta (game, depth, alpha, beta, wantMax) {
  if (depth === 0) return -evalGame(game);

  var moves = game.moves();
  let best = wantMax ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < moves.length; ++i) {
      game.move(moves[i]);
      const bestChild = alphabeta(game, depth - 1, alpha, beta, !wantMax);
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

export function getRandomMove (game) {
  let moves = game.moves();
  var index = Math.floor(Math.random() * moves.length);
  return moves[index];
}

export function getBestMove (game, algorithm) {
  switch (algorithm) {
    case 'alpha-beta':
      return getAlphabetaBestMove(game, alphabetaDepth, true);
    case 'minimax':
      return getMinimaxBestMove(game, minimaxDepth, true);
    case 'random':
      return getRandomMove(game);
    default:
      throw new Error(`No such algorithm "${algorithm}"`)
  }
}
