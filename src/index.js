// import { createPlayer,createComputerPlayer } from './Player/Player';
import Game from './Game/Game';

const gameContainer = document.getElementById('game-container')

const board = document.createElement('div')

board.classList.add('board')


 for(let row = 0; row < 10; row+=1){
    for (let col = 0; col < 10; col+=1){

        const cell = document.createElement('div')
                        cell.className = 'cell'
                        cell.dataset.row = row
                        cell.dataset.col = col
                        cell.draggable = true

                        cell.addEventListener('drop', (event) => {
                            console.log(event.target.dataset.row)
                        
                        });

                        board.appendChild(cell);

                    }

            }




// Game('Bjorn').init()
