//Initializing game sequence and user sequence as an array

let gameSeq = [];
let userSeq = [];

//It is an array for our four btns
let btns = ["yellow", "red", "green", "blue"];

// Track if the game has started and the the current level
let started = false;
let level = 0;

// This is the heading where we have to do updation when levelup or game over
let h2 = document.querySelector("h2");


//First we have to start the game so changing the boolean and updating the level
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        levelUp(); //calling the level up function for increasing the function
    }
});


function btnFlash(btn) {
    btn.classList.add("flash"); //Added the class flash from css file
    setTimeout(function () {
        btn.classList.remove("flash"); //Removing the effect after 250ms
    }, 250);
}



function levelUp() {
    userSeq = []; //We have to reset the userSeq because user have to press all the btns from starting
    level++; // Increasing level
    h2.innerText = `Level ${level}`; //Update level display

    //******Now after starting the game we have to do random flashing of button*****

    let randIdx = Math.floor(Math.random() * 4); //First of all we will generate random idx using math.floor property
    let randColor = btns[randIdx]; //we will get clr using idx
    let randBtn = document.getElementById(randColor); //here we are selecting clr by there id
    gameSeq.push(randColor);
    btnFlash(randBtn); // Calling the function for flashing btn
}


//********With this function we are checking user and genrated ans ********
function checkAns() {

    // If the most recent color in userSeq does not match the gameSeq at the same position
    if (userSeq[userSeq.length - 1] !== gameSeq[userSeq.length - 1]) {
        h2.innerHTML = `Game Over! Your score was <b>${level-1}</b> <br> Press any key to start.`;
        h2.classList.add("game-over"); // Add game-over effect
        document.querySelector("body").style.backgroundColor = "red"; // Flash background red
        
        setTimeout(function(){  // Reset background
            document.querySelector("body").style.backgroundColor = ""; 
        }, 150);
        
        reset(); //calling reset function to restart the game from zero


    } else if (userSeq.length === gameSeq.length) { // If the user completes the sequence correctly
        h2.classList.remove("game-over"); // Remove shake effect for next levels
        setTimeout(levelUp, 1000);  // Move to the next level after a brief delay
    }
}

//It is the function to handle the user clicks
function btnPress() {
    let btn = this; // get the element that was clicked
    btnFlash(btn); // flash the clicked btn using the function flash

    let userColor = btn.getAttribute("id"); //Get the color of the clicked btn
    userSeq.push(userColor); //adding that clr in our userseq array

    checkAns();  //calling function to check answer
}


//Adding event listener to each button using class
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => btn.addEventListener("click", btnPress));


function reset(){ //reset function
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

}