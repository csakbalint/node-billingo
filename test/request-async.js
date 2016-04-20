'use strict'

require('co-mocha')
const expect = require('chai').expect

describe('billingo.requestAsync()', function () {
  before(function () {
    const Billingo = require('../index')
    this.billingo = new Billingo({
      secret: 'some-secret',
      key: 'some-key'
    })
    expect(this.billingo.requestAsync).to.be.a('function')
  })
  it('returns with the response data')
  it('returns null if response is not success')
  it('throws an error if response is not a stringified object')
  it('throws an error if response is not success and error found')
})
