$( document ).ready(function() {
  $("#gameContainer").hide();
  $("#start-button").click(function(){
    $("#gameContainer").show();
  })
///////////////////////////////////////////////////////////////////////////////

//Question set

///////////////////////////////////////////////////////////////////////////////

var questions = [{
  question: "Name two national U.S. holidays?",
  answers: ["Labor Day and Thanksgiving", "Christmas and black friday", "New years day and Easter", "Halloween and memorial day"],
  correctAnswer: "Labor Day and Thanksgiving"
}, {
  question: "We elect a U.S. Representative for how many years?",
  answers: [2, 4, 6, 8],
  correctAnswer: 2
}, {
  question: "How old do citizens have to be to vote for President?",
	answers: [14, 16, 18, 20],
	correctAnswer: 18
}, {
  question: "What is the name of the Vice President of the United States now?",
	answers: ["Dick cheney", "Joe Biden", "Barack Obama", "Al Gore"],
	correctAnswer: "Joe Biden"
}, {
  question: "What does the Constitution do?",
	answers: ["defines the government", "protects basic rights of America", "sets up the government", "all of these answers"],
	correctAnswer: "all of these answers"
}, {
    question: "Who is the Chief Justice of the United States now?",
  answers: ["Joe Biden", "John G. Roberts, jr.", "Barack Obama", "Anthony Kennedy"],
  correctAnswer: "John G. Roberts, jr."
}, {
  question: "What is the capital of the United States?",
  answers: ["New York", "New Jersey", "Connecticut", "Washington D.C"],
  correctAnswer: "Washington D.C"
}, {
  question: "Who was President during World War I?",
  answers: ["Woodrow Wilson", "Hillary Clinton", "Bernie Sanders", "Theodore Roosevelt"],
  correctAnswer: "Woodrow Wilson"
}, {
  question: "There are four amendments to the Constitution about who can vote?",
  answers: ["citizens 18 and older", "citizens 20 and older", "Only citizens with a job", "citizens by birth only"],
  correctAnswer: "citizens 18 and older"
}, {
  question: "What is one promise you make when you become a United States citizen?",
  answers: ["not defend the Constitution and laws of US", "give up loyalty to other countries", "never travel outside the US", "disobey the laws of US"],
  correctAnswer: "give up loyalty to other countries"
}];

///////////////////////////////////////////////////////////////////////////////

//Click events

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start-button', function(e) {
  $('#start-button').hide();
  $('#clock').html('<h2><span id="clock">11:59:30</span></h2>');
  game.loadQuestion();
});

$(document).on('click', '#closeButton', function(e) {
  location.reload();
});

///////////////////////////////////////////////////////////////////////////////

//Game logic

///////////////////////////////////////////////////////////////////////////////

var panel = $('#quiz-area');
var countStartNumber = 30;
var userChoices = [];
var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter++;
    $('#clock').html("11:59:"+game.counter);
    if (game.counter === 60){
      $('#clock').html("<h2><span id=clock>12:00:00</span></h2>");
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button id="button" class="answer-button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  clicked: function(e) {
    console.log(e.target.innerText);
    userChoices.push(e.target.innerText);
    console.log(userChoices);
    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredCorrectly: function(){
    game.correct++;
    if (game.currentQuestion === questions.length - 1){
      this.results();
    } else {
      this.nextQuestion();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    if (game.currentQuestion === questions.length - 1){
      this.results();
    } else {
      this.nextQuestion();
    }
  },
  nextQuestion: function(){
    game.currentQuestion++;
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  timeUp: function (){
    $('#clock').hide();
    clearInterval(timer);
    panel.html('<h2>Out of Time!</h2>');
    panel.append('<br><button id="start-over">Play Again</button>');
  },
  results: function() {
    $('#clock').hide();
    clearInterval(timer);
    $(".modal-title").html("Game complete. Here are your results: ");
    panel.html('<h2>Game complete. Here are your results: <h2>');
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    var yourScore = ((game.correct/questions.length)*100);
    panel.append('<h3>Your Score: ' + yourScore + '%</h3><br>');
    for (i = 0; i < questions.length; i++) {
      panel.append('<h3>Question ' + [i+1] + ': ' + questions[i].question + '</h3>');
      if (questions[i].correctAnswer == userChoices[i]) {
        panel.append('<h3>You Answered: ' + userChoices[i] + ' - Correct!</h3');
      }
      else {
        panel.append('<h3>You Answered: ' + userChoices[i] + ' - Incorrect!</h3');
        panel.append('<h3>Correct Answer: ' + questions[i].correctAnswer + '</h3>');
      }
      panel.append('<br>');
    }
    // if (yourScore == 100) {
    //
    // }
    // else if (yourScore == 75) {
    //
    // }
    // else {
    //
    // }
    panel.append('<br><button id="start-over">Play Again</button>');
  },
  reset: function(){
    this.currentQuestion = 0;
    $('#clock').html('11:59:30');
    $('.modal-title').html('You have until 12:00 to complete the game.');
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
});
