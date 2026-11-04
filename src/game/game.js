function compareCards(str1, str2) {
   if (str1 === str2) {
     return 0;
   }
   else if (str1 === "empereur" && str2 === "esclave") {
        return 0;
    }
    else if (str1 === "esclave" && str2 === "empereur") {
        return 5;
    }
    else if (str1 === "empereur" && str2 === "citoyen") {
        return 1;
    }
    else if (str1 === "citoyen" && str2 === "empereur") {
        return 0;
    }
    else if (str1 === "esclave" && str2 === "citoyen") {
        return 0;
    }
    else if (str1 === "citoyen" && str2 === "esclave") {
        return 1;
    }
}

