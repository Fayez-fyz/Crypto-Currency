function getUrl() {
    return 'https://api.coinlore.com/api/tickers/?start=100';
}
 async function getData(url) {
   try {
    const response = await fetch(url);
    const data = await response.json();
     loadDataIntoTable(data); 
       
   } catch (error) {
       throw console.log("FAILED",error);
   }
  
}

function loadDataIntoTable(data) {
    let coinName = [];
    let coinSymbol = [];
    let coinRank = [];
    let coinPrice = [];
    let coin24Change = [];

    data['data'].forEach((coin) => {
        coinName.push(coin.name);
        coinSymbol.push(coin.symbol);
        coinRank.push(coin.rank);
        coinPrice.push(coin.price_usd);
        coin24Change.push(coin.percent_change_24h);
    });

    let tableBody = document.getElementById('crypto-table-body');

    let thead = "";

    for(let i = 0; i < coinName.length; i++) {
        thead += "<tr>";
        thead += "<td>" + coinName[i] + " (" + coinSymbol[i] + ")" + "</td>";
        thead += "<td>" + coinRank[i] + "</td>";
        thead += "<td>$" + coinPrice[i] + "</td>";
        if (coin24Change[i] > 0) {
            thead += "<td class='text-success' >+" + coin24Change[i] + "</td>";
        } else {
            thead += "<td class='text-danger'>" + coin24Change[i] + "</td>";
        }
        
        thead += "</tr>";
    }

    tableBody.innerHTML = thead;
}

function init() {
    const url = getUrl();
    getData(url);
}

init();
