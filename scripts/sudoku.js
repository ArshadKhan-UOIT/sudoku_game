function sameBlock(x1, y1, x2, y2) {
   let firstRow = Math.floor(y1 / 3) * 3;
   let firstCol = Math.floor(x1 / 3) * 3;
   return (y2 >= firstRow && y2 <= (firstRow + 2) && x2 >= firstCol && x2 <= (firstCol + 2));
};
 
function sameRow(x1, y1, x2, y2) {
   return y1 == y2;
};

function sameColumn(x1, y1, x2, y2) {
   return x1 == x2;
};

// let table = document.createElement('table');
// let trow = document.createElement('tr');
// let tcol = document.createElement('td');

function delay(time) {
   return new Promise(resolve => setTimeout(resolve, time));
}
 

$(document).ready(function() {
   var boardArray = new Array(9);
   for (let i=0; i<9; i++) {
      boardArray[i] = new Array(9);
      for (let j=0; j<9; j++) {
         boardArray[i][j] = -1;
      }
   }

   boardArray[0][1] = 1;
   boardArray[0][7] = 9;

   boardArray[1][2] = 4;
   boardArray[1][6] = 2;

   boardArray[2][2] = 8;
   boardArray[2][5] = 5;

   boardArray[3][7] = 3;

   boardArray[4][0] = 2;
   boardArray[4][4] = 4;
   boardArray[4][6] = 1;

   boardArray[6][2] = 1;
   boardArray[6][3] = 8;
   boardArray[6][6] = 6;

   boardArray[7][1] = 3;
   boardArray[7][7] = 8;

   boardArray[8][2] = 6;

   let table, trow, tcol;
   table = document.createElement('table');
   table.setAttribute('class', 'board');
   table.setAttribute('cellspacing', '0');
   for (let i=0; i<9; i++) {
      trow = document.createElement('tr');
      for (let j=0; j<9; j++) {
         tcol = document.createElement('td');
         tcol.setAttribute('id', '' + i + j);
         tcol.setAttribute('class', 'box');
         if (i == 0 ) {
            tcol.setAttribute('class', 'topthick box');
         } else if (i == 8) {
            tcol.setAttribute('class', 'bottomthick box');
         } 
         if (boardArray[i][j] != -1) {
            tcol.textContent = '' + boardArray[i][j];
         }
         trow.appendChild(tcol);   
      }
      table.appendChild(trow);
   }
   document.getElementById('body').appendChild(table);


   let pick = document.createElement('div');
   // pick.setAttribute('id', 'pick');

   let pTable = document.createElement('table');
   pTable.setAttribute('class','palette');
   pTable.setAttribute('cellspacing','0');

   let pRow = document.createElement('tr');

   let pCol;

   var pArray = new Array(10);

   for (let i=0; i<10; i++) {
      pArray[i] = i;
      pCol = document.createElement('td');
      pCol.setAttribute('class','pbox bottomthick topthick');
      pCol.setAttribute('id', '' + (i));
      if (i < 9 ) {
         pCol.textContent = '' + (i + 1);
      } else {
         var img = document.createElement('img');
         img.src = '../images/undo.png';
         img.setAttribute('id', '' + (i));
         pCol.appendChild(img);
      }
      pRow.appendChild(pCol);
   }

   pTable.appendChild(pRow);

   pick.appendChild(pTable);
   
   document.body.appendChild(pick);

   // $("td").click(function(event) {
   //    //   alert(event.target.id);
   //    console.log("td clicked");
   //    console.log(event.target.id);
   //    let tdIDString = event.target.id;
   //    let idINT = parseInt(tdIDString);
   //    console.log(idINT);
   //    console.log(tdIDString.length);
   //    let pnum = idINT+1;

   //    if (tdIDString.length == 1 && idINT < 9) {
   //       console.log("Length 1");
   //       document.getElementById(tdIDString).classList.add('user-input');
   //       // $('#' + idINT).attr('class','user-input');
   //       console.log(pnum);


   //    } else if (tdIDString.length == 2) {
   //       console.log("Length 2");
   //       document.getElementById(tdIDString).classList.remove('user-input');
   //       // const strCopy = tdIDString.split();
   //       console.log(tdIDString[0]);
   //       console.log(tdIDString[1]);

   //       let row = tdIDString[0];
   //       let col = tdIDString[1];
   //    }
   // });

   let pstring, pint, pnum, tstring, tint, row, col;
   let prevpos = '';
   var errorArray = [];

   $('.palette').click(function(event) {
      // console.log("palette clicked!");
      
      pstring = event.target.id;
      pint = parseInt(pstring);

      document.getElementById(pstring).classList.add('user-input');

      if (pint < 9) {
         pnum = pint + 1;
         
         // console.log(pnum);

      } else {
         // console.log("undo clicked!");
         if (prevpos.length == 2) {
            boardArray[prevpos[0]][prevpos[1]] = -1;
            $('#' + prevpos).empty();
            document.getElementById(prevpos).classList.remove('user-input');
            if (errorArray.length > 0) {
               for (let i=0; i<errorArray.length; i++) {
                  let errorTString = errorArray[i];
                  document.getElementById(errorTString).classList.remove('error');
               }
               errorArray = [];
            }
         }
         delay(1000).then(() => document.getElementById(pstring).classList.remove('user-input'));
      }
   });

   $('.board').click(function(event) {
      // console.log("board clicked!");
      
      
      tstring = event.target.id;
      tint = parseInt(tstring);
      
      document.getElementById(pstring).classList.remove('user-input');
      document.getElementById(tstring).classList.add('user-input');

      row = tstring[0];
      col = tstring[1];

      if (boardArray[row][col] == -1) {
         prevpos = tstring;
         boardArray[row][col] = pnum; 
         // console.log("Board[",row,"][",col,"]= ",pnum);
         document.getElementById(tstring).append(boardArray[row][col]);
      }

      

      // need to start checking for errors 
      for (let i=0; i<9; i++) {  // rows 
         for (let j=0; j<9; j++) {  //cols
            // console.log("OUT ",row," ",col," ",i," ",j); 
            // if (i != row && j != col) {
            if (sameBlock(col, row, j, i) == true && boardArray[row][col] == boardArray[i][j] && col != j && row != i
               || sameRow(col, row, j, i) == true && boardArray[row][col] == boardArray[i][j] && col != j 
               || sameColumn(col, row, j, i) == true && boardArray[row][col] == boardArray[i][j] && row != i) {
               // console.log("IN ",row," ",col," ",i," ",j);
               // console.log("IN Board[",row,"][",col,"]= ",pnum);
               errorArray.push('' + row + col);
               errorArray.push('' + i + j);
            }
            // } 
         }
      }

      for (let i=0; i< errorArray.length; i++) {
         let errorTString = errorArray[i];
         document.getElementById(errorTString).classList.add('error');
      }
      // delaying the highlighted box
      delay(1000).then(() => document.getElementById(tstring).classList.remove('user-input'));
   });




   // $(document).click(function() {
   //    console.log("Clicked");
   //    $("td").click(function(event) {
   //    //   alert(event.target.id);
   //       console.log(event.target.id);
   //    });
   // });
});
