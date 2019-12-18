var questions = [
  {
      question: "What type of car did Cole drive?",
      choices: ["Gremlin", "Pacer", "Challenger", "LTD"],
      answer: "Pacer"
  },

  {
      question: "Stan left the radio station because he was being pursued by the IRS. He sold the station to who?",
      choices: ["Cootie Von Sleech", " Fred Buchannan", " Ted Masters", " Red McMasters"],
      answer: "Red McMasters"
  },

  {
      question: "When Martin got fired, he picked up a plastic garbage can and threw it against the window screaming what?",
      choices: [" Awww Man!", " Stereo!", " Noooo!", " Radio!"],
      answer: "Radio!"
  },

  {
      question: "Martin and Gina are rich. They have won the lottery or so they think. Martin gives gifts to all his friends. What does he give Pam?",
      choices: [" A $2000.00 back shaving job.", " A $2000.00 pedicure.", " A $2000.00 plastic surgery job.", " A $2000.00 wax job."],
      answer: "A $2000.00 wax job."
  },
  {
      question: "Martin and Gina had a joint checking account. Martin used the money in the account to purchase a very large television. What did Gina use the money to purchase?",
      choices: ["Bread maker", "Toaster", "Waffle maker", "Portable grill"],
      answer: "Bread maker"
  },

  {
      question: "Pam had a boyfriend that had his own skybox in Pistons' stadium. What was his name?",
      choices: ["Lyman", "Simon", "Milton", "Darrel"],
      answer: "Simon"
  },

  {
      question: "What was Gina's boss name?",
      choices: ["Mr. Whitaker", "Mr. Williams", "Mr. Palmer", "Mr. Whitcomb"],
      answer: "Mr. Whitaker"
  },

  {
      question: "In an episode where Dragonfly Jones fought with Kenji at Nipsey's, Dragonfly picked up a beer bottle and smacked who over the head?",
      choices: ["Kenji", "Innocent bystander", "Nipsey", "Himself"],
      answer: "Himself"
  },

  {
      question: "Martin, Gina, Tommy, Cole and Pam had won a four wheel drive SUV. They decided to share the truck and each person would have use of it on a certain day. Who had use of it on Wednesday, which is considered hump day?",
      choices: ["Tommy", "Gina", "Cole", "Pam"],
      answer: "Pam"
  },

  {
      question: "What did Gina lose and had to work for Shenehneh to get replacements?",
      choices: ["Pistons tickets", "Lions tickets", "Movie tickets", "Wrestling tickets"],
      answer: "Pistons tickets"
  }
];

$(document).ready(function () {
  var welcomeBox = $("#welcome");
  var questionBox = $("#question");
  var endingScoreBox = $("#endingScoreBox");
  var highScoresBox = $("#highScores");
  var scores = JSON.parse(localStorage.getItem("scores") || "[]");

  var questionTxtEl = $("#questionTxt");
  var answerBtn1 = $("#choice1");
  var answerBtn2 = $("#choice2");
  var answerBtn3 = $("#choice3");
  var answerBtn4 = $("#choice4");
  var feedbackEl = $("#feedback");
  var getStartedBtn = $("#getStarted");
  var highScoresBtn = $("#highScoreBtn");
  var currentQuestion = 0;
  
  // timer
  var timer = 200;
  var timerCountdownEl = $("#timerCountdown");
  var timerReference = undefined;

  welcomeBox.show();
  questionBox.hide();
  endingScoreBox.hide();
  highScoresBox.hide();

  //question shuffler
  for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = questions[i];
      questions[i] = questions[j];
      questions[j] = temp;
  }

  //endingScoreBox 
  function showScore() {
      questionBox.hide();
      endingScoreBox.show();
      $("#endingScore").text("Ending Score: " + timer);
      window.clearInterval(timerReference);
  }

  function showHighScores() {
      welcomeBox.hide();
      questionBox.hide();
      endingScoreBox.hide();
      highScoresBox.show();
      $("#highScoresList").empty();
      $.each(scores, function (index, value) {
          var initials = value[0];
          var score = value[1];
          var eachScore = $("<li>");
          eachScore.text(initials + "      " + score);
          $("#highScoresList").append(eachScore);
      });
  }

  getStartedBtn.click(function () {

    welcomeBox.hide();
      questionBox.show();

      var question1 = questions[0];

      questionTxtEl.text(question1.question);

      var question1choices = question1.choices;

      answerBtn1.text(question1choices[0]);
      answerBtn2.text(question1choices[1]);
      answerBtn3.text(question1choices[2]);
      answerBtn4.text(question1choices[3]);

      //countdown
      timerReference = window.setInterval(function () {
          timer--;
          if (timer == 0) {

            showScore();
          } else {
              timerCountdownEl.text(timer);
          };
      }, 1000);

  });

  $(".answer").on("click", function (event) {
      event.preventDefault();
      var correctAnswer = questions[currentQuestion].answer;
      var theirAnswer = event.target.innerText;
      if (theirAnswer == correctAnswer) {
          feedbackEl.text("Correct!").show();
      } else {

        feedbackEl.text("Wrong!").show();
          timer -= 10;
      }

      window.setTimeout(function () {

        showNextQuestionOrScore();
      }, 500);
  });

  function showNextQuestionOrScore() {
      currentQuestion++;

      if (currentQuestion == questions.length) {
          showScore();
      } else {
          feedbackEl.hide();
          var question1 = questions[currentQuestion];

          questionTxtEl.text(question1.question);

          var question1choices = question1.choices;

          answerBtn1.text(question1choices[0]);
          answerBtn2.text(question1choices[1]);
          answerBtn3.text(question1choices[2]);
          answerBtn4.text(question1choices[3]);
      }
  }

  var saveInitials = $("#saveInitials");
  

  saveInitials.on("click", function (event) {
      var multipleInitial = $("#initials").val();

      scores.push([multipleInitial, timer]);
      
      scores.sort(function (first, second) {
          if (first[1] > second[1]) {
              return -1;
          } else if (first[1] < second[1]) {
              return 1;
          }
          return 0;
      });
      
      localStorage.setItem("scores", JSON.stringify(scores));
      showHighScores();
  });

  highScoresBtn.on("click", function () {
      window.clearInterval(timerReference);
      showHighScores();
  });

  $("#clearScores").on("click", function () {
      scores = [];
      localStorage.setItem("scores", JSON.stringify(scores));

      $("#highScoresList").empty();
  });


  $("#startOver").on("click", function () {
      location.reload();
  });

});