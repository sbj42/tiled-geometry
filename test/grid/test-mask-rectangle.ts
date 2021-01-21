import * as grid from '../../src/grid';

function countIterator<T>(gen: Iterator<T>) {
    let count = 0;
    while (!gen.next().done) {
        count ++;
    }
    return count;
}

describe('grid/mask-rect', () => {
    describe('#constructor()', () => {
        it('starts filled with false', () => {
            const o = new grid.MaskRectangle({westX: 1, northY: 2, width: 3, height: 4});
            expect(o.westX).toBe(1);
            expect(o.northY).toBe(2);
            expect(o.width).toBe(3);
            expect(o.height).toBe(4);
            expect(o.get(1, 2)).toBe(false);
            expect(o.get(0, 0)).toBe(false);
        });
        it('can be filled with true', () => {
            const o = new grid.MaskRectangle(new grid.Rectangle().set(1, 2, 3, 4), true);
            expect(o.westX).toBe(1);
            expect(o.northY).toBe(2);
            expect(o.width).toBe(3);
            expect(o.height).toBe(4);
            expect(o.get(1, 2)).toBe(true);
            expect(o.get(0, 0)).toBe(false);
        });
        it('can have outside values be true', () => {
            const o = new grid.MaskRectangle(new grid.Rectangle().set(1, 2, 3, 4), false, true);
            expect(o.westX).toBe(1);
            expect(o.northY).toBe(2);
            expect(o.width).toBe(3);
            expect(o.height).toBe(4);
            expect(o.get(1, 2)).toBe(false);
            expect(o.get(0, 0)).toBe(true);
        });
        it('works with negative offsets', () => {
            const o = new grid.MaskRectangle(new grid.Rectangle().set(-1, -2, 3, 4), false, true);
            expect(o.westX).toBe(-1);
            expect(o.northY).toBe(-2);
            expect(o.width).toBe(3);
            expect(o.height).toBe(4);
            expect(o.get(-1, -2)).toBe(false);
            expect(o.getAtOffset({x: -2, y: -3})).toBe(true);
        });
    });
    describe('#toString()', () => {
        it('works', () => {
            const o = new grid.MaskRectangle({westX: 1, northY: 2, width: 3, height: 3});
            o.set(1, 2, true);
            o.set(2, 3, true);
            o.set(3, 3, true);
            expect(o.toString()).toBe('(1,2)/false\n☑☐☐\n☐☑☑\n☐☐☐\n');
        });
    });
    describe('#equals()', () => {
        it('works', () => {
            const o = new grid.MaskRectangle({westX: 1, northY: 2, width: 3, height: 3});
            o.set(1, 2, true);
            o.set(3, 3, true);
            const o1 = new grid.MaskRectangle({westX: 1, northY: 2, width: 3, height: 3});
            o1.set(1, 2, true);
            o1.set(3, 3, true);
            expect(o.equals(o1)).toBe(true);
            const o2 = new grid.MaskRectangle({westX: 1, northY: 2, width: 3, height: 3});
            o2.set(1, 2, true);
            o2.set(2, 2, true);
            expect(o.equals(o2)).toBe(false);
            const o3 = new grid.MaskRectangle({westX: 1, northY: 2, width: 4, height: 3});
            o3.set(1, 2, true);
            o3.set(3, 3, true);
            expect(o.equals(o3)).toBe(false);
        });
    });
    describe('#copyFrom()', () => {
        it('works', () => {
            const o = new grid.MaskRectangle({westX: 1, northY: 2, width: 3, height: 3});
            o.set(3, 3, true);
            const n = new grid.MaskRectangle().copyFrom(o);
            expect(n.westX).toBe(o.westX);
            expect(n.northY).toBe(o.northY);
            expect(n.width).toBe(o.width);
            expect(n.height).toBe(o.height);
            expect(n.get(3, 3)).toBe(true);
            expect(n.get(2, 2)).toBe(false);
        });
    });
    describe('#set()', () => {
        it('works', () => {
            const o = new grid.MaskRectangle({westX: 1, northY: 2, width: 3, height: 4});
            o.set(2, 3, true);
            expect(o.get(2, 3)).toBe(true);
            expect(o.getAtOffset({x: 2, y: 3})).toBe(true);
            o.setAtOffset({x: 2, y: 3}, false);
            expect(o.get(2, 3)).toBe(false);
        });
    });
    describe('#forEach()', () => {
        it('returns the right count', () => {
            const o = new grid.MaskRectangle({westX: 1, northY: 2, width: 6, height: 6});
            o.set(1, 2, true);
            o.set(2, 3, true);
            o.set(4, 7, true);
            let c = 0;
            for (const {x, y, value} of o.locations()) {
                if (value) {
                    c ++;
                }
                if (x === 1 && y === 2) {
                    expect(value).toBe(true);
                } else if (x === 2 && y === 3) {
                    expect(value).toBe(true);
                } else if (x === 4 && y === 7) {
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
            const o = new grid.MaskRectangle({westX: 1, northY: 2, width: 3, height: 3});
            o.set(1, 2, true);
            o.set(2, 3, true);
            o.set(3, 3, true);
            expect(countIterator(o.offsetsWithTrue())).toBe(3);
        });
    });
});
