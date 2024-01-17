import { createPlayer, createComputerPlayer } from '../Player/Player';
import createUI from '../UI/UI';
import Ship from '../Ship/Ship';
import randomCoordinates from '../utils';


function computerPlaceShip(ships,board){
    
    ships.forEach((ship) => {
        console.log('placed Ship')

        const directions = ['vertical', 'horizontal']
        const directionChoice = directions[Math.floor(Math.random() * 2)]

        let coords = randomCoordinates();
        let placedShip = false

        while(!placedShip){
            placedShip = board.placeShip(ship,coords,directionChoice)
            coords = randomCoordinates()
        }
        
    })

}

function Game(name){

    const humanPlayer = createPlayer(name);
        
    const computerPlayer = createComputerPlayer();;
    // eslint-disable-next-line no-use-before-define
    const players = [humanPlayer,computerPlayer]

    let ui;
    
    

    const checkGameOver = () =>{

        if(humanPlayer.playerGameboard.allShipsSunk() || computerPlayer.playerGameboard.allShipsSunk()){
            return true
        }


        return  false

    }

    const gameOver = () =>{
        
        const winner = humanPlayer.playerGameboard.allShipsSunk() ? 'Computer': 'You'

        ui.gameOverView(winner)
    }

    const gameLoop = () =>{

        
        if(checkGameOver()){
            gameOver()
            return
        }
        
        // Player's turn
        
        
        // Computer's turn
        humanPlayer.turn = false
         
        ui.displayMessage('Computer\'s turn...');
        
        setTimeout(()=>{
            
            const compAttack = computerPlayer.play(humanPlayer.playerGameboard);
            
            // Update UI for the computer's attack
            ui.updateUI('player-one', compAttack.coords, compAttack.played.message);
            humanPlayer.turn = true;
            ui.displayMessage('Your turn! Click on the opponent\'s board to attack.');
        },2000)
        
        
        
    }
    ui = createUI(gameLoop,players)

     const init = () => {

        const shipLengths =  [5,4,3,2,2]

        const playerShips = []
        const computerShips = []



        shipLengths.forEach((length) =>{

            playerShips.push(new Ship(length))
            computerShips.push(new Ship (length))

        })


        // const submarine = new Ship(4)
        // const submarine2 = new Ship(4)
        humanPlayer.turn = true
        
        // computerPlayer.playerGameboard.placeShip(submarine,[4,4],'vertical')

        // computerPlaceShip(computerPlayer.playerGameboard,computerShips)

        // humanPlayer.playerGameboard.placeShip(submarine2,[   4,4],'vertical')
        
        computerPlaceShip(computerShips,computerPlayer.playerGameboard)
        ui.gameSetupView(playerShips)

    }


    return {init}

}



export default Game