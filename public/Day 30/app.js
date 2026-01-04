let box = document.querySelectorAll('.box');
let reset = document.querySelector('.reset');
let newButton = document.querySelector('#new');
let msg = document.querySelector('#winmsg');
let magic = document.querySelector('.hide');
let turnO = false;

const patterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

box.forEach((value) => {
    value.addEventListener("click", () => follow(value));
});

function follow(input){
    if(turnO){
        input.innerText = "O";
    } else {
        input.innerText = "X";
    }
    turnO = !turnO;
    input.disabled = true;
    checkWinner(); 
}

function checkWinner(){
    for(let pattern of patterns){
        let pos1 = box[pattern[0]].innerText;
        let pos2 = box[pattern[1]].innerText;
        let pos3 = box[pattern[2]].innerText;

        if(pos1 === pos2 && pos2 === pos3 && pos1 !== ""){
            msg.innerText = `Winner is ${box[pattern[2]].innerText}`;
            disable();
            return;
        }
    }
}

function disable(){
    box.forEach(b => b.disabled = true);
    magic.classList.remove('hide');
    reset.classList.add('hide');
}

function game(){
    box.forEach(b => {
        b.disabled = false;
        b.innerText = "";
    });
}

function gameNew(){
    magic.classList.add('hide');
    reset.classList.remove('hide');
    game();   
}

newButton.addEventListener("click", gameNew);
reset.addEventListener("click", game);
