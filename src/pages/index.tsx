import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    const newBoard = structuredClone(board);
    newBoard[y][x] = turnColor;
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    if (board[y][x] !== 0) return;

    for (let i = 0; i < 8; i++) {
      if (
        board[y + directions[i][0]] !== undefined &&
        board[y + directions[i][0]][x + directions[i][1]] === 2 / turnColor
      ) {
        for (let j = 1; j < 8; j++) {
          if (
            board[y + directions[i][0] * j] !== undefined &&
            board[y + directions[i][0] * j][x + directions[i][1] * j] === turnColor
          ) {
            for (let k = j; k > 0; k--) {
              newBoard[y][x] = turnColor;
              newBoard[y + directions[i][0] * k][x + directions[i][1] * k] = turnColor;
              setTurnColor(2 / turnColor);
              setBoard(newBoard);
            }
          }
        }
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
