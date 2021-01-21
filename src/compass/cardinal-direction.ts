import { Direction } from './direction';
import { CardinalTurn } from './cardinal-turn';
import { CardinalOrientation } from './cardinal-orientation';

export enum CardinalDirection {
    NORTH = 0,
    EAST  = 1,
    SOUTH = 2,
    WEST  = 3,
}

export const CARDINAL_DIRECTIONS = [
    CardinalDirection.NORTH,
    CardinalDirection.EAST,
    CardinalDirection.SOUTH,
    CardinalDirection.WEST,
];

const CARDINAL_DIRECTIONS_STR = [
    'N',
    'E',
    'S',
    'W',
];

export function cardinalDirectionToString(dir: CardinalDirection): string {
    return CARDINAL_DIRECTIONS_STR[dir];
}

export function cardinalDirectionOpposite(dir: CardinalDirection): CardinalDirection {
    return ((dir + 2) & 3) as CardinalDirection;
}

// conversion

export function cardinalDirectionFromDirection(dir: Direction): CardinalDirection {
    return (dir >> 1) as CardinalDirection;
}

export function cardinalDirectionFromNorthTurn(turn: CardinalTurn): CardinalDirection {
    return turn as unknown as CardinalDirection;
}

export function cardinalDirectionFromCardinalOrientation(orientation: CardinalOrientation): CardinalDirection {
    return (orientation >>> 1) as CardinalDirection;
}

// math

export function cardinalDirectionAddCardinalTurn(dir: CardinalDirection, turn: CardinalTurn): CardinalDirection {
    return ((dir + turn) & 3) as CardinalDirection;
}
