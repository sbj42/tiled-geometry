import { CardinalDirection } from './cardinal-direction';
import { Direction } from './direction';
import { CardinalTurn } from './cardinal-turn';

export enum Turn {
    NONE  = 0,
    R_45  = 1,
    R_90  = 2,
    R_135 = 3,
    T_180 = 4,
    L_135 = 5,
    L_90  = 6,
    L_45  = 7,
}

export const TURNS = [
    Turn.NONE,
    Turn.R_45,
    Turn.R_90,
    Turn.R_135,
    Turn.T_180,
    Turn.L_135,
    Turn.L_90,
    Turn.L_45,
];

const TURNS_STR = [
    'T0',
    'T+45',
    'T+90',
    'T+135',
    'T180',
    'T-135',
    'T-90',
    'T-45',
];

export function turnToString(turn: Turn): string {
    return TURNS_STR[turn];
}

export function turnToDegrees(turn: Turn): number {
    return turn * 45;
}

export function turnIsCardinal(turn: Turn): boolean {
    return (turn & 1) === 0;
}

export function turnReverse(turn: Turn): Turn {
    return ((8 - turn) & 7) as Turn;
}

// conversion

export function turnFromCardinalDirections(from: CardinalDirection, to: CardinalDirection): Turn {
    return (((to - from) * 2) & 7) as Turn;
}

export function turnFromCardinalTurn(turn: CardinalTurn): Turn {
    return (turn << 1) as Turn;
}

export function turnFromDirections(from: Direction, to: Direction): Turn {
    return ((to - from) & 7) as Turn;
}

// math

export function turnAddTurn(turn1: Turn, turn2: Turn): Turn {
    return ((turn1 + turn2) & 7) as Turn;
}
