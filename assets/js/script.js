//Setting Global Scope Variables
var questionDisplay = $('#question');
var choicesDisplay = $('#choices');
var resultsDisplay = $('#result');
var score = 0;
var quizTime = questions.length * 10;
var counter;


// Functions
function getRandomQuestion() {
  var randomIndex = Math.floor(Math.random() * questions.length);
  var randomQuestion = questions[randomIndex];
  questions.splice(randomIndex,1);
  return randomQuestion;
}

function showQuestion(q) {
  questionDisplay.html("<h3>" + q.title + "</h3>");
  choicesDisplay.html(q.choices);
  showChoices(q.choices);
}

function showChoices(arr) {
  choicesDisplay.html(" ");
  for (i = 0; i < arr.length; i++) {
    var choiceBtn = $('<button>');
    choiceBtn.addClass("d-flex btn btn-answers btn-outline-dark m-1");
    choiceBtn.attr("type", "button");
    choiceBtn.attr("answer-index", i);
    choiceBtn.text(arr[i]);
    choicesDisplay.append(choiceBtn);
  }
}

function changeQuestion() {
 
  currentQuestion = getRandomQuestion();
  if(currentQuestion)
  {
  showQuestion(currentQuestion);
  console.log("I should be showing the next question");
  }
  else 
  {
    showScorePage();
  }
}

function showScorePage() {
  clearInterval(counter);
  $('#quiz').hide("normal");
  $('#scoreTotal').append(score);
  $('#scores').show("normal");

}

function recordScore (initialsValue) {

  var highScores = {
    user: initialsValue,
    userScore: score
  };

  $('#scoreSubmission').hide();
  var currentHighScore = JSON.parse(localStorage.getItem("highScores"))
  // Check if Json.Parse() returned null or if the tester score is higher
  if (!currentHighScore   || score >= currentHighScore.userScore )
  {
    localStorage.setItem("highScores", JSON.stringify(highScores));
    $('#requestScore').html("Congratulations " + initialsValue + ", you have the new high score!");
  }
  else {
    $('#requestScore').html("The current high score belongs to <span class='currentHighScore'>" + currentHighScore.user + "</span> with a score of: <span class='currentHighScore'>" + currentHighScore.userScore + "</span> points." );
  }
  
  
}


// Initial start
var currentQuestion = getRandomQuestion();
//console.log(currentQuestion);
$('#incorrectAlert').hide();
$('#correctAlert').hide();
showQuestion(currentQuestion);



// Event Handlers
$('#choices').on("click", function(e) {
  /* Debugging
  console.log(e.target);
  console.log(currentQuestion);
  console.log(currentQuestion.title);
  console.log(currentQuestion.answer);
*/
  if(e.target.textContent === currentQuestion.answer)
  {
    $('#correctAlert').show("normal");
    //alert("you clicked the correct answer: " + currentQuestion.answer);
    score = score + 5;
    $('#correctAlert').hide("normal");
    setTimeout(changeQuestion(), 10000);
  
  }
  else if (e.target.classList.contains("btn-answers"))
  {
    $('#incorrectAlert').show("normal");
    $('#incorrectAlert').hide("normal");
    setTimeout(changeQuestion(), 10000);
  }
  else{
    return
  }

})

$('#sumbitScoreBtn').on("click", function(event){
event.preventDefault();
var userInitials = $('#inputInitials').val().toUpperCase();
console.log(userInitials);
recordScore(userInitials);
})


$('#begin').on("click", function(event) {
  event.preventDefault();
    // Replace the Welcome screen and show the quiz
    $('#welcome').hide("normal");
    $('#quiz').show("normal");

    // Start the time
     counter=setInterval(timer, 1000); 
    
    function timer()
    {
      quizTime--;
      if (quizTime <= 0)
      {
        //console.log("times up"); 
        clearInterval(counter);
        showScorePage();
        return;
      }
    
      $('#timer').html("Time left: " + quizTime);
    }
})