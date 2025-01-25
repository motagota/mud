export interface Exit {
    [direction: string]: string;
}

export interface Room {
    description: string;
    exits: Exit;
}

// Valid movement directions
export type Direction = 'north' | 'south' | 'east' | 'west';
export const validDirections: Direction[] = ['north', 'south', 'east', 'west'];
