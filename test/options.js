'use strict'

const expect = require('chai').expect

describe('billingo', function () {
  before(function () {
    const Billingo = require('../index')
    this.billingo = new Billingo({
      secret: 'some-secret',
      key: 'some-key'
    })
    expect(this.billingo.options).to.be.a('function')
  })
  describe('.options() throws error', function () {
    before(function () {
      this.get = 'get'
      this.query = 'not-a-stringified-json'
      this.route = '/route'
    })
    it('if param is not parsable', function () {
      expect(() => this.billingo.options(this.get, this.route, this.query))
        .to.throw(Error, `param ${this.query} is not an object and not parsable`)
    })
  })
  describe('.options("get", "/route")', function () {
    before(function () {
      this.get = 'get'
      this.query = { simple: 'query' }
      this.route = '/route'
      this.options = this.billingo.options(this.get, this.route)
    })
    it('returns with an object', function () {
      expect(this.options).to.be.an('object')
    })
    it('which has a baseUrl property', function () {
      expect(this.options.baseUrl).to.be.equal(this.billingo._options.baseUrl)
    })
    it('which has a method property', function () {
      expect(this.options.method).to.be.equal(this.get)
    })
    it('which has a headers property', function () {
      expect(this.options).to.have.property('headers')
    })
    it('which has an url property', function () {
      expect(this.options).to.have.property('url', this.route)
    })
    it('which has an empty qs property', function () {
      expect(this.options.qs).to.be.eql({})
    })
    it('which has no body property', function () {
      expect(this.options).to.not.have.property('body')
    })
  })

  describe('.options("get", "/route", { simple: "query" })', function () {
    before(function () {
      this.get = 'get'
      this.query = { simple: 'query' }
      this.route = '/route'
      this.options = this.billingo.options(this.get, this.route, this.query)
    })
    it('returns with an object', function () {
      expect(this.options).to.be.an('object')
    })
    it('which has a baseUrl property', function () {
      expect(this.options.baseUrl).to.be.equal(this.billingo._options.baseUrl)
    })
    it('which has a method property', function () {
      expect(this.options.method).to.be.equal(this.get)
    })
    it('which has a headers property', function () {
      expect(this.options).to.have.property('headers')
    })
    it('which has an url property', function () {
      expect(this.options).to.have.property('url', this.route)
    })
    it('which has a qs property', function () {
      expect(this.options.qs).to.be.equal(this.query)
    })
    it('which has no body property', function () {
      expect(this.options).to.not.have.property('body')
    })
  })

  describe('.options("post", "/route")', function () {
    before(function () {
      this.post = 'post'
      this.body = { simple: 'body' }
      this.route = '/route'
      this.options = this.billingo.options(this.post, this.route)
    })
    it('returns with an object', function () {
      expect(this.options).to.be.an('object')
    })
    it('which has a baseUrl property', function () {
      expect(this.options.baseUrl).to.be.equal(this.billingo._options.baseUrl)
    })
    it('which has a method property', function () {
      expect(this.options.method).to.be.equal(this.post)
    })
    it('which has a headers property', function () {
      expect(this.options).to.have.property('headers')
    })
    it('which has an url property', function () {
      expect(this.options).to.have.property('url', this.route)
    })
    it('which has an empty body property', function () {
      expect(this.options.body).to.be.eql({})
    })
    it('which has no qs property', function () {
      expect(this.options).to.not.have.property('qs')
    })
  })

  describe('.options("post", "/route", { simple: "body" })', function () {
    before(function () {
      this.post = 'post'
      this.body = { simple: 'body' }
      this.route = '/route'
      this.options = this.billingo.options(this.post, this.route, this.body)
    })
    it('returns with an object', function () {
      expect(this.options).to.be.an('object')
    })
    it('which has a baseUrl property', function () {
      expect(this.options.baseUrl).to.be.equal(this.billingo._options.baseUrl)
    })
    it('which has a method property', function () {
      expect(this.options.method).to.be.equal(this.post)
    })
    it('which has a headers property', function () {
      expect(this.options).to.have.property('headers')
    })
    it('which has an url property', function () {
      expect(this.options).to.have.property('url', this.route)
    })
    it('which has a body property', function () {
      expect(this.options.body).to.be.equal(this.body)
    })
    it('which has a json=true property', function () {
      expect(this.options).to.have.property('json', true)
    })
    it('which has no qs property', function () {
      expect(this.options).to.not.have.property('qs')
    })
  })
})
