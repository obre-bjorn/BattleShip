import sum from '.'


describe('sum of two numbers', () => {
    it(' 5 + 5', () => {
        expect(sum(5,5)).toBe(7)
    });
});