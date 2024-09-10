const board = document.querySelector('.content');
const cards = [];
const nCards = 8;

for(let i = 1; i <= nCards; i++){
    cards.push('card'+i+'.jpg');
    cards.push('card'+i+'.jpg');
};

cards.sort(() => Math.random() - 0.5);

cards.forEach(src =>{
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<img src="img/cards/${src}">`;
    board.appendChild(card);
})

const playCard = document.querySelectorAll('.card');
const sfxFlip = new Audio('sounds/flip.mp3');
const sfxMatch = new Audio('sounds/acertou.mp3');
let block = false;
let card1 = null;
let card2 = null;
const attempts = document.getElementById('attempts');
const errors = document.getElementById('errors');
let addAttempts = 0;
let addErrors = 0;

function prevCardsPairs(){
    playCard.forEach((pCards, index)=>{
        if(index % 2 !== 0){
            setTimeout(()=>{
                pCards.classList.add('flip');
            }, index * 300);
        }
    })
    setTimeout(()=>{
        playCard.forEach((pCards, index)=>{
            if(index % 2 !== 0){
                pCards.classList.remove('flip');
            }
        })
        prevCardsOdds();
    }, playCard.length * 300);
}
//add
function prevCardsOdds(){
    playCard.forEach((pCards, index)=>{
        if(index % 2 === 0){
            setTimeout(()=>{
                pCards.classList.add('flip');
            }, index * 300);
        }
    })
    setTimeout(()=>{
        playCard.forEach((pCards, index)=>{
            if(index % 2 === 0){
                pCards.classList.remove('flip');
            }
        })
        playGame();
    }, playCard.length * 300);
}
//criar função
function playGame(){
    playCard.forEach(cardFlip => {
        cardFlip.addEventListener('click', () => {
            if(block) return;
            if(cardFlip.classList.contains('flip')) return;
            if(cardFlip.classList.contains('equal')) return;

            sfxFlip.currentTime = 0;
            sfxFlip.play();
            cardFlip.classList.add('flip');
            let cardsTurned = document.querySelectorAll('.flip');
    
            if(cardsTurned.length === 2){
                block = true;
                card1 = cardsTurned[0];
                card2 = cardsTurned[1];
                addAttempts++;
                attempts.textContent = addAttempts;
                let match = card1.querySelector('img').src === card2.querySelector('img').src;
                match ? equal() : setTimeout(notEqual, 1500);
            }
        })
    })   
    timer() 
}

function equal(){
    card1.classList.add('equal');
    card2.classList.add('equal');
    sfxMatch.currentTime = 0;
    sfxMatch.play();
    card1.classList.remove('flip');
    card2.classList.remove('flip');
    reset();
    if(document.querySelectorAll('.equal').length == 16) setTimeout(win, 1500);
}

function notEqual(){
    card1.classList.remove('flip');
    card2.classList.remove('flip');
    sfxFlip.currentTime = 0;
    sfxFlip.play();
    addErrors++;
    errors.textContent = addErrors;
    reset();
}

function reset(){
    [block, card1, card2] = [false, null, null];
}

const min = document.getElementById('min');
const sec = document.getElementById('sec');
let vSec = 0;
let vMin = 0;
let intSec, intMin;

function timer(){
    intSec = setInterval(function() {
        vSec++;
        if(vSec<10) vSec = '0' + vSec;
        if(vSec>59) vSec = '00';
        sec.textContent = vSec;
    }, 1000);

    intMin = setInterval(()=>{
        vMin++;
        if(vMin<10) vMin = '0' + vMin;
        min.textContent = vMin;
    }, 60000);
}

function win(){
    clearInterval(intSec);
    clearInterval(intMin);
    alert(
        'Fim de Jogo!\n'+
        'Seu tempo foi: ' +vMin+':'+vSec+
        '\nCom '+addAttempts+' tentativas e '+addErrors+' erros.'
    );
    setTimeout(restart, 1000);
}

function restart(){
    location.reload();
}