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
