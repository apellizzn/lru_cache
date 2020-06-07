import { LRUCache } from "..";

describe('LRUCache', () => {

  describe('set', () => {
    let cache: LRUCache<number, number> = null;

    beforeEach(() => {
      cache = new LRUCache(3);
    })

    describe('when the cache is empty', () => {
      test("adds an element", () => {
        expect(cache.set(1, 3)).toBe(1);
      })
    })

    describe('when the cache is full', () => {
      test("adds the element without overflowing", () => {
        cache.set(1, 3);
        cache.set(2, 4);
        cache.set(3, 5);
        expect(cache.set(4, 6)).toBe(3);
      })
    })

    describe('when key is already used', () => {
      test("overwrites the value", () => {
        expect(cache.set(1, 4)).toBe(1);
      })
    })
  })

  describe('get', () => {
    let cache: LRUCache<number, number> = null;

    beforeEach(() => {
      cache = new LRUCache(3);
      cache.set(2, 3);
    })

    describe('when the key is not present', () => {
      test("returns null", () => {
        expect(cache.get(1)).toBeNull()
      })
    })

    describe('when the key is present', () => {
      test("returns the associated value", () => {
        expect(cache.get(2)).toBe(3);
      })
    })

    test("will set the last key as most recently used", () => {
      cache.set(1, 2);
      cache.set(3, 4);
      // current state List(1,2) <-> List(2,3) <-> List(3,4)
      // now the cache is full
      expect(cache.isFull()).toBe(true);
      // this will move List(2,3) to most recently used position
      // List(1, 2) <->  List(3, 4) <-> List(2, 3)
      cache.get(2);
      // this will overwrite the last recently used
      // List(3, 4) <-> List(2, 3) <-> List(4, 5)
      cache.set(4, 5);
      expect(cache.get(2)).toBe(3);
    })
  })

  describe('has', () => {
    let cache: LRUCache<number, number> = null;

    beforeEach(() => {
      cache = new LRUCache(3);
      cache.set(2, 3);
    })
    describe('when the key is not present', () => {
      test("returns false", () => {
        expect(cache.has(1)).toBe(false);
      })
    })
    describe('when the key is present', () => {
      test("returns true", () => {
        expect(cache.has(2)).toBe(true);
      })
    })
  })

  describe("using objects as keys", () => {
    class Person {
      name: string;
      constructor(name: string) { this.name = name; }
    }
    class Phone {
      number: string;
      constructor(number: string) { this.number = number; }
    }

    let cache: LRUCache<Person, Phone>;



    describe("set", () => {
      beforeEach(() => {
        cache = new LRUCache(3);
      })

      test("works", () => {
        let person1 = new Person("tom");
        let phone1 = new Phone("+393556789234");
        expect(cache.set(person1, phone1)).toBe(1);
        let phone2 = new Phone("+383556789234");
        expect(cache.set(person1, phone2)).toBe(1);
      })
    })

    describe("get", () => {
      let person1 = new Person("tom");
      let phone1 = new Phone("+393556789234");

      beforeEach(() => {
        cache = new LRUCache(3);
        cache.set(person1, phone1);
      })

      test("works", () => {
        expect(cache.get(person1)).toBe(phone1);
        // new Person("tom") is different from person1
        expect(cache.get(new Person("tom"))).toBeNull();
      })
    })
  })
})
