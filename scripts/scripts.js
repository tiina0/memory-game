let cards = document.getElementsByClassName("card");
let overlay = document.getElementsByClassName("overlay");
let startBtn = document.getElementById("start");
let message = document.querySelector("h2");
let playAgainBtn = document.getElementById("playAgain");
let divForCardNum = document.getElementById("divForCardNum");
let tempStorage = [];
let tempStorage2 = [];
let tracker = 0;
let numberInput = document.getElementById("number");
let divForCards = document.getElementById("card-content");
let cardContainer = document.createElement("div");

function createContainer() {
    divForCards.appendChild(cardContainer)
    cardContainer.setAttribute('id', 'container');
}

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
function randomizeColorsOnCards(numOfPairs) {
    let randomColorsArray = generateArrForRandomColors(numOfPairs);
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = randomColorsArray[i];
    }
}

function reveal(element) {
    if (tempStorage.length <= 1 && tempStorage2.length <= 1) {
        element.style.display = "none";
        tempStorage2.push(element);
        tempStorage.push(element.parentElement.style.backgroundColor);
    }
}

function hideCards() {
    for (let i = 0; i < tempStorage2.length; i++) {
        tempStorage2[i].style.display = "initial"
    }
    tempStorage = [];
    tempStorage2 = [];
}

function checkIfMatch() {
    if (tempStorage[0] === tempStorage[1]) {
        message.textContent = "It's a match";
        tracker++;
        // console.log(tracker)
        tempStorage = [];
        tempStorage2 = [];
    } else {
        message.textContent = "Not a match";
        setTimeout(function () {
            hideCards();
        }, 1000);
    }
}

function checkAndResetTracker(numOfPairs) {
    if (tracker == numOfPairs) {
        tracker = 0;
        message.textContent = "All pairs found, well done!";
        playAgainBtn.style.visibility = "visible";
    }
}

function doStuffWhenCardGetsClicked(numOfPairs) {
    for (let i = 0; i < overlay.length; i++) {
        overlay[i].onclick = function () {
            reveal(this);
            if (tempStorage.length === 2) {
                checkIfMatch();
                checkAndResetTracker(numOfPairs);
            }
        }
    }
}

function appendContainer() {
    divForCards.appendChild(cardContainer)
    cardContainer.setAttribute('id', 'container');
}


function addCards(numOfPairs) {

    appendContainer();
    console.log(numOfPairs);
    for (let i = 0; i < numOfPairs * 2; i++) {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardContainer.appendChild(cardDiv);
        let overlayDiv = document.createElement("div");
        overlayDiv.classList.add("overlay");
        cardDiv.appendChild(overlayDiv);
    }
}



startBtn.addEventListener("click", function () {
    let numOfPairs = numberInput.value;
    if (numOfPairs < 2) {
        alert("please choose number of pairs to be found");
    } else {
        createContainer();
        addCards(numOfPairs);
        this.style.display = "none";
        message.textContent = "Good Luck!";
        divForCardNum.style.display = "none";
        randomizeColorsOnCards(numOfPairs);
        console.log(cards.length);
        for (let i = 0; i < overlay.length; i++) {
            overlay[i].style.display = "initial"
        }
        cardContainer.style.visibility = "visible";
        doStuffWhenCardGetsClicked(numOfPairs);
    }
});

playAgainBtn.addEventListener("click", function () {
    // cards.length = numOfPairs;
    console.log(cards.length)
    cardContainer.style.visibility = "hidden";
    divForCardNum.style.display = "initial";
    playAgainBtn.style.visibility = "hidden";
    message.textContent = "";
    startBtn.style.display = "initial";
    // console.log(cards.length);
    numberInput.selectedIndex = 0;
    tempStorage = [];
    tempStorage2 = [];
});

// function reset() {
//     reset();
//     cardContent.children[0].remove()
//     divForCardNum.style.display = "initial";
//     playAgainBtn.style.visibility = "hidden";
//     startBtn.style.display = "initial";
//     message.textContent = "";
//     cardContainer.style.visibility = "hidden";
//     tempStorage = [];
//     tempStorage2 = [];
// }







