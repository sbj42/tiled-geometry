import * as compass from '../../src/compass';

describe('compass/direction', () => {
    describe('DIRECTIONS', () => {
        it('has 8 directions', () => {
            expect(compass.DIRECTIONS).toHaveLength(8);
        });
    });
    describe('directionToString', () => {
        it('works', () => {
            expect(compass.directionToString(compass.Direction.NORTH)).toBe('N');
            expect(compass.directionToString(compass.Direction.SOUTHEAST)).toBe('SE');
            expect(compass.directionToString(compass.Direction.WEST)).toBe('W');
        });
    });
    describe('directionIsCardinal', () => {
        it('works', () => {
            expect(compass.directionIsCardinal(compass.Direction.NORTH)).toBe(true);
            expect(compass.directionIsCardinal(compass.Direction.SOUTHEAST)).toBe(false);
            expect(compass.directionIsCardinal(compass.Direction.WEST)).toBe(true);
            expect(compass.directionIsCardinal(compass.Direction.NORTHWEST)).toBe(false);
        });
    });
    describe('directionOpposite', () => {
        it('works', () => {
            expect(compass.directionOpposite(compass.Direction.NORTH)).toBe(compass.Direction.SOUTH);
            expect(compass.directionOpposite(compass.Direction.SOUTHEAST)).toBe(compass.Direction.NORTHWEST);
            expect(compass.directionOpposite(compass.Direction.WEST)).toBe(compass.Direction.EAST);
            expect(compass.directionOpposite(compass.Direction.NORTHWEST)).toBe(compass.Direction.SOUTHEAST);
        });
    });
    describe('directionFromCardinalDirection', () => {
        it('works', () => {
            expect(compass.directionFromCardinalDirection(compass.CardinalDirection.NORTH))
                .toBe(compass.Direction.NORTH);
            expect(compass.directionFromCardinalDirection(compass.CardinalDirection.EAST))
                .toBe(compass.Direction.EAST);
            expect(compass.directionFromCardinalDirection(compass.CardinalDirection.SOUTH))
                .toBe(compass.Direction.SOUTH);
            expect(compass.directionFromCardinalDirection(compass.CardinalDirection.WEST))
                .toBe(compass.Direction.WEST);
        });
    });
    describe('directionAddTurn', () => {
        it('works', () => {
            expect(compass.directionAddTurn(compass.Direction.NORTH, compass.Turn.NONE))
                .toBe(compass.Direction.NORTH);
            expect(compass.directionAddTurn(compass.Direction.NORTH, compass.Turn.R_45))
                .toBe(compass.Direction.NORTHEAST);
            expect(compass.directionAddTurn(compass.Direction.NORTH, compass.Turn.R_135))
                .toBe(compass.Direction.SOUTHEAST);
            expect(compass.directionAddTurn(compass.Direction.NORTH, compass.Turn.L_90))
                .toBe(compass.Direction.WEST);
            expect(compass.directionAddTurn(compass.Direction.SOUTHEAST, compass.Turn.NONE))
                .toBe(compass.Direction.SOUTHEAST);
            expect(compass.directionAddTurn(compass.Direction.SOUTHEAST, compass.Turn.R_45))
                .toBe(compass.Direction.SOUTH);
            expect(compass.directionAddTurn(compass.Direction.SOUTHEAST, compass.Turn.R_135))
                .toBe(compass.Direction.WEST);
            expect(compass.directionAddTurn(compass.Direction.SOUTHEAST, compass.Turn.L_90))
                .toBe(compass.Direction.NORTHEAST);
        });
    });
    describe('directionAddCardinalTurn', () => {
        it('works', () => {
            expect(compass.directionAddCardinalTurn(compass.Direction.NORTH, compass.CardinalTurn.NONE))
                .toBe(compass.Direction.NORTH);
            expect(compass.directionAddCardinalTurn(compass.Direction.NORTH, compass.CardinalTurn.RIGHT))
                .toBe(compass.Direction.EAST);
            expect(compass.directionAddCardinalTurn(compass.Direction.NORTH, compass.CardinalTurn.AROUND))
                .toBe(compass.Direction.SOUTH);
            expect(compass.directionAddCardinalTurn(compass.Direction.NORTH, compass.CardinalTurn.LEFT))
                .toBe(compass.Direction.WEST);
            expect(compass.directionAddCardinalTurn(compass.Direction.SOUTHEAST, compass.CardinalTurn.NONE))
                .toBe(compass.Direction.SOUTHEAST);
            expect(compass.directionAddCardinalTurn(compass.Direction.SOUTHEAST, compass.CardinalTurn.RIGHT))
                .toBe(compass.Direction.SOUTHWEST);
            expect(compass.directionAddCardinalTurn(compass.Direction.SOUTHEAST, compass.CardinalTurn.AROUND))
                .toBe(compass.Direction.NORTHWEST);
            expect(compass.directionAddCardinalTurn(compass.Direction.SOUTHEAST, compass.CardinalTurn.LEFT))
                .toBe(compass.Direction.NORTHEAST);
        });
    });
});
