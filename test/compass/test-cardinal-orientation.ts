import * as compass from '../../src/compass';

describe('compass/cardinal-orientation', () => {
    describe('CARDINAL_ORIENTATIONS', () => {
        it('has 8 directions', () => {
            expect(compass.CARDINAL_ORIENTATIONS).toHaveLength(8);
        });
    });
    describe('cardinalOrientationToString', () => {
        it('works', () => {
            expect(compass.cardinalOrientationToString(compass.CardinalOrientation.HEADS_NORTH)).toBe('HN');
            expect(compass.cardinalOrientationToString(compass.CardinalOrientation.HEADS_SOUTH)).toBe('HS');
            expect(compass.cardinalOrientationToString(compass.CardinalOrientation.TAILS_EAST)).toBe('TE');
            expect(compass.cardinalOrientationToString(compass.CardinalOrientation.TAILS_WEST)).toBe('TW');
        });
    });
    describe('cardinalOrientationFlip', () => {
        it('works', () => {
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.HEADS_NORTH,
                                                         compass.Axis.NORTH_SOUTH))
                .toBe(compass.CardinalOrientation.TAILS_NORTH);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.HEADS_EAST,
                                                         compass.Axis.NORTH_SOUTH))
                .toBe(compass.CardinalOrientation.TAILS_WEST);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.HEADS_SOUTH,
                                                         compass.Axis.NORTH_SOUTH))
                .toBe(compass.CardinalOrientation.TAILS_SOUTH);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.HEADS_WEST,
                                                         compass.Axis.NORTH_SOUTH))
                .toBe(compass.CardinalOrientation.TAILS_EAST);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.TAILS_NORTH,
                                                         compass.Axis.NORTH_SOUTH))
                .toBe(compass.CardinalOrientation.HEADS_NORTH);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.TAILS_EAST,
                                                         compass.Axis.NORTH_SOUTH))
                .toBe(compass.CardinalOrientation.HEADS_WEST);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.TAILS_SOUTH,
                                                         compass.Axis.NORTH_SOUTH))
                .toBe(compass.CardinalOrientation.HEADS_SOUTH);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.TAILS_WEST,
                                                         compass.Axis.NORTH_SOUTH))
                .toBe(compass.CardinalOrientation.HEADS_EAST);

            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.HEADS_NORTH,
                                                         compass.Axis.WEST_EAST))
                .toBe(compass.CardinalOrientation.TAILS_SOUTH);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.HEADS_EAST,
                                                         compass.Axis.WEST_EAST))
                .toBe(compass.CardinalOrientation.TAILS_EAST);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.HEADS_SOUTH,
                                                         compass.Axis.WEST_EAST))
                .toBe(compass.CardinalOrientation.TAILS_NORTH);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.HEADS_WEST,
                                                         compass.Axis.WEST_EAST))
                .toBe(compass.CardinalOrientation.TAILS_WEST);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.TAILS_NORTH,
                                                         compass.Axis.WEST_EAST))
                .toBe(compass.CardinalOrientation.HEADS_SOUTH);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.TAILS_EAST,
                                                         compass.Axis.WEST_EAST))
                .toBe(compass.CardinalOrientation.HEADS_EAST);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.TAILS_SOUTH,
                                                         compass.Axis.WEST_EAST))
                .toBe(compass.CardinalOrientation.HEADS_NORTH);
            expect(compass.cardinalOrientationFlip(compass.CardinalOrientation.TAILS_WEST,
                                                         compass.Axis.WEST_EAST))
                .toBe(compass.CardinalOrientation.HEADS_WEST);
        });
    });
    describe('cardinalOrientationReverse', () => {
        it('works', () => {
            expect(compass.cardinalOrientationReverse(compass.CardinalOrientation.HEADS_NORTH))
                .toBe(compass.CardinalOrientation.HEADS_NORTH);
            expect(compass.cardinalOrientationReverse(compass.CardinalOrientation.HEADS_EAST))
                .toBe(compass.CardinalOrientation.HEADS_WEST);
            expect(compass.cardinalOrientationReverse(compass.CardinalOrientation.HEADS_SOUTH))
                .toBe(compass.CardinalOrientation.HEADS_SOUTH);
            expect(compass.cardinalOrientationReverse(compass.CardinalOrientation.HEADS_WEST))
                .toBe(compass.CardinalOrientation.HEADS_EAST);
            expect(compass.cardinalOrientationReverse(compass.CardinalOrientation.TAILS_NORTH))
                .toBe(compass.CardinalOrientation.TAILS_NORTH);
            expect(compass.cardinalOrientationReverse(compass.CardinalOrientation.TAILS_EAST))
                .toBe(compass.CardinalOrientation.TAILS_EAST);
            expect(compass.cardinalOrientationReverse(compass.CardinalOrientation.TAILS_SOUTH))
                .toBe(compass.CardinalOrientation.TAILS_SOUTH);
            expect(compass.cardinalOrientationReverse(compass.CardinalOrientation.TAILS_WEST))
                .toBe(compass.CardinalOrientation.TAILS_WEST);
        });
    });
    describe('cardinalOrientationFromFlipAndCardinalDirection', () => {
        it('works', () => {
            expect(
                compass.cardinalOrientationFromFlipAndCardinalDirection(compass.Flip.HEADS,
                                                                        compass.CardinalDirection.NORTH))
                .toBe(compass.CardinalOrientation.HEADS_NORTH);
            expect(
                compass.cardinalOrientationFromFlipAndCardinalDirection(compass.Flip.TAILS,
                                                                        compass.CardinalDirection.NORTH))
                .toBe(compass.CardinalOrientation.TAILS_NORTH);
            expect(
                compass.cardinalOrientationFromFlipAndCardinalDirection(compass.Flip.HEADS,
                                                                        compass.CardinalDirection.EAST))
                .toBe(compass.CardinalOrientation.HEADS_EAST);
            expect(
                compass.cardinalOrientationFromFlipAndCardinalDirection(compass.Flip.TAILS,
                                                                        compass.CardinalDirection.EAST))
                .toBe(compass.CardinalOrientation.TAILS_EAST);
        });
    });
    describe('cardinalOrientationAddCardinalTurn', () => {
        it('works', () => {
            expect(
                compass.cardinalOrientationAddCardinalTurn(compass.CardinalOrientation.HEADS_NORTH,
                                                           compass.CardinalTurn.NONE))
                .toBe(compass.CardinalOrientation.HEADS_NORTH);
            expect(
                compass.cardinalOrientationAddCardinalTurn(compass.CardinalOrientation.TAILS_NORTH,
                                                           compass.CardinalTurn.RIGHT))
                .toBe(compass.CardinalOrientation.TAILS_EAST);
            expect(
                compass.cardinalOrientationAddCardinalTurn(compass.CardinalOrientation.HEADS_WEST,
                                                           compass.CardinalTurn.LEFT))
                .toBe(compass.CardinalOrientation.HEADS_SOUTH);
            expect(
                compass.cardinalOrientationAddCardinalTurn(compass.CardinalOrientation.TAILS_WEST,
                                                           compass.CardinalTurn.AROUND))
                .toBe(compass.CardinalOrientation.TAILS_EAST);
        });
    });
});
