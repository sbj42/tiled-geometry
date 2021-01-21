import { Rectangle, RectangleLike } from './rectangle';
import { OffsetLike } from './offset';

export interface RasterBand {
    westX: number;
    eastX: number;
}

export class RasterMask implements RectangleLike {
    private readonly _rect = new Rectangle();
    private readonly _lines: number[][];

    constructor(bounds: RectangleLike, lines: number[][]) {
        if (lines.length !== bounds.height) {
            throw new Error(`bad lines array length ${lines.length} for bounds ${bounds}`);
        }
        this._rect.copyFrom(bounds);
        this._lines = lines;
    }

    // accessors

    toString(): string {
        let shape = '';
        const {eastX} = this._rect;
        for (let y = 0; y < this.height; y ++) {
            const line = this._lines[y];
            let x = this.westX;
            for (let i = 0; i < line.length; i += 2) {
                const start = line[i];
                const end = line[i + 1];
                while (x < start) {
                    shape += '∙';
                    x ++;
                }
                while (x < end) {
                    shape += '█';
                    x ++;
                }
            }
            while (x <= eastX) {
                shape += '∙';
                x ++;
            }
            shape += '\n';
        }
        return `(${this._rect.westX},${this._rect.northY})\n${shape}`;
    }

    equals(other: RasterMask): boolean {
        return this._rect.equals(other._rect)
            && this._lines.length === other._lines.length
            && this._lines.every((v, i) => (
                v.length === other._lines[i].length
                && v.every((w, j) => w === other._lines[i][j])
            ));
    }

    get northY(): number {
        return this._rect.northY;
    }

    get southY(): number {
        return this._rect.southY;
    }

    get westX(): number {
        return this._rect.westX;
    }

    get width(): number {
        return this._rect.width;
    }

    get height(): number {
        return this._rect.height;
    }

    get(x: number, y: number): boolean {
        if (y < this.northY || y > this._rect.southY) {
            return false;
        }
        const line = this._lines[y - this.northY];
        for (let i = 0; i < line.length; i += 2) {
            if (x >= line[i] && x < line[i + 1]) {
                return true;
            }
        }
        return false;
    }

    getAtOffset(off: OffsetLike): boolean {
        return this.get(off.x, off.y);
    }

    // utilities

    * bandsAt(y: number): Generator<RasterBand> {
        if (y >= this.northY && y <= this._rect.southY) {
            const line = this._lines[y - this.northY];
            for (let i = 0; i < line.length; i += 2) {
                yield {
                    westX: line[i],
                    eastX: line[i + 1] - 1,
                };
            }
        }
    }
}
