let score = JSON.parse(localStorage.getItem('score')) || {
  wins :0,
  losses:0,
  Ties:0
};

updateScoreElement();
  
//   if (!score) {
//   score = {
//     wins :0,
//     losses:0,
//     Ties:0
//   }
// }

let isAutoPlaying = false;
let intervalId;

function autoPlay() {

  if (!isAutoPlaying) {
    intervalId = setInterval( () => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

let autoPlayButtonElement = document.querySelector('.js-autoplay-button');
autoPlayButtonElement.addEventListener('click', () => {
  autoPlay();
})

autoPlayButtonElement.addEventListener('click', () => {
  if (autoPlayButtonElement.innerHTML === 'Auto Play' ) {
    autoPlayButtonElement.innerHTML = 'Stop Playing'
  } else {
    autoPlayButtonElement.innerHTML = 'Auto Play'
  }
})


document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock')
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper')
  })

document.querySelector('.js-scissor-button')
  .addEventListener('click', () => {
    playGame('scissor')
  })

  document.body.addEventListener('keydown', (event) => {
    if (event.key==='r') {
      playGame('rock')
    } else if (event.key==='p') {
      playGame('paper')
    } else if (event.key==='s') {
      playGame('scissor')
    } else if (event.key === 'Backspace') {
      score.wins = 0;
      score.losses = 0;
      score.Ties = 0;
      localStorage.removeItem('score');
      updateScoreElement()
    } else if (event.key === 'a') {
      autoPlay();
    }
  });

let resetButtonElement =  document.querySelector('.js-reset-button');
resetButtonElement.addEventListener('click', () => {

  document.querySelector('.js-popup')
  .classList.add('css-popup')
  document.querySelector('.js-overlay')
    .classList.add('overlay')
  document.querySelector('.js-overlay')
    .innerHTML = `<p class="para">Are you sure want to reset the score?</p>
    <button class="yes-button js-yes-button">Yes</button>
    <button class="no-button js-no-button">No</button>`

    let yesButtonElement = document.querySelector('.js-yes-button')
    yesButtonElement.addEventListener('click', () => {
      score.wins = 0;
      score.losses = 0;
      score.Ties = 0;
      localStorage.removeItem('score');
      updateScoreElement()
      document.querySelector('.js-popup')
        .classList.remove('css-popup')
        document.querySelector('.js-overlay')
        .classList.remove('overlay')
        document.querySelector('.js-overlay')
        .innerHTML = ''
    })

    let noButtonElement = document.querySelector('.js-no-button');
    noButtonElement.addEventListener('click', () => {
      localStorage.removeItem('score');
      updateScoreElement()
      document.querySelector('.js-popup')
        .classList.remove('css-popup')
        document.querySelector('.js-overlay')
        .classList.remove('overlay')
        document.querySelector('.js-overlay')
        .innerHTML = ''
    })
    
});


function playGame(playerMove) {
  const computerMove=pickComputerMove();    
  let result = '';
  if (playerMove==='scissor') {
    if (computerMove === 'rock') {
    result = 'You Loose';
    } else if (computerMove === 'paper') {
      result = 'You Win';
    } else if (computerMove==='scissor') {
      result = 'Tie';
    }
  };

  if (playerMove==='paper') {
    if (computerMove === 'rock') {
      result = 'You Win';
    } else if (computerMove === 'paper') {
      result = 'Tie';
    } else if (computerMove==='scissor') {
      result = 'You Loose';
    }

  };

  if (playerMove==='rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You Loose';
    } else if (computerMove==='scissor') {
      result = 'You Win';
    }

  
  };

  if (result==='You Win') {
    score.wins+=1;
  } else if (result==='You Loose') {
    score.losses+=1;
  } else if (result==='Tie') {
    score.Ties+=1;
  };

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();


//       alert(`You picked -${playerMove}. Computer picked ${computerMove}. ${result}
// wins:${score.wins}, looses:${score.losses}, Ties:${score.Ties}`);

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You picked: ${playerMove}. Computer picked: ${computerMove}`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `wins:${score.wins}, losses:${score.losses}, Ties:${score.Ties}`;
}


function pickComputerMove() {
  let computerMove = '';
  const randomNumber = Math.random();
  if (randomNumber>=0 && randomNumber<1/3) {
    computerMove = 'rock';
  } else if (randomNumber>=1/3 && randomNumber<2/3) {
    computerMove = 'paper';
  } else if (randomNumber>=2/3 && randomNumber<1) {
    computerMove = 'scissor';
  }

  return computerMove;
}
