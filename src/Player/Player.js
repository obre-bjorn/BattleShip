import Gameboard from '../Gameboard/Gameboard';

function Player(name){

    const

    const playerGameboard = Gameboard()

    const playerIsActive = false

    const play = (coordinates,board) => {



        if( playerIsActive){
            board.recieveAttack(coordinates)
            return true
        }

            return false
        
    }


    return {
        playerGameboard,
        play,
    }

}