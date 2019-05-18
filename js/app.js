/*
 * Create a list that holds all of your cards
 */
var btnsArr = Array.prototype.slice.call(document.querySelectorAll('.card'));
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 var cardClicked=[];

for(i in btnsArr){
btnsArr[i].addEventListener("click",myfunction);
}
let timeCount=0;
function myfunction(){
  if (timeCount==0) {
    timeCount++;
    counttime();
  }
this.classList.add('open','show','disable');
cardClicked.push(this);
checkMatch();
// counttime();
};

 var deck = document.querySelector('.deck');
 shuffle(btnsArr).map(x =>{
 [].forEach.call(btnsArr,function (y) {
 deck.appendChild(y);
  });
 });
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 var count=0;
function checkMatch(){
  noofmoves();
  if(cardClicked.length==2){
    setTimeout(function () {
      if(cardClicked[0].id==cardClicked[1].id){
        for(i in cardClicked){
          cardClicked[i].classList.add("match");
          cardClicked[i].classList.remove("open","show");
        }
        count++;
        if(count==8){
          gameCompleted();
        }
      }
      else{
        for(i in cardClicked){
          cardClicked[i].classList.remove("open","show","disable");
        }
      }
      cardClicked=[];
    }, 200);
  }
}

// Moves increament
var move= document.querySelector('.moves');
function noofmoves() {
  moves=move.innerHTML;
  moves++;
  move.innerHTML=moves;
  starmoves();
}
//star variation
var star=Array.prototype.slice.call(document.querySelectorAll('.fa-star'));
var stars=3;
function starmoves() {
  if(moves==18){
    star[2].classList.add('fa-star-o');
    star[2].classList.remove('fa-star');
    stars=stars-1;
  }
  if(moves==30){
    star[1].classList.add('fa-star-o');
    star[1].classList.remove('fa-star');
    stars=stars-1;
  }
}
//time starts when we start playing Game
var initialtime=0;
var time=document.querySelector('.initialtime');
var min=0;
sec=0;
var i;
function counttime() {
  i=setInterval(function () {
    sec++;
  if(sec==60){
    min++;
    sec=0;
  }
  if(min==60){
    min=0;
  }
  time.innerHTML=min+"mins"+sec+"secs";
},1000);
}
//game starts again when clicked on refresh button
var restart=document.querySelector(".restart");
restart.addEventListener("click",reload);
function reload(){
  location.reload();
}
//congratulations after winning the game and display total score and timetaken
function gameCompleted() {
  clearInterval(i);
  swal({
  title: "Congrats!",
  text: "You won the game!",
  html: "Moves:<strong>"+move.innerHTML+'<strong><br> Total Time:<strong>'+time.innerHTML+'<strong><br> Earned Stars :'+stars+'<i class="fa fa-star"></i>',
  icon: "success",
  button: "Awesome!",
}).then(()=>{
  reload();
});

}
