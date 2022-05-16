const express = require('express');

const app = express();

app.get('/contatos', (request, response) => {
  response.status(400).json({ message: 'Feito' });
});

app.listen(3000, console.log('🔥 Server rodando na porta http://localhost:3000'));
