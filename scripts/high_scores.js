
$(document).ready(function() {
    let high_scores = [
        {"date": "2021/01/17", "duration": "3:41"},
        {"date": "2021/01/21", "duration": "4:01"},
        {"date": "2021/02/01", "duration": "2:52"},
        {"date": "2021/02/17", "duration": "3:08"},
        {"date": "2021/03/02", "duration": "2:51"}
    ]

    var keys = Object.keys(high_scores[0]); // how to get the headers for the object data 
    //console.log(Object.keys(high_scores)); // index items of the keys 

    let table = document.createElement('table');
    table.setAttribute('class','table table-hover');
    
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');

    keys.forEach(headerkeys => {
        let th = document.createElement('th');
        th.setAttribute('scope', 'col');
        let headerText = document.createTextNode(headerkeys);
        th.appendChild(headerText);
        tr.appendChild(th);    
    });

    thead.appendChild(tr);
    table.appendChild(thead);

    let tbody = document.createElement('tbody'); 
    high_scores.forEach(rowData => {
        let tr = document.createElement('tr');
        Object.values(rowData).forEach(colData => {
            let td = document.createElement('td');
            let colText = document.createTextNode(colData);
            td.appendChild(colText);
            tr.appendChild(td);
        })
        tbody.appendChild(tr);
        table.appendChild(tbody);
    });
    document.getElementById('high_scores').appendChild(table);

    // console.log(keys);

    // console.log(high_scores[0]);
    // console.log(high_scores[0]);
    // console.log(Object.keys(high_scores)[0]);


    const style = document.createElement('style');
    style.innerHTML = `
        .table {
            width: 200px; 
            text-align: center; 
            margin: auto;
            margin-top: 45px;
        }

        tbody {
            border-bottom-style: none;
        }

        .spacing {
            padding-left: 10px;
            margin-left: 5px;
        }
    
        .spaceHam {
            margin-right: 10px;
            padding-right: 10px;
        }

        `;
    document.head.appendChild(style);


    // var options = {
    //     element: document.getElementById("table"),
    //     headers: headers,
    //     data: artists
    // };
    // var table = new Table(options);
    // table.view();

});