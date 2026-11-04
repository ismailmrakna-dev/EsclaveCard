const cards = [
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



function createAllCards(camp1, camp2) {
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
    copycamp1 = [...campEmperor];
    copycamp2 = [...campEsclave];
    

    //// computer cards
    if (camp1 === "empereur") {
        cardsOrdinator.querySelectorAll(".card-ordinator").forEach((card) => {
            const  randomIndex = Math.floor(Math.random() * copycamp1.length);
            const cd = cards.find(c => c.id.toLowerCase().trim() === copycamp1[randomIndex].toLowerCase().trim());
            copycamp1.splice(randomIndex, 1);
            card.innerHTML = `
               <img src="${cd.image}" alt="${cd.nomcard}" class="card-front w-full h-full">
               `;
        });
    }
    else if (camp1 === "esclave") {
        cardsOrdinator.querySelectorAll(".card-ordinator").forEach((card) => {
            const  randomIndex = Math.floor(Math.random() * copycamp2.length);
            const cd = cards.find(c => c.id.toLowerCase().trim() === copycamp2[randomIndex].toLowerCase().trim());
            copycamp2.splice(randomIndex, 1);
            card.innerHTML = `
               <img src="${cd.image}" alt="${cd.nomcard}" class="card-front w-full h-full">
               `;
        })
    }
    ///player cards
    if (camp2 === "empereur") {
        cardsplayer.querySelectorAll(".card-player").forEach((card) => {
        const  randomIndex = Math.floor(Math.random() * copycamp1.length);
        const cd = cards.find(c => c.id.toLowerCase().trim() === copycamp1[randomIndex].toLowerCase().trim());
        copycamp1.splice(randomIndex, 1);
        card.innerHTML = `
            <img src="${cd.image}" alt="${cd.nomcard}" class="card-front w-full h-full">
        `;

        });
    }
    else if (camp2 === "esclave") {
        cardsplayer.querySelectorAll(".card-player").forEach((card) => {
            const  randomIndex = Math.floor(Math.random() * copycamp2.length);
            const cd = cards.find(c => c.id.toLowerCase().trim() === copycamp2[randomIndex].toLowerCase().trim());
            copycamp2.splice(randomIndex, 1);
            card.innerHTML = `
                <img src="${cd.image}" alt="${cd.nomcard}" class="card-front w-full h-full">
            `;
        })
    }
}
createAllCards("empereur", "esclave");

function moveCard(card, targetId) {
    const target = document.getElementById(targetId);
    target.innerHTML = "";
    target.appendChild(card);
}

function startGame() {
    
    
    const cardsplayer = document.getElementById("cards-player");
    const cardsOrdinator = document.querySelectorAll("#cards-ordinator .card-ordinator");
    let camp1 = "empereur";
    let camp2 = "esclave";
    createAllCards(camp1, camp2);
    let round = 1;
    let cmp = 0;
    console.log( "camp1:", camp1, "camp2:", camp2);
    let cd={};
    cd.used = true; 
    cardsplayer.addEventListener("click", (event) => {
        const cardpla = event.target.closest(".card-player")
        const img = cardpla.querySelector("img");
        moveCard(img, "p-card2");
        setTimeout(()=>{
        while(cd.used) {    
        const  randomIndex = Math.floor(Math.random() * cardsOrdinator.length);
        cd = cardsOrdinator[randomIndex]
        console.log(cd, cardsOrdinator)
        }
        cd.used=true;
        const img1 = cd.querySelector("img");
        moveCard(img1, "p-card1");
         cmp++;
        if(round>12) {
            return alert("Game Over");
        }
        if(cmp==5){ 
        cmp = 0;
        if(round%3===0){let temp = camp1; camp1 = camp2; camp2 = temp;}
        createAllCards(camp1, camp2);
        round++;
       }
        
        },1000)
        
    });     
}
startGame()







////2 players
// function startGame() {
    
//     const cardsOrdinator = document.getElementById("cards-ordinator");
//     const cardsplayer = document.getElementById("cards-player");
    
//     let camp1 = "empereur";
//     let camp2 = "esclave";
//     createAllCards(camp1, camp2);
//     let round = 1;
//         let cmp = 0;
//         console.log( "camp1:", camp1, "camp2:", camp2);
//     cardsOrdinator.addEventListener("click", (event) => {
//         const cardOr = event.target.closest(".card-ordinator")
//         const img = cardOr.querySelector("img");
//         cmp++;
//         if(round>12) {
//             return alert("Game Over");
//         }
//         console.log("cmp:", cmp);
//         moveCard(img, "p-card1");
//         if(cmp==5){ 
//         cmp = 0;
//         if(round%3===0){let temp = camp1; camp1 = camp2; camp2 = temp;}
//         createAllCards(camp1, camp2);
//         round++;
//     }
//     cardsplayer.addEventListener("click", (e) => {
//         const cardPl = e.target.closest(".card-player");
//         console.log(cardPl);
//         const img = cardPl.querySelector("img");
//         moveCard(img, "p-card2");
//         })
    
//     });
//     // cardsplayer.addEventListener("click", (e) => {
//     //     const cardPl = e.target.closest(".card-player");
//     //     console.log(cardPl);
//     //     const img = cardPl.querySelector("img");
//     //     moveCard(img, "p-card2");
//     //     })
       
// }





