import Ship from '../Ship/Ship';


 function Gameboard(){

            const size = 10;

            const board = []



            const init = () => {
            
                for(let row = 0;  row < size; row+=1){
                    board.push([])
        
                    for (let column = 0; column < size; column+=1) {
                        board[row].push({isOccupied: false})
                    }
                }
            }

            init()


            const getBoard = () =>  board



            const checkValidSpace = (coordinates) =>{

                const [x, y] = coordinates

                const xValid = (x >= 0 && x <= size )

                const yValid = (y >= 0 && y <= size )
            


                return (xValid && yValid)
            }




            const placeShip  = (ship,coordinates,direction ) => {
                
                let [x,y] = coordinates

                if(direction === 'vertical'){
                    

                    for(let shipPart = 0; shipPart < ship.remainingLife(); shipPart++){
                        


                    }

                }
                
                
                if(direction === 'horizontal'){

                }
                    
            }

            const recieveAttack = (coordinates) => {



            }


            return {
                getBoard,
                placeShip
            }
}

export default Gameboard