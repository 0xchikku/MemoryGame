

const gridDisplay = document.querySelector('#container-grid');

const cardsArray = [
    {
        name: 'balloon',
        img: './assets/balloon.jpeg'
    },
    {
        name: 'flower',
        img: './assets/flower.jpeg'
    },
    {
        name: 'lion',
        img: './assets/lion.jpeg'
    },
    {
        name: 'palm',
        img: './assets/palm.jpeg'
    },
    {
        name: 'stones',
        img: './assets/stones.jpeg'
    },
    {
        name: 'mountain',
        img: './assets/mountain.jpeg'
    }
];
let chosenCards = [];

const scoreDisplay = document.getElementById('score');
let score = scoreDisplay.textContent;

const sliderValueDisplay = document.getElementById('slider-value');
const slider = document.getElementById('slider');
let pairCards = slider.value;
let gameCardsArray = generatePairCards(cardsArray.slice(0, pairCards));

const handleSliderChange = (value) => {
    sliderValueDisplay.innerHTML = value;
    pairCards = value;
    gameCardsArray = generatePairCards(cardsArray.slice(0, pairCards));
    generateCards();
}

// Fisher-Yates shuffle algorithm
function shuffleCards(cardsArray){
    for(let i = cardsArray.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i+1);
        [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
    return cardsArray;
}

function generatePairCards(cardsArray){
    const pairCardsArray = cardsArray.concat(cardsArray);
    return shuffleCards(shuffleCards(pairCardsArray));
}

function restartGame(){
    const restartButton = document.createElement('button');
    restartButton.id = 'btn';
    restartButton.innerHTML = 'Restart Game'
    restartButton.addEventListener('click', () => { window.location.reload() });
    gridDisplay.append(restartButton);
}

function checkMatch(){
    if(chosenCards[0].name === chosenCards[1].name){
        chosenCards.forEach(card => {
            card.removeEventListener('click', flipCard);
            card.src = './assets/whitebg.png'
            card.id = 'no-btn'
        });
        scoreDisplay.innerHTML = ++score;
        if(pairCards === scoreDisplay.textContent){
            gridDisplay.innerHTML = ''
            restartGame();
        }
        alert('Its a Match');
    } else {
        chosenCards.forEach( card => {
            card.src = './assets/questionMark.jpeg';
            card.addEventListener('click', flipCard);
        })
        alert('No match');
    }
    chosenCards = [];
}

function flipCard(){
    const clickedCardId = this.getAttribute('card-id');
    this.src = gameCardsArray[clickedCardId].img;
    this.name = gameCardsArray[clickedCardId].name;
    chosenCards.push(this);
    this.removeEventListener('click', flipCard);
    if(chosenCards.length === 2){
        setTimeout(checkMatch, 500);
    }
}

function generateCards(){
    gridDisplay.innerHTML = '';
    for(let i = 0; i < pairCards * 2; i++){
        let card = document.createElement('img');
        card.setAttribute('src', './assets/questionMark.jpeg');
        card.setAttribute('card-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.append(card);
    }
}

function main(){
    generateCards();
    slider.addEventListener('input', (e) => handleSliderChange(e.target.value));
}

main()