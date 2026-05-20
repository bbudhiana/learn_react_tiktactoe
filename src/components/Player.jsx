import { useState } from "react";

function Player({ name, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false); 

  const handleEditClick = () => {
    //setIsEditing(!isEditing); //cara ini bukan cara terbaik di dunia react
    //dengan cara di bawah ini maka react akan selalu menggunakan nilai terbaru dari isEditing, 
    //sehingga tidak akan terjadi masalah jika ada beberapa klik yang cepat atau 
    //jika ada beberapa komponen Player yang sedang diedit secara bersamaan.
    //(Tiring Problem)./
    //ada di pembelajaran 78. Best Practice : Updating State Based on Old state correctly
    //dengan melewati fungsi updater, kita bisa memastikan bahwa kita selalu menggunakan 
    //nilai terbaru dari isEditing, si React akan menjamin bahwa fungsi updater ini 
    //akan menerima nilai terbaru dari isEditing,

    setIsEditing(isEditing => !isEditing); //cara ini yang direkomendasikan di dunia react

    //simpan perubahan nama pemain ke state di komponen induk (App) dengan memanggil 
    //fungsi onChangeName yang diterima dari props,
    if(isEditing) {  
      onChangeName(symbol, playerName); //kirim simbol pemain dan nama baru ke fungsi onChangeName untuk memperbarui nama pemain di komponen induk (App)  
    }
    //isEditing && onChangeName(symbol, playerName); //kirim simbol pemain dan nama baru ke fungsi onChangeName untuk memperbarui nama pemain di komponen induk (App)
    //console.log(playerName);
  }

  const handleChange = (event) => {
    setPlayerName(event.target.value);
  }

  //gunakan let untuk editablePlayerName karena nilainya akan berubah tergantung pada 
  //apakah isEditing true atau false.
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = <input type="text" defaultValue={playerName} required onChange={handleChange} />;
  }

  return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {/* <span className={isEditing ? '' : 'player-name'}>{isEditing ? <input type="text" defaultValue={name} /> : name}</span> */}
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
  )
}

export default Player