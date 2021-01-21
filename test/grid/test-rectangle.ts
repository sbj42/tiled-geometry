import * as compass from '../../src/compass';
import * as grid from '../../src/grid';

function countIterator<T>(gen: Iterator<T>) {
    let count = 0;
    while (!gen.next().done) {
        count ++;
    }
    return count;
}

describe('grid/rectangle', () => {
    it('starts at 0,0 0x0', () => {
        const o = new grid.Rectangle();
        expect(o.westX).toBe(0);
        expect(o.northY).toBe(0);
        expect(o.width).toBe(0);
        expect(o.height).toBe(0);
    });
    it('is mutable', () => {
        const o = new grid.Rectangle();
        o.northWest.y = 1;
        o.size.width = 2;
        expect(o.northY).toBe(1);
        expect(o.width).toBe(2);
    });
    describe('#constructor()', () => {
        it('works', () => {
            const o = new grid.Rectangle(1, 2, 3, 4);
            expect(o.westX).toBe(1);
            expect(o.northY).toBe(2);
            expect(o.width).toBe(3);
            expect(o.height).toBe(4);
        });
        it('works with negative offsets', () => {
            const o = new grid.Rectangle(-1, -2, 3, 4);
            expect(o.westX).toBe(-1);
            expect(o.northY).toBe(-2);
            expect(o.width).toBe(3);
            expect(o.height).toBe(4);
        });
    });
    describe('#toString()', () => {
        it('works', () => {
            expect(new grid.Rectangle(1, 2, 3, 4).toString()).toBe('(1,2 3x4)');
        });
    });
    describe('#equals()', () => {
        it('works', () => {
            expect(new grid.Rectangle(1, 2, 3, 4).equals({westX: 1, northY: 2, width: 3, height: 4})).toBe(true);
            expect(new grid.Rectangle(1, 2, 3, 4).equals({westX: 2, northY: 2, width: 3, height: 4})).toBe(false);
            expect(new grid.Rectangle(1, 2, 4, 4).equals({westX: 1, northY: 2, width: 3, height: 4})).toBe(false);
            expect(new grid.Rectangle(1, 4, 3, 2).equals({westX: 1, northY: 2, width: 3, height: 4})).toBe(false);
        });
    });
    describe('#empty', () => {
        it('works', () => {
            expect(new grid.Rectangle(1, 2, 0, 0).empty).toBe(true);
            expect(new grid.Rectangle(1, 2, 9, 0).empty).toBe(true);
            expect(new grid.Rectangle(1, 2, 0, 9).empty).toBe(true);
            expect(new grid.Rectangle(1, 2, 1, 2).empty).toBe(false);
        });
    });
    describe('#area', () => {
        it('works', () => {
            expect(new grid.Rectangle(1, 2, 0, 0).area).toBe(0);
            expect(new grid.Rectangle(1, 2, 1, 0).area).toBe(0);
            expect(new grid.Rectangle(1, 2, 0, 1).area).toBe(0);
            expect(new grid.Rectangle(1, 2, 1, 1).area).toBe(1);
            expect(new grid.Rectangle(1, 2, 3, 4).area).toBe(12);
            expect(new grid.Rectangle(1, 2, 4, 3).area).toBe(12);
        });
        it('works with negative offsets', () => {
            expect(new grid.Rectangle(-1, -2, 3, 4).area).toBe(12);
        });
    });
    describe('#set()', () => {
        it('works', () => {
            const o = new grid.Rectangle().set(1, 2, 3, 4);
            expect(o.westX).toBe(1);
            expect(o.northY).toBe(2);
            expect(o.width).toBe(3);
            expect(o.height).toBe(4);
        });
    });
    describe('#setFromCorners()', () => {
        it('works', () => {
            const o1 = new grid.Rectangle().setFromCorners({x: 1, y: 2}, {x: 3, y: 5});
            expect(o1.westX).toBe(1);
            expect(o1.northY).toBe(2);
            expect(o1.width).toBe(3);
            expect(o1.height).toBe(4);
            const o2 = new grid.Rectangle().setFromCorners({x: 3, y: 2}, {x: 1, y: 5});
            expect(o2.westX).toBe(1);
            expect(o2.northY).toBe(2);
            expect(o2.width).toBe(3);
            expect(o2.height).toBe(4);
            const o3 = new grid.Rectangle().setFromCorners({x: 6, y: 10}, {x: 10, y: 3});
            expect(o3.westX).toBe(6);
            expect(o3.northY).toBe(3);
            expect(o3.width).toBe(5);
            expect(o3.height).toBe(8);
        });
    });
    describe('#copyFrom()', () => {
        it('works', () => {
            expect(new grid.Rectangle().copyFrom(new grid.Rectangle(1, 2, 3, 4)).toString()).toBe('(1,2 3x4)');
            expect(new grid.Rectangle().copyFrom({
                height: 4,
                width: 3,
                northY: 2,
                westX: 1,
            }).toString()).toBe('(1,2 3x4)');
        });
    });
    describe('#addOffset()', () => {
        it('works', () => {
            expect(new grid.Rectangle(1, 2, 3, 4).addOffset({x: 1, y: 3}).toString()).toBe('(2,5 3x4)');
            expect(new grid.Rectangle(1, 2, 3, 4).addOffset({x: -2, y: -2}).toString()).toBe('(-1,0 3x4)');
        });
    });
    describe('#scale()', () => {
        it('works', () => {
            expect(new grid.Rectangle(1, 2, 3, 4).scale(2).toString()).toBe('(2,4 6x8)');
            expect(new grid.Rectangle(1, 2, 3, 4).scale(3).toString()).toBe('(3,6 9x12)');
        });
    });
    describe('#rotate()', () => {
        it('works without anchor', () => {
            expect(new grid.Rectangle(1, 2, 3, 4).rotate(compass.CardinalTurn.NONE).toString()).toBe('(1,2 3x4)');
            expect(new grid.Rectangle(1, 2, 3, 4).rotate(compass.CardinalTurn.RIGHT).toString()).toBe('(-5,1 4x3)');
            expect(new grid.Rectangle(1, 2, 3, 4).rotate(compass.CardinalTurn.AROUND).toString()).toBe('(-3,-5 3x4)');
            expect(new grid.Rectangle(1, 2, 3, 4).rotate(compass.CardinalTurn.LEFT).toString()).toBe('(2,-3 4x3)');
        });
        it('works with anchor', () => {
            expect(new grid.Rectangle(1, 2, 3, 4)
                .rotate(compass.CardinalTurn.NONE, {x: 1, y: 3}).toString()).toBe('(1,2 3x4)');
            expect(new grid.Rectangle(1, 2, 3, 4)
                .rotate(compass.CardinalTurn.RIGHT, {x: 1, y: 3}).toString()).toBe('(-1,3 4x3)');
            expect(new grid.Rectangle(1, 2, 3, 4)
                .rotate(compass.CardinalTurn.AROUND, {x: 1, y: 3}).toString()).toBe('(-1,1 3x4)');
            expect(new grid.Rectangle(1, 2, 3, 4)
                .rotate(compass.CardinalTurn.LEFT, {x: 1, y: 3}).toString()).toBe('(0,1 4x3)');
        });
    });
    describe('#extendToInclude()', () => {
        it('works', () => {
            expect(new grid.Rectangle(1, 2, 3, 4).extendToInclude({x: 1, y: 3}).toString()).toBe('(1,2 3x4)');
            expect(new grid.Rectangle(1, 2, 3, 4).extendToInclude({x: 5, y: 3}).toString()).toBe('(1,2 5x4)');
            expect(new grid.Rectangle(1, 2, 3, 4).extendToInclude({x: -2, y: 5}).toString()).toBe('(-2,2 6x4)');
            expect(new grid.Rectangle(1, 2, 3, 4).extendToInclude({x: 0, y: 0}).toString()).toBe('(0,0 4x6)');
            expect(new grid.Rectangle(1, 2, 3, 4).extendToInclude({x: 1, y: 7}).toString()).toBe('(1,2 3x6)');
            expect(new grid.Rectangle(1, 2, 3, 4).extendToInclude({x: 7, y: 7}).toString()).toBe('(1,2 7x6)');
        });
    });
    describe('#containsOffset()', () => {
        it('works', () => {
            expect(new grid.Rectangle(1, 2, 3, 4).containsOffset({x: 1, y: 3})).toBe(true);
            expect(new grid.Rectangle(1, 2, 3, 4).containsOffset({x: 1, y: 2})).toBe(true);
            expect(new grid.Rectangle(1, 2, 3, 4).containsOffset({x: 3, y: 5})).toBe(true);
            expect(new grid.Rectangle(1, 2, 3, 4).containsOffset({x: 4, y: 5})).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4).containsOffset({x: 3, y: 6})).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4).containsOffset({x: 1, y: 0})).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4).containsOffset({x: 0, y: 3})).toBe(false);
        });
    });
    describe('#containsRectangle()', () => {
        it('works', () => {
            expect(new grid.Rectangle(1, 2, 3, 4)
                .containsRectangle({westX: 1, northY: 2, width: 0, height: 0})).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .containsRectangle({westX: 3, northY: 5, width: 0, height: 0})).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .containsRectangle({westX: 1, northY: 2, width: 1, height: 0})).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .containsRectangle({westX: 1, northY: 2, width: 0, height: 1})).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .containsRectangle({westX: 0, northY: 0, width: 10, height: 10})).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .containsRectangle({westX: 1, northY: 2, width: 1, height: 2})).toBe(true);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .containsRectangle({westX: 2, northY: 3, width: 1, height: 2})).toBe(true);
        });
    });
    describe('#overlapsRectangle()', () => {
        it('works', () => {
            expect(new grid.Rectangle(1, 2, 3, 4)
                .overlapsRectangle({westX: 1, northY: 2, width: 0, height: 0})).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .overlapsRectangle({westX: 3, northY: 5, width: 0, height: 0})).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .overlapsRectangle({westX: 1, northY: 2, width: 1, height: 0})).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .overlapsRectangle({westX: 1, northY: 2, width: 0, height: 1})).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .overlapsRectangle({westX: 0, northY: 0, width: 10, height: 10})).toBe(true);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .overlapsRectangle({westX: 0, northY: 3, width: 2, height: 1})).toBe(true);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .overlapsRectangle({westX: 0, northY: 3, width: 5, height: 1})).toBe(true);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .overlapsRectangle({westX: 2, northY: 3, width: 1, height: 1})).toBe(true);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .overlapsRectangle({westX: 1, northY: 2, width: 1, height: 2})).toBe(true);
            expect(new grid.Rectangle(1, 2, 3, 4)
                .overlapsRectangle({westX: 2, northY: 3, width: 1, height: 2})).toBe(true);
        });
    });
    describe('#forEach()', () => {
        it('returns the right number of offsets', () => {
            expect(countIterator(new grid.Rectangle().offsets())).toBe(0);
            expect(countIterator(new grid.Rectangle(1, 2, 0, 40).offsets())).toBe(0);
            expect(countIterator(new grid.Rectangle(1, 2, 3, 4).offsets())).toBe(12);
        });
        it('returns offsets in the right area', () => {
            for (const off of new grid.Rectangle(1, 2, 3, 4).offsets()) {
                expect(off.x).toBeGreaterThanOrEqual(1);
                expect(off.x).toBeLessThan(4);
                expect(off.y).toBeGreaterThanOrEqual(2);
                expect(off.y).toBeLessThan(6);
            }
        });
    });
    describe('#anyOf()', () => {
        it('works', () => {
            expect(new grid.Rectangle().anyOf(() => true)).toBe(false);
            expect(new grid.Rectangle(1, 2, 0, 40).anyOf(() => true)).toBe(false);
            expect(new grid.Rectangle(1, 2, 3, 4).anyOf((x, y) => x === 3 && y === 5)).toBe(true);
            expect(new grid.Rectangle(1, 2, 3, 4).anyOf((x, y) => x === 10)).toBe(false);
        });
    });
});
