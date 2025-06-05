import { useEffect, useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1); // 1=黒, 2=白
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
  const [passCount, setPassCount] = useState(0);
  const [winner, setWinner] = useState('');

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

  useEffect(() => {
    countStones();
  }, [board]);

  useEffect(() => {
    const hasMove = calculateValidMoves(turnColor, board);
    if (!hasMove) {
      if (passCount + 1 >= 2) {
        determineWinner();
        return;
      }
      alert(`${turnColor === 1 ? '黒' : '白'}は置けないためスキップされました`);
      setPassCount((prev) => prev + 1);
      setTurnColor(2 / turnColor);
    } else {
      setPassCount(0);
    }
  }, [turnColor]);

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

  const determineWinner = () => {
    if (blackCount > whiteCount) setWinner('黒の勝ち');
    else if (whiteCount > blackCount) setWinner('白の勝ち');
    else setWinner('引き分け');
  };

  const calculateValidMoves = (color: number, targetBoard: number[][]): boolean => {
    const newBoard = structuredClone(targetBoard);
    let hasMove = false;

    // 既存の候補地を消す
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (newBoard[y][x] === 3) newBoard[y][x] = 0;
      }
    }

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (newBoard[y][x] !== 0) continue;
        for (const [dy, dx] of directions) {
          let ny = y + dy;
          let nx = x + dx;
          let foundOpponent = false;

          while (ny >= 0 && ny < 8 && nx >= 0 && nx < 8 && newBoard[ny][nx] === 2 / color) {
            ny += dy;
            nx += dx;
            foundOpponent = true;
          }

          if (
            foundOpponent &&
            ny >= 0 &&
            ny < 8 &&
            nx >= 0 &&
            nx < 8 &&
            newBoard[ny][nx] === color
          ) {
            newBoard[y][x] = 3;
            hasMove = true;
            break;
          }
        }
      }
    }

    setBoard(newBoard);
    return hasMove;
  };

  const clickHandler = (x: number, y: number) => {
    if (board[y][x] !== 3 || winner) return;

    const newBoard = structuredClone(board);
    newBoard[y][x] = turnColor;

    for (const [dy, dx] of directions) {
      let ny = y + dy;
      let nx = x + dx;
      const toFlip: [number, number][] = [];

      while (ny >= 0 && ny < 8 && nx >= 0 && nx < 8 && newBoard[ny][nx] === 2 / turnColor) {
        toFlip.push([ny, nx]);
        ny += dy;
        nx += dx;
      }

      if (ny >= 0 && ny < 8 && nx >= 0 && nx < 8 && newBoard[ny][nx] === turnColor) {
        toFlip.forEach(([fy, fx]) => {
          newBoard[fy][fx] = turnColor;
        });
      }
    }

    setBoard(newBoard);
    setTurnColor(2 / turnColor);
  };

  return (
    <div className={styles.container}>
      <div className={styles.rightPanel}>
        <div className={styles.scoreboardStyle}>
          <div className={styles.scoretextStyle}>
            <div>現在 {turnColor === 1 ? '黒' : '白'} のターン</div>
            <div>黒のコマ: {blackCount}</div>
            <div>白のコマ: {whiteCount}</div>
            {winner && <div className={styles.winnerStyle}>🎉 {winner} 🎉</div>}
          </div>
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
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
