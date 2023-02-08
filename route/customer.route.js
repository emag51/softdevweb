module.exports = (app) => {
    const customer = require("../controller/customer.controller.js")

    app.get('/', customer.index)
    app.get('/api/customer', customer.findAll)
    app.post('/api/customer', customer.create)
    app.get('/api/customer/:customerId', customer.findById)
    app.put('/api/customer/:customerId', customer.update)
    app.delete('/api/customer/:customerId', customer.delete)
}