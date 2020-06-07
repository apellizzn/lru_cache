"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
describe('LRUCache', function () {
    describe('set', function () {
        var cache = null;
        beforeEach(function () {
            cache = new __1.LRUCache(3);
        });
        describe('when the cache is empty', function () {
            test("adds an element", function () {
                expect(cache.set(1, 3)).toBe(1);
            });
        });
        describe('when the cache is full', function () {
            test("adds the element without overflowing", function () {
                cache.set(1, 3);
                cache.set(2, 4);
                cache.set(3, 5);
                expect(cache.set(4, 6)).toBe(3);
            });
        });
        describe('when key is already used', function () {
            test("overwrites the value", function () {
                expect(cache.set(1, 4)).toBe(1);
            });
        });
    });
    describe('get', function () {
        var cache = null;
        beforeEach(function () {
            cache = new __1.LRUCache(3);
            cache.set(2, 3);
        });
        describe('when the key is not present', function () {
            test("returns null", function () {
                expect(cache.get(1)).toBeNull();
            });
        });
        describe('when the key is present', function () {
            test("returns the associated value", function () {
                expect(cache.get(2)).toBe(3);
            });
        });
        test("will set the last key as most recently used", function () {
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
        });
    });
    describe('has', function () {
        var cache = null;
        beforeEach(function () {
            cache = new __1.LRUCache(3);
            cache.set(2, 3);
        });
        describe('when the key is not present', function () {
            test("returns false", function () {
                expect(cache.has(1)).toBe(false);
            });
        });
        describe('when the key is present', function () {
            test("returns true", function () {
                expect(cache.has(2)).toBe(true);
            });
        });
    });
    describe("using objects as keys", function () {
        var Person = /** @class */ (function () {
            function Person(name) {
                this.name = name;
            }
            return Person;
        }());
        var Phone = /** @class */ (function () {
            function Phone(number) {
                this.number = number;
            }
            return Phone;
        }());
        var cache;
        describe("set", function () {
            beforeEach(function () {
                cache = new __1.LRUCache(3);
            });
            test("works", function () {
                var person1 = new Person("tom");
                var phone1 = new Phone("+393556789234");
                expect(cache.set(person1, phone1)).toBe(1);
                var phone2 = new Phone("+383556789234");
                expect(cache.set(person1, phone2)).toBe(1);
            });
        });
        describe("get", function () {
            var person1 = new Person("tom");
            var phone1 = new Phone("+393556789234");
            beforeEach(function () {
                cache = new __1.LRUCache(3);
                cache.set(person1, phone1);
            });
            test("works", function () {
                expect(cache.get(person1)).toBe(phone1);
                // new Person("tom") is different from person1
                expect(cache.get(new Person("tom"))).toBeNull();
            });
        });
    });
});
//# sourceMappingURL=index.test.js.map