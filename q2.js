//variables

let cardsChosen = []
let cardsChosenId = []
let cardsWon = []
let lockBoard = false;

let hasFlippedCard =  false;
let firstCard;
let secondCard;
var secondsToSee;
var timeToSolve;


// event listeners and dom objects 

//levels
const easy = document.getElementById("easy");
easy.addEventListener("click", easyMode);
const medium = document.getElementById("medium");
medium.addEventListener("click", mediumMode);
const hard = document.getElementById("hard");
hard.addEventListener("click", hardMode );

var lvl = document.getElementById("lvl");
lvl.addEventListener("click", lvlChange);

var grid = document.getElementById('grid');

// var reset1 = document.getElementById("reset");
// reset1.addEventListener("click", reset);

var game = document.getElementById("game");

var start = document.getElementById("btn-start");
start.addEventListener("click",startGame);


//functions for levels

function easyMode(){
    // console.log("I");
    timeToSolve = 120;
    secondsToSee = 3000;
    document.getElementById("difficulty").style.display = "none";
    show(start);
    // startGame(cardarrcopy);
}

function mediumMode(){
    timeToSolve = 150;
    secondsToSee = 5000;
    cardarr.push(
        {
          name: 'reddit',
          img: 'images/reddit.png'
        },
      
        {
          name: 'pinterest',
          img: 'images/pinterest.png'
        }
     );
  console.log(cardarr)
    document.getElementById("difficulty").style.display = "none";
    show(start);  
}

function hardMode(){
    secondsToSee = 8000;
    timeToSolve = 180;
    cardarr.push(
        {
          name: 'reddit',
          img: 'images/reddit.png'
        },
      
       {
          name: 'pinterest',
          img: 'images/pinterest.png'
       },
       {
          name: 'paypal',
          img: 'images/paypal.png'
       },
    
      {
        name: 'spotify',
        img: 'images/spotify.png'
     }

  );
    document.getElementById("difficulty").style.display = "none";
    show(start);  

}

function lvlChange()
{
    location.reload();
}

function finish(){
    console.log(cardsWon.length)
    console.log(cardarrcopy.length/2)
  if(cardsWon.length === cardarrcopy.length/2){
    console.log(cardsWon)
      stop1();
      document.getElementById("timer").innerHTML = "You Won!! ";
      return;
  }
}


function startGame(){
    hide(start)
    // endGame();
 //   console.log(cardarrcopy);
    cardarrcopy = cardarr.concat(cardarr);
    createBoard(cardarrcopy);
    show(game);

    //shuffling the array 
}

function endGame(){
    document.getElementById("grid").innerHTML="";

}
function hide(element) {
    element.style.display = "none";
  }
  function show(element) {
    element.style.display =  "block";
  }

var cardarr = [
  {
    name: 'snapchat',
    img: 'images/snapchat.png'
  },

{
    name: 'facebook',
    img: 'images/facebook.png'
},

{
    name: 'whatsapp',
    img: 'images/whatsapp.png'
},
{
    name: 'twitter',
    img: 'images/twitter.png'
},
{
    name: 'youtube',
    img: 'images/youtube.png'
},
{
    name: 'linkedin',
    img: 'images/linkedin.png'
},
{
    name: 'skype',
    img: 'images/skype.png'
},

{
    name: 'instagram',
    img: 'images/instagram.png'
}
];

// adding pair of element
var cardarrcopy = cardarr.concat(cardarr);

function createBoard(){
    cardarrcopy.sort(() => 0.5 - Math.random());
    for(let i=0; i<cardarrcopy.length; i++){
        
        var carddiv = document.createElement('div');
        var frontface = document.createElement('img');
        var backface = document.createElement('img');

        
        carddiv.setAttribute("class", "memory-card flip");
        frontface.setAttribute("class", "front-face");
        backface.setAttribute("class", "back-face");

        carddiv.setAttribute('data-id', i);
        backface.setAttribute('src', 'images/ray.png');
        frontface.setAttribute("src", cardarrcopy[i]["img"]);
 
        // card.setAttribute('data-id', i);         will see what this is for
        carddiv.addEventListener('click', flipCard);
        carddiv.appendChild(frontface);
        carddiv.appendChild(backface);
        grid.appendChild(carddiv);
        lockBoard = true;
    }
   setTimeout(flipAllBack, secondsToSee);

}

function checkForMatch(){
    const cards = document.querySelectorAll('.memory-card');
    const optionOne = cardsChosen[0];
    const optionTwo = cardsChosen[1];

    const optionOneID = cardsChosenId[0];
    const optionTwoID = cardsChosenId[1];



    // console.log( optionOne , optionTwo);
    if(optionOne===optionTwo){
        // its a match
        cards[optionOneID].removeEventListener('click', flipCard);
        cards[optionTwoID].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen)
        resetBoard();

    }
    else{
        //not a match
        lockBoard = true;
        setTimeout(() =>{
        cards[optionOneID].classList.remove('flip');
        cards[optionTwoID].classList.remove('flip');
        lockBoard = false;
        resetBoard();
    }, 900);
}

    cardsChosen = []
    cardsChosenId = []
}


function flipCard(){


    // console.log("I was clicked!");
    // console.log(this);
    if(lockBoard) return;
  

    if(this === firstCard) return;

    this.classList.toggle('flip');
    
    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this;

    }
    else{
        //second click
        hasFlippedCard = false;
        secondCard =this;
    }

    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardarrcopy[cardId].name);
    cardsChosenId.push(cardId);

    if(cardsChosen.length===2){
       checkForMatch();
    }
}


function resetBoard(){
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard,secondCard] = [null,null];
}


function flipAllBack(){
    var cards = document.querySelectorAll(".memory-card.flip");
    for (let i = 0; i < cards.length;  i++) {
        cards[i].setAttribute("class", "memory-card");
    }
    lockBoard = false;
}

// function reset(){
//     // console.log('i was clicked')
//     // location.reload();
//     // console.log(cardarrcopy);
//     cardsChosen = []
//     cardsChosenId = []
    
//     endGame();
//     resetBoard();
//     lockboard = false;

//     var time = time.push(timeToSolve);

//     gameTimer = setInterval(timeLeft,1000);

//     createBoard(cardarrcopy);
    
   
//     // console.log(cardarrcopy);
// }

var gameTimer = setInterval(timeLeft,1000);


function timeLeft() {

   // finish();
    if(timeToSolve <= 0){
        stop1();
        document.getElementById("timer").innerHTML = "Time is Up!";

    
        clearInterval(gameTimer);
        return;

    }
    else if(cardsWon.length === cardarrcopy.length/2){
        stop1();
        document.getElementById("timer").innerHTML = "You Won!! ";
        return;

    }
    
    else {
        document.getElementById("timer").innerHTML = "Timer: "+ timeToSolve + "";
    }
    timeToSolve -=1;
}

function stop1(){
    lockBoard = true;
    setTimeout( function(){
    var cards1 = document.querySelectorAll(".memory-card");
    for (let i = 0; i < cards1.length;  i++) {
        cards1[i].setAttribute("class", "memory-card flip");
        cards1[i].removeEventListener("click", flipCard);
        //console.log(cards1[i])
    }
  }
    , 0);


}

// createBoard();





