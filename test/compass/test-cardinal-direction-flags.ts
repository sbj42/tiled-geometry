import * as compass from '../../src/compass';

describe('compass/cardinal-direction-flags', () => {
    describe('cardinalDirectionFlagsToString', () => {
        it('works', () => {
            expect(compass.cardinalDirectionFlagsToString(
                compass.CardinalDirectionFlags.NONE,
            )).toBe('[]');
            expect(compass.cardinalDirectionFlagsToString(
                compass.CardinalDirectionFlags.NORTH,
            )).toBe('[N]');
            expect(compass.cardinalDirectionFlagsToString(
                compass.CardinalDirectionFlags.EAST + compass.CardinalDirectionFlags.SOUTH,
            )).toBe('[ES]');
            expect(compass.cardinalDirectionFlagsToString(
                compass.CardinalDirectionFlags.ALL,
            )).toBe('[NESW]');
        });
    });
    describe('cardinalDirectionFlagsFromCardinalDirection', () => {
        it('works', () => {
            expect(compass.cardinalDirectionFlagsFromCardinalDirection(compass.CardinalDirection.NORTH))
                .toBe(compass.CardinalDirectionFlags.NORTH);
            expect(compass.cardinalDirectionFlagsFromCardinalDirection(compass.CardinalDirection.EAST))
                .toBe(compass.CardinalDirectionFlags.EAST);
            expect(compass.cardinalDirectionFlagsFromCardinalDirection(compass.CardinalDirection.SOUTH))
                .toBe(compass.CardinalDirectionFlags.SOUTH);
            expect(compass.cardinalDirectionFlagsFromCardinalDirection(compass.CardinalDirection.WEST))
                .toBe(compass.CardinalDirectionFlags.WEST);
        });
    });
    describe('cardinalDirectionFlagsHasCardinalDirection', () => {
        it('works', () => {
            expect(compass.cardinalDirectionFlagsHasCardinalDirection(
                compass.CardinalDirectionFlags.EAST + compass.CardinalDirectionFlags.SOUTH,
                compass.CardinalDirection.NORTH)).toBe(false);
            expect(compass.cardinalDirectionFlagsHasCardinalDirection(
                compass.CardinalDirectionFlags.ALL,
                compass.CardinalDirection.NORTH)).toBe(true);
            expect(compass.cardinalDirectionFlagsHasCardinalDirection(
                compass.CardinalDirectionFlags.EAST + compass.CardinalDirectionFlags.SOUTH,
                compass.CardinalDirection.EAST)).toBe(true);
        });
    });
    describe('cardinalDirectionFlagsSetCardinalDirection', () => {
        it('works', () => {
            expect(compass.cardinalDirectionFlagsSetCardinalDirection(
                compass.CardinalDirectionFlags.EAST, compass.CardinalDirection.SOUTH))
                .toBe(compass.CardinalDirectionFlags.EAST + compass.CardinalDirectionFlags.SOUTH);
            expect(compass.cardinalDirectionFlagsSetCardinalDirection(
                compass.CardinalDirectionFlags.EAST, compass.CardinalDirection.EAST))
                .toBe(compass.CardinalDirectionFlags.EAST);
            expect(compass.cardinalDirectionFlagsSetCardinalDirection(
                compass.CardinalDirectionFlags.ALL, compass.CardinalDirection.WEST))
                .toBe(compass.CardinalDirectionFlags.ALL);
        });
    });
    describe('cardinalDirectionFlagsRemoveCardinalDirection', () => {
        it('works', () => {
            expect(compass.cardinalDirectionFlagsRemoveCardinalDirection(
                compass.CardinalDirectionFlags.EAST, compass.CardinalDirection.SOUTH))
                .toBe(compass.CardinalDirectionFlags.EAST);
            expect(compass.cardinalDirectionFlagsRemoveCardinalDirection(
                compass.CardinalDirectionFlags.EAST, compass.CardinalDirection.EAST))
                .toBe(compass.CardinalDirectionFlags.NONE);
            expect(compass.cardinalDirectionFlagsRemoveCardinalDirection(
                compass.CardinalDirectionFlags.ALL, compass.CardinalDirection.WEST))
                .toBe(compass.CardinalDirectionFlags.EAST + compass.CardinalDirectionFlags.SOUTH
                + compass.CardinalDirectionFlags.NORTH);
        });
    });
});
