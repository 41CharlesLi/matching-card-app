

  const matchGame = {}

  matchGame.cardArray = [
    {
      name: "dirk",
      img: "imgs/Dirk.jpg",
      tag: 1,
    },
    {
      name: "dirk",
      img: "imgs/Dirk.jpg",
      tag: 2,
    },
    {
      name: "curry",
      img: "imgs/Curry.jpg",
      tag: 3,
    },
    {
      name: "curry",
      img: "imgs/Curry.jpg",
      tag: 4,
    },
    {
      name: "kyle",
      img: "imgs/Kyle.jpg",
      tag: 5,
    },
    {
      name: "kyle",
      img: "imgs/Kyle.jpg",
      tag: 6,
    },
    {
      name: "luka",
      img: "imgs/Luka.jpg",
      tag: 7,
    },
    {
      name: "luka",
      img: "imgs/Luka.jpg",
      tag: 8,
    },
  ];



  matchGame.questions = [
    {
      question: `Who's the all time leading scorer in the NBA?`,
      answers: [
        { text: `David Bautista`, correct: false },
        { text: `Kareem Abdul Jabbar`, correct: true, class: "correct" },
        { text: `Michael Jordan`, correct: false },
        { text: `Spencer Dinwiddie`, correct: false },
      ],
    },

    {
      question: `Who is the best forward in the NBA today?`,
      answers: [
        { text: `Lionel Messi`, correct: false },
        { text: `Christiano Ronaldo`, correct: false },
        { text: `Sidney Crosby`, correct: false },
        { text: `Luka Doncic`, correct: true, class: "correct" },
      ],
    },

    {
      question: `Why don't I have an NBA career?`,
      answers: [
        { text: `I'm 5'8"`, correct: false },
        { text: `I can't dribble with my left hand`, correct: false },
        { text: `My vertical is approx. 10.668 cm `, correct: false },
        { text: `All of the above`, correct: true, class: "correct" },
      ],
    },

    {
      question: `Who's gonna flame out of the NBA playoffs once again?`,
      answers: [
        { text: `James Harden?`, correct: false },
        { text: `James Harden?`, correct: false },
        { text: `James Harden?`, correct: false },
        { text: `James Harden.`, correct: true, class: "correct" },
      ],
    },
  ];

  matchGame.cardsChosen = [];
  matchGame.cardsChosenID = [];
  matchGame.cardsWon = [];
  matchGame.cardTag = [];
  matchGame.secretCode = "nbajam";
  matchGame.pressed = [];
 
  matchGame.secretGame = function() {window.addEventListener("keyup", (e) => {
    matchGame.pressed.push(e.key);
    matchGame.pressed.splice(
      matchGame.secretCode.length - 1,
      matchGame.pressed.length - matchGame.secretCode.length
    );
    if (matchGame.pressed.join("").includes(matchGame.secretCode)) {
      matchGame.$nbaJam.show();
      $(".grid").hide();
      // const quitJam = document.createElement("button");
      // $(".credit").append(quitJam);
      // quitJam.innerText = "I'm done";
      // quitJam.classList.add("btn");
    }
  })};

  //cache listeners
  matchGame.cacheListeners = function() {
    matchGame.$questionContainer = $(".questionContainer");
    matchGame.$resultsDisplay = $("#result");
    matchGame.$grid = $(".grid");
    matchGame.$question = $("#question");
    matchGame.$answerElement = $("#answer-buttons");
    matchGame.$winningGif = $(".winningGif");
    matchGame.$restart = $(".restart");
    matchGame.$nbaJam = $("#nbaJam")
  }

  matchGame.resetArrays = function() {
    matchGame.cardsChosen = [];
    matchGame.cardsChosenID = [];
    matchGame.cardTag = [];
  }


 //function to flip cards
 matchGame.flipCard = function() {
  const cardID = $(this).attr("data-id");
  matchGame.cardsChosen.push(matchGame.cardArray[cardID].name);
  matchGame.cardsChosenID.push(cardID);
  matchGame.cardTag.push(matchGame.cardArray[cardID].tag);
  $(this).attr("src", matchGame.cardArray[cardID].img);
  if (matchGame.cardTag[0] === matchGame.cardTag[1]) {
    $(this).attr("src", "imgs/logo.jpg");
    matchGame.resetArrays();
  }
  if (matchGame.cardsChosen.length === 2) {
    setTimeout(matchGame.checkForMatch, 200);
  }
}

matchGame.playAudio = () => {
  const audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "audio/basketball.wav");
  audioElement.play();
  audioElement.volume = 0.3;
};

matchGame.playTheme = () => {
  $(".titleLogo").on("click", function () {
    mainTheme = document.getElementById("mainTheme");
    if (mainTheme.paused) {
      mainTheme.play();
      mainTheme.volume = 0.3;
    } else {
      mainTheme.pause();
      mainTheme.currentTime = 0;
    }
  });
};

  //create grid of cards function
  matchGame.createBoard = function () {
    for (let i = 0; i < matchGame.cardArray.length; i++) {
      const $card = $("<img/>");
      $card.attr({ src: "imgs/logo.jpg", "data-id": i, class: "card" });
      $card.on("click", matchGame.flipCard);
      $card.on("click", matchGame.playAudio);
      matchGame.$grid.append($card);
    }
  }

  //check for matches
  matchGame.checkForMatch = function() {
    let $cards = $(".card");
    const optionsOneId = matchGame.cardsChosenID[0];
    const optionsTwoId = matchGame.cardsChosenID[1];
    if (matchGame.cardsChosen[0] === matchGame.cardsChosen[1]) {
      matchGame.$questionContainer.show();
      matchGame.showQuestion();
    } else {
      $cards[optionsOneId].setAttribute("src", "imgs/logo.jpg");
      $cards[optionsTwoId].setAttribute("src", "imgs/logo.jpg");
    }
    matchGame.cardsChosen = [];
    matchGame.cardsChosenID = [];
    matchGame.cardTag = [];
  }

  matchGame.annoyPlayer = function() {
    let $cards = $(".card");
    alert("wrong answer. start over now. thank you.");
    matchGame.cardArray.sort(() => 0.5 - Math.random());
    $cards.attr("src", "imgs/logo.jpg");
    $cards.attr("src", "imgs/logo.jpg");
    matchGame.cardsWon = [];
  }

  matchGame.resetAnswers = function() {
    matchGame.$answerElement.empty();
  }

  matchGame.checkForWin = function() {
    if (matchGame.cardsWon.length === matchGame.cardArray.length / 2) {
      alert(`you've won`);
      matchGame.$grid.hide();
      matchGame.$winningGif.show();
      matchGame.$resultsDisplay.text(" Dirk is proud of you");
      matchGame.$restart.show();
      matchGame.$restart.on("click", function () {
        window.location.reload();
      });
    }
  }

  //show matchGame.questions in question box, if player selects the wrong answer
  //the cards will be shuffled and arrays will be emptied

  matchGame.showQuestion = function() {
    let lastQuestion = matchGame.questions.length - 1;
    matchGame.$question.text(matchGame.questions[lastQuestion].question);
    matchGame.$grid.hide();
    matchGame.questions[lastQuestion].answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.className = answer.class;
      matchGame.$answerElement.append(button);
      button.classList.add("btn");
      button.addEventListener("click", function () {
        if (answer.correct) {
          alert("Shoot for the stars!");
          matchGame.cardsWon.push(matchGame.cardsChosen);
          matchGame.$grid.show();
          matchGame.resetAnswers();
          matchGame.questions.pop();
          matchGame.$questionContainer.hide();
          matchGame.$resultsDisplay.text(matchGame.cardsWon.length);
          matchGame.checkForWin();
        } else {
          matchGame.$questionContainer.hide();
          matchGame.$grid.show();
          matchGame.annoyPlayer();
          matchGame.$resultsDisplay.text(matchGame.cardsWon.length);
          matchGame.resetAnswers();
        }
      });
    });
  }

matchGame.init = function() {
  matchGame.cacheListeners()
  matchGame.$questionContainer.hide();
  matchGame.$nbaJam.hide()
  matchGame.cardArray.sort(() => 0.5 - Math.random());
  matchGame.createBoard();
  matchGame.$winningGif.hide();
  matchGame.$restart.hide();
  matchGame.secretGame()
  matchGame.playTheme()
}


  $(function() {
    matchGame.init()
  })
