
// WHEN I click the start button
// THEN a timer starts and I am presented with a question

// WHEN I answer a question
// THEN I am presented with another question

// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over

// WHEN the game is over
// THEN I can save my initials and my score



//button to click
//event listener to trigger game once clicked
//timer starts (set time interval)
//question pops up (ordered list, boxes to click)
//user answers question (event listener on parent and if/else to determine behaviour according to whether right or wrong)
    //if right, user told and points added to score
    //if wrong, user told and time subtracted from clock
//answering of question triggers presentation of another question
//all qs answered/out of time = end of game
//save initials and score to local storage (input field for name, transfer score)

var questions = [
    {
        id: 0,
        category: "How is Javascript linked to an HTML file?",
        answers: ["<script>","<insert>","<add-java>","none of these"],
        correctAnswerIndex: 0
    },
    {
        id: 1,
        category: "How would we print 'Hello World' to the console?",
        answers: ["add.text('Hello World')","console.log('Hello World')","cons.print('Hello World')","print.text('Hello World')"],
        correctAnswerIndex: 1
    },
    {
        id: 2,
        category: "To store multiple values in a single variable we would use...",
        answers: ["a string","a list","a variable folder","an array"],
        correctAnswerIndex: 3
    },
    {
        id: 3,
        category: "Which of the following could be used to remove the last item from an array?",
        answers: ["remove.last()","pop()","remove.end()","push()"],
        correctAnswerIndex: 1
    },
    {
        id: 4,
        category: "How can we create an HTML element using Javascript?",
        answers: ["createElement.html()","html.add()","document.createElement()","document.addElement()"],
        correctAnswerIndex: 2
    },
]

var timeEl = document.getElementById("timer-container");

var timer = 60;

var currentQuestionIndex = 0;

var score = 0;

// var i = 0;
// var j = 0;

//empty sections created and appended for each part of the quiz
var startContainerEl = document.createElement("section");
document.body.appendChild(startContainerEl);

var questionContainerEl = document.getElementById("question-container");

// var questionContainerEl = document.createElement("section");
// document.body.appendChild(questionContainerEl);

var resultsContainerEL = document.createElement("section");
document.body.appendChild(resultsContainerEL);

var hSCcontainerEl = document.createElement("section");
document.body.appendChild(hSCcontainerEl);

//elements created for start page
var WelcomeHeaderEl = document.createElement("h1");
WelcomeHeaderEl.textContent = "Welcome to the Coding Quiz!";
startContainerEl.appendChild(WelcomeHeaderEl);

var GameInstructionsEl = document.createElement("p");
GameInstructionsEl.textContent = "Select the correct answer from the available options before the timer runs out. Time will be deducted for incorrect answers!";
startContainerEl.appendChild(GameInstructionsEl);

var GameStartButtonEl = document.createElement("button");
GameStartButtonEl.textContent = "Take the Quiz";
startContainerEl.appendChild(GameStartButtonEl);

function removeQuestion() {
    document.body.removeChild(questionContainerEl);
}

function startTimer() {

    var timeInterval = setInterval(function() {
        timer--;
        timeEl.textContent = timer + " seconds remaining";
    
    if (timer <= 0) {
      clearInterval(timeInterval);
      gameOver();
    }
    
    }, 1000)
  
  }

  var questionHeader = document.createElement("header");
  var currentQuestion = questions[currentQuestionIndex];

function produceQuestion() {
      
    
for (var i = 0; i < questions.length; i--){
    console.log(questions[i].id)
    questionHeader.textContent = "Question " + questions[i].id;
    questionContainerEl.appendChild(questionHeader);
    var categoryEl = document.createElement("p");
     categoryEl.textContent = questions[i].category;
     categoryEl.setAttribute("value",questions[i].correctAnswerIndex);
     questionHeader.appendChild(categoryEl);

     console.log(questions[i]);

     for (var j = 0; j <questions.length; j++) {
        var answerButton = document.createElement("button");
        answerButton.textContent = questions[i].answers[j];
        answerButton.setAttribute("value", questions[i].id);
        answerButton.setAttribute("class", "answers");
        categoryEl.appendChild(answerButton);
     }
}

    // var categoryEl = document.createElement("p");
    // categoryEl.textContent = questions[i].category;
    // categoryEl.setAttribute("data-index",questions[i].correctAnswerIndex);
    // questionHeader.appendChild(categoryEl);
    
    // var divEl = document.createElement("div");
    // categoryEl.appendChild(divEl);
    
    // var answerButton = document.createElement("button");
    // answerButton.textContent = questions[i].answers[j];
    // answerButton.setAttribute("data-index", j);
    // categoryEl.appendChild(answerButton);
    
    // var answerButton2 = document.createElement("button");
    // answerButton2.textContent = questions[currentQuestion].answers[j];
    // answerButton2.setAttribute("data-index", 1);
    // categoryEl.appendChild(answerButton2);
    
    // var answerButton3 = document.createElement("button");
    // answerButton3.textContent = questions[currentQuestion].answers[j];
    // answerButton3.setAttribute("data-index", 2);
    // categoryEl.appendChild(answerButton3);

    // var answerButton4 = document.createElement("button");
    // answerButton4.textContent = questions[currentQuestion].answers[3];
    // answerButton4.setAttribute("data-index", 3);
    // categoryEl.appendChild(answerButton4);
    
    var divTwoEL = document.createElement("div");
    categoryEl.appendChild(divTwoEL);
    
    var rightOrWrongEl = document.createElement("p");
    rightOrWrongEl.textContent = "";
    categoryEl.appendChild(rightOrWrongEl);
    
    questionHeader.addEventListener("click", function(event) {
        var elementClicked = event.target.value;
        console.log(elementClicked)
        if (elementClicked.matches("button")) {
           
            var rightAnswerIndex = categoryEl.getAttribute("value");
            var selectedAnswerIndex = elementClicked.getAttribute("value");

            if (rightAnswerIndex === selectedAnswerIndex) {
                rightOrWrongEl.textContent = "correct!";
                score = score + 1;
                currentQuestion++;
            } else {
                rightOrWrongEl.textContent = "incorrect! Lose 10 seconds"
                timer = timer - 10;
                currentQuestion++;
            }
        }
    });
}

function startGame(event) {
    event.preventDefault();
    document.body.removeChild(startContainerEl);
    startTimer();
    produceQuestion();
    //document.body.removeChild(questionContainerEl);
    //nextQuestion(); 
}
  
  GameStartButtonEl.addEventListener("click", startGame);

// function nextQuestion () {
//     for (var i = 0; i < questions.length; i++) {
//       document.body.removeChild(questionContainerEl);
//       currentQuestion = currentQuestion + 1;
//       produceQuestion();
//     }
// //       //gameOver();
// }

// function gameOver() {
//     document.body.removeChild(timeEl);
//     document.body.removeChild(questionContainerEl);

//     var resultsContainerEL = document.createElement("section");
//     document.body.appendChild(resultsContainerEL);

//     var resultsHeaderEl = document.createElement("h1");
//     resultsHeaderEl.textContent = "Game Over!"
//     resultsContainerEL.appendChild(resultsHeaderEl);

//     var UserScoreEl = document.createElement("p");
//     UserScoreEl.textContent = "Your Score is " + score;
//     resultsContainerEL.appendChild(UserScoreEl);

//     var userInputEl = document.createElement("input");
//     userInputEl.textContent = "Type your initials here";
//     resultsContainerEL.appendChild(userInputEl);

//     var submitEl = document.createElement("button");
//     submitEl.textContent = "Save score";
//     resultsContainerEL.appendChild(submitEl);

//     submitEl.addEventListener("click", saveHighScore)
       
// }    

// function showHighScores() {
//     document.body.removeChild(resultsContainerEL);
//     document.body.removeChild(questionContainerEl);
    
  
//     var hSCcontainerEl = document.createElement("section");
//     document.body.appendChild(hSCcontainerEl);
  
//     var hSHeaderEl = document.createElement("h1");
//     hSHeaderEl.textContent = "High Scores";
//     hSCcontainerEl.appendChild(hSHeaderEl);
  
//     var scoreListEl = document.createElement("ul")
//     scoreListEl.textContent = "Scores";
//     hSCcontainerEl.appendChild(scoreListEl);
  
//     var clearHSButtonEl = document.createElement("button");
//     clearHSButtonEl.textContent = "Clear Highscores";
//     hSCcontainerEl.appendChild(clearHSButtonEl);
  
//     var restartButtonEl = document.createElement("button");
//     restartButtonEl.textContent = "Play again";
  
//     clearHSButtonEl.addEventListener("click", localStorage.clear);
//     restartButtonEl.addEventListener("click", location.reload);
  
//     getHighScores()
//   }

// function getHighScores() {
//     var retrieveScore = localStorage.JSON.parse(getItem("highscore", highScore));
//     for (var i = 0; i < retrieveScore.length; i++) {
//       var scoreListItem = document.createElement("li");
//     scoreListItem.textContent = retrieveScore.name + retrieveScore.score;
//     scoreListEl.appendChild(scoreListItem);
//     }
    
//     //add to table?
// //   // Get the values in local storage
// //   // Return to the function needing it
// }

// function saveHighScore() {
//   var highScore = {
//     name: userInputEl.value,
//     score: score.value
//   }
//   localStorage.setItem("highscore", JSON.stringify(highScore));
//   showHighScores();
// //   // Save the values in local storage.
// }