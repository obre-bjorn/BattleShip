import Gameboard from '../Gameboard/Gameboard';


function randomCoordinates(){

    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return [x,y]
}

function createPlayer(name){


    const playerGameboard = Gameboard()

    const turn = false


    const play = (coordinates,opponentBoard) =>  opponentBoard.receiveAttack(coordinates)
    


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
        
        let played = {attacked:false, message:null}
        let coords = randomCoordinates()
     
             while (!played.attacked){
                coords = randomCoordinates()
                 console.log(coords)
                 
                 played = opponentBoard.receiveAttack(coords)
             }

             return {coords,played}
    }



    return player

}




export { createComputerPlayer, createPlayer}