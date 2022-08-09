



//transactions
app.get('/transactions', db.getTransactions);
app.get('/transactions/:id', db.getTransactionById);
app.post('/transactions', db.createTransaction);
app.put('/transactions/:id', db.assignTransaction);












