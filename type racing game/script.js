const RANDOM_QUOTE_API = 'https://api.quotable.io/random';
const randomQuote = document.getElementById('random-quote');
const input = document.getElementById('quote-input');
const timer = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const nextQuote = document.getElementById('next-quote');
const nextButton = document.getElementById('text');
const mainContainer = document.getElementById('main-container');
const lastWpm = document.getElementById('last-wpm');



input.addEventListener('input', () => {
    const inputValue = input.value.split('');
    const randomQuoteCharacters = [...randomQuote.children];
    const removeClass = randomQuoteCharacters.slice(inputValue.length, randomQuoteCharacters.length);
    removeClass.forEach(span => {
        span.classList.remove('correct');
        span.classList.remove('incorrect');
    })
    inputValue.forEach((character, index) => {
        const allCorrects = [...document.querySelectorAll('.correct')];
        // const fullString = inputValue.join('');
        //     const words = fullString.split(' ');
        //     const wpm = getWpm(words, timer.innerText);
        //     wpmDisplay.innerText = `${wpm} wpm`;
        if(allCorrects.length + 1 === randomQuoteCharacters.length){
            const words = input.value.split(' ');
            const wpm = getWpm(words, timer.innerText);
            lastWpm.innerText = `${wpm} wpm`;
            lastWpm.classList.remove('hide');
            nextButton.classList.remove('hide');
            timer.classList.add('hide');
            wpmDisplay.classList.add('hide');
            mainContainer.classList.add('hide'); 
            
        }
        if(character === randomQuoteCharacters[index].innerText){
            randomQuoteCharacters[index].classList.add('correct');
            randomQuoteCharacters[index].classList.remove('incorrect');
            
        } else {
            
            randomQuoteCharacters[index].classList.add('incorrect');
            randomQuoteCharacters[index].classList.remove('correct');
        }
    })
})

setInterval(displayWpm, 1000)
function displayWpm(){
    const words = input.value.split(' ');
    const wpm = getWpm(words, timer.innerText);
    if(wpm > 6000){
        return;
    }
    wpmDisplay.innerText = `${wpm} wpm`;
}
function getWpm(words, time){
    return Math.floor((words.length * 60)/time);
}


function startGame(){
    
    nextButton.classList.add('hide');
    timer.classList.remove('hide');
    wpmDisplay.classList.remove('hide');
    mainContainer.classList.remove('hide');
    lastWpm.classList.add('hide');
    input.value = '';
    randomQuote.innerText = '';
    setQuoteDisplay();
    startTimer();
    input.focus();
}
    
function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API).then(res => res.json())
    .then((data) => {
       return data.content; 
    });
}

async function setQuoteDisplay(){
    const quote = await getRandomQuote();
    for(let i = 0; i < quote.length; i++){
        const char = quote[i];
        const newSpan = document.createElement('span');
        newSpan.innerText = char;
        randomQuote.appendChild(newSpan);
    }
    
}


let newDate;

function startTimer () {
    timer.innerText = 0;
    newDate = new Date();
    setInterval(() => {
        timer.innerText = countTimer();
    }, 1000)
}

function countTimer(){
    return Math.floor((new Date() - newDate) / 1000) ;
}

nextButton.addEventListener('click', startGame);
