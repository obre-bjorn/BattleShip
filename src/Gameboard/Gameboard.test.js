/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Gameboard from './Gameboard';
import Ship from '../Ship/Ship';


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


    it('Should place ship on the coordinates provided', () => {

        const ship = Ship(3)

        const result = board.placeShip(ship,[0,2], 'vertical')
        
        expect(result).toBe(true)
        
    })



    it('Should not place ship on a occupied space', () => {

        const ship1 = Ship(3)
        const ship2 = Ship(3)


        // eslint-disable-next-line no-unused-vars
        const resultShip1 = board.placeShip(ship1, [0,0], 'vertical')
        const resultShip2 = board.placeShip(ship2, [1,0], 'horizontal')
        expect(resultShip2).toBe(false)
    })



    // & Provide tests for the state of board when ship is placed vertically and horizontally 
    it('Should occupy spaces horizontally on the board', () => {
        const ship = new Ship(3);
        board.placeShip(ship, [2,4], 'horizontal');

        // Check the board state to ensure the spaces are occupied
        const boardState = board.getBoard();
        expect(boardState[2][4].isOccupied).toBe(true);
        expect(boardState[2][5].isOccupied).toBe(true);
        expect(boardState[2][6].isOccupied).toBe(true);
    // Additional assertions based on your game logic
     });


    it('Should occupy spaces vertically on the board', () => {
        const ship = new Ship(4);
        board.placeShip(ship, [0, 1], 'vertical');

        // Check the board state to ensure the spaces are occupied
        const boardState = board.getBoard();
        expect(boardState[0][1].ship).toBe(ship);
        expect(boardState[1][1].ship).toBe(ship);
        expect(boardState[2][1].ship).toBe(ship);
        expect(boardState[3][1].ship).toBe(ship);
        // Additional assertions based on your game logic
     });


     
    it('Should occupy spaces horizontally on the board', () => {
        const ship = new Ship(4);
        board.placeShip(ship, [0, 1], 'horizontal');

        // Check the board state to ensure the spaces are occupied
        const boardState = board.getBoard();
        expect(boardState[0][1].ship).toBe(ship);
        expect(boardState[0][2].ship).toBe(ship);
        expect(boardState[0][3].ship).toBe(ship);
        expect(boardState[0][4].ship).toBe(ship);
        // Additional assertions based on your game logic
     });

     it('Should return true when receiving an attack on a cell that has not been attacked before', ()=>{

        const hasAttacked =  board.recieveAttack([2,2])
        expect(hasAttacked).toBe(true)

     })
     
     it('Should recieve attacks when the coordinates given has not recieved any attack', ()=>{

        // eslint-disable-next-line no-unused-vars
        const hasAttacked =  board.recieveAttack([2,2])
        const hasAttackedAgain = board.recieveAttack([2,2])

        expect(hasAttackedAgain).toBe(false)
        
     })


    it('Should recieve attack and hit Ship if available', ()=>{
        
        const submarine = Ship(4)

        board.placeShip(submarine, [2,2], 'horizontal')
        board.recieveAttack([2,2])
        board.recieveAttack([2,3])        
        board.recieveAttack([2,3])
        
        const submarineLife = submarine.getRemainingLife() 

        expect(submarineLife).toBe(2)
        
     })


     it('Should return true if all placed ships are sunk after receiving attacks', () =>{
        const submarine = Ship(3)
        const destroyer = Ship(2)

        board.placeShip(submarine,[0,0], 'vertical') 
        board.placeShip(destroyer, [0,1],'horizontal')

        // Hit the ships 
        board.recieveAttack([0,0])
        board.recieveAttack([1,0])
        board.recieveAttack([2,0])

        board.recieveAttack([0,1])
        board.recieveAttack([0,2])

        expect(board.allShipsSunk()).toBe(true)

     })
  

});