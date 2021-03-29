/* This version works, but game "starts" immediately after page load
Need to find a way to make use of the start button and then make a start again button
appear when game is finished
*/


// select and store cards in an array called cards
let cards = document.getElementsByClassName("card");
let overlay = document.getElementsByClassName("overlay");
let startBtn = document.getElementById("start");
let message = document.querySelector("h2");

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
let randomColorsArray = generateArrForRandomColors(6);
console.log(randomColorsArray);

function randomizeColorsOnCards() {
    for (let i = 0; i < cards.length; i++) {
        for (let i = 0; i < randomColorsArray.length; i++) {
            cards[i].style.backgroundColor = randomColorsArray[i];
        }
    }
}

randomizeColorsOnCards();

// temporary storage for backgrounds  
let tempStorage = [];
// temporary storage for elements ( for what ? )
let tempStorage2 = [];
let tracker = 0;

function reveal(el) {
    let element = el;
    tempStorage2.push(element);
    tempStorage.push(element.parentElement.style.backgroundColor);
    console.log(tempStorage)
    element.style.display = "none";
}

// function checkIfMatch() {
//     if (tempStorage[0] === tempStorage[1]) {
//         message.textContent = "It's a match";
//         tracker++;
//         tempStorage = [];
//         tempStorage2 = [];
//         console.log(tracker)
//     } else {
        // tempStorage2[0].style.display = "none";
//     }
// }

function hideCards() {
        tempStorage2[0].style.display = "initial";
        tempStorage2[1].style.display = "initial";
        tempStorage = [];
        tempStorage2 = [];
    }

for (let i = 0; i < overlay.length; i++) {
    overlay[i].addEventListener("click", function () {
        reveal(this);
        if (tempStorage.length === 2) {
            if (tempStorage[0] === tempStorage[1]) {
                message.textContent = "It's a match";
                tempStorage = [];
                tempStorage2 = [];
                tracker++;
                console.log(tracker)
            } else {
                message.textContent = "Not a match";
                // checkIfMatch();
                setTimeout(function(){
                    hideCards();
                }, 1000);
            }
        }
        if(tracker === 6) {
            message.textContent = "All pairs found, well done!";
        }
    })
}
