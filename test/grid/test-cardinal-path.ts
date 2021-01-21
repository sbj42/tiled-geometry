import * as compass from '../../src/compass';
import * as grid from '../../src/grid';

function makePath(x: number, y: number, path: string) {
    const segments = new Array<compass.CardinalDirection>();
    for (let i = 0; i < path.length; i ++) {
        switch (path.charAt(i).toUpperCase()) {
            case 'N':
                segments.push(compass.CardinalDirection.NORTH);
                break;
            case 'E':
                segments.push(compass.CardinalDirection.EAST);
                break;
            case 'S':
                segments.push(compass.CardinalDirection.SOUTH);
                break;
            case 'W':
                segments.push(compass.CardinalDirection.WEST);
                break;
        }
    }
    return new grid.CardinalPath({x, y}, segments);
}

function countIterator<T>(gen: Iterator<T>) {
    let count = 0;
    while (!gen.next().done) {
        count ++;
    }
    return count;
}

describe('grid/cardinal-path', () => {
    describe('#constructor()', () => {
        it('works', () => {
            makePath(1, 2, 'N');
        });
    });
    describe('#toString()', () => {
        it('works', () => {
            const p = makePath(1, 2, 'NW');
            expect(p.toString()).toBe('(1,2):NW');
        });
    });
    describe('#equals()', () => {
        it('works', () => {
            const p = makePath(1, 2, 'NW');
            expect(p.equals(makePath(1, 2, 'NW'))).toBe(true);
            expect(p.equals(makePath(2, 1, 'NW'))).toBe(false);
            expect(p.equals(makePath(1, 2, 'NE'))).toBe(false);
            expect(p.equals(makePath(1, 2, 'NWN'))).toBe(false);
        });
    });
    describe('#length', () => {
        it('works', () => {
            expect(makePath(1, 2, 'NW')).toHaveLength(2);
            expect(makePath(0, 0, 'EEEESEE')).toHaveLength(7);
        });
    });
    describe('#getIsClosed()', () => {
        it('works for a simple closed path', () => {
            const p = makePath(1, 2, 'NWSE');
            expect(p.getIsClosed()).toBe(true);
        });
        it('works for a simple open path', () => {
            const p = makePath(1, 2, 'NWE');
            expect(p.getIsClosed()).toBe(false);
        });
        it('works for a more complex shape', () => {
            //    1 2 3 4 5
            // 1    .....
            // 2  ...   .
            // 3  . ... ...
            // 4  . . ... .
            // 5  ...   ...
            const p = makePath(1, 2, 'ENEESSESSWNWNWSSWNNN');
            expect(p.getIsClosed()).toBe(true);
        });
    });
    describe('#getBounds()', () => {
        it('works for a simple square', () => {
            const p = makePath(1, 2, 'NWSE');
            expect(p.getBounds().toString()).toBe('(0,1 2x2)');
        });
        it('works for a more complex shape', () => {
            //    1 2 3 4 5
            // 1    .....
            // 2  ...   .
            // 3  . ... ...
            // 4  . . ... .
            // 5  ...   ...
            const p = makePath(1, 2, 'ENEESSESSWNWNWSSWNNN');
            expect(p.getBounds().toString()).toBe('(1,1 5x5)');
        });
    });
    describe('#getArea()', () => {
        it('works for a simple square', () => {
            const p = makePath(1, 2, 'NWSE');
            expect(p.getArea()).toBe(1);
        });
        it('works for a more complex shape', () => {
            //    1 2 3 4 5
            // 1    .....
            // 2  ...   .
            // 3  . ... ...
            // 4  . . ... .
            // 5  ...   ...
            const p = makePath(1, 2, 'ENEESSESSWNWNWSSWNNN');
            expect(p.getArea()).toBe(10);
        });
    });
    describe('#getOffsets()', () => {
        it('works for a simple square', () => {
            const p = makePath(1, 2, 'NWSE');
            expect(countIterator(p.offsets())).toBe(5);
        });
        it('works for a more complex shape', () => {
            //    1 2 3 4 5
            // 1    .....
            // 2  ...   .
            // 3  . ... ...
            // 4  . . ... .
            // 5  ...   ...
            const p = makePath(1, 2, 'ENEESSESSWNWNWSSWNNN');
            expect(countIterator(p.offsets())).toBe(21);
        });
    });
    describe('#rasterize()', () => {
        it('works for a simple square', () => {
            const p = makePath(1, 2, 'NWSE');
            expect(p.rasterize().toString()).toBe(`(0,1)
█
`);
        });
        it('works with given bounds', () => {
            const p = makePath(1, 2, 'NWSE');
            expect(p.rasterize(p.getBounds()).toString()).toBe(`(0,1)
█
`);
        });
        it('works for a more complex shape', () => {
            //    1 2 3 4 5
            // 1    .....
            // 2  ...   .
            // 3  . ... ...
            // 4  . . ... .
            // 5  ...   ...
            const p = makePath(1, 2, 'ENEESSESSWNWNWSSWNNN');
            expect(p.rasterize().toString()).toBe(`(1,1)
∙██∙
███∙
█∙██
█∙∙█
`);
        });
    });
});
