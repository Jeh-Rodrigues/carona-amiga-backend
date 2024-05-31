const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const parceiroRoutes = require('./routes/parceiroRoutes');
const passageiroRoutes = require('./routes/passageiroRoutes');
const reservaRoutes = require('./routes/reservaRoutes');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/caronaAmiga')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

// Usando as rotas
app.use('/api/parceiros', parceiroRoutes);
app.use('/api/passageiros', passageiroRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/auth', authRoutes.router); 

// Exemplo de rota protegida usando o middleware de autenticação
app.get('/api/protected', authRoutes.authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
