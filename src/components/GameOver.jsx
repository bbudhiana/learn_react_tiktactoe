function GameOver({winner, onRestart}) {
  return (
    <div id="game-over">
        <h2>Game Over!</h2>
        <p>{winner ? `Player ${winner} wins!` : "It's a draw!"}</p>
        {/* <p><button onClick={() => window.location.reload()}>Play Again</button></p> */}
        <p><button onClick={onRestart}>Play Again</button></p>
    </div>
  )
}

export default GameOver