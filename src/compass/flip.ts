import { CardinalOrientation } from './cardinal-orientation';

export enum Flip {
    HEADS = 0,
    TAILS = 1,
}

export const FLIPS = [
    Flip.HEADS,
    Flip.TAILS,
];

const FLIPS_STR = [
    'H',
    'T',
];

export function flipToString(flip: Flip): string {
    return FLIPS_STR[flip];
}

export function flipOpposite(flip: Flip): Flip {
    return (flip ^ 1) as Flip;
}

// conversion

export function flipFromBoolean(tails: boolean): Flip {
    return tails ? Flip.TAILS : Flip.HEADS;
}

export function flipFromCardinalOrientation(orientation: CardinalOrientation): Flip {
    return (orientation & 1) as Flip;
}
