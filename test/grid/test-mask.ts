import * as grid from '../../src/grid';

function countIterator<T>(gen: Iterator<T>) {
    let count = 0;
    while (!gen.next().done) {
        count ++;
    }
    return count;
}

describe('grid/mask', () => {
    describe('#constructor()', () => {
        it('starts filled with false', () => {
            const o = new grid.Mask({width: 10, height: 11});
            expect(o.width).toBe(10);
            expect(o.height).toBe(11);
            expect(o.get(1, 2)).toBe(false);
        });
        it('can be filled with true', () => {
            const o = new grid.Mask({width: 10, height: 11}, true);
            expect(o.width).toBe(10);
            expect(o.height).toBe(11);
            expect(o.get(1, 2)).toBe(true);
        });
    });
    describe('#toString()', () => {
        it('works', () => {
            const o = new grid.Mask({width: 3, height: 3});
            o.set(0, 0, true);
            o.set(1, 1, true);
            o.set(2, 1, true);
            expect(o.toString()).toBe('☑☐☐\n☐☑☑\n☐☐☐\n');
        });
    });
    describe('#equals()', () => {
        it('works', () => {
            const o = new grid.Mask({width: 3, height: 3});
            o.set(0, 0, true);
            o.set(2, 1, true);
            const o1 = new grid.Mask({width: 3, height: 3});
            o1.set(0, 0, true);
            o1.set(2, 1, true);
            expect(o.equals(o1)).toBe(true);
            const o2 = new grid.Mask({width: 3, height: 3});
            o2.set(0, 0, true);
            o2.set(1, 2, true);
            expect(o.equals(o2)).toBe(false);
            const o3 = new grid.Mask({width: 4, height: 3});
            o3.set(0, 0, true);
            o2.set(2, 1, true);
            expect(o.equals(o3)).toBe(false);
        });
    });
    describe('#copyFrom()', () => {
        it('works', () => {
            const o = new grid.Mask({width: 10, height: 11});
            o.set(1, 2, true);
            const n = new grid.Mask().copyFrom(o);
            expect(n.width).toBe(o.width);
            expect(n.height).toBe(o.height);
            expect(n.get(1, 2)).toBe(true);
            expect(n.get(2, 1)).toBe(false);
        });
    });
    describe('#set()', () => {
        it('works', () => {
            const o = new grid.Mask({width: 10, height: 11});
            o.set(1, 2, true);
            expect(o.get(1, 2)).toBe(true);
            expect(o.getAtOffset({x: 1, y: 2})).toBe(true);
            o.setAtOffset({x: 1, y: 2}, false);
            expect(o.get(1, 2)).toBe(false);
        });
    });
    describe('#forEach()', () => {
        it('works', () => {
            const o = new grid.Mask({width: 6, height: 6});
            o.set(0, 0, true);
            o.set(1, 1, true);
            o.set(3, 5, true);
            let c = 0;
            for (const {x, y, value} of o.locations()) {
                if (value) {
                    c ++;
                }
                if (x === 0 && y === 0) {
                    expect(value).toBe(true);
                } else if (x === 1 && y === 1) {
                    expect(value).toBe(true);
                } else if (x === 3 && y === 5) {
                    expect(value).toBe(true);
                } else {
                    expect(value).toBe(false);
                }
            }
            expect(c).toBe(3);
        });
    });
    describe('#forEachTrue()', () => {
        it('returns the right count', () => {
            const o = new grid.Mask({width: 6, height: 6});
            o.set(0, 0, true);
            o.set(1, 1, true);
            o.set(3, 5, true);
            expect(countIterator(o.offsetsWithTrue())).toBe(3);
        });
    });
});
