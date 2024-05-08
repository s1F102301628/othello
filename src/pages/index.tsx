import { useEffect, useState } from 'react';

import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
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
    if (board[y][x] !== 3) return; //候補地以外に置けない
    const newBoard = structuredClone(board);
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
    for (let i = 0; i < 8; i++) {
      if (
        newBoard[y + directions[i][0]] !== undefined &&
        newBoard[y + directions[i][0]][x + directions[i][1]] === 2 / turnColor
      ) {
        for (let j = 1; j < 8; j++) {
          if (
            newBoard[y + directions[i][0] * j] !== undefined &&
            newBoard[y + directions[i][0] * j][x + directions[i][1] * j] === turnColor
          ) {
            for (let k = j; k > 0; k--) {
              newBoard[y][x] = turnColor;
              newBoard[y + directions[i][0] * k][x + directions[i][1] * k] = turnColor;
            }

            setTurnColor(2 / turnColor);
          }
        }
      }
    }

    for (let l = 0; l < 8; l++) {
      for (let m = 0; m < 8; m++) {
        if (newBoard[l][m] === 3) {
          newBoard[l][m] = 0;
        }
      }
    }

    for (let l = 0; l < 8; l++) {
      for (let m = 0; m < 8; m++) {
        for (let i = 0; i < 8; i++) {
          if (
            newBoard[l][m] === 0 &&
            newBoard[l + directions[i][0]] !== undefined &&
            newBoard[l + directions[i][0]][m + directions[i][1]] === turnColor
          ) {
            for (let j = 1; j < 8; j++) {
              if (
                newBoard[l + directions[i][0] * j] !== undefined &&
                newBoard[l + directions[i][0] * j][m + directions[i][1] * j] === 2 / turnColor
              ) {
                newBoard[l][m] = 3;
              }
            }
          }
        }
      }
    }
    setBoard(newBoard);
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
                  style={{
                    background: color === 1 ? '#000' : color === 3 ? 'lightblue' : '#fff',
                    width: color === 3 ? '28px' : '56px',
                    height: color === 3 ? '28px' : '56px',
                  }}
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
