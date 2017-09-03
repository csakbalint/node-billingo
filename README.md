# node-billingo [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A Node.JS Client for Billingo.hu

## Setup

### Require the library

```js
const Billingo = require('node-billingo')
```

### Instantiate the class
```js
const billingo = new Billing({ 
  secret: 'my-little-secret',
  key: 'public-key'
})
```

## Available methods:

```js
// Invoices:
billingo.invoices.get(id);
billingo.invoices.list();
billingo.invoices.blocks();
billingo.invoices.link(id);
billingo.invoices.cancel(id);
billingo.invoices.send(id);
billingo.invoices.create(data);
billingo.invoices.pay(id, data);
billingo.invoices.update(id, data);
billingo.invoices.delete(id);

// Cients:
billingo.clients.get(id); 
billingo.clients.list();
billingo.clients.create(data);
billingo.clients.update(id, data);
billingo.clients.delete(id);

// Expenses:
billingo.expenses.list();
billingo.expenses.categories(langCode);
billingo.expenses.create(data);
billingo.expenses.update(id, data);

// Bank accounts:
billingo.bankAccounts.get(id);
billingo.bankAccounts.list();
billingo.bankAccounts.create(data);
billingo.bankAccounts.update(id, data);

// Payment methods:
billingo.paymentMethods.get(langCode);

// VAT:
billingo.vat.list(query);
billingo.vat.eu(query);

// Currency:
billingo.currency.convert(query);
```
