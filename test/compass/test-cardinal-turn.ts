import * as compass from '../../src/compass';

describe('compass/cardinal-turn', () => {
    describe('CARDINAL_TURNS', () => {
        it('has 4 turns', () => {
            expect(compass.CARDINAL_TURNS).toHaveLength(4);
        });
    });
    describe('cardinalTurnToString', () => {
        it('works', () => {
            expect(compass.cardinalTurnToString(compass.CardinalTurn.NONE)).toBe('T0');
            expect(compass.cardinalTurnToString(compass.CardinalTurn.RIGHT)).toBe('T+90');
            expect(compass.cardinalTurnToString(compass.CardinalTurn.AROUND)).toBe('T180');
            expect(compass.cardinalTurnToString(compass.CardinalTurn.LEFT)).toBe('T-90');
        });
    });
    describe('cardinalTurnToDegrees', () => {
        it('works', () => {
            expect(compass.cardinalTurnToDegrees(compass.CardinalTurn.NONE)).toBe(0);
            expect(compass.cardinalTurnToDegrees(compass.CardinalTurn.RIGHT)).toBe(90);
            expect(compass.cardinalTurnToDegrees(compass.CardinalTurn.AROUND)).toBe(180);
            expect(compass.cardinalTurnToDegrees(compass.CardinalTurn.LEFT)).toBe(270);
        });
    });
    describe('cardinalTurnReverse', () => {
        it('works', () => {
            expect(compass.cardinalTurnReverse(compass.CardinalTurn.NONE)).toBe(compass.CardinalTurn.NONE);
            expect(compass.cardinalTurnReverse(compass.CardinalTurn.RIGHT)).toBe(compass.CardinalTurn.LEFT);
            expect(compass.cardinalTurnReverse(compass.CardinalTurn.AROUND)).toBe(compass.CardinalTurn.AROUND);
            expect(compass.cardinalTurnReverse(compass.CardinalTurn.LEFT)).toBe(compass.CardinalTurn.RIGHT);
        });
    });
    describe('cardinalTurnFromCardinalDirections', () => {
        it('works', () => {
            expect(
                compass.cardinalTurnFromCardinalDirections(compass.CardinalDirection.NORTH,
                                                           compass.CardinalDirection.NORTH))
                .toBe(compass.CardinalTurn.NONE);
            expect(
                compass.cardinalTurnFromCardinalDirections(compass.CardinalDirection.NORTH,
                                                           compass.CardinalDirection.EAST))
                .toBe(compass.CardinalTurn.RIGHT);
            expect(
                compass.cardinalTurnFromCardinalDirections(compass.CardinalDirection.NORTH,
                                                           compass.CardinalDirection.SOUTH))
                .toBe(compass.CardinalTurn.AROUND);
            expect(
                compass.cardinalTurnFromCardinalDirections(compass.CardinalDirection.NORTH,
                                                           compass.CardinalDirection.WEST))
                .toBe(compass.CardinalTurn.LEFT);
            expect(
                compass.cardinalTurnFromCardinalDirections(compass.CardinalDirection.WEST,
                                                           compass.CardinalDirection.WEST))
                .toBe(compass.CardinalTurn.NONE);
            expect(
                compass.cardinalTurnFromCardinalDirections(compass.CardinalDirection.WEST,
                                                           compass.CardinalDirection.NORTH))
                .toBe(compass.CardinalTurn.RIGHT);
            expect(
                compass.cardinalTurnFromCardinalDirections(compass.CardinalDirection.WEST,
                                                           compass.CardinalDirection.EAST))
                .toBe(compass.CardinalTurn.AROUND);
            expect(
                compass.cardinalTurnFromCardinalDirections(compass.CardinalDirection.WEST,
                                                           compass.CardinalDirection.SOUTH))
                .toBe(compass.CardinalTurn.LEFT);
        });
    });
    describe('cardinalTurnFromTurn', () => {
        it('works', () => {
            expect(compass.cardinalTurnFromTurn(compass.Turn.NONE)).toBe(compass.CardinalTurn.NONE);
            expect(compass.cardinalTurnFromTurn(compass.Turn.R_90)).toBe(compass.CardinalTurn.RIGHT);
            expect(compass.cardinalTurnFromTurn(compass.Turn.T_180)).toBe(compass.CardinalTurn.AROUND);
            expect(compass.cardinalTurnFromTurn(compass.Turn.L_90)).toBe(compass.CardinalTurn.LEFT);
        });
        it('returns something close for non-cardinal turn', () => {
            expect(compass.cardinalTurnFromTurn(compass.Turn.R_45)).toBe(compass.CardinalTurn.NONE);
            expect(compass.cardinalTurnFromTurn(compass.Turn.L_45)).toBe(compass.CardinalTurn.LEFT);
        });
    });
    describe('cardinalTurnAddCardinalTurn', () => {
        it('works', () => {
            expect(compass.cardinalTurnAddCardinalTurn(compass.CardinalTurn.NONE, compass.CardinalTurn.NONE))
                .toBe(compass.CardinalTurn.NONE);
            expect(compass.cardinalTurnAddCardinalTurn(compass.CardinalTurn.NONE, compass.CardinalTurn.RIGHT))
                .toBe(compass.CardinalTurn.RIGHT);
            expect(compass.cardinalTurnAddCardinalTurn(compass.CardinalTurn.RIGHT, compass.CardinalTurn.NONE))
                .toBe(compass.CardinalTurn.RIGHT);
            expect(compass.cardinalTurnAddCardinalTurn(compass.CardinalTurn.RIGHT, compass.CardinalTurn.AROUND))
                .toBe(compass.CardinalTurn.LEFT);
            expect(compass.cardinalTurnAddCardinalTurn(compass.CardinalTurn.LEFT, compass.CardinalTurn.LEFT))
                .toBe(compass.CardinalTurn.AROUND);
        });
    });
});
