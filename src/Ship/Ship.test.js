import Ship from './Ship';

describe('Ship', () => {
    let ship1;
    
    beforeEach(()=>{

            ship1 = Ship(4)

        }

    )
    

    it('Should have inital life equal to length', () => {
        expect(ship1.getRemainingLife()).toBe(4)
    });

     it('Should decrease life when hit', () => {
        ship1.hit()
        expect(ship1.getRemainingLife()).toBe(3)
    });

    it('Should be Sunk',()=>{

        ship1.hit()
        ship1.hit()
        ship1.hit()
        ship1.hit()
        expect(ship1.isSunk()).toBe(true)

    })

    it('Should not be sunk if not all parts are hit', () => {
        ship1.hit();
        ship1.hit();
        expect(ship1.isSunk()).toBe(false);
    });


});