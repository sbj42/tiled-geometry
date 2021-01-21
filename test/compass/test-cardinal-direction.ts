import * as compass from '../../src/compass';

describe('compass/cardinal-direction', () => {
    describe('CARDINAL_DIRECTIONS', () => {
        it('has 4 directions', () => {
            expect(compass.CARDINAL_DIRECTIONS).toHaveLength(4);
        });
    });
    describe('cardinalDirectionToString', () => {
        it('works', () => {
            expect(compass.cardinalDirectionToString(compass.CardinalDirection.NORTH)).toBe('N');
            expect(compass.cardinalDirectionToString(compass.CardinalDirection.SOUTH)).toBe('S');
            expect(compass.cardinalDirectionToString(compass.CardinalDirection.WEST)).toBe('W');
        });
    });
    describe('cardinalDirectionOpposite', () => {
        it('works', () => {
            expect(compass.cardinalDirectionOpposite(compass.CardinalDirection.NORTH))
                .toBe(compass.CardinalDirection.SOUTH);
            expect(compass.cardinalDirectionOpposite(compass.CardinalDirection.EAST))
                .toBe(compass.CardinalDirection.WEST);
            expect(compass.cardinalDirectionOpposite(compass.CardinalDirection.SOUTH))
                .toBe(compass.CardinalDirection.NORTH);
            expect(compass.cardinalDirectionOpposite(compass.CardinalDirection.WEST))
                .toBe(compass.CardinalDirection.EAST);
        });
    });
    describe('cardinalDirectionFromDirection', () => {
        it('works', () => {
            expect(compass.cardinalDirectionFromDirection(compass.Direction.NORTH))
                .toBe(compass.CardinalDirection.NORTH);
            expect(compass.cardinalDirectionFromDirection(compass.Direction.EAST))
                .toBe(compass.CardinalDirection.EAST);
            expect(compass.cardinalDirectionFromDirection(compass.Direction.SOUTH))
                .toBe(compass.CardinalDirection.SOUTH);
            expect(compass.cardinalDirectionFromDirection(compass.Direction.WEST))
                .toBe(compass.CardinalDirection.WEST);
        });
        it('returns something close for non-cardinal directions', () => {
            expect(compass.cardinalDirectionFromDirection(compass.Direction.NORTHEAST))
                .toBe(compass.CardinalDirection.NORTH);
            expect(compass.cardinalDirectionFromDirection(compass.Direction.NORTHWEST))
                .toBe(compass.CardinalDirection.WEST);
        });
    });
    describe('cardinalDirectionFromNorthTurn', () => {
        it('works', () => {
            expect(compass.cardinalDirectionFromNorthTurn(compass.CardinalTurn.NONE))
                .toBe(compass.CardinalDirection.NORTH);
            expect(compass.cardinalDirectionFromNorthTurn(compass.CardinalTurn.RIGHT))
                .toBe(compass.CardinalDirection.EAST);
            expect(compass.cardinalDirectionFromNorthTurn(compass.CardinalTurn.AROUND))
                .toBe(compass.CardinalDirection.SOUTH);
            expect(compass.cardinalDirectionFromNorthTurn(compass.CardinalTurn.LEFT))
                .toBe(compass.CardinalDirection.WEST);
        });
    });
    describe('cardinalDirectionFromCardinalOrientation', () => {
        it('works', () => {
            expect(compass.cardinalDirectionFromCardinalOrientation(compass.CardinalOrientation.HEADS_NORTH))
                .toBe(compass.CardinalDirection.NORTH);
            expect(compass.cardinalDirectionFromCardinalOrientation(compass.CardinalOrientation.TAILS_NORTH))
                .toBe(compass.CardinalDirection.NORTH);
            expect(compass.cardinalDirectionFromCardinalOrientation(compass.CardinalOrientation.HEADS_WEST))
                .toBe(compass.CardinalDirection.WEST);
            expect(compass.cardinalDirectionFromCardinalOrientation(compass.CardinalOrientation.TAILS_WEST))
                .toBe(compass.CardinalDirection.WEST);
        });
    });
    describe('cardinalDirectionAddCardinalTurn', () => {
        it('works', () => {
            expect(compass.cardinalDirectionAddCardinalTurn(compass.CardinalDirection.NORTH,
                                                                  compass.CardinalTurn.NONE))
                .toBe(compass.CardinalDirection.NORTH);
            expect(compass.cardinalDirectionAddCardinalTurn(compass.CardinalDirection.NORTH,
                                                                  compass.CardinalTurn.RIGHT))
                .toBe(compass.CardinalDirection.EAST);
            expect(compass.cardinalDirectionAddCardinalTurn(compass.CardinalDirection.WEST,
                                                                  compass.CardinalTurn.LEFT))
                .toBe(compass.CardinalDirection.SOUTH);
            expect(compass.cardinalDirectionAddCardinalTurn(compass.CardinalDirection.WEST,
                                                                  compass.CardinalTurn.AROUND))
                .toBe(compass.CardinalDirection.EAST);
        });
    });
});
