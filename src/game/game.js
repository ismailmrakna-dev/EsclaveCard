export function compareCards(playerCard, computerCard) {
   if (playerCard === computerCard) {
     return 0;
   }
   else if (playerCard === "empereur" && computerCard === "esclave") {
        return 0;
    }
    else if (playerCard === "esclave" && computerCard === "empereur") {
        return 5;
    }
    else if (playerCard === "empereur" && computerCard === "citoyen") {
        return 1;
    }
    else if (playerCard === "citoyen" && computerCard === "empereur") {
        return 0;
    }
    else if (playerCard === "esclave" && computerCard === "citoyen") {
        return 0;
    }
    else if (playerCard === "citoyen" && computerCard === "esclave") {
        return 1;
    }
}
export function duel(scorePlayer, scoreOrdinator){
    if(scorePlayer === scoreOrdinator) return "Egalite"
    else if(scorePlayer > scoreOrdinator) return "Victoire"
    else if(scorePlayer < scoreOrdinator) return "Defaite"
}
