function getInventoryList() {
    const autoType = document.getElementById('auto-type').value
    document.getElementById('resultTable').innerHTML = '';
    // call the api from app.js passing autoType as parameter
    const url = `http://localhost:3000/auto/${autoType}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const table = document.getElementById('resultTable');
            let datax = Object.keys(data.auto.auto[0]);
            generateTableHead(table, datax);
            generateTable(table, data.auto.auto);
        })
}

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
  
  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }




