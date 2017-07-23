'use strict'

const Promise = require('bluebird')
const merge = require('merge')
const assert = require('assert')
const md5 = require('md5')
const jwt = require('jwt-simple')
const moment = require('moment')
const wrap = require('async-class').wrap
const request = Promise.promisify(require('request'))
Promise.promisifyAll(request)

const defaultOptions = {
  baseUrl: 'https://www.billingo.hu/api'
}

class Billingo {
  constructor (options) {
    this._options = merge(defaultOptions, options || {})
    assert(typeof this._options.key === 'string' && this._options.key.trim().length, 'Valid key missing!')
    assert(typeof this._options.secret === 'string' && this._options.secret.trim().length, 'Valid secret missing!')
    this.invoices = {
      get: (id) => this.requestOneAsync('get', `/invoices/${id}`),
      list: () => this.requestAsync('get', '/invoices'),
      blocks: () => this.requestAsync('get', '/invoices/blocks'),
      link: (id) => this.requestAsync('get', `/invoices/${id}/code`),
      cancel: (id) => this.requestAsync('get', `/invoices/${id}/cancel`),
      send: (id) => this.requestAsync('get', `/invoices/${id}/send`),
      create: (data) => this.requestAsync('post', '/invoices', data),
      pay: (id, data) => this.requestAsync('post', `/invoices/${id}/pay`, data),
      update: (id, data) => this.requestAsync('put', `/invoices/${id}`, data),
      delete: (id) => this.requestAsync('delete', `/invoices/${id}`)
    }
    this.clients = {
      get: (id) => this.requestOneAsync('get', `/clients/${id}`),
      list: () => this.requestAsync('get', '/clients'),
      create: (data) => this.requestAsync('post', '/clients', data),
      update: (id, data) => this.requestAsync('put', `/clients/${id}`, data),
      delete: (id) => this.requestAsync('delete', `/clients/${id}`)
    }
    this.expenses = {
      list: () => this.requestAsync('get', '/expenses'),
      categories: (langCode) => this.requestAsync('get', `/expenses/categories/${langCode}`),
      create: (data) => this.requestAsync('post', '/expenses', data),
      update: (id, data) => this.requestAsync('put', `/expenses/${id}`, data)
    }
    this.bankAccounts = {
      get: (id) => this.requestOneAsync('get', `/bank_accounts/${id}`),
      list: () => this.requestAsync('get', '/bank_accounts'),
      create: (data) => this.requestAsync('post', '/bank_accounts', data),
      update: (id, data) => this.requestAsync('put', `/bank_accounts/${id}`, data)
    }
    this.paymentMethods = {
      get: (langCode) => this.requestAsync('get', `/payment_methods/${langCode}`)
    }
    this.vat = {
      list: (query) => this.requestAsync('get', '/vat', query),
      eu: (query) => this.requestAsync('get', '/vat/eu', query)
    }
    this.currency = {
      convert: (query) => this.requestAsync('get', '/currency', query)
    }
  }

  * requestOneAsync () {
    var data = yield this.requestAsync.apply(this, arguments)
    return data && data.length ? data[0] : data
  }

  * requestAsync (method, route, param) {
    const response = yield request(this.options(method, route, param))
    try {
      var body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body
    } catch (err) {
      throw new Error(`Not parsable body ${response.body}`)
    }
    if (body.success) return body.data
    if (body.error) throw new Error(body.error)
    if (body.errors) {
      var error = new Error(`ValidationError via ${route} ${JSON.stringify(body.errors)}`)
      error.errors = body.errors
      throw error
    }
    // else !(success || error || errors)
    return null
  }

  options (method, route, param) {
    const options = {
      baseUrl: this._options.baseUrl,
      method: method,
      url: route,
      headers: {
        alg: 'HS256',
        typ: 'JWT',
        Authorization: `Bearer ${this.token()}`
      }
    }
    param = param || {}
    if (typeof param !== 'object') {
      try {
        param = JSON.parse(param)
      } catch (err) {
        throw new Error(`param ${param} is not an object and not parsable`)
      }
    }
    if (method.toLowerCase() === 'get') {
      options.qs = param
    } else {
      options.body = param
      options.json = true
    }
    return options
  }

  token () {
    const ts = moment().add(-10, 'seconds').unix();
    
    return jwt.encode({
      sub: this._options.key,
      iat: ts,
      exp: moment().add(70, 'seconds').unix(),
      iss: 'cli',
      jti: md5(this._options.key + ts)
    }, this._options.secret)
  }
}

module.exports = wrap(Billingo)
