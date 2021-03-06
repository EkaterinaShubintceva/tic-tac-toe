const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';
let field;
let player = CROSS;
let freeCells;
let dimension = 3;
let win = false;

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    dimension = parseInt(prompt("Введите размер стороны поля:", 3));
    renderGrid(dimension);
    freeCells = dimension ** 2;
    field = new Array();
    win = false; 
    for(var i=0; i<dimension; i++){
        field[i] = new Array();
        for(var j=0; j<dimension; j++){
            field[i][j] = EMPTY;
        }
    }
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {
    //console.log(`Clicked on cell: ${row}, ${col}`);
    if (player === ZERO){
        let ai = AI(field)
        row = ai.x;
        col = ai.y;
    }  

    if(field[row][col] !== EMPTY || win)
        return;

    renderSymbolInCell(player, row, col);
    field[row][col] = player;
    
    if (--freeCells <= 0){
        alert('Победила дружба!');
    };
    
    let cells = [];
    for (let i = 0; i<=dimension-1;i++){
        cells.length = 0;
        for (let j = 0; j <=dimension-1;j++){
            if (field[i][j] === player){
                let obj = {x:i, y:j};
                cells.push(obj);
                if (cells.length === dimension){
                    alert('Победил ' + player);
                    brush(cells); 
                    win = true;                       
                    return;
                }
            }
            else {
                cells.length = 0;
            }
        }
    }

    for (let i = 0; i<=dimension-1;i++){
        cells.length = 0;
        for (let j = 0; j <=dimension-1;j++){
            if (field[j][i] === player){
                let obj = {x:j, y:i};
                cells.push(obj);
                if (cells.length === dimension){
                    alert('Победил ' + player);
                    brush(cells); 
                    win = true;                        
                    return;
                }
            }
            else {
                cells.length = 0;
            }
        }
    }

    for (let i = 0; i<=dimension-1;i++){
        for (let j = 0; j <=dimension-1;j++){
            if (i === j){
                if (field[i][j] === player){
                    let obj = {x:i, y:j};
                    cells.push(obj);
                    if (cells.length === dimension){
                        alert('Победил ' + player);
                        brush(cells);  
                        win = true;                       
                        return;
                    }
                }
                else {
                    cells.length = 0;
                }
            }
        }
    }

    for (let i = dimension-1; i>=0;i--){
        for (let j = 0; j <=dimension-1;j++){
            if (i+j === dimension-1){
                if (field[i][j] === player){
                    let obj = {x:i, y:j};
                    cells.push(obj);
                    if (cells.length === dimension){
                        alert('Победил ' + player);
                        brush(cells);   
                        win = true;                      
                        return;
                    }
                }
                else {
                    cells.length = 0;
                }
            }
        }
    }

    if (player === CROSS){
        player = ZERO;    
    }
    else{
        player = CROSS;
    }
}

function AI (field) {
    let obj = {x:getRandomInt(dimension), y:getRandomInt(dimension)}
    if (field[obj.x][obj.y] != EMPTY){
        return AI(field);
    }
    else {
        return obj;
    } 
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function brush (cells){
    for(var i of cells){
        renderSymbolInCell(player, i.x, i.y, 'red');
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    startGame();
    console.log('reset!');
}



/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
