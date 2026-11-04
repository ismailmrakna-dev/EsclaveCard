function compareCards(card1, card2) {
   if (card1.id === card2.id) {
     return 0;
   }
   else if (card1.id === "empereur" && card2.id === "esclave") {
        return 0;
    }
    else if (card1.id === "esclave" && card2.id === "empereur") {
        return 5;
    }
    else if (card1.id === "empereur" && card2.id === "citoyen") {
        return 1;
    }
    else if (card1.id === "citoyen" && card2.id === "empereur") {
        return 0;
    }
    else if (card1.id === "esclave" && card2.id === "citoyen") {
        return 0;
    }
    else if (card1.id === "citoyen" && card2.id === "esclave") {
        return 1;
    }
}