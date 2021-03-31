// This version works but after finishing first round, the cards are added twice to the array on the second round.

// select and store cards in an array called cards
let cards = document.getElementsByClassName("card");
let overlay = document.getElementsByClassName("overlay");
let startBtn = document.getElementById("start");
let message = document.querySelector("h2");
let cardContainer = document.querySelector(".container");
let playAgainBtn = document.getElementById("playAgain");
// temporary storage for backgrounds tp be able to compare them 
let tempStorage = [];
// temporary storage for elements ( for what ? )
let tempStorage2 = [];
let tracker = 0;

// Random colors - rgb - 0-255 for each channel r, g b
// generate a random value between 0 and 255
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

// function where you can pass the number to appear twice in array
function generateArrForRandomColors(num) {
    let arr = []
    for (let i = 1; i <= num; i++) {
        arr.push(randomColorRGB());
    }
    let arrToShuffle = arr.concat(arr);
    let shuffledArr = shuffle(arrToShuffle);
    return shuffledArr;
}

// set of randomColors with 6 unique colors

// generate set of cards 
// function randomizeColorsOnCards(cards, size) {
function randomizeColorsOnCards() {
    let randomColorsArray = generateArrForRandomColors(6);
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = randomColorsArray[i];
    }
    console.log(randomColorsArray);
}

function reveal(element) {
    // below code will make it possible to add a card after the array contains one item, making it possible to add only two
    if (tempStorage.length <= 1 && tempStorage2.length <= 1) {
        element.style.zIndex = "-10";
        tempStorage2.push(element);
        console.log(tempStorage)
        tempStorage.push(element.parentElement.style.backgroundColor);
        console.log(tempStorage)
    }
}

function hideCards() {
    for (let i = 0; i < tempStorage2.length; i++) {
        tempStorage2[i].style.zIndex = "10";
    }
    tempStorage = [];
    tempStorage2 = [];
}

// Try using variables instead of arrays for storing the colors
function checkIfMatch() {
    if (tempStorage[0] === tempStorage[1]) {
        message.textContent = "It's a match";
        tracker = tracker + 1;
        console.log(tracker);
        tempStorage = [];
        tempStorage2 = [];
    } else {
        message.textContent = "Not a match";
        setTimeout(function () {
            hideCards();
        }, 1000);
    }
}


function resetTracker() {
    if (tracker === 6) {
        tracker = 0;
        message.textContent = "All pairs found, well done!";
        playAgainBtn.style.visibility = "visible";
    }
}

function reset() {
    playAgainBtn.style.visibility = "hidden";
    startBtn.style.display = "initial";
    message.textContent = "";
    cardContainer.style.visibility = "hidden";
}

function doStuffWhenCardGetsClicked() {
    for (let i = 0; i < overlay.length; i++) {
        overlay[i].addEventListener("click", function () {
            reveal(this);
            if (tempStorage.length == 2) {
                checkIfMatch();
                resetTracker();
            }
        });
    }
    console.log(tempStorage);
}

startBtn.addEventListener("click", function () {
    console.log(tracker);
    randomizeColorsOnCards();
    cardContainer.style.visibility = "visible";
    // console.log(randomColorsArray);
    this.style.display = "none";
    message.textContent = "Good Luck!";
    for (let i = 0; i < overlay.length; i++) {
        overlay[i].style.zIndex = "10";
    }
    doStuffWhenCardGetsClicked();
});

playAgainBtn.addEventListener("click", function () {
    reset();
    console.log(tempStorage, tempStorage2);
});









