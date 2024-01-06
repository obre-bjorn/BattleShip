import { createPlayer, createComputerPlayer } from '../Player/Player';
import createUI from '../UI/UI';
import Ship from '../Ship/Ship';

function Game(){

    let humanPlayer;
    let computerPlayer;
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
        ui.displayMessage('Your turn! Click on the opponent\'s board to attack.');
        
        // Wait for the player to make a move (handled by UI)
        // UI will update the cell and switch turns
        
        // Computer's turn
        humanPlayer.turn = false;
        
        ui.displayMessage('Computer\'s turn...');
        
        setTimeout(()=>{
            
            const compAttack = computerPlayer.play(humanPlayer.playerGameboard);
            
            // Update UI for the computer's attack
            ui.updateUI('player-one', compAttack.coords, compAttack.played.message);
        },1000)
        
        humanPlayer.turn = true;
        // Continue the game loop
        // setTimeout(() => gameLoop(), 1000); // Add delay for better visualization
        
    }
    ui = createUI(gameLoop)

     const init = (name) => {

        humanPlayer = createPlayer(name);
        computerPlayer = createComputerPlayer();

        const submarine = new Ship(4)
        humanPlayer.turn = true
        
        computerPlayer.playerGameboard.placeShip(submarine,[4,4],'vertical')
        humanPlayer.playerGameboard.placeShip(submarine,[4,4],'vertical')
        const players = [humanPlayer,computerPlayer]

        ui.gameView(players)

    }


    return {init}

}



export default Game