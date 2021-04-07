let cards = document.getElementsByClassName("card");
let overlay = document.getElementsByClassName("overlay");
let startBtn = document.getElementById("start");
let message = document.getElementById("message");
let playAgainBtn = document.getElementById("playAgain");
let divForCardNum = document.getElementById("divForCardNum");
let tracker = 0;
let numberInput = document.getElementById("number");
let cardContainer = document.getElementById("cardContainer");
let a;
let b;
let aOverlay;
let bOverlay;

function randomColorValue() {
    return Math.floor(Math.random() * (255 - 0) + 0);
}

function randomColorRGB() {
    let r = randomColorValue();
    let g = randomColorValue();
    let b = randomColorValue();
    return `rgb(${r},${b},${g})`;
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

function randomizeColorsOnCards(numOfPairs) {
    let randomColorsArray = generateArrForRandomColors(numOfPairs);
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = randomColorsArray[i];
    }
}

function checkIfMatch(numOfPairs) {
    if (a === b) {
        message.textContent = "It's a match";
        a = undefined;
        b = undefined;
        tracker++;
        checkAndResetTracker(numOfPairs);
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

function reveal(element, numOfPairs) {
    if (a === undefined) {
        aOverlay = element;
        element.style.display = "none";
        a = element.parentElement.style.backgroundColor;
    } else if (a !== undefined) {
        bOverlay = element;
        element.style.display = "none";
        b = element.parentElement.style.backgroundColor;
        checkIfMatch(numOfPairs);
    }
}

function hideCards() {
    a = undefined;
    b = undefined;
    aOverlay.style.display = "initial";
    bOverlay.style.display = "initial";
}

function doStuffWhenCardGetsClicked(numOfPairs) {
    for (let i = 0; i < overlay.length; i++) {
        overlay[i].onclick = function () {
            if (a === undefined || b === undefined) {
                reveal(this, numOfPairs);
            }
        }
    }
}

function addCards(numOfPairs) {
    for (let i = 0; i < numOfPairs * 2; i++) {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardContainer.appendChild(cardDiv);
        let overlayDiv = document.createElement("div");
        overlayDiv.classList.add("overlay");
        cardDiv.appendChild(overlayDiv);
    }
}

function changePageContentWhenGameStarts(startBtn) {
    startBtn.style.display = "none";
    message.textContent = "Good Luck!";
    divForCardNum.style.display = "none";
    cardContainer.style.visibility = "visible";
}

startBtn.onclick = function () {
    let numOfPairs = numberInput.value;
    if (numOfPairs < 2) {
        alert("Please choose number of pairs to be found");
    } else {
        addCards(numOfPairs);
        randomizeColorsOnCards(numOfPairs);
        changePageContentWhenGameStarts(startBtn);
        doStuffWhenCardGetsClicked(numOfPairs);
    }
}

playAgainBtn.onclick = function () {
    for (let i = cardContainer.children.length - 1; i >= 0; --i) {
        cardContainer.children[i].remove();
    }
    cardContainer.style.visibility = "hidden";
    divForCardNum.style.display = "initial";
    playAgainBtn.style.visibility = "hidden";
    message.textContent = "";
    startBtn.style.display = "initial";
    numberInput.selectedIndex = 0;
}







