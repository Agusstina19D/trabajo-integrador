# Proyecto de API para Gestión de Productos

Este proyecto es una API RESTful desarrollada con Node.js, Express, MongoDB y Mongoose. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de productos en una base de datos MongoDB.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para Node.js que facilita la creación de aplicaciones web.
- **MongoDB**: Base de datos NoSQL orientada a documentos.
- **Mongoose**: Biblioteca de modelado de objetos MongoDB para Node.js.

## Estructura del Proyecto

- `app.js`: Archivo principal del servidor Express que define las rutas y maneja las solicitudes HTTP.
- `conexiondb.js`: Archivo para la conexión y desconexión de la base de datos MongoDB.
- `schemas.js`: Define los modelos de Mongoose para los productos.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd <DIRECTORIO_DEL_PROYECTO>
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Crea un archivo `.env` en la raíz del proyecto para definir las variables de entorno necesarias (por ejemplo, la URI de conexión a MongoDB).

## Uso

1. Inicia el servidor:
    ```bash
    npm start
    ```

2. El servidor escuchará en `http://localhost:3000`.

## Rutas de la API

- **GET /todoslosproductos**
  - Obtiene todos los productos de la base de datos.

- **GET /obtenerproductoporid/:id**
  - Obtiene un producto por su ID. Reemplaza `:id` con el ID del producto.

- **GET /filtrarproductopornombre/:nombreBuscado**
  - Filtra productos por nombre. Reemplaza `:nombreBuscado` con el nombre del producto que quieres buscar.

- **POST /adicionar**
  - Adiciona un nuevo producto. En el cuerpo de la solicitud, incluye los detalles del producto en formato JSON.

- **PATCH /suplantar/:codigo**
  - Actualiza el precio de un producto existente. Reemplaza `:codigo` con el ID del producto y proporciona el nuevo precio en el cuerpo de la solicitud.

- **DELETE /prescindir/:codigo**
  - Elimina un producto por su ID. Reemplaza `:codigo` con el ID del producto.

## Archivos y Configuración

- **`app.js`**: Configura y gestiona las rutas de la API.
- **`conexiondb.js`**: Contiene funciones para conectarse y desconectarse de MongoDB.
- **`schemas.js`**: Define el esquema de Mongoose para los productos. Este archivo debe exportar el modelo `Product`.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún problema o tienes ideas para mejorar, no dudes en abrir un issue o enviar un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

Para más información sobre cómo usar o contribuir al proyecto, revisa la documentación adicional o contacta con el mantenedor del proyecto.

