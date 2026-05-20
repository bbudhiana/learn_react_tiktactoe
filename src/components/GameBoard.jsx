import { useState } from "react";

// const initialGameBoard = [
//  [  null, null, null  ],
//  [  null, null, null  ],
//  [  null, null, null  ]
// ]

//function GameBoard({onSelectSquare, turns}) {
function GameBoard({onSelectSquare, board}) {
//function GameBoard({onSelectSquare, activePlayerSymbol}) {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, cellIndex) {
  //   setGameBoard(prevGameBoard => {
  //     //rekomendasinya adalah dengan membuat salinan dari game board yang lama, lalu mengubah nilai pada salinan tersebut, 
  //     //dan akhirnya mengembalikan salinan yang sudah diubah sebagai state yang baru. 
  //     //Hal ini penting untuk menjaga prinsip immutability dalam React, sehingga perubahan 
  //     //state dapat dideteksi dengan benar dan komponen dapat merender ulang sesuai kebutuhan.  
  //     //const newGameBoard = prevGameBoard.map(row => [...row]);
  //     const newGameBoard = [ ...prevGameBoard.map(innerArray => [...innerArray]) ];
  //     newGameBoard[rowIndex][cellIndex] = activePlayerSymbol;
  //     return newGameBoard;
  //   });

  //   //eksekusi fungsi onSelectSquare yang diterima dari props untuk memberi tahu komponen 
  //   //induk bahwa sebuah kotak telah dipilih.
  //   onSelectSquare();
  // }

  //gameBoard adalah computed value yang dihitung berdasarkan giliran yang telah terjadi selama permainan,
  //disebut computer karena gameBoard akan dihitung ulang setiap kali komponen dirender, 
  //berdasarkan informasi giliran yang ada dalam props turns.
  //karena gameBoard adalah computed value (yang terus berubah) maka menggunakan let bukan const.
  //let gameBoard = initialGameBoard;

  //update gameBoard berdasarkan giliran yang telah terjadi selama permainan, 
  //yang disimpan dalam props turns.
  // for (const turn of turns) {
  //   const {square, player} = turn; //dengan destructuring assignment, kita bisa langsung mengambil nilai square dan player dari objek turn,
  //   const {row, col} = square; //dengan destructuring assignment, kita bisa langsung mengambil nilai row dan col dari objek square,
  //   gameBoard[row][col] = player; //update gameBoard dengan menempatkan simbol pemain (X atau O) pada posisi yang sesuai berdasarkan informasi giliran yang ada dalam turns.
  // }

  return (
    <ol id="game-board">
         {board.map((row, rowIndex) => ( 
           <li key={rowIndex}>
            <ol>
             {row.map((playerSymbol, cellIndex) => (
               <li key={cellIndex}>
                    {/* <button onClick={() => handleSelectSquare(rowIndex, cellIndex)}>
                        {playerSymbol}
                    </button> */}
                    <button onClick={() => onSelectSquare(rowIndex, cellIndex)} disabled={playerSymbol !== null}> {/* jika playerSymbol tidak null maka gak bisa klik lagi */}
                        {playerSymbol}
                    </button>
                </li>
             ))}
            </ol>
           </li>
         ))}
    </ol>
  )
}

export default GameBoard