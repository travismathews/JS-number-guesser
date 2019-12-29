/*
Game Functions:
## Rules
- Player must guess a number between a min and max
- Player gets a certain amount of guesses

## Loss Functions
- Notify Player of guesses remaining
- Notify player of correct answer if player loses
- Let Player choose to play again

## Win Functions
- Notify player guess was right
-  Let player choose to play again

*/

// Game Values

let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

// UI Elements

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and Max 

minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener

game.addEventListener('mousedown', function(e){
    
    if(e.target.className === 'play-again'){
        
        window.location.reload();
    }
});


// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    //validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} & ${max}`, 'red');

    }

    //Check if guess is winning number

    if(guess === winningNum){
        // Game Over - Won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else {
        // Reduce guesses left if wrong
        guessesLeft -= 1;

        if(guessesLeft === 0) {
            // Game Over - Lose
            gameOver(false, `Game Over, you lost.  The correct number was ${winningNum}`);
            
        } else {

            // Change border color to failure
            guessInput.style.borderColor = 'red';

            // Clear Input for next guess
            guessInput.value = '';

            // Game Continues - Answer Wrong
            setMessage(`${guess} is not correct, ${guessesLeft} guesses remaining`, 'red')
        }

    }

})


// Game Over

function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable the input
    guessInput.disabled = true;
    // Change border color to failure
    guessInput.style.borderColor = color;
    // Let play know they lost
    setMessage(msg, color);


    // Play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Set Message Function

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

// Get winning number

function getRandomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);

}