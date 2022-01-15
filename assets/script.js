//questions for the quiz stored in an array
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

//function to control timer, cleared once 0 reached and gameOver() function then called. If incorrect answer when less than 10s remaining gameOver() will be called.
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

//question produced, answer checked, nextQuestion() then called
function produceQuestion() {
  //elements created for questions to be displayed
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

  //wanted to put answer buttons in a for loop but couldn't get it to work and ran out of time
  //data index added in order to be able to check whether user has selected correct answer
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

  //event listener to check whether answer correct once button clicked
  categoryEl.addEventListener("click", function (event) {
    var elementClicked = event.target;

    if (elementClicked.matches("button")) {
      var rightAnswerIndex = categoryEl.getAttribute("data-index");
      var selectedAnswerIndex = elementClicked.getAttribute("data-index");

      if (rightAnswerIndex === selectedAnswerIndex) {
        score = score + 1;
        scoreEl.textContent = "Score: " + score + ", correct!";
        currentQuestion = currentQuestion + 1;
        nextQuestion();
      } else {
        timer = timer - 10;
        scoreEl.textContent =
          "Score: " + score + ", incorrect, lose 10 seconds!";
        currentQuestion = currentQuestion + 1;
        nextQuestion();
      }
    }
  });
}

//once question answered, questionContainerEl is removed. It can then be added back on and repopulated with next question when produceQuestion() called again
function nextQuestion() {
  if (currentQuestion < questions.length) {
    var questionContainerEl = document.getElementById("questionContainer");
    questionContainerEl.remove();
    produceQuestion();
  } else {
    gameOver();
  }
}

//high scores stored as an array in local storage. Function here declared to retrieve them
function getHighScores() {
  var highScoresString = localStorage.getItem("highscores");

  if (highScoresString === null) {
    return [];
  }

  var highScores = JSON.parse(highScoresString);

  return highScores;
}

function showHighScores() {
  //elements created/amended/appended for the high score page
  var hSCcontainerEl = document.createElement("section");
  document.body.appendChild(hSCcontainerEl);

  var hSHeaderEl = document.createElement("h1");
  hSHeaderEl.textContent = "High Scores";
  hSCcontainerEl.appendChild(hSHeaderEl);

  var scoreListEl = document.createElement("ul");
  scoreListEl.textContent = "Scores";
  scoreListEl.style.fontWeight = "bold";
  scoreListEl.style.listStyleType = "none";
  hSCcontainerEl.appendChild(scoreListEl);

  var clearHSButtonEl = document.createElement("button");
  clearHSButtonEl.textContent = "Clear Highscores";
  hSCcontainerEl.appendChild(clearHSButtonEl);

  var restartButtonEl = document.createElement("button");
  restartButtonEl.textContent = "Play again";
  hSCcontainerEl.appendChild(restartButtonEl);

  //function declared and event listener added to button in order to clear high scores
  //wanted to remove high scores from page at time of clicking button but struggled and ran out of time!
  function clearHighScore(event) {
    event.preventDefault();
    localStorage.clear();
  }

  clearHSButtonEl.addEventListener("click", clearHighScore);

  //function declared and event listener added to button to refresh page in order to start game again
  function restartGame(event) {
    event.preventDefault();
    location.reload();
  }

  restartButtonEl.addEventListener("click", restartGame);

  var highScores = getHighScores();

  //high scores retrieved from local storage and displayed in a list item
  for (var i = 0; i < highScores.length; i++) {
    var scoreListItem = document.createElement("li");
    scoreListItem.style.fontWeight = "normal";

    scoreListItem.textContent =
      "Name: " + highScores[i].name + " // Score: " + highScores[i].score;

    scoreListEl.appendChild(scoreListItem);
  }
}

function gameOver() {
  //elements removed in order to make way for score screen
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

  //user adds initials here in order to save score
  var userInputEl = document.createElement("input");
  userInputEl.placeholder = "Type your initials here";
  resultsContainerEL.appendChild(userInputEl);

  var submitEl = document.createElement("button");
  submitEl.textContent = "Save score";
  resultsContainerEL.appendChild(submitEl);

  //when clicked, the user's initials and score are pushed to the high score array and stored in local storage
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

//event listener in order to start game
GameStartButtonEl.addEventListener("click", startGame);
