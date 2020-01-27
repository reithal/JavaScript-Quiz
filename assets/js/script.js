var questionDisplay = $('#question');
var choicesDisplay = $('#choices');
var resultsDisplay = $('#result');
var score = 0;
var quizTime = questions.length * 10;

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
  {console.log("no more questions.")}
}


var currentQuestion = getRandomQuestion();
console.log(currentQuestion);
showQuestion(currentQuestion);



$('#choices').on("click", function(e) {
  console.log(e.target);
  console.log(currentQuestion);
  console.log(currentQuestion.title);
  console.log(currentQuestion.answer);

  if(e.target.textContent === currentQuestion.answer)
  {
    alert("you clicked the correct answer: " + currentQuestion.answer);
    score++;
    changeQuestion();
  }
})



$('#begin').on("click", function() {
    // Replace the Welcome screen and show the quiz
    $('#welcome').hide("normal");
    $('#quiz').show("normal");

    // Start the time
   var counter=setInterval(timer, 1000); 
    
    function timer()
    {
      quizTime--;
      if (quizTime <= 0)
      {
        // TODO: Score screen
        console.log("times up"); 
        clearInterval(counter);
        $('#quiz').hide("normal");
        $('#welcome').show("normal");
        return;
      }
    
      $('#timer').html("Time left: " + quizTime);
    }
})