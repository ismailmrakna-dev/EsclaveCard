
import { createProfiles, saveProfiles, loadProfiles } from "../profile.js";
import { compareCards, duel } from "./game.js";
import { createHistory, saveHistory, showHistory, loadHistory } from "../history.js";
loadHistory()
loadProfiles()
export const cards = [
    {
        id: "esclave",
        nomcard: "Esclave",
        image: "./assets/cards/slave.card.jpg",
        back: "./assets/cards/card-back.png",
    },
    {
        id: "empereur",
        nomcard: "Empereur",
        image: "./assets/cards/emperor-card.jpg",
        back: "./assets/cards/card-back.png",
    },
    {
        id: "citoyen",
        nomcard: "citoyen",
        image: "./assets/cards/citizen.card.jpg",
        back: "./assets/cards/card-back.png",
    }
]



export function createAllCards(camp1, camp2) {
    const cardsOrdinator = document.getElementById("cards-ordinator");
    const gamep1 = document.getElementById("p-card1");
    gamep1.innerHTML = "";
    const gamep2 = document.getElementById("p-card2");
    gamep2.innerHTML = "";
    cardsOrdinator.querySelectorAll(".card-ordinator").forEach(card => card.innerHTML = "");
    const cardsplayer = document.getElementById("cards-player");
    cardsplayer.querySelectorAll(".card-player").forEach(card => card.innerHTML = "");
    const campEmperor = ['empereur', 'citoyen', 'citoyen', 'citoyen', 'citoyen'];
    const campEsclave = ['esclave', 'citoyen', 'citoyen', 'citoyen', 'citoyen'];
    [...cardsOrdinator.querySelectorAll(".card-ordinator"), ...cardsplayer.querySelectorAll(".card-player")].forEach(card => {
        card.innerHTML = "";
        card.used = false;
    });
    let copycamp1 = [...campEmperor];
    let copycamp2 = [...campEsclave];


    //// computer cards
    if (camp1 === "empereur") {
        cardsOrdinator.querySelectorAll(".card-ordinator").forEach((card) => {
            const randomIndex = Math.floor(Math.random() * copycamp1.length);
            const cd = cards.find(c => c.id.toLowerCase().trim() === copycamp1[randomIndex].toLowerCase().trim());
            copycamp1.splice(randomIndex, 1);
            card.innerHTML = `
               <img src="${cd.image}" alt="${cd.nomcard}" class="hidden card-front w-full h-full">
               <img src="${cd.back}" alt="${cd.nomcard}" class="card-back w-full h-full">
               `;
        });
    }
    else if (camp1 === "esclave") {
        cardsOrdinator.querySelectorAll(".card-ordinator").forEach((card) => {
            const randomIndex = Math.floor(Math.random() * copycamp2.length);
            const cd = cards.find(c => c.id.toLowerCase().trim() === copycamp2[randomIndex].toLowerCase().trim());
            copycamp2.splice(randomIndex, 1);
            card.innerHTML = `
               <img src="${cd.image}" alt="${cd.nomcard}" class="hidden card-front w-full h-full">
               <img src="${cd.back}" alt="${cd.nomcard}" class="card-back w-full h-full">
               `;
        })
    }
    ///player cards
    if (camp2 === "empereur") {
        cardsplayer.querySelectorAll(".card-player").forEach((card) => {
            const randomIndex = Math.floor(Math.random() * copycamp1.length);
            const cd = cards.find(c => c.id.toLowerCase().trim() === copycamp1[randomIndex].toLowerCase().trim());
            copycamp1.splice(randomIndex, 1);
            card.innerHTML = `
            <img src="${cd.image}" alt="${cd.nomcard}" class="hidden card-front w-full h-full">
            <img src="${cd.back}" alt="${cd.nomcard}" class="card-back w-full h-full">
            
        `;

        });
    }
    else if (camp2 === "esclave") {
        cardsplayer.querySelectorAll(".card-player").forEach((card) => {
            const randomIndex = Math.floor(Math.random() * copycamp2.length);
            const cd = cards.find(c => c.id.toLowerCase().trim() === copycamp2[randomIndex].toLowerCase().trim());
            copycamp2.splice(randomIndex, 1);
            card.innerHTML = `
                <img src="${cd.image}" alt="${cd.nomcard}" class="hidden card-front w-full h-full">
                <img src="${cd.back}" alt="${cd.nomcard}" class="card-back w-full h-full">
                
            `;
        })
    }
}

function moveCard(card, targetId) {
    const target = document.getElementById(targetId);
    target.innerHTML = "";
    target.appendChild(card);
}

export function startGame() {

    const manche = document.getElementById("Manche")
    const tour = document.getElementById("round")
    const comScore = document.getElementById("computer-score")
    const comCamp = document.getElementById("computer-camp")
    const avtPl = document.getElementById("player-avt")
    const namePl = document.getElementById("player-name")
    const plScore = document.getElementById("player-score")
    const plCamp = document.getElementById("player-camp")

    const playc2 = document.getElementById("p-card2");
    const playc1 = document.getElementById("p-card1");
    playc2.innerHTML = "";
    playc1.innerHTML = "";

    const cardsplayer = document.getElementById("cards-player");
    const selected = JSON.parse(localStorage.getItem("selected-profile"))
    const indexPlayer = profilesdata.findIndex((p) => p.id.trim() === selected.id.trim())

    avtPl.src = `${profilesdata[indexPlayer].image}`
    namePl.textContent = `${profilesdata[indexPlayer].nickname}`
    let camp1 = "empereur";
    let camp2 = "esclave";

    let round = 1;
    let tours = 1
    let cmp = 0;
    let isplayerTurn = false;
    let scoreordinator = 0;
    let scoreplayer = 0;
    comScore.textContent = `Score: ${scoreordinator}`
    plScore.textContent = `Score: ${scoreplayer}`
    comCamp.textContent = `Camp: ${camp1}`
    plCamp.textContent = `Camp: ${camp2}`
    tour.textContent = `Tour: ${tours}/4`
    manche.textContent = `Manche: ${round}/12`

    createAllCards(camp1, camp2);
    console.log("camp1:", camp1, "camp2:", camp2);
    cardsplayer.addEventListener("click", (event) => {
        manche.textContent = `Manche: ${round}/12`



        const cardpla = event.target.closest(".card-player")
        console.log("camp1:", camp1, "camp2:", camp2, "round", round);
        if (!cardpla || isplayerTurn || cardpla.used) return;
        if (round === 13) {
            let result = duel(scoreplayer, scoreordinator)
            const his = createHistory(profilesdata[indexPlayer].id, scoreplayer, scoreordinator, result)
            historydata.push(his)
            saveHistory()
            console.log(historydata)
            profilesdata[indexPlayer].stats.parties += 1
            profilesdata[indexPlayer].stats.score += scoreplayer
            if (result === "Egalite") profilesdata[indexPlayer].stats.draw.push(scoreplayer)
            else if (result === "Victoire") profilesdata[indexPlayer].stats.vic.push(scoreplayer)
            else if (result === "Defaite") profilesdata[indexPlayer].stats.lose.push(scoreplayer)
            saveProfiles()
            showHistory()
            createProfiles()
            alert("Game Over");
            return;
        }

        isplayerTurn = true;
        cardpla.used = true;
        const img = cardpla.querySelector("img");
        moveCard(img, "p-card2");
        setTimeout(() => {
            const cardsOrdinator = document.querySelectorAll("#cards-ordinator .card-ordinator");
            const copycardsOrdinator = [...cardsOrdinator].filter(card => !card.used);
            if (copycardsOrdinator.length === 0) { isplayerTurn = false; return; }





            const randomIndex = Math.floor(Math.random() * copycardsOrdinator.length);
            const cd = copycardsOrdinator[randomIndex]

            cd.used = true;
            const img1 = cd.querySelector(".card-front");
            img1.classList.remove("hidden")
            const img1back = cd.querySelector(".card-back");
            img1back.classList.add("hidden")
            moveCard(img1, "p-card1");
            setTimeout(() => {
                playc2.innerHTML = "";
                playc1.innerHTML = "";
            }, 500)
            cmp++;
            scoreplayer += compareCards(img.alt.toLowerCase().trim(), img1.alt.toLowerCase().trim());
            scoreordinator += compareCards(img1.alt.toLowerCase().trim(), img.alt.toLowerCase().trim());
            comScore.textContent = `Score: ${scoreordinator}`
            plScore.textContent = `Score: ${scoreplayer}`
            console.log("scoreplayer:", scoreplayer, "scoreordinator:", scoreordinator);
            setTimeout(() => {
                if ((img.alt.toLowerCase().trim() === 'empereur' && img1.alt.toLowerCase().trim() === 'esclave') || (img.alt.toLowerCase().trim() === 'esclave' && img1.alt.toLowerCase().trim() === 'empereur')
                    || (img.alt.toLowerCase().trim() === 'empereur' && img1.alt.toLowerCase().trim() === 'citoyen') || (img.alt.toLowerCase().trim() === 'citoyen' && img1.alt.toLowerCase().trim() === 'empereur'
                    ) || (img.alt.toLowerCase().trim() === 'esclave' && img1.alt.toLowerCase().trim() === 'citoyen') || (img.alt.toLowerCase().trim() === 'citoyen' && img1.alt.toLowerCase().trim() === 'esclave')) {
                    cmp = 0
                    if (round % 3 === 0) { let temp = camp1; camp1 = camp2; camp2 = temp; }

                    round++
                    manche.textContent = `Manche: ${round}/12`
                    createAllCards(camp1, camp2);
                    isplayerTurn = false;

                }


                else if (cmp == 5) {
                    round++;
                    manche.textContent = `Manche: ${round}/12`
                    cmp = 0;

                    if (round % 3 === 0) {
                        let temp = camp1; camp1 = camp2; camp2 = temp;
                        comCamp.textContent = `Camp: ${camp1}`
                        plCamp.textContent = `Camp: ${camp2}`
                    }
                    playc2.innerHTML = "";
                    playc1.innerHTML = "";
                    createAllCards(camp1, camp2);
                    tour.textContent = tours + 1

                }

                isplayerTurn = false;
            }, 2000)
        }, 1500)

    });
}



// two players

export function gameTwoPlayer() {

    const manche = document.getElementById("Manche")
    const tour = document.getElementById("round")
    const comScore = document.getElementById("computer-score")
    const comCamp = document.getElementById("computer-camp")
    const avtPl = document.getElementById("player-avt")
    const namePl = document.getElementById("player-name")
    const plScore = document.getElementById("player-score")
    const plCamp = document.getElementById("player-camp")
    const btnTurn=document.getElementById('EndTurn')

    const playc2 = document.getElementById("p-card2");
    const playc1 = document.getElementById("p-card1");
    playc2.innerHTML = "";
    playc1.innerHTML = "";
    btnTurn.classList.remove("hidden")
    const cardsplayer = document.getElementById("cards-player");
    const selected = JSON.parse(localStorage.getItem("selected-profile"))
    const indexPlayer = profilesdata.findIndex((p) => p.id.trim() === selected.id.trim())

    avtPl.src = `${profilesdata[indexPlayer].image}`
    namePl.textContent = `${profilesdata[indexPlayer].nickname}`
    let camp1 = "empereur";
    let camp2 = "esclave";

    let round = 1;
    let tours = 1
    let cmp = 0;
    let turnPl1 = false
    let turnPl2 = true
    let scoreplayer2 = 0;
    let scoreplayer = 0;
    comScore.textContent = `Score: ${scoreplayer2}`
    plScore.textContent = `Score: ${scoreplayer}`
    comCamp.textContent = `Camp: ${camp1}`
    plCamp.textContent = `Camp: ${camp2}`
    tour.textContent = `Tour: ${tours}/4`
    manche.textContent = `Manche: ${round}/12`
    btnTurn.addEventListener("click",(e)=>{
        e.stopPropagation()
        if(!btnTurn) return
        if(turnPl1 && !turnPl2){
           querySelectorAll(".card-player").forEach((c=>{
            c.querySelector(".card-front").classList.remove("hidden")
            c.querySelector(".card-back").classList.add("hidden")
           }))
           querySelectorAll(".card-ordinator").forEach((c=>{
            c.querySelector(".card-front").classList.add("hidden")
            c.querySelector(".card-back").classList.remove("hidden")
           }))
        }
        if(!turnPl1 && turnPl2){
            querySelectorAll(".card-player").forEach((c=>{
            c.querySelector(".card-front").classList.add("hidden")
            c.querySelector(".card-back").classList.remove("hidden")
           }))
           querySelectorAll(".card-ordinator").forEach((c=>{
            c.querySelector(".card-front").classList.remove("hidden")
            c.querySelector(".card-back").classList.add("hidden")
           }))
        }

    })
    createAllCards(camp1, camp2);
    
    //player1
    cardsplayer.addEventListener("click", (event) => {
        manche.textContent = `Manche: ${round}/12`
        const cardpla = event.target.closest(".card-player")
        if (!cardpla || isplayerTurn || cardpla.used) return;
        if (round === 13) {
            let result = duel(scoreplayer, scoreplayer2)
            const his = createHistory(profilesdata[indexPlayer].id, scoreplayer, scoreplayer2, result)
            historydata.push(his)
            saveHistory()
            profilesdata[indexPlayer].stats.parties += 1
            profilesdata[indexPlayer].stats.score += scoreplayer
            if (result === "Egalite") profilesdata[indexPlayer].stats.draw.push(scoreplayer)
            else if (result === "Victoire") profilesdata[indexPlayer].stats.vic.push(scoreplayer)
            else if (result === "Defaite") profilesdata[indexPlayer].stats.lose.push(scoreplayer)
            alert("Game Over");
            saveProfiles()
            showHistory()
            createProfiles()
            round = 0
            return;
        }
        isplayerTurn = true;
        cardpla.used = true;
        const img = cardpla.querySelector(".card-front");
        moveCard(img, "p-card2");
        // player 2
        setTimeout(() => {

            cardsplayer.addEventListener("click", (e) => {
                const cardPl2 = e.target.closest(".card-ordinator");
                if (!cardPl2 || isplayerTurn === false) return;
                const img1 = cardPl2.querySelector(".card-front");
                img1.classList.remove("hidden")
                const img1back = cardPl2.querySelector(".card-back");
                img1back.classList.add("hidden")
                moveCard(img1back, "p-card1");

            })
            setTimeout(() => {
                playc2.innerHTML = "";
                playc1.innerHTML = "";
            }, 500)
            cmp++;
            scoreplayer += compareCards(img.alt.toLowerCase().trim(), img1.alt.toLowerCase().trim());
            scoreplayer2 += compareCards(img1.alt.toLowerCase().trim(), img.alt.toLowerCase().trim());
            comScore.textContent = `Score: ${scoreplayer2}`
            plScore.textContent = `Score: ${scoreplayer}`

            setTimeout(() => {
                if ((img.alt.toLowerCase().trim() === 'empereur' && img1.alt.toLowerCase().trim() === 'esclave') || (img.alt.toLowerCase().trim() === 'esclave' && img1.alt.toLowerCase().trim() === 'empereur')
                    || (img.alt.toLowerCase().trim() === 'empereur' && img1.alt.toLowerCase().trim() === 'citoyen') || (img.alt.toLowerCase().trim() === 'citoyen' && img1.alt.toLowerCase().trim() === 'empereur'
                    ) || (img.alt.toLowerCase().trim() === 'esclave' && img1.alt.toLowerCase().trim() === 'citoyen') || (img.alt.toLowerCase().trim() === 'citoyen' && img1.alt.toLowerCase().trim() === 'esclave')) {
                    cmp = 0
                    if (round % 3 === 0) { let temp = camp1; camp1 = camp2; camp2 = temp; }
                    round++
                    manche.textContent = `Manche: ${round}/12`
                    createAllCards(camp1, camp2);
                    isplayerTurn = false;

                }

                else if (cmp == 5) {
                    round++;
                    manche.textContent = `Manche: ${round}/12`
                    cmp = 0;

                    if (round % 3 === 0) {
                        let temp = camp1; camp1 = camp2; camp2 = temp;
                        comCamp.textContent = `Camp: ${camp1}`
                        plCamp.textContent = `Camp: ${camp2}`
                    }
                    playc2.innerHTML = "";
                    playc1.innerHTML = "";
                    createAllCards(camp1, camp2);
                    tour.textContent = tours + 1

                }
                isplayerTurn = false;
            }, 2000)
        }, 1500)

    });
}



