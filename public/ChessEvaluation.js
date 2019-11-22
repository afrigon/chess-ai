import ChessWeight from "./ChessWeight";

export function evalPiece (piece, x, y) {
  if (!piece) return 0;

  const value = ChessWeight[piece.type][piece.color][y][x] + ChessWeight[piece.type].modifier;
  return piece.color === "w" ? value : -value;
}

export function evalGame (game) {
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
