import Gameboard from '../Gameboard/Gameboard';


function randomCoordinates(){

    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return [x,y]
}

function createPlayer(name){


    const playerGameboard = Gameboard()

    const turn = true


    const play = (coordinates,opponentBoard) => {

        opponentBoard.receiveAttack(coordinates)
        
        
    }


    return {
        name,
        turn,
        playerGameboard,
        play,
    }

}


function createComputerPlayer(){
    
    const player = createPlayer('computer');

    player.play = (opponentBoard) => {
        
        let played = false
     
             while (!played){
                 const coordinates = randomCoordinates()
                 console.log(coordinates)
                 played = opponentBoard.receiveAttack(coordinates)
             }
    }



    return player

}




export { createComputerPlayer, createPlayer}