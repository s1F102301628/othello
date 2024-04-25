import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
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
          newBoard[y][x] = turnColor;
          setTurnColor(2 / turnColor);
          setBoard(newBoard);
        }
      }
    }
  };
  //   for (let i = 1; y + i < 8; i++) {
  //     if (
  //       board[y + i] !== undefined && // 置こうとしたマスの下が存在するか確認
  //       board[y + i][x] === 2 / turnColor && // 一つ下が相手の駒か確認
  //       board[y + i + 1] !== undefined && // 下の行が存在するか確認
  //       board[y + i + 1][x] === turnColor // 置こうとしたマスの下を探索し自分の駒があるか確認
  //     ) {
  //       for (let j = 1; j <= i; j++) {
  //         newBoard[y + j][x] = turnColor; // 相手の駒が一つではない時すべてひっくり返す
  //       }
  //       newBoard[y][x] = turnColor;
  //       newBoard[y + i][x] = turnColor;
  //       setTurnColor(2 / turnColor);
  //       setBoard(newBoard);
  //       break;
  //     } else if (board[y + i][x] !== 2 / turnColor) {
  //       break; // 一つ下が相手の駒でない場合は置けないのでループを終了
  //     }
  //   }

  //   for (let i = 1; y - i >= 0; i++) {
  //     if (
  //       board[y - i] !== undefined && // 置こうとしたマスの上が存在するか確認
  //       board[y - i][x] === 2 / turnColor && // 一つ上が相手の駒か確認
  //       board[y - i - 1] !== undefined && // 上の行が存在するか確認
  //       board[y - i - 1][x] === turnColor // 置こうとしたマスの上を探索し自分の駒があるか確認
  //     ) {
  //       for (let j = 1; j <= i; j++) {
  //         newBoard[y - j][x] = turnColor; // 相手の駒が一つではない時すべてひっくり返す
  //       }
  //       newBoard[y][x] = turnColor;
  //       newBoard[y - i][x] = turnColor;
  //       setTurnColor(2 / turnColor);
  //       setBoard(newBoard);
  //       break;
  //     } else if (board[y - i][x] !== 2 / turnColor) {
  //       break; // 一つ上が相手の駒でない場合は置けないのでループを終了
  //     }
  //   }
  // };
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
