require('dotenv').config();
const express = require('express');
const {obtenerdb,disconnectFromMongoDB} = require('./conexiondb') 
const app = express();
const port = 3000;
const { ObjectId } = require('mongodb')
const Product = require('./schemas')

// Middleware para parsear JSON
app.use(express.json());

app.get('/', async(req, res) => {
    res.send('Hola mundo!! \n Este es mi trabajo integrador');
})


//Ruta principal
app.get('/todoslosproductos', async (req, res) => {
   try {
    const db = await obtenerdb()
    const prendas = await db.find().toArray()
    res.send(200).json(prendas)
   } catch(error){
        console.log('sucedio un error',error);
        res.status(500).json({message: 'Hubo un error en el servidor'});
   } finally {
    await disconnectFromMongoDB()
   }

});

app.get('/obtenerproductoporid/:id', async (req, res) => {
    const {id} = req.params //66a5971367c65815b5932319
    try {const db = await obtenerdb()
        const objectId = new ObjectId(id)
        if(!objectId) {
            res.status(400).json({ message: "Debe de tener un ID valido!" });
        }
        const prenda = await db.find({ _id: objectId })
        res.status(200).json(prenda)
    } catch(error){
        console.log('sucedio un error',error) 
        res.status(500).json({message: 'Hubo un error en el servidor'});
    } finally {
       await disconnectFromMongoDB()
    }
});

app.get('/filtrarproductopornombre/:nombreBuscado', async (req, res) => {
    const {nombreBuscado} = req.params
    if(!nombreBuscado) {
        res.status(400).json({message: 'Debe ser un nombre valido!'});
    }
    try {const db = await obtenerdb()
        const prenda = await db.find({nombre: new RegExp(`^${nombreBuscado}$`, 'i') }).toArray();
        res.json(prenda)
    } catch(error){
        console.log('sucedio un error', error.message)
        res.status(500).json({message: 'Hubo un error en el servidor'});
    } finally {
        await disconnectFromMongoDB()
    }
});

app.post('/adicionar', async (req, res) => {
    console.log(req.body);
    try {const db = await obtenerdb()
        const newProduct = new Product(req.body);
        const result = await db.insertOne(newProduct);
        res.json(result);
    } catch(error){
        res.status(500).json({message: "Hubo un error en el servidor"});
        console.log('sucedio un error',error.message)
    } finally {
        await disconnectFromMongoDB()
    }
});

app.patch('/suplantar/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    const nuevoPrecio = req.body.precio;

    // Convertir el id a un ObjectId de MongoDB
    const objectId = new ObjectId(codigo)

    if (nuevoPrecio === undefined) {
        console.log(nuevoPrecio);
        return res.status(400).json({ message: 'El campo precio es obligatorio' });
    }

    try {const db = await obtenerdb()
        
        // Actualizar el documento en la base de datos
        const result = await db.updateOne(
            { _id: objectId },
            { $set: { precio: nuevoPrecio } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(result);
    } catch(error){
        console.log('sucedio un error',error)
        res.status(500).json({ message:'no se puede realizar la actualizacion'})
    } finally {
        await disconnectFromMongoDB()
    }
});

app.delete('/prescindir/:codigo', async (req, res) => {
    const {codigo} = req.params

    // Convertir el id a un ObjectId de MongoDB
    const objectId = new ObjectId(codigo)

    try {const db = await obtenerdb()
        const result = await db.deleteOne({ _id: objectId });
        res.json(result);
    } catch(error){
        console.log('sucedio un error',error)
        res.status(500).json({message: 'Hubo un error en el servidor'});
    } finally {
        await disconnectFromMongoDB()
    }
});

//Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
