import * as compass from '../../src/compass';
import * as grid from '../../src/grid';

function countIterator<T>(gen: Iterator<T>) {
    let count = 0;
    while (!gen.next().done) {
        count ++;
    }
    return count;
}

describe('grid/offset', () => {
    it('starts at 0,0', () => {
        const o = new grid.Offset();
        expect(o.x).toBe(0);
        expect(o.y).toBe(0);
    });
    it('is mutable', () => {
        const o = new grid.Offset();
        o.x = 1;
        expect(o.x).toBe(1);
    });
    describe('#constructor()', () => {
        it('works', () => {
            const o = new grid.Offset(1, 2);
            expect(o.x).toBe(1);
            expect(o.y).toBe(2);
        });
    });
    describe('#set()', () => {
        it('works', () => {
            const o = new grid.Offset().set(1, 2);
            expect(o.x).toBe(1);
            expect(o.y).toBe(2);
        });
    });
    describe('#toString()', () => {
        it('works', () => {
            expect(new grid.Offset(1, 2).toString()).toBe('(1,2)');
            expect(new grid.Offset(-3, -4).toString()).toBe('(-3,-4)');
        });
    });
    describe('#equals()', () => {
        it('works', () => {
            expect(new grid.Offset(1, 2).equals({x: 1, y: 2})).toBe(true);
            expect(new grid.Offset(1, 2).equals({x: 2, y: 2})).toBe(false);
            expect(new grid.Offset(1, 2).equals({x: 1, y: 1})).toBe(false);
        });
    });
    describe('#copyFrom()', () => {
        it('works', () => {
            expect(new grid.Offset().copyFrom(new grid.Offset(1, 2)).toString()).toBe('(1,2)');
            expect(new grid.Offset().copyFrom({y: 2, x: 1}).toString()).toBe('(1,2)');
        });
    });
    describe('#setFromDirection()', () => {
        it('works', () => {
            expect(new grid.Offset().setFromDirection(compass.Direction.NORTH).toString()).toBe('(0,-1)');
            expect(new grid.Offset().setFromDirection(compass.Direction.SOUTHEAST).toString()).toBe('(1,1)');
            expect(new grid.Offset().setFromDirection(compass.Direction.WEST).toString()).toBe('(-1,0)');
            expect(new grid.Offset().setFromDirection(compass.Direction.NORTHWEST).toString()).toBe('(-1,-1)');
        });
    });
    describe('#setFromCardinalDirection()', () => {
        it('works', () => {
            expect(new grid.Offset().setFromCardinalDirection(compass.CardinalDirection.NORTH).toString())
                .toBe('(0,-1)');
            expect(new grid.Offset().setFromCardinalDirection(compass.CardinalDirection.EAST).toString())
                .toBe('(1,0)');
            expect(new grid.Offset().setFromCardinalDirection(compass.CardinalDirection.SOUTH).toString())
                .toBe('(0,1)');
            expect(new grid.Offset().setFromCardinalDirection(compass.CardinalDirection.WEST).toString())
                .toBe('(-1,0)');
        });
    });
    describe('#add()', () => {
        it('works', () => {
            expect(new grid.Offset(1, 2).add(-3, 4).toString()).toBe('(-2,6)');
        });
    });
    describe('#addSize()', () => {
        it('works', () => {
            expect(new grid.Offset(1, 2).addSize({width: 3, height: 4}).toString()).toBe('(4,6)');
        });
    });
    describe('#addOffset()', () => {
        it('works', () => {
            expect(new grid.Offset(1, 2).addOffset({x: -3, y: -5}).toString()).toBe('(-2,-3)');
        });
    });
    describe('#addDirection()', () => {
        it('works', () => {
            expect(new grid.Offset(1, 2).addDirection(compass.Direction.NORTH).toString()).toBe('(1,1)');
            expect(new grid.Offset(1, 2).addDirection(compass.Direction.EAST).toString()).toBe('(2,2)');
            expect(new grid.Offset(1, 2).addDirection(compass.Direction.SOUTHWEST).toString()).toBe('(0,3)');
        });
    });
    describe('#addCardinalDirection()', () => {
        it('works', () => {
            expect(new grid.Offset(1, 2).addCardinalDirection(compass.CardinalDirection.NORTH).toString())
                .toBe('(1,1)');
            expect(new grid.Offset(1, 2).addCardinalDirection(compass.CardinalDirection.EAST).toString())
                .toBe('(2,2)');
            expect(new grid.Offset(1, 2).addCardinalDirection(compass.CardinalDirection.SOUTH).toString())
                .toBe('(1,3)');
        });
    });
    describe('#subtractOffset()', () => {
        it('works', () => {
            expect(new grid.Offset(1, 2).subtractOffset({x: 3, y: 5}).toString()).toBe('(-2,-3)');
        });
    });
    describe('#multiply()', () => {
        it('works', () => {
            expect(new grid.Offset(1, 2).multiply(3).toString()).toBe('(3,6)');
        });
    });
    describe('#rotate()', () => {
        it('works without anchor', () => {
            expect(new grid.Offset(1, 2).rotate(compass.CardinalTurn.NONE).toString()).toBe('(1,2)');
            expect(new grid.Offset(1, 2).rotate(compass.CardinalTurn.RIGHT).toString()).toBe('(-2,1)');
            expect(new grid.Offset(1, 2).rotate(compass.CardinalTurn.AROUND).toString()).toBe('(-1,-2)');
            expect(new grid.Offset(1, 2).rotate(compass.CardinalTurn.LEFT).toString()).toBe('(2,-1)');
        });
        it('works with anchor', () => {
            expect(new grid.Offset(1, 2)
                .rotate(compass.CardinalTurn.NONE, {x: 2, y: 1}).toString()).toBe('(1,2)');
            expect(new grid.Offset(1, 2)
                .rotate(compass.CardinalTurn.RIGHT, {x: 2, y: 1}).toString()).toBe('(1,0)');
            expect(new grid.Offset(1, 2)
                .rotate(compass.CardinalTurn.AROUND, {x: 2, y: 1}).toString()).toBe('(3,0)');
            expect(new grid.Offset(1, 2)
                .rotate(compass.CardinalTurn.LEFT, {x: 2, y: 1}).toString()).toBe('(3,2)');
        });
    });
    describe('#distanceChebyshev()', () => {
        it('works', () => {
            expect(new grid.Offset(1, 2).distanceChebyshev({x: 1, y: 2})).toBe(0);
            expect(new grid.Offset(1, 2).distanceChebyshev({x: 2, y: 1})).toBe(1);
            expect(new grid.Offset(1, 2).distanceChebyshev({x: 2, y: 2})).toBe(1);
            expect(new grid.Offset(1, 2).distanceChebyshev({x: -5, y: 7})).toBe(6);
        });
    });
    describe('#distanceManhattan()', () => {
        it('works', () => {
            expect(new grid.Offset(1, 2).distanceManhattan({x: 1, y: 2})).toBe(0);
            expect(new grid.Offset(1, 2).distanceManhattan({x: 2, y: 1})).toBe(2);
            expect(new grid.Offset(1, 2).distanceManhattan({x: 2, y: 2})).toBe(1);
            expect(new grid.Offset(1, 2).distanceManhattan({x: -5, y: 7})).toBe(11);
        });
    });
    describe('#nearbyChebyshevOffsets()', () => {
        it('returns the right number of offsets', () => {
            const cursor = new grid.Offset();
            expect(countIterator(new grid.Offset().nearbyChebyshevOffsets(cursor, 0))).toBe(1);
            expect(countIterator(new grid.Offset().nearbyChebyshevOffsets(cursor, 1))).toBe(9);
            expect(countIterator(new grid.Offset().nearbyChebyshevOffsets(cursor, 2))).toBe(25);
        });
        it('returns offsets in the right area', () => {
            const cursor = new grid.Offset();
            for (const off of new grid.Offset(10, 20).nearbyChebyshevOffsets(cursor, 3)) {
                expect(off.x >= 10 - 3).toBe(true);
                expect(off.x <= 10 + 3).toBe(true);
                expect(off.y >= 20 - 3).toBe(true);
                expect(off.y <= 20 + 3).toBe(true);
            }
        });
        it('returns nothing for negative radius', () => {
            const cursor = new grid.Offset();
            expect(countIterator(new grid.Offset().nearbyChebyshevOffsets(cursor, -1))).toBe(0);
        });
    });
});
