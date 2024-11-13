$(document).ready(function() {
    var $keyboard = $(".keyboard");
    for (var i = 97; i <= 122; i++) {
        (function(char) {
            var $button = $("<button></button>").text(char);
            $keyboard.append($button);
            $button[0].addEventListener('click', function(e) {
                initGame(e.target, char);
            });
        })(String.fromCharCode(i)); 
    }
});
var currentWord;
var wordDisplay = document.querySelector(".word-display");
var incorrectGuesses = 0;
var guessedLetters = [];
var maxIncorrectGuesses = 6;
//main function
function getRandomWord() {
    var random = Math.floor(Math.random() * wordList.length);
    var word = wordList[random].word;
    var hint = wordList[random].hint;
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;

    wordDisplay.innerHTML = word.split("").map(function(letter) {
        return '<li class="letter"></li>';
    }).join("");
}
//start gamee
function initGame(button, clickedLetter) {
    if (guessedLetters.includes(clickedLetter)) {
        console.log("You already guessed this letter.");
    }

    guessedLetters.push(clickedLetter);
    button.disabled = true; 

    if (currentWord.includes(clickedLetter)) {
        console.log(clickedLetter, "exists in the word");
        revealLetter(clickedLetter);
        if (isWordComplete()) {
            gameOver(true);  
        }
    } else {
        console.log(clickedLetter, "does not exist in the word");
        incorrectGuesses++;
        updateHangman();  
        if (incorrectGuesses >= maxIncorrectGuesses) {
            gameOver(false);  
        }
    }
}
//test letter
function revealLetter(letter) {
    var letters = document.querySelectorAll(".word-display .letter");
    currentWord.split("").forEach(function(l, index) {
        if (l === letter) {
            letters[index].innerText = letter;
            letters[index].classList.add("guessed");//add gusseed to class of theee revealed letterrrr
        }
    });
}
//iswordcomplete
function isWordComplete() {
    var revealedLetters = document.querySelectorAll(".word-display .letter.guessed");
    return revealedLetters.length === currentWord.length;
}

//updateee
function updateHangman() {
    document.querySelector(`.hangman-box img`).src = "images/hangman-" + incorrectGuesses + ".svg";
    document.querySelector(".guesses-text b").innerText = incorrectGuesses + " / 6";
}
//fucntion game over
function gameOver(isWin) {
    var modal = document.querySelector(".game-modal");
    var gameOverText;
    var message;

    if (isWin) {
        gameOverText = "You Win!";
        message = "Congrats! You've guessed the word!";
    } else {
        gameOverText = "Game Over!";
        message = "The correct word was: <b>" + currentWord + "</b>";
    }

    document.querySelector(".game-modal h4").innerText = gameOverText;
    document.querySelector(".game-modal p").innerHTML = message;
    modal.style.display = "flex";
}
//function reset
document.querySelector(".game-modal .play-again").addEventListener('click', function() {
    document.querySelector(".game-modal").style.display = "none";
    resetGame();
    getRandomWord();
});
//reset game
function resetGame() {
    incorrectGuesses = 0;
    guessedLetters = [];
    wordDisplay.innerHTML = "";
    document.querySelector(".guesses-text b").innerText = "0 / 6";
    updateHangman();

    $(".keyboard button").prop('disabled', false);
}
getRandomWord();