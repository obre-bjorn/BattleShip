function Cell(){

}


 function Gameboard(){
    const size = 10;

    const board = []

    for(let row = 0;  row < size; row+=1){
        board.push([])

        for (let column = 0; column < size; column++) {
            
            const cell = Cell()

            board[row].push(cell)
        }
    }


    const getBoard = () =>  board


    return {
        getBoard
    }
}

export default Gameboard