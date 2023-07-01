const express = require('express')
require('dotenv').config()
const { Contenedor } = require('./handleFiles.js')

const app = express()


const producto1 = {
  title: 'Pantalon',
  price: '$1500',
  thumbnail: 'http://random1.com',
}
const producto2 = {
  title: 'Sombrero',
  price: '$950',
  thumbnail: 'http://random2.com',
}
const producto3 = {
  title: 'Corbata',
  price: '$875',
  thumbnail: 'http://random3.com',
}

const myContainer = new Contenedor('./productos.txt')

// async function salvarProductos() {
//   //show save products
//   await myContainer.save(producto1);
//   await myContainer.save(producto2);
//   await myContainer.save(producto3);
// }

// salvarProductos();

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Servidor http corriendo en el puerto ${process.env.PORT || 4000}`)
})

app.get('/', (req, res) => {
  res.send('Verificar productos ingresando a /productos')
})

app.get('/productos', async (req, res) => {
  try {
    let productos = await myContainer.getAll()
    res.send(productos)
  } catch (e) {
    console.log(e)
  }
})

app.get('/productoRandom', async (req, res) => {
  try {
    let productos = await myContainer.getAll()
    const idRandom = Math.floor(Math.random() * productos.length)
    res.send(productos[idRandom])
  } catch (e) {
    console.log(e)
  }
})

server.on('error', (error) => {
  console.log(`Error en el servidor: ${error}`)
})
