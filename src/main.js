import { startGame, cards ,createAllCards } from "./game/card.js";
import { compareCards } from "./game/game.js";
import { createProfiles, createProfile,showprofile,deleteProfile,modifyProfile,selectProfile } from "./profile.js";

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



function initHomePage(){
    console.log("Home Page")
}
function initProfilePage(){
    createProfiles()
    
}
function initGamePage(){
    console.log("Game Page")
    createAllCards("emperor","esclave")
    startGame()
}

