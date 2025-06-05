const express = require('express');
const conectarDB = require('./config/database');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const areaRoutes = require('./routes/areas');
const rolRoutes = require('./routes/roles');
const clienteRoutes = require('./routes/cliente');
const propuestaRoutes = require('./routes/propuestas');
const contratosRoutes = require('./routes/contratos');
const proyectoRoutes = require('./routes/proyectos');
const interaccionesRoutes = require('./routes/interacciones.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
conectarDB();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:9000', 'http://localhost:4000/api-docs', 'https://sysfun-frontend.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SYSFUN-BACKEND APP TESIS URP',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        // ... (Tus esquemas existentes aquí)
        Interaccion: { // ✅ NUEVO esquema para documentación Swagger
          type: 'object',
          properties: {
            nombre: { type: 'string' },
            empresa: { type: 'string' },
            email: { type: 'string' },
            tipo: {
              type: 'string',
              enum: ['Llamada', 'Reunión', 'Correo', 'Otro']
            },
            fecha: { type: 'string', format: 'date' },
            resumen: { type: 'string' }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas principales
app.use('/auth', authRoutes);
app.use('/areas', areaRoutes);
app.use('/roles', rolRoutes);
app.use('/clientes', clienteRoutes);
app.use('/propuestas', propuestaRoutes);
app.use('/contratos', contratosRoutes);
app.use('/proyectos', proyectoRoutes);
app.use('/interacciones', interaccionRoutes); // ✅ NUEVA RUTA HABILITADA

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
