import Gameboard from "./Gameboard";


describe('GameBoard', () => {

    let board;

    beforeEach(()=>{
        
        board = Gameboard()

    })

    it('Should return a Gameboard of size 10 by 10', () => {

        const newBoard = board.getBoard()
        const rows = newBoard.length
        const columns = newBoard[0].length
        
        expect({x:rows,y:columns}).toEqual({x:10,y:10})

    });

});