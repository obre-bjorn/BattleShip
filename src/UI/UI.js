import { showShip,clearContainer } from '../utils'


function createUI(gameLoop,players){
    const mainSetupContainer = document.getElementById('game-setup-container')
    
    const gameContainer = document.getElementById('game-container')
     
   

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
    

    const placeAttack = (cell,player) => {
        const clickedRow = parseInt(cell.dataset.row, 10);
        const clickedCol = parseInt(cell.dataset.col, 10);
        
        const validBoard = cell.parentNode.parentNode.getAttribute('id') === 'player-two'

        console.log(player[0].turn)
        if(player[0].turn === false || !validBoard ){
            return
        }
    
        const playerAttack =  player[0].play([clickedRow,clickedCol],players[1].playerGameboard)


        if (playerAttack.attacked){

            updateUI('player-two',[clickedRow,clickedCol], playerAttack.message)
            
            // Computer attacks after a valid player attack
            // const compAttack = players[1].play(players[0].playerGameboard)
             // updateUI('player-one',compAttack.coords,compAttack.played.message)
            gameLoop()
        }
    
    }

    const gameView = (activePlayers) => {
        
        const playerOneContainer = document.createElement('div')
        const gameInfo = document.createElement('div')
        const playerTwoContainer = document.createElement('div')
        
        playerOneContainer.id = 'player-one'
        playerTwoContainer.id = 'player-two'
        
        // const playerContainers = [playerOneContainer,playerTwoContainer]
        
        function populateBoard(container,player,show){

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

                        if(player.playerGameboard.checkSpaceOccupied([row,col]) && show){
                            cell.classList.add('show')
                        }

                        cell.addEventListener('click', (event) => {
                            placeAttack(event.target,activePlayers)
                        
                        });

                        board.appendChild(cell);

                    }

            }
            
            container.appendChild(board)
    
        }

        activePlayers.forEach((player,index) =>{
            
            if(index === 0){
                populateBoard(playerOneContainer, player, true)
            }else{
                populateBoard(playerTwoContainer, player,false)
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
    const gameSetupView = (playerShips) =>{

        const gameSetupContainer = document.getElementById('game-setup')

        const board = document.createElement('div')
        const shipContainer = document.createElement('div')
        let shipIndex = 0 
        const ships = []


        board.classList.add('board')
        shipContainer.classList.add('ships-container')

        console.log(board)

        for(let row = 0; row < 10; row+=1){
            for (let col = 0; col < 10; col+=1){

                const cell = document.createElement('div')

                cell.className = 'cell'
                cell.dataset.row = row
                cell.dataset.col = col
                        

                cell.addEventListener('dragover', (event) => {

                    event.preventDefault()             

                });

                // eslint-disable-next-line no-loop-func
                cell.addEventListener('drop',(event) =>{

                    const rowSelected= parseInt(event.target.dataset.row, 10)
                    const colSelected = parseInt(event.target.dataset.col,10)
                    const {side}  = document.querySelector('#rotate-ship').dataset
                    const shipLength = document.querySelector('.ship').dataset.length


                    if(players[0].playerGameboard.placeShip(playerShips[shipIndex],[rowSelected,colSelected],side)){
                        
                        shipIndex+=1
                        console.log(rowSelected,colSelected,side,shipLength)
                        showShip([rowSelected,colSelected],shipLength,side,'show')
                        ships.shift()
                        shipContainer.removeChild(document.querySelector('.ship'))     // console.log(ships)
                        console.log(ships[0])
                        
                        document.getElementById('rotate-ship').dataset.side = 'vertical'

                            if(ships[0] === undefined){

                                console.log('ships endend')
                                clearContainer(gameSetupContainer)
                                mainSetupContainer.classList.add('hide')
                                gameView(players)
                                return ''
                                
                            }

                            shipContainer.insertBefore(ships[0],shipContainer.firstChild)

                    }else{
                        console.log('invalid Position')
                        return 'Invalid Posiitoning'
                    }

                            // Reset the rotate button value whenever a ship has been dropped to 'vertical'
                })
                        

                board.appendChild(cell);

             }

        }

        // eslint-disable-next-line no-restricted-syntax
        for(const shipLength of playerShips){
                
            const ship = document.createElement('div')
            ship.classList.add('ship')
            ship.draggable = 'true' 
            ship.dataset.length = `${shipLength.getLength()}`
            
            for(let shipPart = 0; shipPart < shipLength.getLength(); shipPart+=1){

                const part = document.createElement('div')
                part.classList.add('cell')
                ship.appendChild(part)

            }

            ships.push(ship)


        }

        const rotateButton = document.createElement('button')
        rotateButton.dataset.side = 'vertical'

        rotateButton.addEventListener('click',(e)=>{
            const ship = document.querySelector('.ship')
            const selectedSide = e.target.dataset.side
                
            if(selectedSide === 'vertical'){  
                ship.style.flexDirection = 'row'
                 e.target.dataset.side = 'horizontal'
                    
            }else{

                ship.style.flexDirection = 'column'
                e.target.dataset.side = 'vertical'

            }

        })

        rotateButton.textContent = 'Rotate'
        rotateButton.id = 'rotate-ship'


        shipContainer.appendChild(ships[0])
        shipContainer.appendChild(rotateButton)
        gameSetupContainer.appendChild(board)
        gameSetupContainer.appendChild(shipContainer)
   
    }



    const gameOverView = (winner) => {

        const overlay = document.querySelector('.overlay')
        overlay.classList.remove('hide')


        const startNewGame = overlay.querySelector('#start-game')
        const winnerElement = overlay.querySelector('#winner')

        winnerElement.textContent = winner

        startNewGame.addEventListener('click', ()=>{
            console.log('game over')
            location.reload(true)
            // gameContainer.innerHTML = ''
            
            // gameSetupView()
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