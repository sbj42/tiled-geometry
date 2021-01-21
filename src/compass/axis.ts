import { CardinalDirection } from './cardinal-direction';
import { CardinalTurn } from './cardinal-turn';

export enum Axis {
    NORTH_SOUTH = 0,
    WEST_EAST   = 1,
}

export const AXES = [
    Axis.NORTH_SOUTH,
    Axis.WEST_EAST,
];

const AXES_STR = [
    'N-S',
    'W-E',
];

export function axisToString(axis: Axis): string {
    return AXES_STR[axis];
}

export function axisOrthogonal(axis: Axis): Axis {
    return (axis ^ 1) as Axis;
}

// conversion

export function axisFromCardinalDirection(dir: CardinalDirection): Axis {
    return (dir & 1) as Axis;
}

export function axisFromNorthSouthTurn(turn: CardinalTurn): Axis {
    return (turn & 1) as Axis;
}

// math

export function axisAddCardinalTurn(axis: Axis, turn: CardinalTurn): Axis {
    return ((axis + turn) & 1) as Axis;
}
