 function Gameboard(){

            const size = 10;

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
                            const occupied = checkSpaceOccupied(newCoordinates)
                            const validSpace = checkValidSpace(newCoordinates) 

                            if (!validSpace || occupied)  {
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

                return true
                    
            }

            const recieveAttack = (coordinates) => {

                const[y,x] = coordinates
                
                const checkShip = board[y][x].ship
                // Check if already attacked
                
                if(board[y][x].recievedAttack){
                    return false
                }
                
                
                board[y][x].recievedAttack = true
                if(checkShip){
                    checkShip.hit()
                }
                return true
            }


            return {
                getBoard,
                placeShip,
                recieveAttack,
            }
}

export default Gameboard