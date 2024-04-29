import { useEffect, useState } from 'react';

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
  const [blackCount, setBlackCount] = useState(0);
  const [whiteCount, setWhiteCount] = useState(0);

  useEffect(() => {
    countStones();
  }, [board]);

  const countStones = () => {
    let black = 0;
    let white = 0;
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell === 1) black++;
        else if (cell === 2) white++;
      });
    });
    setBlackCount(black);
    setWhiteCount(white);
  };
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
      <div className={styles.scoreboardStyle}>
        <div className={styles.scoretextStyle}>
          <div>現在 {turnColor === 1 ? '黒' : '白'} のターン</div>
          <div>黒のコマ: {blackCount}</div>
          <div>白のコマ: {whiteCount}</div>
        </div>
      </div>
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
