const cards =[
    {   id: "esclave",
        nomcard: "Esclave",
        image: "./assets/cards/slave.card.jpg",
        back: "./assets/cards/card-back.png",
    },
    {   id: "empereur",
        nomcard: "Empereur",
        image: "./assets/cards/emperor-card.jpg",
        back: "./assets/cards/card-back.png",
    },
    {   id: "citoyen",
        nomcard: "citoyen",
        image: "../assets/cards/citizen.card.jpg",
        back: "./assets/cards/card-back.png",
    }
]
function createcard(card){
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-id", card.id);
    cardElement.innerHTML = `
        <div class="card-back w-6 h-12">
        <img src="${card.back}" alt="${card.nomcard}" class="card-back w-full h-full">
        </div>
        <div class="card-front w-6 h-12">
        <img src="${card.image}" alt="${card.nomcard}" class="card-front w-full h-full">
        </div>
    `;
    return cardElement;
}



