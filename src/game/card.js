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

function moveCard(cardId, targetId) {
    const card = document.getElementById(cardId);
    const target = document.getElementById(targetId);
    target.innerHTML = "";
    target.innerHTML = card.innerHTML;
}

