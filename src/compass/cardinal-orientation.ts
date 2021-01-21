import { Axis } from './axis';
import { Flip } from './flip';
import { CardinalDirection } from './cardinal-direction';
import { CardinalTurn } from './cardinal-turn';

export enum CardinalOrientation {
    HEADS_NORTH = 0, // rev: self
    TAILS_NORTH = 1, // rev: self
    HEADS_EAST  = 2, // rev: HEADS_WEST
    TAILS_EAST  = 3, // rev: self
    HEADS_SOUTH = 4, // rev: self
    TAILS_SOUTH = 5, // rev: self
    HEADS_WEST  = 6, // rev: HEADS_EAST
    TAILS_WEST  = 7, // rev: self
}

export const CARDINAL_ORIENTATIONS = [
    CardinalOrientation.HEADS_NORTH,
    CardinalOrientation.TAILS_NORTH,
    CardinalOrientation.HEADS_EAST,
    CardinalOrientation.TAILS_EAST,
    CardinalOrientation.HEADS_SOUTH,
    CardinalOrientation.TAILS_SOUTH,
    CardinalOrientation.HEADS_WEST,
    CardinalOrientation.TAILS_WEST,
];

const CARDINAL_ORIENTATIONS_STR = [
    'HN',
    'TN',
    'HE',
    'TE',
    'HS',
    'TS',
    'HW',
    'TW',
];

export function cardinalOrientationToString(orientation: CardinalOrientation): string {
    return CARDINAL_ORIENTATIONS_STR[orientation];
}

export function cardinalOrientationFlip(orientation: CardinalOrientation, axis: Axis): CardinalOrientation {
    if (axis === Axis.NORTH_SOUTH) {
        return ((9 - orientation) & 7) as CardinalOrientation;
    } else {
        return ((13 - orientation) & 7) as CardinalOrientation;
    }
}

export function cardinalOrientationReverse(orientation: CardinalOrientation): CardinalOrientation {
    if (orientation === CardinalOrientation.HEADS_EAST) {
        return CardinalOrientation.HEADS_WEST;
    } else if (orientation === CardinalOrientation.HEADS_WEST) {
        return CardinalOrientation.HEADS_EAST;
    } else {
        return orientation;
    }
}

// conversion

export function cardinalOrientationFromFlipAndCardinalDirection(flip: Flip, dir: CardinalDirection): CardinalOrientation {
    return (dir * 2 + (flip !== Flip.HEADS ? 1 : 0)) as CardinalOrientation;
}

// math

export function cardinalOrientationAddCardinalTurn(orientation: CardinalOrientation, turn: CardinalTurn): CardinalOrientation {
    return ((orientation + turn * 2) & 7) as CardinalOrientation;
}
