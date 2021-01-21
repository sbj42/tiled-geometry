import { CardinalDirection } from './cardinal-direction';

export enum CardinalDirectionFlags {
    NONE  = 0,
    NORTH = 1,
    EAST  = 2,
    SOUTH = 4,
    WEST  = 8,
    ALL   = 15,
}

export function cardinalDirectionFlagsToString(flags: CardinalDirectionFlags): string {
    let ret = '[';
    if ((flags & CardinalDirectionFlags.NORTH) !== 0) {
        ret += 'N';
    }
    if ((flags & CardinalDirectionFlags.EAST) !== 0) {
        ret += 'E';
    }
    if ((flags & CardinalDirectionFlags.SOUTH) !== 0) {
        ret += 'S';
    }
    if ((flags & CardinalDirectionFlags.WEST) !== 0) {
        ret += 'W';
    }
    return ret + ']';
}

export function cardinalDirectionFlagsHasCardinalDirection(flags: CardinalDirectionFlags, dir: CardinalDirection): boolean {
    return (flags & cardinalDirectionFlagsFromCardinalDirection(dir)) !== 0;
}

export function cardinalDirectionFlagsSetCardinalDirection(flags: CardinalDirectionFlags, dir: CardinalDirection): CardinalDirectionFlags {
    return (flags | cardinalDirectionFlagsFromCardinalDirection(dir)) as CardinalDirectionFlags;
}

export function cardinalDirectionFlagsRemoveCardinalDirection(flags: CardinalDirectionFlags, dir: CardinalDirection): CardinalDirectionFlags {
    return (flags & ~cardinalDirectionFlagsFromCardinalDirection(dir)) as CardinalDirectionFlags;
}

// conversion

export function cardinalDirectionFlagsFromCardinalDirection(dir: CardinalDirection): CardinalDirectionFlags {
    return (1 << dir) as CardinalDirectionFlags;
}
