import { createPlayer, createComputerPlayer } from '../Player/Player';
import createUI from '../UI/UI';
import Ship from '../Ship/Ship';
import randomCoordinates from '../utils';


function computerPlaceShip(ships,board){
    
    ships.forEach((ship) => {

        const directions = ['vertical', 'horizontal']
        const directionChoice = directions[Math.floor(Math.random() * 2)]

        const coords = randomCoordinates();
        let placedShip = false

        while(!placedShip){
            placedShip = board.placeShip(ship,coords,directionChoice)
        }
        
    })

}

function Game(name){

    const humanPlayer = createPlayer(name);
        
    const computerPlayer = createComputerPlayer();;
    // eslint-disable-next-line no-use-before-define
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
    ui = createUI(gameLoop)

     const init = () => {

       const shipLengths =  [5,4,3,2,2]

        const playerShips = []
        const computerShips = []



        shipLengths.forEach((length) =>{

            playerShips.push(new Ship(length))
            computerShips.push(new Ship (length))

        })


        const submarine = new Ship(4)
        const submarine2 = new Ship(4)
        humanPlayer.turn = true
        
        computerPlayer.playerGameboard.placeShip(submarine,[4,4],'vertical')

        computerPlaceShip(computerPlayer.playerGameboard,computerShips)

        humanPlayer.playerGameboard.placeShip(submarine2,[4,4],'vertical')
        const players = [humanPlayer,computerPlayer]

        ui.gameView(players)

    }


    return {init}

}





export default Game