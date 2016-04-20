'use strict'

const expect = require('chai').expect
const sinon = require('sinon')

describe('billingo', function () {
  before(function () {
    const Billingo = require('../index')
    this.billingo = new Billingo({
      secret: 'working-secret',
      key: 'working-key'
    })
    expect(this.billingo).to.be.an('object')
    sinon.stub(this.billingo, 'requestAsync', function () {
      return Array.prototype.slice.call(arguments)
    })
  })
  describe('.invoices', function () {
    it('.get("id") is ok')
    it('.list() is ok')
    it('.blocks() is ok')
    it('.link("id") is ok')
    it('.cancel("id") is ok')
    it('.send("id") is ok')
    it('.create({invoice: "data"}) is ok')
    it('.pay("id", {invoice: "data"}) is ok')
    it('.update("id", {invoice: "data"}) is ok')
    it('.delete("id") is ok')
  })
  describe('.clients', function () {
    before(function () {
      this.route = '/clients'
      this.id = 'id'
      this.data = {client: 'data'}
    })
    it('.get("id") is ok', function () {
      expect(this.billingo.clients.get(this.id)).to.be.eql(['get', `${this.route}/${this.id}`])
    })
    it('.list() is ok', function () {
      expect(this.billingo.clients.list()).to.be.eql(['get', `${this.route}`])
    })
    it('.create({client: "data"}) is ok', function () {
      expect(this.billingo.clients.create(this.data)).to.be.eql(['post', `${this.route}`, this.data])
    })
    it('.update("id", {client: "data"}) is ok', function () {
      expect(this.billingo.clients.update(this.id, this.data)).to.be.eql(['put', `${this.route}/${this.id}`, this.data])
    })
    it('.delete("id") is ok', function () {
      expect(this.billingo.clients.delete(this.id)).to.be.eql(['delete', `${this.route}/${this.id}`])
    })
  })
  describe('.expenses', function () {
    it('.list() is ok')
    it('.categories("langCode") is ok')
    it('.create({expense: "data"}) is ok')
    it('.update("id", {expense: "data"}) is ok')
  })
  describe('.bankAccounts', function () {
    it('.get("id") is ok')
    it('.list() is ok')
    it('.create({bank_account: "data"}) is ok')
    it('.update("id", {bank_account: "data"}) is ok')
  })
  describe('.paymentMethods', function () {
    it('.get("id") is ok')
  })
  describe('.vat', function () {
    it('.list() is ok')
    it('.eu({eu: "query"}) is ok')
  })
  describe('.currency', function () {
    it('.convert({from: "USD", to: "EUR", value: 100.0}) is ok')
  })
})
