

function createUI(gameLoop){

    const gameContainer = document.getElementById('game-container')
    
    const gameSetupView = () =>{
        
    }

    const updateUI = (player,coordinates,message) =>{

        const playerBoardContainer = document.getElementById(player)
        const[y,x] = coordinates
        const cellAttacked = playerBoardContainer.querySelector(`[data-row="${y}"][data-col="${x}"]`)
        if(message === 'hit'){
            cellAttacked.classList.add('hit')
        }else if(message === 'missed'){
            cellAttacked.classList.add('missed')
        }
        console.log(cellAttacked)
    
    }
    

    const placeAttack = (cell,players) => {
        const clickedRow = parseInt(cell.dataset.row, 10);
        const clickedCol = parseInt(cell.dataset.col, 10);
        
        const validBoard = cell.parentNode.parentNode.getAttribute('id') === 'player-two'

        console.log(players[0].turn)
        if(players[0].turn === false || !validBoard ){
            return
        }
    
        const playerAttack =  players[0].play([clickedRow,clickedCol],players[1].playerGameboard)


        if (playerAttack.attacked){

            updateUI('player-two',[clickedRow,clickedCol], playerAttack.message)
            
            // Computer attacks after a valid player attack
            // const compAttack = players[1].play(players[0].playerGameboard)
             // updateUI('player-one',compAttack.coords,compAttack.played.message)
            gameLoop()
        }
    
    }

    const gameView = (players) => {
        
        const playerOneContainer = document.createElement('div')
        const gameInfo = document.createElement('div')
        const playerTwoContainer = document.createElement('div')
        
        playerOneContainer.id = 'player-one'
        playerTwoContainer.id = 'player-two'
        
        // const playerContainers = [playerOneContainer,playerTwoContainer]
        
        function populateBoard(container,player){

            const board = document.createElement('div')
            board.className = 'board'

            const playerGameboard = player.playerGameboard.getBoard()
            
            console.log(playerGameboard)
            for(let row = 0; row < playerGameboard.length; row+=1){
                for (let col = 0; col < playerGameboard[row].length; col+=1){

                        const cell = document.createElement('div')
                        cell.className = 'cell'
                        cell.dataset.row = row
                        cell.dataset.col = col

                        cell.addEventListener('click', (event) => {
                            placeAttack(event.target,players)
                        
                        });

                        board.appendChild(cell);

                    }

            }
            
            container.appendChild(board)
    
        }

        players.forEach((player,index) =>{
            
            if(index === 0){
                populateBoard(playerOneContainer, player)
            }else{
                populateBoard(playerTwoContainer, player)
            }
    
        })

        // Game Info Setup
        gameInfo.id = 'game-info'
        const title = document.createElement('h1')
        const message = document.createElement('h3')

        title.textContent = 'BATTLESHIP'

        message.id = 'message'

        gameInfo.appendChild(title)
        gameInfo.appendChild(message)

        gameContainer.appendChild(playerOneContainer)
        gameContainer.appendChild(gameInfo)
        gameContainer.appendChild(playerTwoContainer)
       
    }

    const displayMessage = (mess) => {
        const message = document.getElementById('message')
        message.textContent = mess
    }
        



        // PLayer one side Setup
         // PLayer one side Setup
    



    const gameOverView = (winner) => {

        const overlay = document.querySelector('.overlay')
        overlay.classList.remove('hide')


        const startNewGame = overlay.querySelector('#start-game')
        const winnerElement = overlay.querySelector('#winner')

        winnerElement.textContent = winner

        startNewGame.addEventListener('click', ()=>{
            gameContainer.innerHTML = ''
            
            gameSetupView()
            overlay.classList.add('hide')
        })


        


    
    }

    return{
        gameView,
        gameSetupView,
        gameOverView,
        displayMessage,
        updateUI
    }
}



export default createUI