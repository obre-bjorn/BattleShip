/* eslint-disable no-restricted-syntax */
// import { createPlayer,createComputerPlayer } from './Player/Player';
// import Game from './Game/Game';

const gameContainer = document.getElementById('game-setup')


const board = document.createElement('div')
const shipContainer = document.createElement('div')
const shipsLengths = [4,6,3,2]
const ships = []


board.classList.add('board')
shipContainer.classList.add('ships-container')

console.log(board)

 for(let row = 0; row < 10; row+=1){
    for (let col = 0; col < 10; col+=1){

        const cell = document.createElement('div')
                        cell.className = 'cell'
                        cell.dataset.row = row
                        cell.dataset.col = col
                        

                        cell.addEventListener('dragover', (event) => {
                            event.preventDefault()
                            
                        
                        });
                        cell.addEventListener('drop',(event) =>{
                            const rowSelected= event.target.dataset.row
                            const colSelected = event.target.dataset.col
                            const {side}  = document.querySelector('#rotate-ship').dataset
                            console.log(rowSelected,colSelected,side)
                        })
                        

                        board.appendChild(cell);

                    }

            }

for(const shipLength of shipsLengths){
        
    const ship = document.createElement('div')
    ship.classList.add('ship')
    ship.draggable = 'true' 
    ship.dataset.length = `${shipLength}`
    
    for(let shipPart = 0; shipPart < shipLength; shipPart+=1){

        const part = document.createElement('div')
        part.classList.add('cell')
        ship.appendChild(part)

    }

    ships.push(ship)

    ship.addEventListener('dragend',(event)=>{

        event.preventDefault()
        console.log('dropped')
                            
        ships.shift()
                                // console.log(ships)
        shipContainer.appendChild(ships[0])
        
    })


}

const rotateButton = document.createElement('button')
rotateButton.dataset.side = 'vertical'

rotateButton.addEventListener('click',(e)=>{
    const ship = document.querySelector('.ship')
    const selectedSide = e.target.dataset.side
    
    if(selectedSide === 'vertical'){  
        ship.style.flexDirection = 'row'
        e.target.dataset.side = 'horizontal'
        
    }else{
        ship.style.flexDirection = 'column'
        e.target.dataset.side = 'vertical'

    }
})
rotateButton.textContent = 'Rotate'
rotateButton.id = 'rotate-ship'


shipContainer.appendChild(ships[0])
shipContainer.appendChild(rotateButton)
gameContainer.appendChild(board)
gameContainer.appendChild(shipContainer)




// Game('Bjorn').init()
