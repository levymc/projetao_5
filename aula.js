// ingredientes = [
//     {receita: "Bolo de Chocolate", ingredientes: "farinha", preparo: "bate tudo"},
//     {receita: "Pudim de Leite Condensado", ingredientes: "1 lata de leite condensado, 1 lata (leite condensado) de leite e 3 Ovos", preparo:"Preparo do Pudim"},
//     {receita: "Doce de Leite", ingredientes: "2l de leite, 200g de açucar e 1 colher de chá de bicarbonato", preparo:"bla bla bla"},
// ]

//Escreva aqui!
function isLegal(age, country, drink = "") {
    const countryLowerCase = country.toLowerCase();
    if (countryLowerCase === "brasil") {
      return age >= 18;
    } else if (countryLowerCase === "eua") {
      if (drink === "cerveja") {
        return age >= 21;
      } else {
        return age >= 21;
      }
    } else if (countryLowerCase === "paraguai") {
      return age >= 20;
    } else if (countryLowerCase === "jamaica") {
      return age >= 16;
    } else if (countryLowerCase === "ira") {
      return false;
    } else if (countryLowerCase === "armenia") {
      return true;
    } else if (countryLowerCase === "portugal") {
      if (drink === "cerveja" || drink === "vinho") {
        return age >= 16;
      } else {
        return age >= 18;
      }
    } else if (countryLowerCase === "egito") {
      if (drink === "cerveja") {
        return age >= 18;
      } else {
        return age >= 21;
      }
    } else {
      return false;
    }
  }
  

console.log(verificaLetra("o"))