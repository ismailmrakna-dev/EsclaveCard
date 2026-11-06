function showHistory(){
    const conHistory=document.getElementById("parties-container");
    const copy=historydata.slice()
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
function createHistory(playerId,playerScore,computerScore,resultat){
    const obj={
        id:`g_${Date.now()}` ,
        playerId: playerId,
        date:new Date().toJSON(),
        playerScore: playerScore,
        computerScore: computerScore,
        result: resultat     // "victoire", "défaite" ou "égalité"
       }
    return obj;   
}
function saveHistory(){
    localStorage.setItem("history-Ecards",JSON.stringify(historydata))
}
function loadHistory(){
    const hisD= localStorage.getItem("history-Ecards")
    historydata=JSON.parse(hisD)
}