/* function at window open */
window.onload = function() {
    $("#start").on("click", start);
    };

/* Declare Variables, includes array for storing customer responses and array of questions */
var time = 120;
var intervalId; 
var clockRunning = false;
var correctAnswers = 0;
var incorrectAnswers = 0;
var skippedQuestions = 0;
var userSelection = [];
var questionsList = [{
question: "How many stars are in the Milky Way?",
choices: ["Less than 25 Million", "25-50 Million", "50-100 Million", "Over 100 Million"],
answer: 3
},
{
question: "Roughly how old is the sun?",
choices: ["2.7 billion years", "4.6 billion years", "6.9 billion years", "8.2 billion years"],
answer: 1
},
{
question: "How long does it take sun rays to reach earth?",
choices: ["8 minutes", "30 minutes", "2 hours", "12 hours"],
answer: 0
},
{
question: "What is the largest planet in our Solar System?",
choices: ["Venus", "Neptune", "Saturn", "Jupiter"],
answer: 3
},
{
question: "Which planet has the most moons in our Solar System?",
choices: ["Venus", "Neptune", "Saturn", "Jupiter"],
answer: 3
},
{
question: "What is Jupiter's largest moon?",
choices: ["Ganymede", "Callisto", "Europa", "Io"],
answer: 2
},
{
question: "When was the first man-made object sent into space?",
choices: ["1947", "1954", "1957", "1965"],
answer: 2
},
{
question: "Which planet spins backwards relative to others?",
choices: ["Venus", "Mercury", "Uranus", "Mars"],
answer: 0
},
{
question: "Who was the first person to land on the moon?",
choices: ["Buzz Aldrin", "Neil Armstrong", "Gene Cernan", "Ed White"],
answer: 1
},
{
question: "Which planet has approximately the same landmass as Earth?",
choices: ["Venus", "Mercury", "Uranus", "Mars"],
answer: 3
},
{
question: "When was Pluto re-classified as a dwarf planet?",
choices: ["2001", "2006", "2009", "2011"],
answer: 1
},
{
question: "How much larger is the Sun than the Earth?",
choices: ["300,000 times", "500,000 times", "750,000 times", "1,000,000 times"],
answer: 0
},
{
question: "What is the closest galaxy to the Milky Way?",
choices: ["Messier 81", "Whirlpool", "Triangulum", "Andromeda"],
answer: 3
},
{
question: "How many galaxies are there (estimation)?",
choices: ["25 billion", "50 billion", "75 billion", "100 billion"],
answer: 3
},
{
question: "How close is the galaxy where Luke Skywalker lives?",
choices: ["Right next door", "In the neighborhood", "Somewhat far", "far, far away"],
answer: 3
}, 
];

/* Start function */
function start() {
        if (!clockRunning) {
            intervalId = setInterval(decrement, 1000);
            clockRunning = true;
            $("#display").text("02:00");
            $("#start").hide();
            $("#buttons").hide();
            writeQuestions();
            writeSubmitButton();
          }
      $("#submitQuiz").click(function () {
        showResults();
      }); 
  

/* listener that will record function to track users selections */
$("input").click(function () {
  userSelection[this.name] = this.value;
});
}

/* Write question function */
function writeQuestions() {
  for (var i = 0; i<questionsList.length; i++) {
    $("#formQuiz").append(questionsList[i].question + "</br>");
    for (var x = 0; x <questionsList[i].choices.length; x++) {
      $("#formQuiz").append("<label class='radio-inline'><input value='" + x + "' type='radio' name='" + i + "'>" + questionsList[i].choices[x] + "</label");
    }
    $("#formQuiz").append("<br/><br/>");
    }
  }

/* Write Submit button to html */
function writeSubmitButton() {
  $("#formSubmit").append("<button id='submitQuiz'>Submit</button>");
}

/* Decreases time */
function decrement() {
      time--;
      var converted = timeConverter(time);
      console.log(converted);
      $("#display").text(converted);
      if (time === 0) {
        alert("Times Up!");
        showResults();
      }
  }

  /* for loop capturing skipped questions */
for (var i = 0; i < questionsList.length; i++) {
  userSelection[i] = null;
}

/* Populate HTML with results */
function showResults () {
$("#formQuiz").hide();
$("#display").hide();
$("#submitQuiz").hide();

for (i = 0; i < questionsList.length; i++) {
  if (questionsList[i].answer == userSelection[i]) {
    correctAnswers++;
  }
  else if (userSelection[i] == null) {
    skippedQuestions++;
  }
  else {
    incorrectAnswers++;
  }
  var total = 15;
  var grade = (correctAnswers*100/total).toFixed(2);
  }
var results = $("#quizResults");
$(results).append("<h1>Quiz Results</h1>");
$(results).append("<h2>Correct Answers: " + correctAnswers + "</h2>")
$(results).append("<h2>Incorrect Answers: " + incorrectAnswers + "</h2>")
$(results).append("<h2>Skipped Questions: " + skippedQuestions + "</h2>")
$(results).append("<h2>Grade: " + grade + "%</h2>") 
}

/* Time converter function */
function timeConverter(t) {

  var minutes = Math.floor(time / 60);
  var seconds = t - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}