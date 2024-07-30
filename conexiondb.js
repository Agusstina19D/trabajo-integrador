const { MongoClient } = require("mongodb");


const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri);

const obtenerdb = async()=> {
  try {
    await client.connect()
    console.log('Conectandose a mongoDB')
    const db = client.db('vestimenta').collection('vestimentatp')
    return db  
  } catch(error) {
    console.log('surgio un error con la conexion', error.message)
    process.exit(1)

  }
}

async function disconnectFromMongoDB() {
  try {
    if (client) {
      await client.close()
      console.log('Desconectandose de mongoDB')
    }
  } catch (error) {
    console.error('Error al desconectar de MongoDB')
  }
}

module.exports = {obtenerdb, disconnectFromMongoDB}