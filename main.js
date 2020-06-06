function Node(data, next, prev) {
  this.data = data;
  this.next = next;
  this.prev = prev;

  this.getData = function () {
    return this.data;
  }

  this.getNext = function () {
    return this.next;
  }

  this.getPrev = function () {
    return this.prev;
  }

  this.setNext = function (next) {
    this.next = next;
  }

  this.setPrev = function (prev) {
    this.prev = prev;
  }
}

function Cache(size) {
  this.hash = {};
  this.size = size;
  this.recent = null;
  this.old = null;

  this.inspect = function () {
    console.log(this.hash);
  }

  this.isFull = function () {
    return this.size === 0;
  }

  this.__nextRecent = function (data) {
    this.recent.setNext(new Node(data, null, this.recent));
    this.recent = this.recent.getNext();
  }

  this.__discardOld = function () {
    delete this.hash[this.old.getData()];
    this.old = this.old.getNext();
    this.old.setPrev(null);
    this.size++;
  }

  this.add = function (data) {
    if (this.old == null) {
      this.old = new Node(data, null, null);
      this.recent = this.old;
    } else if (this.size !== 0) {
      this.__nextRecent(data);
    } else {
      this.__discardOld();
      this.__nextRecent(data);
    }
    this.hash[data] = this.recent;
    this.inspect();
    this.size--;
  }

  this.get = function (data) {
    if (!this.has(data)) {
      return null;
    } else {
      let lru = this.hash[data];


      if (lru === this.recent) {
        return lru.getData();
      } else if (lru === this.old) {
        this.recent.setNext(this.old);
        this.recent.setPrev(null);
        this.old.setPrev(this.recent);
        this.old.setNext(null);
        [this.old, this.recent] = [this.recent, this.old];
      }
      else {
        let next = lru.getNext();
        let prev = lru.getPrev();
        prev.setNext(next);
        next.setPrev(prev);
        lru.setPrev(this.recent);
        lru.setNext(null);
        this.recent.setNext(tmp);
        this.recent = lru;
      }
      return lru.getData();
    }
  }

  this.has = function (data) {
    return this.hash[data] != null;
  }

  this.getOrStore = function (d) {
    if (cache.has(d)) {
      return `has ${cache.get(d)} `;
    }
    cache.add(d);
    return `add ${d}`;
  }
}
