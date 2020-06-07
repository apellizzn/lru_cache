export declare class LRUCache<K, T> {
    private hash;
    private SIZE;
    private mru;
    private lru;
    constructor(SIZE: number);
    private remove;
    private add;
    has(key: K): boolean;
    isFull(): boolean;
    set(key: K, data: T): number;
    get(key: K): T | null;
}
