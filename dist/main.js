var List = /** @class */ (function () {
    function List(key, data, next, prev) {
        if (next === void 0) { next = null; }
        if (prev === void 0) { prev = null; }
        this.key = key;
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
    List.dummy = function () {
        return new List(null, null);
    };
    return List;
}());
var LRUCache = /** @class */ (function () {
    function LRUCache(SIZE) {
        this.SIZE = SIZE;
        this.hash = new Map();
        this.lru = List.dummy();
        this.mru = List.dummy();
    }
    LRUCache.prototype.remove = function (node) {
        var next = node.next;
        var prev = node.prev;
        prev.next = next;
        next.prev = prev;
    };
    LRUCache.prototype.add = function (node) {
        node.next = null;
        node.prev = this.mru;
        this.mru.next = node;
        this.mru = node;
    };
    LRUCache.prototype.has = function (key) {
        return this.hash.has(key);
    };
    LRUCache.prototype.isFull = function () {
        return this.hash.size === this.SIZE;
    };
    LRUCache.prototype.set = function (key, data) {
        if (this.has(key)) {
            var node = this.hash.get(key);
            node.data = data;
            this.remove(node);
            this.add(node);
        }
        else {
            if (this.isFull()) {
                this.hash.delete(this.lru.key);
                this.remove(this.lru);
                this.add(new List(key, data));
            }
            else
                this.add(new List(key, data));
        }
        this.hash.set(key, this.mru);
    };
    LRUCache.prototype.get = function (key) {
        if (!this.has(key)) {
            return null;
        }
        var node = this.hash.get(key);
        this.remove(node);
        this.add(node);
        return node.data;
    };
    return LRUCache;
}());
//# sourceMappingURL=main.js.map