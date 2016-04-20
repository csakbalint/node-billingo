'use strict'

const expect = require('chai').expect
const jwt = require('jwt-simple')

describe('billingo.token()', function () {
  before(function () {
    const Billingo = require('../index')
    this.billingo = new Billingo({
      secret: 'some-secret',
      key: 'some-key'
    })
    expect(this.billingo.token).to.be.a('function')
  })
  it('creates a token', function () {
    this.token = this.billingo.token()
    expect(this.token).to.be.a('string')
  })
  it('what is decodable to an object', function () {
    this.payload = jwt.decode(this.token, this.billingo._options.secret)
    expect(this.payload).to.be.an('object')
  })
})
