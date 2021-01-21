import * as compass from '../../src/compass';

describe('compass/turn', () => {
    describe('TURNS', () => {
        it('has 8 turns', () => {
            expect(compass.TURNS).toHaveLength(8);
        });
    });
    describe('turnToString', () => {
        it('works', () => {
            expect(compass.turnToString(compass.Turn.NONE)).toBe('T0');
            expect(compass.turnToString(compass.Turn.R_45)).toBe('T+45');
            expect(compass.turnToString(compass.Turn.T_180)).toBe('T180');
            expect(compass.turnToString(compass.Turn.L_135)).toBe('T-135');
        });
    });
    describe('turnToDegrees', () => {
        it('works', () => {
            expect(compass.turnToDegrees(compass.Turn.NONE)).toBe(0);
            expect(compass.turnToDegrees(compass.Turn.R_45)).toBe(45);
            expect(compass.turnToDegrees(compass.Turn.T_180)).toBe(180);
            expect(compass.turnToDegrees(compass.Turn.L_135)).toBe(225);
        });
    });
    describe('turnIsCardinal', () => {
        it('works', () => {
            expect(compass.turnIsCardinal(compass.Turn.NONE)).toBe(true);
            expect(compass.turnIsCardinal(compass.Turn.R_45)).toBe(false);
            expect(compass.turnIsCardinal(compass.Turn.T_180)).toBe(true);
            expect(compass.turnIsCardinal(compass.Turn.L_135)).toBe(false);
        });
    });
    describe('turnReverse', () => {
        it('works', () => {
            expect(compass.turnReverse(compass.Turn.NONE)).toBe(compass.Turn.NONE);
            expect(compass.turnReverse(compass.Turn.R_45)).toBe(compass.Turn.L_45);
            expect(compass.turnReverse(compass.Turn.T_180)).toBe(compass.Turn.T_180);
            expect(compass.turnReverse(compass.Turn.L_135)).toBe(compass.Turn.R_135);
        });
    });
    describe('turnFromCardinalDirections', () => {
        it('works', () => {
            expect(compass.turnFromCardinalDirections(compass.CardinalDirection.NORTH,
                                                            compass.CardinalDirection.NORTH))
                .toBe(compass.Turn.NONE);
            expect(compass.turnFromCardinalDirections(compass.CardinalDirection.NORTH,
                                                            compass.CardinalDirection.EAST))
                .toBe(compass.Turn.R_90);
            expect(compass.turnFromCardinalDirections(compass.CardinalDirection.NORTH,
                                                            compass.CardinalDirection.SOUTH))
                .toBe(compass.Turn.T_180);
            expect(compass.turnFromCardinalDirections(compass.CardinalDirection.NORTH,
                                                            compass.CardinalDirection.WEST))
                .toBe(compass.Turn.L_90);
            expect(compass.turnFromCardinalDirections(compass.CardinalDirection.WEST,
                                                            compass.CardinalDirection.WEST))
                .toBe(compass.Turn.NONE);
            expect(compass.turnFromCardinalDirections(compass.CardinalDirection.WEST,
                                                            compass.CardinalDirection.NORTH))
                .toBe(compass.Turn.R_90);
            expect(compass.turnFromCardinalDirections(compass.CardinalDirection.WEST,
                                                            compass.CardinalDirection.EAST))
                .toBe(compass.Turn.T_180);
            expect(compass.turnFromCardinalDirections(compass.CardinalDirection.WEST,
                                                            compass.CardinalDirection.SOUTH))
                .toBe(compass.Turn.L_90);
        });
    });
    describe('turnFromCardinalTurn', () => {
        it('works', () => {
            expect(compass.turnFromCardinalTurn(compass.CardinalTurn.NONE))
                .toBe(compass.Turn.NONE);
            expect(compass.turnFromCardinalTurn(compass.CardinalTurn.RIGHT))
                .toBe(compass.Turn.R_90);
            expect(compass.turnFromCardinalTurn(compass.CardinalTurn.AROUND))
                .toBe(compass.Turn.T_180);
            expect(compass.turnFromCardinalTurn(compass.CardinalTurn.LEFT))
                .toBe(compass.Turn.L_90);
        });
    });
    describe('turnFromDirections', () => {
        it('works', () => {
            expect(compass.turnFromDirections(compass.Direction.NORTH, compass.Direction.NORTH))
                .toBe(compass.Turn.NONE);
            expect(compass.turnFromDirections(compass.Direction.NORTH, compass.Direction.NORTHEAST))
                .toBe(compass.Turn.R_45);
            expect(compass.turnFromDirections(compass.Direction.NORTH, compass.Direction.SOUTHWEST))
                .toBe(compass.Turn.L_135);
            expect(compass.turnFromDirections(compass.Direction.NORTH, compass.Direction.WEST))
                .toBe(compass.Turn.L_90);
            expect(compass.turnFromDirections(compass.Direction.WEST, compass.Direction.NORTH))
                .toBe(compass.Turn.R_90);
            expect(compass.turnFromDirections(compass.Direction.WEST, compass.Direction.NORTHEAST))
                .toBe(compass.Turn.R_135);
            expect(compass.turnFromDirections(compass.Direction.WEST, compass.Direction.SOUTHWEST))
                .toBe(compass.Turn.L_45);
            expect(compass.turnFromDirections(compass.Direction.WEST, compass.Direction.WEST))
                .toBe(compass.Turn.NONE);
        });
    });
    describe('turnAddTurn', () => {
        it('works', () => {
            expect(compass.turnAddTurn(compass.Turn.NONE, compass.Turn.NONE))
                .toBe(compass.Turn.NONE);
            expect(compass.turnAddTurn(compass.Turn.NONE, compass.Turn.R_135))
                .toBe(compass.Turn.R_135);
            expect(compass.turnAddTurn(compass.Turn.R_135, compass.Turn.NONE))
                .toBe(compass.Turn.R_135);
            expect(compass.turnAddTurn(compass.Turn.R_135, compass.Turn.T_180))
                .toBe(compass.Turn.L_45);
            expect(compass.turnAddTurn(compass.Turn.L_90, compass.Turn.L_90))
                .toBe(compass.Turn.T_180);
        });
    });
});
