import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import {useState} from "react";
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
};

const INITIAL_GAME_BOARD = [
 [  null, null, null  ],
 [  null, null, null  ],
 [  null, null, null  ]
];

// const initialGameBoard = [
//  [  null, null, null  ],
//  [  null, null, null  ],
//  [  null, null, null  ]
// ];

//helper function untuk menentukan pemain aktif berdasarkan giliran yang sudah terjadi selama permainan,
function deriveActivePlayer(gameTurns) {
  // let currentPlayer = 'X';
  // if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
  //   currentPlayer = 'O';
  // } 
  // return currentPlayer;

  // Logika untuk menentukan pemain aktif berdasarkan giliran yang sudah terjadi
  // Misalnya, jika jumlah giliran genap, pemain aktif adalah 'X', jika ganjil, pemain aktif adalah 'O'.
  //(simple logic) dengan cara ini kita tidak perlu bergantung pada nilai activePlayer yang mungkin belum diperbarui saat setGameTurns dipanggil, 
  //sehingga kita bisa memastikan bahwa kita selalu menggunakan nilai terbaru dari pemain saat ini, 
  //tanpa harus khawatir tentang masalah sinkronisasi atau nilai yang sudah usang (stale state) yang mungkin terjadi jika kita langsung menggunakan activePlayer. 
  return gameTurns.length % 2 === 0 ? 'X' : 'O';
}

function deriveWinner(gameBoard, players) {
  let winner; //variabel winner untuk menyimpan informasi tentang pemain yang menang, jika ada.
  for (const combination of WINNING_COMBINATIONS) {
    const [square1, square2, square3] = combination; //dengan destructuring assignment, kita bisa langsung mengambil nilai square1, square2, dan square3 dari array combination,
    const firstSquareSymbol = gameBoard[square1.row][square1.col]; //mengambil simbol pemain (X atau O) yang berada pada posisi square1 di gameBoard,
    const secondSquareSymbol = gameBoard[square2.row][square2.col]; //mengambil simbol pemain (X atau O) yang berada pada posisi square2 di gameBoard,
    const thirdSquareSymbol = gameBoard[square3.row][square3.col]; //mengambil simbol pemain (X atau O) yang berada pada posisi square3 di gameBoard,

    if (
      firstSquareSymbol &&                           //firstSquareSymbol harus memiliki nilai (tidak null) untuk memastikan bahwa kita tidak menghitung kombinasi kemenangan yang belum lengkap (misalnya, jika ketiga kotak masih kosong).
      firstSquareSymbol === secondSquareSymbol &&    //firstSquareSymbol harus sama dengan secondSquareSymbol untuk memastikan bahwa kedua kotak pertama memiliki simbol pemain yang sama.
      firstSquareSymbol === thirdSquareSymbol)       //firstSquareSymbol harus sama dengan thirdSquareSymbol untuk memastikan bahwa ketiga kotak memiliki simbol pemain yang sama.
    {     
      winner = players[firstSquareSymbol];
    }
  }
  return winner; //jika tidak ada pemenang, kembalikan null
}


//function deriveGameBoard(gameTurns) {
function deriveGameBoard(gameTurns) {
  //let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])]; //membuat salinan dari initialGameBoard untuk memastikan bahwa kita tidak memodifikasi array asli, sehingga kita bisa menjaga prinsip immutability dalam React.
  let gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])]; //membuat salinan dari INITIAL_GAME_BOARD untuk memastikan bahwa kita tidak memodifikasi array asli, sehingga kita bisa menjaga prinsip immutability dalam React.

  //update gameBoard berdasarkan giliran yang telah terjadi selama permainan, 
  //yang disimpan dalam props turns.
  for (const turn of gameTurns) {
    const {square, player} = turn; //dengan destructuring assignment, kita bisa langsung mengambil nilai square dan player dari objek turn,
    const {row, col} = square; //dengan destructuring assignment, kita bisa langsung mengambil nilai row dan col dari objek square,
    gameBoard[row][col] = player; //update gameBoard dengan menempatkan simbol pemain (X atau O) pada posisi yang sesuai berdasarkan informasi giliran yang ada dalam turns.
  }
  return gameBoard;
}

function App() {
  //buat nampung player name
  // const [players, setPlayers] = useState({
  //   'X': 'Player 1',
  //   'O': 'Player 2'
  // });
  const [players, setPlayers] = useState(PLAYERS);

  //set gameTurns untuk menyimpan urutan giliran pemain yang telah terjadi selama permainan.
  const [gameTurns, setGameTurns] = useState([]);
  
  //activePlayer berubah saat state gameTurns berubah, karena kita menggunakan deriveActivePlayer 
  //untuk menentukan pemain aktif berdasarkan giliran yang sudah terjadi selama permainan.
  const activePlayer = deriveActivePlayer(gameTurns);
  //console.log(activePlayer);
  console.log('Game Turns:', gameTurns);
  
  /*
  //disini mulai perhitungan untuk kemungkinan kemenangan, kita bisa menggunakan informasi giliran 
  //yang sudah terjadi selama permainan (yang disimpan dalam gameTurns) untuk menghitung apakah
  //ada pemain yang sudah mencapai kombinasi kemenangan tertentu.
  //let gameBoard = initialGameBoard;
  //membuat salinan dari initialGameBoard untuk memastikan bahwa kita tidak memodifikasi array asli, 
  //sehingga kita bisa menjaga prinsip immutability dalam React.
  //ini diperbaiki agar handleResetGame bisa bekerja dengan benar, karena jika kita menggunakan initialGameBoard secara langsung,
  //maka setiap kali kita memodifikasi gameBoard, kita juga akan memodifikasi initialGameBoard, sehingga ketika kita reset game, 
  //initialGameBoard sudah tidak kosong lagi, melainkan sudah terisi dengan simbol pemain yang sudah dipilih sebelumnya.  
  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])]; 

  //update gameBoard berdasarkan giliran yang telah terjadi selama permainan, 
  //yang disimpan dalam props turns.
  for (const turn of gameTurns) {
    const {square, player} = turn; //dengan destructuring assignment, kita bisa langsung mengambil nilai square dan player dari objek turn,
    const {row, col} = square; //dengan destructuring assignment, kita bisa langsung mengambil nilai row dan col dari objek square,
    gameBoard[row][col] = player; //update gameBoard dengan menempatkan simbol pemain (X atau O) pada posisi yang sesuai berdasarkan informasi giliran yang ada dalam turns.
  }

  */

  const gameBoard = deriveGameBoard(gameTurns); //menggunakan helper function deriveGameBoard untuk menghitung kondisi gameBoard saat ini berdasarkan giliran yang sudah terjadi selama permainan, yang disimpan dalam gameTurns.

/*
  let winner; //variabel winner untuk menyimpan informasi tentang pemain yang menang, jika ada.

  //check kombinasi kemenangan dengan menggunakan informasi giliran yang sudah terjadi selama permainan (yang disimpan dalam gameTurns) 
  //dan kombinasi kemenangan yang sudah didefinisikan dalam WINNING_COMBINATIONS.
  for (const combination of WINNING_COMBINATIONS) {
    const [square1, square2, square3] = combination; //dengan destructuring assignment, kita bisa langsung mengambil nilai square1, square2, dan square3 dari array combination,
    const firstSquareSymbol = gameBoard[square1.row][square1.col]; //mengambil simbol pemain (X atau O) yang berada pada posisi square1 di gameBoard,
    const secondSquareSymbol = gameBoard[square2.row][square2.col]; //mengambil simbol pemain (X atau O) yang berada pada posisi square2 di gameBoard,
    const thirdSquareSymbol = gameBoard[square3.row][square3.col]; //mengambil simbol pemain (X atau O) yang berada pada posisi square3 di gameBoard,

    //alternatif
    // const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]; 
    // const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    // const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    //jika ketiga simbol pemain pada posisi square1, square2, dan square3 sama dan tidak null, 
    //maka kita bisa menyimpulkan bahwa pemain tersebut adalah pemenang.
    if (
      firstSquareSymbol &&                           //firstSquareSymbol harus memiliki nilai (tidak null) untuk memastikan bahwa kita tidak menghitung kombinasi kemenangan yang belum lengkap (misalnya, jika ketiga kotak masih kosong).
      firstSquareSymbol === secondSquareSymbol &&    //firstSquareSymbol harus sama dengan secondSquareSymbol untuk memastikan bahwa kedua kotak pertama memiliki simbol pemain yang sama.
      firstSquareSymbol === thirdSquareSymbol)       //firstSquareSymbol harus sama dengan thirdSquareSymbol untuk memastikan bahwa ketiga kotak memiliki simbol pemain yang sama.
    {     
      //console.log(`Player ${firstSquareSymbol} wins!`); //menampilkan pesan kemenangan di konsol, dengan menyebutkan simbol pemain yang menang (X atau O).
      //winner = firstSquareSymbol; //menyimpan simbol pemain yang menang ke dalam variabel winner, sehingga kita bisa menggunakan informasi ini untuk menampilkan pesan kemenangan di UI atau melakukan tindakan lain yang sesuai.
      winner = players[firstSquareSymbol];
      console.log(winner); //menyimpan objek pemain yang menang ke dalam variabel winner, sehingga kita bisa menggunakan informasi ini untuk menampilkan pesan kemenangan di UI atau melakukan tindakan lain yang sesuai.
    }
  }
  */

  const winner = deriveWinner(gameBoard, players); //menggunakan helper function deriveWinner untuk menentukan pemenang berdasarkan kondisi gameBoard saat ini.

  //variabel hadDraw untuk menyimpan informasi tentang apakah permainan berakhir dengan hasil seri (draw), 
  //yaitu ketika semua kotak sudah terisi (gameTurns.length === 9) dan tidak ada pemenang (winner masih null).  
  const hasDraw = gameTurns.length === 9 && !winner; 

  //kita bisa menggunakan state untuk menyimpan informasi tentang pemain yang sedang aktif, 
  // misalnya dengan menggunakan useState untuk menyimpan simbol pemain saat ini ('X' atau 'O').
  //ini dimungkinkan karena adanya konsep lifting state up, di mana kita dapat mengangkat state 
  //ke komponen induk (App) dan kemudian meneruskannya ke komponen anak (GameBoard) melalui props.
  //const [activePlayer, setActivePlayer] = useState('X');

  //function handleSelectSquare() {
  function handleSelectSquare(rowIndex, colIndex) {
    // Logika untuk menangani pemilihan kotak oleh pemain aktif
    // Setelah pemain memilih kotak, kita dapat mengubah pemain aktif ke pemain berikutnya
    //setActivePlayer(curActivePlayer => (curActivePlayer === 'X' ? 'O' : 'X'));
    //menambahkan pemain aktif saat ini ke dalam array gameTurns setiap kali sebuah kotak dipilih.

    //console.log(activePlayer);

    /*
    console.log(activePlayer) pertama akan bernilai 'X tidak berubah oleh setActivePlayer.
    kenapa setActivePlayer tidak serta merta langsung mengubah nilai activePlayer secara instan,
    karena setActivePlayer adalah fungsi asinkron, sehingga perubahan nilai activePlayer 
    akan terjadi pada render berikutnya, bukan secara langsung pada saat setActivePlayer dipanggil.
    updater function hanya menjamin bahwa kita akan mendapatkan nilai terbaru dari activePlayer pada render berikutnya,
    tetapi tidak menjamin bahwa nilai activePlayer akan langsung berubah pada saat setActivePlayer dipanggil.

    1. React menerima request perubahan state
    2. React MENJADWALKAN update
    3. console.log langsung dijalankan
    4. render ulang BELUM terjadi (activePlayer akan berubah setelah render ulang)
    5. activePlayer masih nilai lama
    */

    setGameTurns(prevTurns => {
      //let currentPlayer = activePlayer; // Simpan nilai activePlayer saat ini sebelum diubah

      // Logika untuk menentukan pemain berikutnya berdasarkan giliran sebelumnya
      // jik prevTurns memiliki giliran sebelumnya dan pemainnya adalah 'X', 
      // maka pemain berikutnya adalah 'O'.
      // ini adalah logika tambahan untuk memastikan bahwa kita selalu menggunakan nilai terbaru 
      // dari activePlayer,
      // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
      //   currentPlayer = 'O';
      // } 

      //console.log(prevTurns[0].player);

      /*
        Perbaikan function memanfaatkan prevTurns untuk menentukan pemain saat ini (currentPlayer) berdasarkan jumlah giliran yang sudah terjadi,
        dengan cara ini kita tidak perlu bergantung pada nilai activePlayer yang mungkin belum diperbarui saat setGameTurns dipanggil, 
        sehingga kita bisa memastikan bahwa kita selalu menggunakan nilai terbaru dari pemain saat ini, 
        tanpa harus khawatir tentang masalah sinkronisasi atau nilai yang sudah usang (stale state) yang mungkin terjadi jika kita langsung menggunakan activePlayer.
        Kenapa Pendekatan Ini Lebih Bagus?
        Karena menghindari:

        ❌ duplicated state
        ❌ sync problem
        ❌ stale state
        ❌ race condition
      */
      //const currentPlayer = prevTurns.length % 2 === 0 ? 'X' : 'O';
      const currentPlayer = deriveActivePlayer(prevTurns);

      //kita membuat array baru BUKAN dengan push ke array lama, 
      //tetapi dengan membuat array baru yang terdiri dari giliran terbaru yang baru saja ditambahkan,
      //karena react tidak akan mendeteksi perubahan pada array jika kita memodifikasi array 
      //yang sudah ada (misalnya dengan push), sehingga kita harus membuat array baru setiap kali 
      //kita ingin menambahkan giliran baru.
      //Di React, immutable berarti: “Data lama tidak diubah langsung, tetapi dibuat versi baru dengan perubahan yang diinginkan.”
      const updatedTurns = [
        
        //info tentang kotak yang dipilih dan pemain yang memilihnya (X or O)
        //akan disimpan dalam bentuk objek dengan properti square dan player.
        //{square: {row: rowIndex, col: colIndex}, player: activePlayer}, 
        //untuk memastikan bahwa kita selalu menggunakan nilai terbaru dari activePlayer,
        //kita gunakan currentPlayer yang sudah kita simpan sebelum mengubah activePlayer,
        {
          square: {
                    row: rowIndex, 
                    col: colIndex
                  }, 
          player: currentPlayer
        }, 
          ...prevTurns];
      //console.log('Game Turns:', updatedTurns);
      //kembalikan nilai berupa array yaitu array 0 berisi giliran terbaru yang baru saja ditambahkan, 
      //array 1 diikuti oleh semua giliran sebelumnya yang sudah ada dalam prevTurns.
      return updatedTurns;
    });  
  }

  function handleResetGame() {
    setGameTurns([]); // Reset gameTurns ke array kosong untuk memulai permainan baru
  }

  function handleUpdatePlayerName(symbol, newName) {
    setPlayers(prevPlayers =>{
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (

    <>
    <header>
      <img src="/game-logo.png" alt="Game Logo" style={{ width: '100px', height: '100px' }} />
      <h1>Bana Tic-Tac-Toe</h1>
    </header>
    <main>
        <div id="game-container">
           <ol id="players" className="highlight-player">
              {/* <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} />
              <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} /> */}
              {/* <Player name={players['X']} symbol="X" isActive={activePlayer === 'X'} onChangeName={handleUpdatePlayerName} />
              <Player name={players['O']} symbol="O" isActive={activePlayer === 'O'} onChangeName={handleUpdatePlayerName} /> */}
              <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handleUpdatePlayerName} />
              <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handleUpdatePlayerName} />
           </ol>
           {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleResetGame} />} {/* Menampilkan pesan kemenangan jika ada pemenang */ }
           <div className="game-board">
            {/* <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} turns={gameTurns} /> */}
            <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
             {/* Game board content will go here */}
           </div>
           
        </div>
        <Log turns={gameTurns} />
    </main>
  </>
  )
}

export default App
