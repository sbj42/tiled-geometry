import * as compass from '../../src/compass';
import * as grid from '../../src/grid';

function countIterator<T>(gen: Iterator<T>) {
    let count = 0;
    while (!gen.next().done) {
        count ++;
    }
    return count;
}

describe('grid/size', () => {
    it('starts at 0x0', () => {
        const o = new grid.Size();
        expect(o.width).toBe(0);
        expect(o.height).toBe(0);
    });
    it('is mutable', () => {
        const o = new grid.Size();
        o.width = 1;
        expect(o.width).toBe(1);
    });
    describe('#constructor()', () => {
        it('works', () => {
            const o = new grid.Size(1, 2);
            expect(o.width).toBe(1);
            expect(o.height).toBe(2);
        });
        it('throws for negative values', () => {
            expect(() => new grid.Size(-3, -4)).toThrow();
        });
    });
    describe('#set()', () => {
        it('works', () => {
            const o = new grid.Size().set(1, 2);
            expect(o.width).toBe(1);
            expect(o.height).toBe(2);
        });
        it('throws for negative values', () => {
            expect(() => new grid.Size().set(-3, -4)).toThrow();
        });
    });
    describe('#toString()', () => {
        it('works', () => {
            expect(new grid.Size(1, 2).toString()).toBe('(1x2)');
        });
    });
    describe('#equals()', () => {
        it('works', () => {
            expect(new grid.Size(1, 2).equals({width: 1, height: 2})).toBe(true);
            expect(new grid.Size(1, 2).equals({width: 2, height: 2})).toBe(false);
            expect(new grid.Size(1, 2).equals({width: 1, height: 1})).toBe(false);
        });
    });
    describe('#empty', () => {
        it('works', () => {
            expect(new grid.Size(0, 0).empty).toBe(true);
            expect(new grid.Size(1, 0).empty).toBe(true);
            expect(new grid.Size(0, 1).empty).toBe(true);
            expect(new grid.Size(1, 1).empty).toBe(false);
        });
    });
    describe('#area', () => {
        it('works', () => {
            expect(new grid.Size(0, 0).area).toBe(0);
            expect(new grid.Size(1, 0).area).toBe(0);
            expect(new grid.Size(0, 1).area).toBe(0);
            expect(new grid.Size(1, 1).area).toBe(1);
            expect(new grid.Size(3, 4).area).toBe(12);
            expect(new grid.Size(4, 3).area).toBe(12);
        });
    });
    describe('#copyFrom()', () => {
        it('works', () => {
            expect(new grid.Size().copyFrom(new grid.Size(1, 2)).toString()).toBe('(1x2)');
            expect(new grid.Size().copyFrom({height: 2, width: 1}).toString()).toBe('(1x2)');
        });
    });
    describe('#add()', () => {
        it('works', () => {
            expect(new grid.Size().add(1, 2).toString()).toBe('(1x2)');
            expect(new grid.Size(3, 5).add(1, 2).toString()).toBe('(4x7)');
        });
    });
    describe('#multiply()', () => {
        it('works', () => {
            expect(new grid.Size(1, 2).multiply(3).toString()).toBe('(3x6)');
        });
    });
    describe('#rotate()', () => {
        it('works without anchor', () => {
            expect(new grid.Size(3, 4).rotate(compass.CardinalTurn.NONE).toString()).toBe('(3x4)');
            expect(new grid.Size(3, 4).rotate(compass.CardinalTurn.RIGHT).toString()).toBe('(4x3)');
            expect(new grid.Size(3, 4).rotate(compass.CardinalTurn.AROUND).toString()).toBe('(3x4)');
            expect(new grid.Size(3, 4).rotate(compass.CardinalTurn.LEFT).toString()).toBe('(4x3)');
        });
    });
    describe('#containsOffset()', () => {
        it('works', () => {
            expect(new grid.Size(5, 10).containsOffset({x: 3, y: 6})).toBe(true);
            expect(new grid.Size(5, 10).containsOffset({x: -3, y: 6})).toBe(false);
            expect(new grid.Size(5, 10).containsOffset({x: 3, y: -6})).toBe(false);
            expect(new grid.Size(5, 10).containsOffset({x: 6, y: 3})).toBe(false);
            expect(new grid.Size(5, 10).containsOffset({x: 3, y: 11})).toBe(false);
            expect(new grid.Size(5, 10).containsOffset({x: 0, y: 0})).toBe(true);
            expect(new grid.Size(5, 10).containsOffset({x: 4, y: 9})).toBe(true);
            expect(new grid.Size(5, 10).containsOffset({x: 5, y: 9})).toBe(false);
            expect(new grid.Size(5, 10).containsOffset({x: 4, y: 10})).toBe(false);
            expect(new grid.Size(5, 10).containsOffset({x: 5, y: 10})).toBe(false);
        });
    });
    describe('#forEach()', () => {
        it('returns the right number of offsets', () => {
            expect(countIterator(new grid.Size().offsets())).toBe(0);
            expect(countIterator(new grid.Size(100, 0).offsets())).toBe(0);
            expect(countIterator(new grid.Size(4, 3).offsets())).toBe(12);
            expect(countIterator(new grid.Size(5, 10).offsets())).toBe(50);
        });
        it('returns offsets in the right area', () => {
            for (const off of new grid.Size(3, 5).offsets()) {
                expect(off.x).toBeGreaterThanOrEqual(0);
                expect(off.x).toBeLessThan(3);
                expect(off.y).toBeGreaterThanOrEqual(0);
                expect(off.y).toBeLessThan(5);
            }
        });
    });
    describe('#anyOf()', () => {
        it('works', () => {
            expect(new grid.Size().anyOf(() => true)).toBe(false);
            expect(new grid.Size(1, 0).anyOf(() => true)).toBe(false);
            expect(new grid.Size(3, 2).anyOf((x, y) => x === 2 && y === 1)).toBe(true);
            expect(new grid.Size(3, 2).anyOf((x, y) => x === 10)).toBe(false);
        });
    });
});
