 function Gameboard(){

            const size = 10;

            const ships = []

            const board = []

            const init = () => {
            
                for(let row = 0;  row < size; row+=1){
                    const column = []
        
                    for (let cell = 0; cell < size; cell+=1) {
                        column.push(
                            {
                                ship: null,
                                recievedAttack: false, 
                                isOccupied: false,
                            })
                    }

                    board.push(column)
                }
            }


            // Instantiate the board
            init()


            const getBoard = () =>  board



            const checkValidSpace = (coordinates) =>{

                const [y, x] = coordinates

                const xValid = (x >= 0 && x < size )

                const yValid = (y >= 0 && y < size )
        
                return (xValid && yValid)

            }

            const checkSpaceOccupied = (coordinates) =>{

                const [y,x] = coordinates
                return board[y][x].isOccupied
            }




            const placeShip  = (ship,coordinates,direction ) => {
							
            	const [y,x] = coordinates
                
                let endY = y
                let endX = x
                
                // Set ship ending coorinate
                if( direction === 'horizontal'){

                    endX += ship.getLength() - 1

                }else if(direction === 'vertical'){

                    endY += ship.getLength() - 1

                }

                    // Check overlapping ship
                    for(let shipPartY = y; shipPartY <= endY; shipPartY +=1 ){

                        for(let shipPartX = x; shipPartX <=  endX; shipPartX += 1){

                            const newCoordinates = [shipPartY,shipPartX]
                        
                            if (!checkValidSpace(newCoordinates) || checkSpaceOccupied(newCoordinates))  {
                                return false                            
                            }                                   
                        }
                    }
                    
                    // ^ Add ship to respective indexes
                    for(let shipPartY = y; shipPartY <= endY; shipPartY +=1 ){

                        for(let shipPartX = x; shipPartX <= endX; shipPartX += 1){
                            
                            board[shipPartY][shipPartX].isOccupied = true
                            board[shipPartY][shipPartX].ship = ship
                            
                        }

                    }
                    ships.push(ship)

                return true
                    
            }

            const receiveAttack = (coordinates) => {
                let message = ''
                const[y,x] = coordinates
                
                const checkShip = board[y][x].ship
                // Check if already attacked

                if(board[y][x].recievedAttack){
                    return {attacked:false, message: 'invalid'}
                }
                
                
                board[y][x].recievedAttack = true
                if(checkShip){
                    checkShip.hit()
                    message = 'hit'
                }else{
                    message = 'missed'
                }
                return {attacked:true,message}

            }

            const allShipsSunk = () => ships.every( (ship) => ship.isSunk())


            return {
                checkSpaceOccupied,
                getBoard,
                placeShip,
                receiveAttack,
                allShipsSunk
            }
}

export default Gameboard