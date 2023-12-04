import Gameboard from '../Gameboard/Gameboard';


function randomCoordinates(){

    const x = Math.floor(Math.random() * 11);
    const y = Math.floor(Math.random() * 11);

    return [x,y]
}

function createPlayer(name){


    const playerGameboard = Gameboard()


    const play = (coordinates,opponentBoard) => {

        opponentBoard.recieveAttack(coordinates)
        
        
    }


    return {
        playerGameboard,
        play,
    }

}


function createComputerPlayer(){
    
    const player = createPlayer ();

    player.play = (opponentBoard) => {
        
        let played = false
     
             while (!played){
                 const coordinates = randomCoordinates()
                 played = opponentBoard.recieveAttack(coordinates)
             }
    }



    return {
        player

    }

}
export { createComputerPlayer, createPlayer}