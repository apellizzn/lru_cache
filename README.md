## LRU Cache

Typescript LRU Cache implementation https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)

## Implementation

- Hash https://en.wikipedia.org/wiki/Hash_table implemented using `Map` https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
- Doubly linked list https://en.wikipedia.org/wiki/Doubly_linked_list implemented using custom data structure

Using hash and doubly linked list allows to perform
- __set__ operation in __O(1)__ complexity
- __get__ operation in __O(1)__ complexity

### Usage
```typescript
import {LRUCache} from "lru-cache";

let cache = new LRUCache<number, string>(3) // initialize the cache with size 3
cache.set(1, "one");
cache.set(2, "two");
cache.set(3, "three");
cache.isFull(); // true
cache.get(3) // "three"
// now the cache is holding 1, 2 and 3 keys
cache.set(4, "four") // will delete (1, "one") as the least recently used key
cache.get(1) // null
cache.get(2) // will set key 2 as most recently used
cache.set(5, "five") // will delete (3, "three")
cache.get(2) // "two"
```
