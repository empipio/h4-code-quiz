
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
        answers: ["<script>","<insert>","<add-java>","none of these"],
        correctAnswerIndex: 0
    },
    {
        id: 2,
        category: "How would we print 'Hello World' to the console?",
        answers: ["add.text('Hello World')","console.log('Hello World')","cons.print('Hello World')","print.text('Hello World')"],
        correctAnswerIndex: 1
    },
    {
        id: 3,
        category: "To store multiple values in a single variable we would use...",
        answers: ["a string","a list","a variable folder","an array"],
        correctAnswerIndex: 3
    },
    {
        id: 4,
        category: "Which of the following could be used to remove the last item from an array?",
        answers: ["remove.last()","pop()","remove.end()","push()"],
        correctAnswerIndex: 1
    },
    {
        id: 5,
        category: "How can we create an HTML element using Javascript?",
        answers: ["createElement.html()","html.add()","document.createElement()","document.addElement()"],
        correctAnswerIndex: 2
    },
]

var timeEl = document.getElementById("timer-container");

var timer = 60;

var currentQuestion = 0;

var score = 0;

//empty sections created and appended for each part of the quiz
var startContainerEl = document.createElement("section");
document.body.appendChild(startContainerEl);

var questionContainerEl = document.createElement("section");
document.body.appendChild(questionContainerEl);

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


function startTimer() {

    var timeInterval = setInterval(function() {
        timer--;
        timeEl.textContent = timer + " seconds remaining";
    
    if (timer === 0) {
      clearInterval(timeInterval);
      gameOver();
    }
    
    }, 1000)
  
  }

  function produceQuestion() {
    
    // var questionContainerEl = document.createElement("section");
    // document.body.appendChild(questionContainerEl);
    
    var questionHeader = document.createElement("header");
    questionHeader.textContent = "Question " + questions[currentQuestion].id;
    questionContainerEl.appendChild(questionHeader);
    
    var categoryEl = document.createElement("p");
    categoryEl.textContent = questions[currentQuestion].category;
    questionHeader.appendChild(categoryEl);
    
    var divEl = document.createElement("div");
    categoryEl.appendChild(divEl);
    
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
    categoryEl.appendChild(rightOrWrongEl);
    
    //checkAnswer();
    }
    

function startGame(event) {
    event.preventDefault();
    document.body.removeChild(startContainerEl);
    startTimer();
    produceQuestion();
    // nextQuestion(); 
  }
  
  GameStartButtonEl.addEventListener("click", startGame);