function showHistory(){
    const conHistory=document.getElementById("parties-container");
    const copy=history.slice()
    copy.forEach(ele => {
        const pro=profilesdata.find((pl)=>pl.id===ele.playerId)
        const game=document.createElement("div")
        game.className="grid grid-cols-4"
        game.innerHTML=`<p>${ele.date}</p>
        <p>${pro? pro.nickname:"Unknown"}</p>
        <p>${ele.playerScore}-${ele.computerScore}</p>
        <p>${ele.result}</p>
        `;
        conHistory.appendChild(game);
    });
}
showHistory()