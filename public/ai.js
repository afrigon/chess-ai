console.log('ai.js')

const ChessWeight = {
  p: {
      modifier: 10,
      b: [
          [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
          [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
          [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
          [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
          [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
          [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
          [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
          [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
      ],
      w: [
          [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
          [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
          [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
          [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
          [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
          [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
          [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
          [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
      ]
  },
  b: {
      modifier: 30,
      b: [
          [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
          [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
          [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
          [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
          [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
          [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
          [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
          [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
      ],
      w: [
          [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
          [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
          [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
          [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
          [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
          [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
          [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
          [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
      ]
  },
  r: {
      modifier: 50,
      b: [
          [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
          [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
      ],
      w: [
          [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
          [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
          [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
      ]
  },
  k: {
      modifier: 900,
      b: [
          [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ],
          [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
          [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
          [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
          [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
          [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
          [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
          [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0]
      ],
      w: [
          [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
          [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
          [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
          [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
          [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
          [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
          [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
          [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
      ]
  },
  q: {
      modifier: 90,
      b: [
          [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
          [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
          [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
          [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
          [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
          [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
          [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
          [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
      ],
      w: [
          [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
          [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
          [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
          [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
          [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
          [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
          [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
          [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
      ]
  },
  n: {
      modifier: 30,
      b: [
          [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
          [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
          [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
          [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
          [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
          [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
          [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
          [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
      ],
      w: [
          [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
          [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
          [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
          [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
          [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
          [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
          [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
          [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
      ]
  }
}


const minimaxDepth = 3;
const alphabetaDepth = 3;

function evalPiece (piece, x, y) {
  if (!piece) return 0;

  const value = ChessWeight[piece.type][piece.color][y][x] + ChessWeight[piece.type].modifier;
  return piece.color === "w" ? value : -value;
}

function evalGame (game) {
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

function getMinimaxBestMove (game, depth, wantMax) {
  const moves = game.moves();
  if (game.game_over() || game.in_draw() || moves.length === 0) return;

  let best = Number.MIN_SAFE_INTEGER;
  let bestMove;
  for (let i = 0; i < moves.length; ++i) {
      game.move(moves[i]);
      const value = minimax(game, depth - 1, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, !wantMax);
      game.undo();

      if (value >= best) {
          best = value;
          bestMove = moves[i];
      }
  }
  return bestMove;
}

function minimax (game, depth, wantMax) {
  if (depth === 0) return -evalGame(game);

  if (wantMax) {
    let value = Number.MIN_SAFE_INTEGER;
    game.moves().forEach((move) => {
      game.move(move);
      value = Math.max(minimax(game, depth - 1, false));
      game.undo();
    })
    return value;
  } else {
    let value = Number.MAX_SAFE_INTEGER;
    game.moves().forEach((move) => {
      game.move(move);
      value = Math.min(minimax(game, depth - 1, true));
      game.undo();
    })
    return value;
  }
}

function getAlphabetaBestMove (game, depth, wantMax) {
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

function alphabeta (game, depth, alpha, beta, wantMax) {
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

function getRandomMove (game) {
  let moves = game.moves();
  var index = Math.floor(Math.random() * moves.length);
  return moves[index];
}

function getBestMove (game, algorithm) {
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
