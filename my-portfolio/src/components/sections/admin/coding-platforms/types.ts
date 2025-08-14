export interface CodingPlatform {
    id?: number;
    leetcode: number;
    geeksforgeeks: number;
    codingninjas: number;
    others: number;
}

export interface CodingPlatformListItem {
    id: number;
    leetcode: number;
    geeksforgeeks: number;
    codingninjas: number;
    others: number;
}

export type CodingPlatformViewMode = 'list' | 'create' | 'edit' | 'view';
