const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const parceiroRoutes = require('./routes/parceiroRoutes');
const passageiroRoutes = require('./routes/passageiroRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(
  //Adicinar url do front aqui
  //{origin: 'http://yourapp.com'}
));

// Conectar ao banco de dados MongoDB
const connectDb = async ()=>{
  await mongoose.connect("mongodb+srv://caronaUser:caronaPass@caronaamiga.rejatcs.mongodb.net/?retryWrites=true&w=majority&appName=CaronaAmiga")

  console.log(`O banco está conectado através da conexão ${mongoose.connection.host}`)
}
connectDb()

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
