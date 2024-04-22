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

    /* for (const direction of directions) {
      for (let i = 1; i < 8; i++)
        if (
          board[y + direction[0]] !== undefined &&
          board[y + direction[0]][x] === 2 / turnColor &&
          board[y][x + direction[1]] === 2 / turnColor &&
          board[y + direction[0] * i][x + direction[1] * i] === turnColor //最大7マス先まで見て同じ色があるかを確認する
        ) {
          console.log(y + direction[0] * i, x + direction[1] * i);
          newBoard[y][x] = turnColor;
          newBoard;
        }
    } */
    if (board[y + 1] !== undefined && board[y + 1][x] === 2 / turnColor) {
      
      newBoard[y][x] = turnColor;
      newBoard[y + 1][x] = turnColor;
      setTurnColor(2 / turnColor);
      setBoard(newBoard);
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
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
