import { CardinalDirection } from './cardinal-direction';
import { Turn } from './turn';
import { CardinalTurn } from './cardinal-turn';

export enum Direction {
    NORTH     = 0,
    NORTHEAST = 1,
    EAST      = 2,
    SOUTHEAST = 3,
    SOUTH     = 4,
    SOUTHWEST = 5,
    WEST      = 6,
    NORTHWEST = 7,
}

export const DIRECTIONS = [
    Direction.NORTH,
    Direction.NORTHEAST,
    Direction.EAST,
    Direction.SOUTHEAST,
    Direction.SOUTH,
    Direction.SOUTHWEST,
    Direction.WEST,
    Direction.NORTHWEST,
];

const DIRECTIONS_STR = [
    'N',
    'NE',
    'E',
    'SE',
    'S',
    'SW',
    'W',
    'NW',
];

export function directionToString(dir: Direction): string {
    return DIRECTIONS_STR[dir];
}

export function directionIsCardinal(dir: Direction): boolean {
    return (dir & 1) === 0;
}

export function directionOpposite(dir: Direction): Direction {
    return ((dir + 4) & 7) as Direction;
}

// conversion

export function directionFromCardinalDirection(dir: CardinalDirection): Direction {
    return (dir << 1) as Direction;
}

// math

export function directionAddTurn(dir: Direction, turn: Turn): Direction {
    return ((dir + turn) & 7) as Direction;
}

export function directionAddCardinalTurn(dir: Direction, turn: CardinalTurn): Direction {
    return ((dir + turn * 2) & 7) as Direction;
}
