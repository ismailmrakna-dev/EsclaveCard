export function showHistory(arr){
    const conHistory=document.getElementById("parties-container");
    const copy=arr.slice()
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
export function createHistory(playerId,playerScore,computerScore,resultat){
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
export function saveHistory(){
    localStorage.setItem("history-Ecards",JSON.stringify(historydata))
}
export function loadHistory(){
    const hisD= localStorage.getItem("history-Ecards")
    historydata=JSON.parse(hisD)
}

function filterSearch(){
    const conHistory=document.getElementById("parties-container");
    const resultSelect=document.querySelector("#resultats-parties")
    const datesSelect=document.querySelector("#dates-parties")

    const search=document.querySelector("#search-history")
    
    search.addEventListener("input",(e)=>{
        const sName=e.target.value.toLowerCase().trim()
        if(sName=""){
            conHistory.innerHTML=""
            showHistory(historydata)
            return
        }
        
        conHistory.innerHTML=""
        profilesdata.forEach((p)=>{
            if(p.nickname.toLowerCase().includes(sName)){
                showHistory(historydata.filter((his)=>his.playerId===p.id))
            }              
        })
    })
    
}
function filterDate(){
    const conHistory=document.getElementById("parties-container");
    const resultSelect=document.querySelector("#resultats-parties")
    const datesSelect=document.querySelector("#dates-parties")
    datesSelect.addEventListener("click",(e)=>{
        const sDate=e.target.value
        if(sDate=""){
            conHistory.innerHTML=""
            showHistory(historydata)
            return
        }
        conHistory.innerHTML=""
        showHistory(historydata.filter((his)=>his.date.getdate()===(his.date.getdate()-parseInt(sDate))))
        
    })
    
}
function filterResult(){
    const conHistory=document.getElementById("parties-container");
    const resultSelect=document.querySelector("#resultats-parties")
    
    resultSelect.addEventListener("click",(e)=>{
        const sResult=e.target.value.toLowerCase().trim()
        if(sResult=""){
            conHistory.innerHTML=""
            showHistory(historydata)
            return
        }
        conHistory.innerHTML=""
        showHistory(historydata.filter((his)=>his.result===sResult))
        
    })
    
}