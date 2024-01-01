import { createPlayer, createComputerPlayer } from '../Player/Player';
import createUI from '../UI/UI';

function Game(){

    let humanPlayer;
    let computerPlayer;

    const init = (name) => {

        humanPlayer = createPlayer(name);
        computerPlayer = createComputerPlayer();

        const players = [humanPlayer,computerPlayer]

        createUI().gameView(players)

    }




    return {init}

}



export default Game