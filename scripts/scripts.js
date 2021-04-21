let cards = document.getElementsByClassName("card");
let overlay = document.getElementsByClassName("overlay");
let startBtn = document.getElementById("start");
let message = document.getElementById("message");
let playAgainBtn = document.getElementById("playAgain");
let divForCardNum = document.getElementById("divForCardNum");
let tracker = 0;
let numberInput = document.getElementById("number");
let cardContainer = document.getElementById("cardContainer")
let quitBtn = document.querySelector(".pForQuitBtn");
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

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
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
        quitBtn.style.visibility = "hidden";
        playAgainBtn.style.visibility = "visible";
        playAgainBtn.classList.add("fadeInAndOut");
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

function numOfRows(numOfPairs) {
    if (numOfPairs == 3) {
        cardContainer.classList.add("threePairs");
    } else if (numOfPairs >= 4 && numOfPairs <= 8) {
        cardContainer.classList.add("fourSixOrEightPairs");
    } else if (numOfPairs == 10) {
        cardContainer.classList.add("tenPairs");
    } else if (numOfPairs == 12) {
        cardContainer.classList.add("twelvePairs");
    }
}

function startGame() {
    let numOfPairs = numberInput.value;
    numOfRows(numOfPairs);
    addCards(numOfPairs);
    randomizeColorsOnCards(numOfPairs);
    changePageContentWhenGameStarts(startBtn);
    doStuffWhenCardGetsClicked(numOfPairs);
    quitBtn.style.visibility = "visible";
}

function playAgain() {
    for (let i = cardContainer.children.length - 1; i >= 0; --i) {
        cardContainer.children[i].remove();
    }
    quitBtn.style.visibility = "hidden";
    cardContainer.style.visibility = "hidden";
    cardContainer.className = "";
    divForCardNum.style.display = "initial";
    playAgainBtn.style.visibility = "hidden"
    playAgainBtn.classList.remove("fadeInAndOut");
    message.textContent = "";
    startBtn.style.display = "initial";
    numberInput.selectedIndex = 0;
    tracker = 0;
}

playAgainBtn.addEventListener("click", playAgain);
quitBtn.addEventListener("click", playAgain);
startBtn.addEventListener("click", startGame);
