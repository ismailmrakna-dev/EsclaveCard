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

export function filterSearch(){
    const conHistory=document.getElementById("parties-container");
    const resultSelect=document.querySelector("#resultats-parties")
    const datesSelect=document.querySelector("#dates-parties")

    const search=document.querySelector("#search-history")
    
    search.addEventListener("input",(e)=>{
        const sName=e.target.value.toLowerCase().trim()
        if(sName===""){
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
export function filterDate(){
    const conHistory=document.getElementById("parties-container");
    const resultSelect=document.querySelector("#resultats-parties")
    const datesSelect=document.querySelector("#dates-parties")
    datesSelect.addEventListener("click",(e)=>{
        const sDate=e.target.value
        
        if(sDate===""){
            conHistory.innerHTML=""
            showHistory(historydata)
            return
        }
        const today=new Date()

        conHistory.innerHTML=""
        showHistory(historydata.filter((his)=>{
            const hisdate=new Date(his.date)
            if(isNaN(hisdate.getTime())) return false
            const diffMs=today-hisdate
            const diffDays=diffMs/(1000*60*60*24)
            return diffDays<=parseInt(sDate) && diffDays>=0;
        }))
        
    })
    
}
export function filterResult(){
    const conHistory=document.getElementById("parties-container");
    const resultSelect=document.querySelector("#resultats-parties")
    
    resultSelect.addEventListener("click",(e)=>{
        const sResult=e.target.value.toLowerCase().trim()
        
        if(sResult===""){
            conHistory.innerHTML=""
            showHistory(historydata)
            return
        }
        conHistory.innerHTML=""
        showHistory(historydata.filter((his)=>his.result.toLowerCase().trim()===sResult))
        
    })
    
}

export function rankingPlayers(){
    const conHistory=document.getElementById("parties-container");
    const copy=[...profilesdata]
    copy.sort((a,b)=>b.stats.score-a.stats.score)
    conHistory.innerHTML=""
    copy.forEach((p,index)=>{
        const profile = document.createElement('div')
        profile.className = "flex items-center my-2 justify-center w-full h-30 p-4 gap-4 border-b "
        profile.innerHTML = `
        <p class="font-bold">Ranking: ${index+1}<p>
        <img class="w-10 h-10 rounded-full border-white" src="${p.image}" alt="avatar ${p.avatar}">
        <div class="flex  items-center gap-2 p-2">
        <h2>${p.nickname}</h2>
        <p>${p.stats.parties} Parties<p>
        <p>Score ${p.stats.score}<p>
        <div>
        `
        conHistory.appendChild(profile)
    })
}