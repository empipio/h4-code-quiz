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
    id: 1,
    category: "How is Javascript linked to an HTML file?",
    answers: ["<script>", "<insert>", "<add-java>", "none of these"],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    category: "How would we print 'Hello World' to the console?",
    answers: [
      "add.text('Hello World')",
      "console.log('Hello World')",
      "cons.print('Hello World')",
      "print.text('Hello World')",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    category: "To store multiple values in a single variable we would use...",
    answers: ["a string", "a list", "a variable folder", "an array"],
    correctAnswerIndex: 3,
  },
  {
    id: 4,
    category:
      "Which of the following could be used to remove the last item from an array?",
    answers: ["remove.last()", "pop()", "remove.end()", "push()"],
    correctAnswerIndex: 1,
  },
  {
    id: 5,
    category: "How can we create an HTML element using Javascript?",
    answers: [
      "createElement.html()",
      "html.add()",
      "document.createElement()",
      "document.addElement()",
    ],
    correctAnswerIndex: 2,
  },
];

var timer = 60;

var currentQuestion = 0;

var score = 0;

var timeEl = document.getElementById("timer-container");
var scoreEl = document.getElementById("score-container");

//empty sections created and appended for each part of the quiz
var startContainerEl = document.createElement("section");
document.body.appendChild(startContainerEl);

var resultsContainerEL = document.createElement("section");
document.body.appendChild(resultsContainerEL);

var hSCcontainerEl = document.createElement("section");
document.body.appendChild(hSCcontainerEl);

//elements created for start page
var WelcomeHeaderEl = document.createElement("h1");
WelcomeHeaderEl.textContent = "Welcome to the Coding Quiz!";
startContainerEl.appendChild(WelcomeHeaderEl);

var GameInstructionsEl = document.createElement("p");
GameInstructionsEl.textContent =
  "Select the correct answer from the available options before the timer runs out. Time will be deducted for incorrect answers!";
startContainerEl.appendChild(GameInstructionsEl);

var GameStartButtonEl = document.createElement("button");
GameStartButtonEl.textContent = "Take the Quiz";
startContainerEl.appendChild(GameStartButtonEl);

function startTimer() {
  var timeInterval = setInterval(function () {
    timer--;
    timeEl.textContent = timer + " seconds remaining";

    if (timer <= 0) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

function produceQuestion() {
  var questionContainerEl = document.createElement("section");
  questionContainerEl.setAttribute("id", "questionContainer");
  document.body.appendChild(questionContainerEl);

  var questionHeader = document.createElement("header");
  questionHeader.textContent = "Question " + questions[currentQuestion].id;
  questionContainerEl.appendChild(questionHeader);

  var categoryEl = document.createElement("p");
  categoryEl.textContent = questions[currentQuestion].category;
  categoryEl.setAttribute(
    "data-index",
    questions[currentQuestion].correctAnswerIndex
  );
  questionHeader.appendChild(categoryEl);

  var divEl = document.createElement("div");
  categoryEl.appendChild(divEl);

  //   for (var j = 0; j < questions.length; j++) {
  //     var answerButton = document.createElement("button");
  //     answerButton.textContent = questions[i].answers[j];
  //     answerButton.setAttribute("value", questions[i].id);
  //     answerButton.setAttribute("class", "answers");
  //     categoryEl.appendChild(answerButton);
  //   }

  var answerButton1 = document.createElement("button");
  answerButton1.textContent = questions[currentQuestion].answers[0];
  answerButton1.setAttribute("data-index", 0);
  categoryEl.appendChild(answerButton1);

  var answerButton2 = document.createElement("button");
  answerButton2.textContent = questions[currentQuestion].answers[1];
  answerButton2.setAttribute("data-index", 1);
  categoryEl.appendChild(answerButton2);

  var answerButton3 = document.createElement("button");
  answerButton3.textContent = questions[currentQuestion].answers[2];
  answerButton3.setAttribute("data-index", 2);
  categoryEl.appendChild(answerButton3);

  var answerButton4 = document.createElement("button");
  answerButton4.textContent = questions[currentQuestion].answers[3];
  answerButton4.setAttribute("data-index", 3);
  categoryEl.appendChild(answerButton4);

  var divTwoEL = document.createElement("div");
  categoryEl.appendChild(divTwoEL);

  var rightOrWrongEl = document.createElement("p");
  rightOrWrongEl.textContent = "";
  rightOrWrongEl.style.color = "red";
  categoryEl.appendChild(rightOrWrongEl);

  categoryEl.addEventListener("click", function (event) {
    var elementClicked = event.target;

    console.log(elementClicked);

    if (elementClicked.matches("button")) {
      var rightAnswerIndex = categoryEl.getAttribute("data-index");
      var selectedAnswerIndex = elementClicked.getAttribute("data-index");

      if (rightAnswerIndex === selectedAnswerIndex) {
        rightOrWrongEl.textContent = "correct!";
        score = score + 1;
        scoreEl.textContent = "Score: " + score;
        currentQuestion = currentQuestion + 1;
        nextQuestion();
      } else {
        rightOrWrongEl.textContent = "incorrect! Lose 10 seconds";
        timer = timer - 10;
        scoreEl.textContent = "Score: " + score;
        currentQuestion = currentQuestion + 1;
        nextQuestion();
      }
    }
  });
}

// this will add next question on but won't remove previous
function nextQuestion() {
  if (currentQuestion < questions.length) {
    //document.body.removeChild(questionContainerEl);  //this works but can't get next question up!
    var questionContainerEl = document.getElementById("questionContainer");
    console.log(questionContainerEl);
    questionContainerEl.remove();
    produceQuestion();
  } else {
    gameOver();
  }
}

function getHighScores() {
  var highScoresString = localStorage.getItem("highscores"); //doesn't like this

  if (highScoresString === null) {
    return [];
  }

  var highScores = JSON.parse(highScoresString);

  return highScores;
}

function showHighScores() {
  var hSCcontainerEl = document.createElement("section");
  document.body.appendChild(hSCcontainerEl);

  var hSHeaderEl = document.createElement("h1");
  hSHeaderEl.textContent = "High Scores";
  hSCcontainerEl.appendChild(hSHeaderEl);

  var scoreListEl = document.createElement("ul");
  scoreListEl.textContent = "Scores";
  hSCcontainerEl.appendChild(scoreListEl);

  var clearHSButtonEl = document.createElement("button");
  clearHSButtonEl.textContent = "Clear Highscores";
  hSCcontainerEl.appendChild(clearHSButtonEl);

  var restartButtonEl = document.createElement("button");
  restartButtonEl.textContent = "Play again";
  hSCcontainerEl.appendChild(restartButtonEl);

  clearHSButtonEl.addEventListener("click", localStorage.clear);
  //restartButtonEl.addEventListener("click", location.reload()); //reloads immediately without clicking

  var highScores = getHighScores();

  for (var i = 0; i < highScores.length; i++) {
    var scoreListItem = document.createElement("li");

    scoreListItem.textContent =
      "Name: " + highScores[i].name + "Score: " + highScores[i].score;

    scoreListEl.appendChild(scoreListItem);
  }
}

function gameOver() {
  document.body.removeChild(timeEl);
  var questionContainerEl = document.getElementById("questionContainer");
  document.body.removeChild(questionContainerEl);
  document.body.removeChild(scoreEl);

  var resultsContainerEL = document.createElement("section");
  document.body.appendChild(resultsContainerEL);

  var resultsHeaderEl = document.createElement("h1");
  resultsHeaderEl.textContent = "Game Over!";
  resultsContainerEL.appendChild(resultsHeaderEl);

  var UserScoreEl = document.createElement("p");
  UserScoreEl.textContent = "Your Score is " + score;
  resultsContainerEL.appendChild(UserScoreEl);

  var userInputEl = document.createElement("input");
  userInputEl.placeholder = "Type your initials here";
  resultsContainerEL.appendChild(userInputEl);

  var submitEl = document.createElement("button");
  submitEl.textContent = "Save score";
  resultsContainerEL.appendChild(submitEl);

  submitEl.addEventListener("click", function (event) {
    var newHighScore = {
      name: userInputEl.value,
      score: score,
    };

    var highScores = getHighScores();
    highScores.push(newHighScore);

    localStorage.setItem("highscores", JSON.stringify(highScores));

    document.body.removeChild(resultsContainerEL);

    showHighScores();
  });
}

function startGame(event) {
  event.preventDefault();
  document.body.removeChild(startContainerEl);
  startTimer();
  produceQuestion();
}

GameStartButtonEl.addEventListener("click", startGame);
