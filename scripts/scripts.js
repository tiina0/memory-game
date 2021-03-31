// Works
// small bug: sometimes after checking two cards 


let cards = document.getElementsByClassName("card");
let overlay = document.getElementsByClassName("overlay");
let startBtn = document.getElementById("start");
let message = document.querySelector("h2");
let cardContainer = document.querySelector(".container");
let playAgainBtn = document.getElementById("playAgain");
let tempStorage = [];
let tempStorage2 = [];
let tracker = 0;

function randomColorValue() {
    return Math.floor(Math.random() * (255 - 0) + 0);
}

function randomColorRGB() {
    let color = "rgb"
    let r = randomColorValue();
    let g = randomColorValue();
    let b = randomColorValue();
    return `${color}(${r},${b},${g})`;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function generateArrForRandomColors(num) {
    let arr = []
    for (let i = 1; i <= num; i++) {
        arr.push(randomColorRGB());
    }
    let arrToShuffle = arr.concat(arr);
    let shuffledArr = shuffle(arrToShuffle);
    return shuffledArr;
}

// function randomizeColorsOnCards(cards, size) {
function randomizeColorsOnCards() {
    let randomColorsArray = generateArrForRandomColors(6);
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = randomColorsArray[i];
    }
}

function reveal(element) {
    if (tempStorage.length <= 1 && tempStorage2.length <= 1) {
        element.style.zIndex = "-10";
        tempStorage2.push(element);
        tempStorage.push(element.parentElement.style.backgroundColor);
    }
}

function hideCards() {
    for (let i = 0; i < tempStorage2.length; i++) {
        tempStorage2[i].style.zIndex = "10";
    }
    tempStorage = [];
    tempStorage2 = [];
}

function checkIfMatch() {
    if (tempStorage[0] === tempStorage[1]) {
        message.textContent = "It's a match";
        tracker++;
        tempStorage = [];
        tempStorage2 = [];
    } else {
        message.textContent = "Not a match";
        setTimeout(function () {
            hideCards();
        }, 1000);
    }
}

function reset() {
    playAgainBtn.style.visibility = "hidden";
    startBtn.style.display = "initial";
    message.textContent = "";
    cardContainer.style.visibility = "hidden";
    tempStorage = [];
    tempStorage2 = [];
}

function resetTracker() {
    if (tracker === 6) {
        tracker = 0;
        message.textContent = "All pairs found, well done!";
        playAgainBtn.style.visibility = "visible";
    }
}

function doStuffWhenCardGetsClicked() {
    for (let i = 0; i < overlay.length; i++) {
        overlay[i].onclick = function () {
            reveal(this);
            if (tempStorage.length == 2) {
                checkIfMatch();
                resetTracker();
            }
        };
    }
}

startBtn.addEventListener("click", function () {
    this.style.display = "none";
    message.textContent = "Good Luck!";
    randomizeColorsOnCards();
    for (let i = 0; i < overlay.length; i++) {
        overlay[i].style.zIndex = "10";
    }
    cardContainer.style.visibility = "visible";
    doStuffWhenCardGetsClicked();
});

playAgainBtn.addEventListener("click", function () {
    reset();
});









