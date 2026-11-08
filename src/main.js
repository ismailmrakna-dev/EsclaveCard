import { startGame, cards ,createAllCards } from "./game/card.js";
import { compareCards } from "./game/game.js";
import { createProfiles,updateSelectProfile ,createProfile,loadProfiles } from "./profile.js";
import { showHistory,loadHistory,filterDate,filterSearch,filterResult } from "./history.js"
loadHistory()
loadProfiles()


window.cards = cards;
window.compareCards = compareCards;

const currentPages=window.location.pathname;
if(currentPages.includes("index.html")){
    initHomePage();
    
}
else if(currentPages.includes("profile.html")){
    initProfilePage();
    
}
else if(currentPages.includes("game.html")){
    initGamePage();
    
}
else if(currentPages.includes("history.html")){
    initHistoryPage();
    
}


function initHomePage(){
    console.log("Home Page")
    updateSelectProfile()
    
}
function initProfilePage(){
    createProfiles()
    updateSelectProfile()
    document.getElementById("ajouterPro-btn")?.addEventListener("click",createProfile)
    
}
function initGamePage(){
    console.log("Game Page")
    createAllCards("emperor","esclave")
    startGame()
    updateSelectProfile()
}
function initHistoryPage(){
    loadHistory()
    console.log("History Page")
    showHistory(historydata)
    filterSearch()
    filterResult()
    filterDate()
}
