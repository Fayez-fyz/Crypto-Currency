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

    let html = "";

    for(let i = 0; i < coinName.length; i++) {
        html += "<tr>";
        html += "<td>" + coinName[i] + " (" + coinSymbol[i] + ")" + "</td>";
        html += "<td>" + coinRank[i] + "</td>";
        html += "<td>$" + coinPrice[i] + "</td>";
        if (coin24Change[i] > 0) {
            html += "<td class='text-sucess' >+" + coin24Change[i] + "</td>";
        } else {
            html += "<td class='text-danger'>" + coin24Change[i] + "</td>";
        }
        
        html += "</tr>";
    }

    tableBody.innerHTML = html;
}

function init() {
    const url = getUrl();
    getData(url);
}

init();