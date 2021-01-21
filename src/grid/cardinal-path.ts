import { CardinalDirection, cardinalDirectionToString } from '../compass';

import { Offset, OffsetLike } from './offset';
import { Rectangle, RectangleLike } from './rectangle';
import { RasterMask } from './raster-mask';

const LOCAL_OFF = new Offset();

type SortedNumberArray = number[];

function sortedInsert(array: SortedNumberArray, value: number) {
    array.push(value);
    let i = array.length - 1;
    while (i > 0 && value < array[i - 1]) {
        array[i] = array[i - 1];
        i --;
    }
    array[i] = value;
}

export class CardinalPath {
    private readonly _start = new Offset();
    private readonly _segments: CardinalDirection[];

    constructor(start: OffsetLike, segments: CardinalDirection[]) {
        this._start.copyFrom(start);
        this._segments = segments;
    }

    // accessors

    toString(): string {
        return `${this._start.toString()}:`
            + `${this._segments.map((segment) => cardinalDirectionToString(segment)).join('')}`;
    }

    equals(other: CardinalPath): boolean {
        return this._start.equals(other._start)
            && this._segments.length === other._segments.length
            && this._segments.every((v, i) => v === other._segments[i]);
    }

    get length(): number {
        return this._segments.length;
    }

    // utilities

    getIsClosed(): boolean {
        LOCAL_OFF.copyFrom(this._start);
        for (const segment of this._segments) {
            LOCAL_OFF.addCardinalDirection(segment);
        }
        return this._start.equals(LOCAL_OFF);
    }

    * offsets(): Generator<OffsetLike> {
        let {x, y} = this._start;
        yield {x, y};
        for (const segment of this._segments) {
            LOCAL_OFF.setFromCardinalDirection(segment);
            x += LOCAL_OFF.x;
            y += LOCAL_OFF.y;
            yield {x, y};
        }
    }

    getBounds(): RectangleLike {
        let northY = this._start.y;
        let southY = northY;
        let westX = this._start.x;
        let eastX = westX;
        LOCAL_OFF.copyFrom(this._start);
        for (const segment of this._segments) {
            LOCAL_OFF.addCardinalDirection(segment);
            switch (segment) {
                case CardinalDirection.NORTH:
                    northY = Math.min(northY, LOCAL_OFF.y);
                    break;
                case CardinalDirection.EAST:
                    eastX = Math.max(eastX, LOCAL_OFF.x);
                    break;
                case CardinalDirection.SOUTH:
                    southY = Math.max(southY, LOCAL_OFF.y);
                    break;
                case CardinalDirection.WEST:
                    westX = Math.min(westX, LOCAL_OFF.x);
                    break;
                // istanbul ignore next
                default:
                    throw new Error(`bad direction ${segment} in cardinal path`);
            }
        }
        return new Rectangle(westX, northY, eastX - westX + 1, southY - northY + 1);
    }

    getArea(): number {
        let total = 0;
        LOCAL_OFF.copyFrom(this._start);
        for (const segment of this._segments) {
            LOCAL_OFF.addCardinalDirection(segment);
            switch (segment) {
                case CardinalDirection.NORTH:
                    total -= LOCAL_OFF.x;
                    break;
                case CardinalDirection.SOUTH:
                    total += LOCAL_OFF.x;
                    break;
            }
        }
        return Math.abs(total);
    }

    rasterize(bounds?: RectangleLike): RasterMask {
        const lines = new Array<SortedNumberArray>();
        if (typeof bounds === 'undefined') {
            bounds = this.getBounds();
        }
        // assert(this.getIsClosed())
        LOCAL_OFF.copyFrom(this._start);
        const { northY } = bounds;
        const southY = northY + bounds.height - 1;
        for (let y = northY; y < southY; y ++) {
            lines.push([]);
        }
        LOCAL_OFF.copyFrom(this._start);
        // assert(LOCAL_OFF.y >= northY && LOCAL_OFF.y <= southY)
        for (const segment of this._segments) {
            if (segment === CardinalDirection.SOUTH) {
                sortedInsert(lines[LOCAL_OFF.y - northY], LOCAL_OFF.x);
            }
            LOCAL_OFF.addCardinalDirection(segment);
            // assert(LOCAL_OFF.y >= northY && LOCAL_OFF.y <= southY)
            if (segment === CardinalDirection.NORTH) {
                sortedInsert(lines[LOCAL_OFF.y - northY], LOCAL_OFF.x);
            }
        }
        return new RasterMask({
            westX: bounds.westX,
            northY: bounds.northY,
            width: bounds.width - 1,
            height: bounds.height - 1,
        }, lines);
    }
}
