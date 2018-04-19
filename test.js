'use strict'

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

describe('adding an instance method to a subclass via this', () => {
  it('should work in the super constructor', () => {
    class Super {
      constructor (fn) {
        // if fn, add fn as instance method to class Sub
        if (fn) this.constructor.prototype[fn.name] = fn
      }
    }

    class Sub extends Super {
      hi () {
        return 'hi'
      }
    }

    const sub = new Sub(function bye () {
      return 'bye'
    })

    expect(sub.hi()).to.equal(new Sub().hi())
    expect(sub.hi).to.equal(new Sub().hi)
    expect(Super.prototype.hi).not.to.be.ok()
    expect(Super.prototype.bye).not.to.be.ok()
    expect(Sub.prototype.hi).to.be.ok()
    expect(Sub.prototype.bye).to.be.ok()
    expect(new Super().hi).not.to.be.ok()
    expect(new Super().bye).not.to.be.ok()
    expect(sub.bye()).to.equal(new Sub(function bye () { return 'bye' }).bye())
    expect(sub.bye).to.equal(new Sub().bye)
  })

  it('should work in the super init method', () => {
    class Super {
      init (fn) {
        // if fn, add fn as instance method of class Sub
        if (fn) this.constructor.prototype[fn.name] = fn
        return this
      }
    }

    class Sub extends Super {
      hi () {
        return 'hi'
      }
    }

    const sub = new Sub()
    sub.init(function bye () {
      return 'bye'
    })

    expect(sub.hi()).to.equal(new Sub().init().hi())
    expect(sub.hi).to.equal(new Sub().init().hi)
    expect(Super.prototype.hi).not.to.be.ok()
    expect(Super.prototype.bye).not.to.be.ok()
    expect(Sub.prototype.hi).to.be.ok()
    expect(Sub.prototype.bye).to.be.ok()
    expect(new Super().hi).not.to.be.ok()
    expect(new Super().bye).not.to.be.ok()
    expect(sub.bye()).to.equal(new Sub().init().bye())
    expect(sub.bye).to.equal(new Sub().init().bye)
  })
})
