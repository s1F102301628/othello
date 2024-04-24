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
    for (let i = 1; i < 8; i++)
      if (
        board[y + 1] !== undefined && //下に行があるかどうか確認
        board[y + 1][x] === 2 / turnColor && //一個下が相手の駒か確認
        board[y + i] !== undefined && // 置こうとしたマスの下が存在するか確認
        board[y + i][x] === turnColor //置こうとしたマスの下を探索し自分の駒があるか確認
      ) {
        newBoard[y][x] = turnColor;
        newBoard[y + 1][x] = turnColor;
      }
    /*if (
      board[y - 1] !== undefined && //上に行があるかどうか確認
      board[y - 1][x] === 2 / turnColor && //一個上が相手の駒か確認
      board[y - 1][x] === turnColor //置こうとしたマスの上を探索し自分の駒があるか確認
    ) {
      newBoard[y][x] = turnColor;
      newBoard[y - 1][x] = turnColor;
      setTurnColor(2 / turnColor);
      setBoard(newBoard);
    }*/
  };
  return (
    <div className={styles.container}>
<<<<<<< HEAD
      
=======
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
>>>>>>> 418cd31b78b4c902340b2438c6d549ead49fa0d8
    </div>
  );
};

export default Home;
