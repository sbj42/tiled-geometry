import * as compass from '../../src/compass';

describe('compass/axis', () => {
    describe('AXES', () => {
        it('has 2 axes', () => {
            expect(compass.AXES).toHaveLength(2);
        });
    });
    describe('axisToString', () => {
        it('works', () => {
            expect(compass.axisToString(compass.Axis.NORTH_SOUTH)).toBe('N-S');
            expect(compass.axisToString(compass.Axis.WEST_EAST)).toBe('W-E');
        });
    });
    describe('axisOrthogonal', () => {
        it('works', () => {
            expect(compass.axisOrthogonal(compass.Axis.NORTH_SOUTH)).toBe(compass.Axis.WEST_EAST);
            expect(compass.axisOrthogonal(compass.Axis.WEST_EAST)).toBe(compass.Axis.NORTH_SOUTH);
        });
    });
    describe('axisFromCardinalDirection', () => {
        it('works', () => {
            expect(compass.axisFromCardinalDirection(compass.CardinalDirection.NORTH))
                .toBe(compass.Axis.NORTH_SOUTH);
            expect(compass.axisFromCardinalDirection(compass.CardinalDirection.EAST))
                .toBe(compass.Axis.WEST_EAST);
            expect(compass.axisFromCardinalDirection(compass.CardinalDirection.SOUTH))
                .toBe(compass.Axis.NORTH_SOUTH);
            expect(compass.axisFromCardinalDirection(compass.CardinalDirection.WEST))
                .toBe(compass.Axis.WEST_EAST);
        });
    });
    describe('axisFromNorthSouthTurn', () => {
        it('works', () => {
            expect(compass.axisFromNorthSouthTurn(compass.CardinalTurn.NONE)).toBe(compass.Axis.NORTH_SOUTH);
            expect(compass.axisFromNorthSouthTurn(compass.CardinalTurn.RIGHT)).toBe(compass.Axis.WEST_EAST);
            expect(compass.axisFromNorthSouthTurn(compass.CardinalTurn.AROUND)).toBe(compass.Axis.NORTH_SOUTH);
            expect(compass.axisFromNorthSouthTurn(compass.CardinalTurn.LEFT)).toBe(compass.Axis.WEST_EAST);
        });
    });
    describe('axisAddCardinalTurn', () => {
        it('works', () => {
            expect(compass.axisAddCardinalTurn(compass.Axis.NORTH_SOUTH, compass.CardinalTurn.NONE))
                .toBe(compass.Axis.NORTH_SOUTH);
            expect(compass.axisAddCardinalTurn(compass.Axis.NORTH_SOUTH, compass.CardinalTurn.RIGHT))
                .toBe(compass.Axis.WEST_EAST);
            expect(compass.axisAddCardinalTurn(compass.Axis.NORTH_SOUTH, compass.CardinalTurn.AROUND))
                .toBe(compass.Axis.NORTH_SOUTH);
            expect(compass.axisAddCardinalTurn(compass.Axis.NORTH_SOUTH, compass.CardinalTurn.LEFT))
                .toBe(compass.Axis.WEST_EAST);
            expect(compass.axisAddCardinalTurn(compass.Axis.WEST_EAST, compass.CardinalTurn.NONE))
                .toBe(compass.Axis.WEST_EAST);
            expect(compass.axisAddCardinalTurn(compass.Axis.WEST_EAST, compass.CardinalTurn.RIGHT))
                .toBe(compass.Axis.NORTH_SOUTH);
            expect(compass.axisAddCardinalTurn(compass.Axis.WEST_EAST, compass.CardinalTurn.AROUND))
                .toBe(compass.Axis.WEST_EAST);
            expect(compass.axisAddCardinalTurn(compass.Axis.WEST_EAST, compass.CardinalTurn.LEFT))
                .toBe(compass.Axis.NORTH_SOUTH);
        });
    });
});
