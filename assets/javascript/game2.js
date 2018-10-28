$(document).ready(function() {

           
    //Declaro las variables
    var guessingWord = [];
    var wins = 0;
    var losses = 0;
    var lives = 10;
    var soFar = [];
    var resetGame = false;
    var musicBands = ["MADONNA", "Backstreet Boys", "Metallica", "Nirvana", "Britney Spears"]
    var hints = ["Hey Mr. Dj", "When you look into my eyes", "Exit light Enter Night", "I feel stupid and contagious", "Oh Baby Baby"]
    var computerChoices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    //Mando a llamar las variables al HTML ligadas a su ID
    var winsText = document.getElementById("wins-text");
    var lossesText = document.getElementById("losses-text");
    var livesText = document.getElementById("lives-text");
    var soFarText = document.getElementById("soFar-text");
    var hintText = document.getElementById("hint-text");
    var currentWordText = document.getElementById("currentWord-text");
    var computerGuessIndex = Math.floor(Math.random() * musicBands.length);
    console.log(computerGuessIndex);

    var guessingWordText = "";
    resultado();
   
    //Display de los resultados en el HTML
    winsText.textContent = wins;
    lossesText.textContent = losses;
    livesText.textContent = lives;
    hintText.textContent = hints[computerGuessIndex];

    //Reset
    function reset() {
        lives = 10;
        soFar = [];
        winsText.textContent = wins;
        livesText.textContent = lives;
        soFarText.textContent = soFar;
        computerGuessIndex = Math.floor(Math.random() * musicBands.length);
        hintText.textContent = hints[computerGuessIndex];
        console.log(computerGuessIndex);
        guessingWordText = "";
        guessingWord = [];
        resultado();        
    };

    //Despliego _ de la palabra que se va a adivinar
    function resultado() {
        for (var i = 0; i < musicBands[computerGuessIndex].length; i++) {
            guessingWord.push(" _");
            guessingWordText += guessingWord[i];   
        }
        currentWordText.textContent = guessingWordText;
    };

    // Cada vez que tecleo evalua si la letra está dentro o no de mi palabra seleccionada
    function evaluateGuess(letter) {
        var positions = [];
        for (var i = 0; i < musicBands[computerGuessIndex].length; i++) {
            if(musicBands[computerGuessIndex][i].toUpperCase() === letter) {
                positions.push(i);
            }
        }
    

        if (positions.length <= 0) {
            lives--;
            livesText.textContent = lives;
        } else {
            for(var i = 0; i < positions.length; i++) {
                guessingWord[positions[i]] = letter;
                
            }   
            guessingWordText = "";
            for (var i = 0; i < guessingWord.length; i++) {                
                guessingWordText += guessingWord[i];   
            }
            currentWordText.textContent = guessingWordText;
        }
    };

    //
    function makeGuess(letter){
        if (lives > 0) {
            if (soFar.indexOf(letter) === -1) {
                soFar.push(letter);
                evaluateGuess(letter);
            }
        }
        soFarText.textContent = soFar;
    };

    //Checa si ganaste y ya no hay ningun _ por adivinar
    function checkWin() {
        if(guessingWord.indexOf (" _") === -1) {
            wins++;
            resetGame = true;
            winsText.textContent = wins;
            reset();
        }
    };

    //Checar si ya se te acabaron las vidas y te suma un loss mas
    function checkLoss() {
        if (lives <=0 ) {
            losses++;
            resetGame = true;
            lossesText.textContent = losses;
            reset ();
        }
    }
    

    document.onkeyup = function(event) {        
        var keyPressed = event.key;
        makeGuess(keyPressed.toUpperCase());
        checkWin();
        checkLoss();
    }  

});


