let score=JSON.parse(localStorage.getItem('score')) || {
          wins:0,
          losses:0,
          ties:0
        };

        updateScoreElement();

        
        let isAutoPlaying=false;
        let intervalId;
        function autoPlay(){
          if(!isAutoPlaying){
         intervalId = setInterval(() =>{
            playGame(pickComputerMove());
        },1000);
        isAutoPlaying=true;
      }else{
        clearInterval(intervalId);
        isAutoPlaying=false;
      }
    }

    document.querySelector('.js-rock-button')
      .addEventListener('click',() =>{
        playGame('ROCK');
      });

    document.querySelector('.js-paper-button')
      .addEventListener('click',() =>{
        playGame('PAPER');
      });

    document.querySelector('.js-scissor-button')
      .addEventListener('click',() =>{
        playGame('SCISSORS');
      });
      
      document.querySelector('.js-reset-button')
      .addEventListener('click',() =>{
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score');
        updateScoreElement();
      });

      document.querySelector('.js-auto-play-button')
      .addEventListener('click',() =>{
        autoPlay();
      });

      document.body.addEventListener('keydown',(event) =>{
        if(event.key==='r'){
          playGame('ROCK');
        }else if(event.key==='p'){
          playGame('PAPER');
        }else if(event.key==='s'){
          playGame('SCISSORS');
        }
      });

        function playGame(playerMove){
          const computerMove=pickComputerMove();

        let result=''
        if(playerMove==='SCISSORS'){
          if(computerMove==='ROCK'){
            result='YOU LOSE';
          }else if(computerMove==='PAPER'){
            result='YOU WIN';
          }else if(computerMove==='SCISSORS'){
            result='TIE';
          }
        }
        else if(playerMove==='PAPER'){
          if(computerMove==='ROCK'){
            result='YOU WIN';
          }else if(computerMove==='PAPER'){
            result='TIE';
          }else if(computerMove==='SCISSORS'){
            result='YOU LOSE';
          }
        }
        
        else if(playerMove==='ROCK'){
          if(computerMove==='ROCK'){
            result='TIE';
          }else if(computerMove==='PAPER'){
            result='YOU LOSE';
          }else if(computerMove==='SCISSORS'){
            result='YOU WIN';
          }
        }

        if(result==='YOU WIN'){
          score.wins+=1;
        }else if(result==='YOU LOSE'){
          score.losses+=1;
        }else if(result==='TIE'){
          score.ties+=1;
        }

        localStorage.setItem('score', JSON.stringify(score));


        updateScoreElement();
        document.querySelector('.js-result')
          .innerHTML=result;
        document.querySelector('.js-moves')
          .innerHTML=`You Picked ${playerMove} - ${computerMove} Computer Picked.`;
    }

        function updateScoreElement(){    
          document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

        }
        function pickComputerMove(){
        const rand = Math.random();

        let computerMove='';

        if(rand >=0 && rand<1/3){
          computerMove='ROCK';
        }
        else if(rand>=1/3 && rand<2/3){
          computerMove='PAPER';
        }
        else if(rand>=2/3 && rand<1){
          computerMove='SCISSORS';
        }
        return computerMove;
      }