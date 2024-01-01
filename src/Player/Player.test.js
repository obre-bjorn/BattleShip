/* eslint-disable no-undef */
import { createPlayer, createComputerPlayer } from './Player';
// import Gameboard from '../Gameboard/Gameboard';  // Import the actual Gameboard module for reference

jest.mock('../Gameboard/Gameboard', () =>  jest.fn().mockImplementation(() =>({
        
        getBoard: jest.fn(),
        placeShip: jest.fn(),
        receiveAttack: jest.fn(),  // Corrected method name
        allShipsSunk: jest.fn(),
    })));

describe('Player', () => {
    test('Player can play and attack opponent board', () => {
        const player = createPlayer('TestPlayer');
        const opponentBoard = player.playerGameboard;

        player.play([1, 1], opponentBoard);

        expect(opponentBoard.receiveAttack).toHaveBeenCalledWith([1, 1]);
    });
});

describe('ComputerPlayer', () => {
    test('ComputerPlayer can play and attack opponent board', () => {
        const computerPlayer = createComputerPlayer();
        const opponentBoard = createPlayer('Player').playerGameboard;

        computerPlayer.play(opponentBoard);

        expect(opponentBoard.receiveAttack).toHaveBeenCalled();
    });
});
