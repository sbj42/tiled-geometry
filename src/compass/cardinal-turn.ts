import { CardinalDirection } from './cardinal-direction';
import { Turn } from './turn';

export enum CardinalTurn {
    NONE   = 0,
    RIGHT  = 1,
    AROUND = 2,
    LEFT   = 3,
}

export const CARDINAL_TURNS = [
    CardinalTurn.NONE,
    CardinalTurn.RIGHT,
    CardinalTurn.AROUND,
    CardinalTurn.LEFT,
];

const CARDINAL_TURNS_STR = [
    'T0',
    'T+90',
    'T180',
    'T-90',
];

export function cardinalTurnToString(dir: CardinalTurn): string {
    return CARDINAL_TURNS_STR[dir];
}

export function cardinalTurnToDegrees(turn: CardinalTurn): CardinalTurn {
    return turn * 90;
}

export function cardinalTurnReverse(dir: CardinalTurn): CardinalTurn {
    return ((4 - dir) & 3) as CardinalTurn;
}

// conversion

export function cardinalTurnFromCardinalDirections(from: CardinalDirection, to: CardinalDirection): CardinalTurn {
    return ((to - from) & 3) as CardinalTurn;
}

export function cardinalTurnFromTurn(turn: Turn): CardinalTurn {
    return (turn >> 1) as CardinalTurn;
}

// math

export function cardinalTurnAddCardinalTurn(turn1: CardinalTurn, turn2: CardinalTurn): CardinalTurn {
    return ((turn1 + turn2) & 3) as CardinalTurn;
}
