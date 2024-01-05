import { createPlayer, createComputerPlayer } from '../Player/Player';
import createUI from '../UI/UI';
import Ship from '../Ship/Ship';

function Game(){

    let humanPlayer;
    let computerPlayer;

    const init = (name) => {

        humanPlayer = createPlayer(name);
        computerPlayer = createComputerPlayer();

        const submarine = new Ship(4)
        
        computerPlayer.playerGameboard.placeShip(submarine,[4,4],'vertical')

        const players = [humanPlayer,computerPlayer]

        createUI().gameView(players)

    }

    const gameLoop = () =>{

    }

    const gameOver = () =>{

        

    }




    return {init}

}



export default Game