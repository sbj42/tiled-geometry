import * as compass from '../../src/compass';

describe('compass/flip', () => {
    describe('FLIPS', () => {
        it('has 2 flips', () => {
            expect(compass.FLIPS).toHaveLength(2);
        });
    });
    describe('flipToString', () => {
        it('works', () => {
            expect(compass.flipToString(compass.Flip.HEADS)).toBe('H');
            expect(compass.flipToString(compass.Flip.TAILS)).toBe('T');
        });
    });
    describe('flipOpposite', () => {
        it('works', () => {
            expect(compass.flipOpposite(compass.Flip.HEADS)).toBe(compass.Flip.TAILS);
            expect(compass.flipOpposite(compass.Flip.TAILS)).toBe(compass.Flip.HEADS);
        });
    });
    describe('flipFromBoolean', () => {
        it('works', () => {
            expect(compass.flipFromBoolean(true)).toBe(compass.Flip.TAILS);
            expect(compass.flipFromBoolean(false)).toBe(compass.Flip.HEADS);
        });
    });
    describe('flipFromCardinalOrientation', () => {
        it('works', () => {
            expect(compass.flipFromCardinalOrientation(compass.CardinalOrientation.HEADS_NORTH))
                .toBe(compass.Flip.HEADS);
            expect(compass.flipFromCardinalOrientation(compass.CardinalOrientation.TAILS_NORTH))
                .toBe(compass.Flip.TAILS);
            expect(compass.flipFromCardinalOrientation(compass.CardinalOrientation.HEADS_EAST))
                .toBe(compass.Flip.HEADS);
            expect(compass.flipFromCardinalOrientation(compass.CardinalOrientation.TAILS_EAST))
                .toBe(compass.Flip.TAILS);
        });
    });
});
