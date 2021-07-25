
 async function getData(url) {
   try {
    const response = await fetch('https://api.coinlore.com/api/tickers/?start=100');
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

    let tbody = "";

    for(let i = 0; i < coinName.length; i++) {
        tbody += "<tr>";
        tbody += "<td>" + coinName[i] + " (" + coinSymbol[i] + ")" + "</td>";
        tbody += "<td>" + coinRank[i] + "</td>";
        tbody += "<td>$" + coinPrice[i] + "</td>";
        if (coin24Change[i] > 0) {
            tbody += "<td class='text-success' >+" + coin24Change[i] + "</td>";
        } else {
            tbody += "<td class='text-danger'>" + coin24Change[i] + "</td>";
        }
        
       tbody += "</tr>";
    }

    tableBody.innerHTML = tbody;
}

function init() {
    getData(url);
}

init();
