const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
var gameInterval = null

///DONT EDIT ABOVE THIS line


function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = (dodgerLeftEdge + 40);
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = (rockLeftEdge + 20);

    if (false/**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               */
             ((rockLeftEdge < dodgerLeftEdge) && (rockRightEdge > dodgerLeftEdge)) ||
             ((rockLeftEdge > dodgerLeftEdge) && (rockRightEdge < dodgerLeftEdge)) ||
             ((rockLeftEdge < dodgerRightEdge) && (rockRightEdge > dodgerRightEdge))
           ) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top

  function moveRock() {
     if (checkCollision()) {
       endGame();

     } else if (top < 360){
       top = `${top += 2}px`;
       window.requestAnimationFrame(moveRock);

   } else if (top > 358){
     $( "rock" ).remove();
    }
  }

  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)
  return rock
}


function endGame() {

   //End the game by clearing `gameInterval`,
   
   //removing all ROCKS from the DOM,
   
   //and removing the `moveDodger` event listener.
   
   //Finally, alert "YOU LOSE!" to the player.
   
   
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {
    moveDodgerLeft()
  } else if (e.which === RIGHT_ARROW) {
    moveDodgerRight()
  }
}

function moveDodgerLeft() {
  dodgerLeftEdge=positionToInteger(DODGER.style.left);
   let left = dodgerLeftEdge;
 window.requestAnimationFrame(function(){
   if(dodgerLeftEdge>0){
     DODGER.style.left= `${left-=4}px`;
   }
 });
}

function moveDodgerRight() {
dodgerLeftEdge=positionToInteger(DODGER.style.left);
dodgerRightEdge=dodgerLeftEdge+40;
   let left = dodgerLeftEdge;
   window.requestAnimationFrame(function(){
     if(dodgerRightEdge<400){
     DODGER.style.left=`${left+=4}px`;
     }
   });
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
