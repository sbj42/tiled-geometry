import * as compass from '../../src/compass';
import * as grid from '../../src/grid';

const LOCAL_OFF = new grid.Offset();
const LOCAL_RECT = new grid.Rectangle();

describe('grid/transform-rectangle', () => {
    describe('#constructor()', () => {
        it('works with no arguments', () => {
            const t = new grid.TransformRectangle();
            expect(t.westX).toBe(0);
            expect(t.northY).toBe(0);
            expect(t.width).toBe(0);
            expect(t.height).toBe(0);
            expect(t.flip).toBe(compass.Flip.HEADS);
            expect(t.rotate).toBe(compass.CardinalTurn.NONE);
        });
        it('works with one argument', () => {
            const t = new grid.TransformRectangle({width: 2, height: 7});
            expect(t.westX).toBe(0);
            expect(t.northY).toBe(0);
            expect(t.width).toBe(2);
            expect(t.height).toBe(7);
            expect(t.flip).toBe(compass.Flip.HEADS);
            expect(t.rotate).toBe(compass.CardinalTurn.NONE);
        });
        it('works with two arguments', () => {
            const t = new grid.TransformRectangle(4, 5);
            expect(t.westX).toBe(0);
            expect(t.northY).toBe(0);
            expect(t.width).toBe(4);
            expect(t.height).toBe(5);
            expect(t.flip).toBe(compass.Flip.HEADS);
            expect(t.rotate).toBe(compass.CardinalTurn.NONE);
        });
    });
    describe('#toString()', () => {
        it('works', () => {
            const o1 = new grid.TransformRectangle(4, 5);
            expect(o1.toString()).toBe('[(4x5) -> H T0 (0,0) -> (0,0 4x5)]');
            const o2 = new grid.TransformRectangle(4, 5)
                .setTransform(compass.Flip.TAILS, compass.CardinalTurn.RIGHT, {x: 10, y: 15});
            expect(o2.toString()).toBe('[(4x5) -> T T+90 (10,15) -> (10,15 5x4)]');
        });
    });
    describe('#equals()', () => {
        it('works', () => {
            const o1 = new grid.TransformRectangle(4, 5);
            const o2 = new grid.TransformRectangle(4, 5)
                .setTransform(compass.Flip.TAILS, compass.CardinalTurn.RIGHT, {x: 10, y: 15});
            expect(o1.equals(o2)).toBe(false);
            expect(o2.equals(o2)).toBe(true);
            const o3 = new grid.TransformRectangle(4, 5);
            expect(o1.equals(o3)).toBe(true);
            const o4 = new grid.TransformRectangle(5, 4);
            expect(o1.equals(o4)).toBe(false);
            const o5 = new grid.TransformRectangle(4, 5)
                .setTransform(compass.Flip.TAILS, compass.CardinalTurn.LEFT, {x: 10, y: 15});
            expect(o1.equals(o5)).toBe(false);
            expect(o2.equals(o5)).toBe(false);
        });
    });
    describe('#flip', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(4, 5);
            expect(o.flip).toBe(compass.Flip.HEADS);
            o.setFlip(compass.Flip.TAILS);
            expect(o.flip).toBe(compass.Flip.TAILS);
            o.setFlip(compass.Flip.HEADS);
            expect(o.flip).toBe(compass.Flip.HEADS);
        });
    });
    describe('#rotate', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(4, 5);
            expect(o.rotate).toBe(compass.CardinalTurn.NONE);
            o.setRotate(compass.CardinalTurn.RIGHT);
            expect(o.rotate).toBe(compass.CardinalTurn.RIGHT);
            o.setRotate(compass.CardinalTurn.AROUND);
            expect(o.rotate).toBe(compass.CardinalTurn.AROUND);
        });
    });
    describe('rectangle accessors', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(4, 5)
                .setTransform(compass.Flip.TAILS, compass.CardinalTurn.RIGHT, {x: 10, y: 15});
            expect(o.northY).toBe(15);
            expect(o.westX).toBe(10);
            expect(o.southY).toBe(18);
            expect(o.eastX).toBe(14);
            expect(o.width).toBe(5);
            expect(o.height).toBe(4);
        });
    });
    describe('#copyFrom()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(4, 5)
                .setTransform(compass.Flip.TAILS, compass.CardinalTurn.LEFT, {x: 8, y: -5});
            const n = new grid.TransformRectangle().copyFrom(o);
            expect(o.equals(n)).toBe(true);
            expect(n.toString()).toBe('[(4x5) -> T T-90 (8,-5) -> (8,-5 5x4)]');
        });
    });
    describe('#setTranslate()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(4, 5)
                .setTransform(compass.Flip.TAILS, compass.CardinalTurn.LEFT, {x: 8, y: -5});
            expect(o.toString()).toBe('[(4x5) -> T T-90 (8,-5) -> (8,-5 5x4)]');
        });
    });
    describe('#reset()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(4, 5)
                .setTransform(compass.Flip.TAILS, compass.CardinalTurn.LEFT, {x: 8, y: -5});
            o.reset();
            expect(o.toString()).toBe('[(4x5) -> H T0 (0,0) -> (0,0 4x5)]');
        });
    });
    describe('#invert()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(4, 5)
                .setTransform(compass.Flip.HEADS, compass.CardinalTurn.LEFT, {x: 8, y: -5});
            o.invert();
            expect(o.toString()).toBe('[(5x4) -> H T+90 (-8,5) -> (-8,5 4x5)]');
        });
    });
    describe('#setTranslateOffset()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(4, 5)
                .setTranslateOffset({x: 8, y: -5});
            expect(o.toString()).toBe('[(4x5) -> H T0 (8,-5) -> (8,-5 4x5)]');
        });
    });
    describe('#applyToCardinalOrientation()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(10, 5);
            expect(o.applyToCardinalOrientation(compass.CardinalOrientation.HEADS_EAST))
                .toBe(compass.CardinalOrientation.HEADS_EAST);
            expect(o.applyToCardinalOrientation(compass.CardinalOrientation.TAILS_SOUTH))
                .toBe(compass.CardinalOrientation.TAILS_SOUTH);
            o.setRotate(compass.CardinalTurn.LEFT);
            expect(o.applyToCardinalOrientation(compass.CardinalOrientation.HEADS_EAST))
                .toBe(compass.CardinalOrientation.HEADS_NORTH);
            expect(o.applyToCardinalOrientation(compass.CardinalOrientation.TAILS_SOUTH))
                .toBe(compass.CardinalOrientation.TAILS_EAST);
            o.setFlip(compass.Flip.TAILS);
            expect(o.applyToCardinalOrientation(compass.CardinalOrientation.HEADS_EAST))
                .toBe(compass.CardinalOrientation.TAILS_SOUTH);
            expect(o.applyToCardinalOrientation(compass.CardinalOrientation.TAILS_SOUTH))
                .toBe(compass.CardinalOrientation.HEADS_EAST);
        });
    });
    describe('#unapplyFromCardinalOrientation()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(10, 5);
            expect(o.unapplyFromCardinalOrientation(compass.CardinalOrientation.HEADS_EAST))
                .toBe(compass.CardinalOrientation.HEADS_EAST);
            expect(o.unapplyFromCardinalOrientation(compass.CardinalOrientation.TAILS_SOUTH))
                .toBe(compass.CardinalOrientation.TAILS_SOUTH);
            o.setRotate(compass.CardinalTurn.LEFT);
            expect(o.unapplyFromCardinalOrientation(compass.CardinalOrientation.HEADS_EAST))
                .toBe(compass.CardinalOrientation.HEADS_SOUTH);
            expect(o.unapplyFromCardinalOrientation(compass.CardinalOrientation.TAILS_SOUTH))
                .toBe(compass.CardinalOrientation.TAILS_WEST);
            o.setFlip(compass.Flip.TAILS);
            expect(o.unapplyFromCardinalOrientation(compass.CardinalOrientation.HEADS_EAST))
                .toBe(compass.CardinalOrientation.TAILS_SOUTH);
            expect(o.unapplyFromCardinalOrientation(compass.CardinalOrientation.TAILS_SOUTH))
                .toBe(compass.CardinalOrientation.HEADS_EAST);
        });
    });
    describe('#applyToCardinalDirection()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(10, 5);
            expect(o.applyToCardinalDirection(compass.CardinalDirection.EAST))
                .toBe(compass.CardinalDirection.EAST);
            expect(o.applyToCardinalDirection(compass.CardinalDirection.SOUTH))
                .toBe(compass.CardinalDirection.SOUTH);
            o.setRotate(compass.CardinalTurn.RIGHT);
            expect(o.applyToCardinalDirection(compass.CardinalDirection.EAST))
                .toBe(compass.CardinalDirection.SOUTH);
            expect(o.applyToCardinalDirection(compass.CardinalDirection.SOUTH))
                .toBe(compass.CardinalDirection.WEST);
            o.setFlip(compass.Flip.TAILS);
            expect(o.applyToCardinalDirection(compass.CardinalDirection.EAST))
                .toBe(compass.CardinalDirection.NORTH);
            expect(o.applyToCardinalDirection(compass.CardinalDirection.SOUTH))
                .toBe(compass.CardinalDirection.WEST);
        });
    });
    describe('#unapplyFromCardinalDirection()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(10, 5);
            expect(o.unapplyFromCardinalDirection(compass.CardinalDirection.EAST))
                .toBe(compass.CardinalDirection.EAST);
            expect(o.unapplyFromCardinalDirection(compass.CardinalDirection.SOUTH))
                .toBe(compass.CardinalDirection.SOUTH);
            o.setRotate(compass.CardinalTurn.RIGHT);
            expect(o.unapplyFromCardinalDirection(compass.CardinalDirection.EAST))
                .toBe(compass.CardinalDirection.NORTH);
            expect(o.unapplyFromCardinalDirection(compass.CardinalDirection.SOUTH))
                .toBe(compass.CardinalDirection.EAST);
            o.setFlip(compass.Flip.TAILS);
            expect(o.unapplyFromCardinalDirection(compass.CardinalDirection.EAST))
                .toBe(compass.CardinalDirection.NORTH);
            expect(o.unapplyFromCardinalDirection(compass.CardinalDirection.SOUTH))
                .toBe(compass.CardinalDirection.WEST);
        });
    });
    describe('#applyTo()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(10, 5);
            expect(o.applyTo(LOCAL_OFF, 6, 1).toString()).toBe(`(6,1)`);
            o.setRotate(compass.CardinalTurn.RIGHT);
            expect(o.applyTo(LOCAL_OFF, 6, 1).toString()).toBe(`(3,6)`);
            o.setTranslate(10, 20);
            expect(o.applyTo(LOCAL_OFF, 6, 1).toString()).toBe(`(13,26)`);
            o.setFlip(compass.Flip.TAILS);
            expect(o.applyTo(LOCAL_OFF, 6, 1).toString()).toBe(`(13,23)`);
            o.setRotate(compass.CardinalTurn.AROUND);
            expect(o.applyTo(LOCAL_OFF, 6, 1).toString()).toBe(`(16,23)`);
        });
    });
    describe('#unapplyFrom()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(10, 5);
            expect(o.unapplyFrom(LOCAL_OFF, 6, 1).toString()).toBe(`(6,1)`);
            o.setRotate(compass.CardinalTurn.RIGHT);
            expect(o.unapplyFrom(LOCAL_OFF, 3, 6).toString()).toBe(`(6,1)`);
            o.setTranslate(10, 20);
            expect(o.unapplyFrom(LOCAL_OFF, 13, 26).toString()).toBe(`(6,1)`);
            o.setFlip(compass.Flip.TAILS);
            expect(o.unapplyFrom(LOCAL_OFF, 13, 23).toString()).toBe(`(6,1)`);
            o.setRotate(compass.CardinalTurn.AROUND);
            expect(o.unapplyFrom(LOCAL_OFF, 16, 23).toString()).toBe(`(6,1)`);
        });
    });
    describe('#applyToOffset()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(10, 5)
                .setTransform(compass.Flip.TAILS, compass.CardinalTurn.RIGHT, {x: 10, y: 20});
            expect(o.applyToOffset(LOCAL_OFF.set(6, 1)).toString()).toBe(`(13,23)`);
            expect(o.applyToOffset(LOCAL_OFF, {x: 0, y: 0}).toString()).toBe(`(14,29)`);
        });
    });
    describe('#unapplyFromOffset()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(10, 5)
                .setTransform(compass.Flip.TAILS, compass.CardinalTurn.RIGHT, {x: 10, y: 20});
            expect(o.unapplyFromOffset(LOCAL_OFF.set(13, 23)).toString()).toBe(`(6,1)`);
            expect(o.unapplyFromOffset(LOCAL_OFF, {x: 14, y: 29}).toString()).toBe(`(0,0)`);
        });
    });
    describe('#applyToRectangle()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(10, 5)
                .setTransform(compass.Flip.TAILS, compass.CardinalTurn.RIGHT, {x: 10, y: 20});
            expect(o.applyToRectangle(LOCAL_RECT.set(3, 1, 5, 2)).toString()).toBe(`(12,22 2x5)`);
            expect(o.applyToRectangle(LOCAL_RECT, {westX: 0, northY: 0, width: 2, height: 1}).toString())
                .toBe(`(14,28 1x2)`);
        });
    });
    describe('#unapplyFromRectangle()', () => {
        it('works', () => {
            const o = new grid.TransformRectangle(10, 5)
                .setTransform(compass.Flip.TAILS, compass.CardinalTurn.RIGHT, {x: 10, y: 20});
            expect(o.unapplyFromRectangle(LOCAL_RECT.set(12, 22, 2, 5)).toString()).toBe(`(3,1 5x2)`);
            expect(o.unapplyFromRectangle(LOCAL_RECT, {westX: 14, northY: 28, width: 1, height: 2}).toString())
                .toBe(`(0,0 2x1)`);
        });
    });
});
