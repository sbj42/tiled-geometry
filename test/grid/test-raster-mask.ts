import * as grid from '../../src/grid';

function countIterator<T>(gen: Iterator<T>) {
    let count = 0;
    while (!gen.next().done) {
        count ++;
    }
    return count;
}

describe('grid/raster-mask', () => {
    describe('#constructor()', () => {
        it('works', () => {
            const m = new grid.RasterMask({westX: 1, northY: 2, width: 3, height: 4}, [
                [1, 2],
                [1, 4],
                [1, 2, 3, 4],
                [2, 4],
            ]);
            expect(m.westX).toBe(1);
            expect(m.northY).toBe(2);
            expect(m.width).toBe(3);
            expect(m.height).toBe(4);
            expect(m.southY).toBe(5);
            expect(countIterator(m.bandsAt(4))).toBe(2);
            expect(countIterator(m.bandsAt(5))).toBe(1);
        });
        it('throws on invalid lines array', () => {
            expect(() => new grid.RasterMask({westX: 1, northY: 2, width: 3, height: 4}, [
                [1, 2],
                [1, 4],
                [1, 2, 3, 4],
            ])).toThrow();
        });
    });
    describe('#toString()', () => {
        it('works', () => {
            const m = new grid.RasterMask({westX: 1, northY: 2, width: 3, height: 4}, [
                [1, 2],
                [1, 4],
                [1, 2, 3, 4],
                [2, 4],
            ]);
            expect(m.toString()).toBe(`(1,2)
█∙∙
███
█∙█
∙██
`);
        });
    });
    describe('#equals()', () => {
        it('works', () => {
            const m = new grid.RasterMask({westX: 1, northY: 2, width: 3, height: 4}, [
                [1, 2],
                [1, 4],
                [1, 2, 3, 4],
                [2, 4],
            ]);
            expect(m.equals(new grid.RasterMask({westX: 1, northY: 2, width: 3, height: 4}, [
                [1, 2],
                [1, 4],
                [1, 2, 3, 4],
                [3, 4],
            ]))).toBe(false);
            expect(m.equals(new grid.RasterMask({westX: 1, northY: 2, width: 3, height: 3}, [
                [1, 2],
                [1, 4],
                [1, 2, 3, 4],
            ]))).toBe(false);
        });
    });
    describe('#get()', () => {
        it('works', () => {
            const m = new grid.RasterMask({westX: 1, northY: 2, width: 3, height: 4}, [
                [1, 2],
                [1, 4],
                [1, 2, 3, 4],
                [2, 4],
            ]);
            expect(m.get(1, 0)).toBe(false);
            expect(m.get(1, 2)).toBe(true);
            expect(m.get(2, 2)).toBe(false);
            expect(m.get(0, 3)).toBe(false);
            expect(m.get(5, 3)).toBe(false);
            expect(m.get(2, 4)).toBe(false);
            expect(m.get(3, 4)).toBe(true);
            expect(m.get(4, 4)).toBe(false);
        });
    });
    describe('#bandsAt()', () => {
        it('works', () => {
            const m = new grid.RasterMask({westX: 1, northY: 2, width: 3, height: 4}, [
                [1, 2],
                [1, 4],
                [1, 2, 3, 4],
                [2, 4],
            ]);
            expect(countIterator(m.bandsAt(1))).toBe(0);
            expect(countIterator(m.bandsAt(3))).toBe(1);
            expect(countIterator(m.bandsAt(4))).toBe(2);
            expect(countIterator(m.bandsAt(5))).toBe(1);
        });
    });
});
