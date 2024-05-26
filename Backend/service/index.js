const express = require('express');
const cors = require('cors');
const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());
const { client } = require('./db'); // Importa el cliente PostgreSQL


const port = 3001;

// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
};

// Rutas
app.get('/afiliaciones', async (req, res, next) => {
  try {
    const result = await client.query('SELECT * FROM afiliaciones_salud2020_2022');
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/piramidePoblacional', async (req, res, next) => {
  try {
    const result = await client.query(`
        SELECT grupo_edad, hombres_2022, mujeres_2022, municipio
    FROM public.piramide_poblacional
        `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/datos2022Poblacion', async (req, res, next) => {
  try {
    const result = await client.query(`
        SELECT "MunicipioAS", "Poblacion_DANE"
        FROM public.afiliaciones_salud2020_2022
        WHERE "Regimen" = 'Poblacion' AND "Año" = '1/12/2022'
      `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/total2022Poblacion', async (req, res, next) => {
  try {
    const result = await client.query(`
        SELECT SUM("Poblacion_DANE") AS total_poblacion
        FROM public.afiliaciones_salud2020_2022
        WHERE "Regimen" = 'Poblacion' AND "Año" = '1/12/2022'
      `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/proyeccionHogares', async (req, res, next) => {
  try {
    const result = await client.query(`
      SELECT "Nombre_Municipio", "Area", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035"
      FROM public.proyecciones_de_hogares_2018_2035
      `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/piramidePoblacionalTotal', async (req, res, next) => {
  try {
    const result = await client.query(`
      SELECT sum(hombres_2022) as hombres, sum(mujeres_2022) as mujeres, municipio
      FROM public.piramide_poblacional
    GROUP BY municipio
        `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});



//-----Indicador de Salud-----

app.get('/totalAfiliaciones', async (req, res, next) => {
  try {
    const result = await client.query(`
      SELECT 
        CASE 
          WHEN "MunicipioAS" = 'Santander De Quilichao' THEN 'Santander de Quilichao' 
          ELSE "MunicipioAS" 
        END AS "MunicipioAS",
        "Regimen",
        "Afiliados",
        EXTRACT(YEAR FROM TO_DATE("Año", 'DD/MM/YYYY')) AS "Año"
      FROM public.afiliaciones_salud2020_2022
      WHERE ("MunicipioAS" = 'Guachené' OR "MunicipioAS" = 'Puerto Tejada' OR "MunicipioAS" = 'Santander De Quilichao')
      AND "Regimen" != 'Poblacion';
    `);

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});


//rutas de Salud 

app.get('/discapacidadesSalud', async (req, res, next) => {
  try {
    const result = await client.query(`
    SELECT "año", "municipioDAP", "el movimiento del cuerpo, manos, brazos, piernas", "el sistema cardiorespiratorio y las defensas", "el sistema genital y reproductivo", "el sistema nervioso", "la digestion, el metabolismo, las hormonas", "la piel", "la voz y el habla", "los demas organos de los sentidos (olfato, tacto y gusto)", "los oidos", "los ojos"
FROM public.discapacidad_alteraciones_permanentes
WHERE "año" = 'Total General';
        `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});
app.get('/nacimientos21', async (req, res, next) => {
  try {
    const result = await client.query(`
    SELECT "municipioNA21", "hombresNA21", "mujeresNA21", "indeterminadoNA21", "totalNA21"
    FROM public.nacimientos2021
    WHERE "municipioNA21" IN ('Guachené', 'Puerto Tejada', 'Santander de Quilichao');
    

        `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/nacimientos22', async (req, res, next) => {
  try {
    const result = await client.query(`
    SELECT "municipioNA22", "hombresNA22", "mujeresNA22", "indeterminadoNA22", "totalNA22"
    FROM public.nacimientos2022

    WHERE "municipioNA22" IN ('Guachené', 'Puerto Tejada', 'Santander de Quilichao');

        `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

//-----Indicador de Seguridad-----

app.get('/lesionesPersonales', async (req, res, next) => {
  try {
    const result = await client.query(`
    SELECT 
    "MUNICIPIO_HECHO_LePe", 
    "AÑO_LePe", 
    "ZONA_LePe",
    COUNT(*) AS total_lesiones
FROM 
    public.lesionespersonales2019_2022
WHERE 
    "MUNICIPIO_HECHO_LePe" IN ('GUACHENÉ', 'PUERTO TEJADA', 'SANTANDER DE QUILICHAO') 
    AND "AÑO_LePe" IN (2020, 2021, 2022)
GROUP BY 
    "MUNICIPIO_HECHO_LePe", 
    "AÑO_LePe", 
    "ZONA_LePe"
ORDER BY 
    "MUNICIPIO_HECHO_LePe", 
    "AÑO_LePe", 
    "ZONA_LePe"
        `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get('/hurtos1922', async (req, res, next) => {
  try {
    const result = await client.query(`
    SELECT 
    "MUNICIPIO_HECHO_Hurto", 
    "AÑO_Hurto", 
    "ZONA_Hurto",
    COUNT(*) AS total_hurtos
FROM 
    public.hurtos2019_2022
WHERE 
    "MUNICIPIO_HECHO_Hurto" IN ('SANTANDER DE QUILICHAO', 'GUACHENÉ', 'PUERTO TEJADA')
    AND "AÑO_Hurto" IN ('2020', '2021', '2022')
GROUP BY 
    "MUNICIPIO_HECHO_Hurto", 
    "AÑO_Hurto",
    "ZONA_Hurto"
ORDER BY 
    "MUNICIPIO_HECHO_Hurto", 
    "AÑO_Hurto",
    "ZONA_Hurto";

        `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});







//-----Indicador de Educación-----


//-----Indicador de Seguridad-----
//accesoscarnales_14año
app.get('/accesosCarnales', async (req, res, next) => {
  try {
    const result = await client.query(`
    SELECT 
    "MUNICIPIO_HECHO_AcceCar", 
    "AÑO_AcceCar", 
    "ZONA_AcceCar",
    COUNT(*) AS "CANTIDAD"
FROM 
    public."accesoscarnales_14años"
WHERE 
    "MUNICIPIO_HECHO_AcceCar" IN ('GUACHENÉ', 'PUERTO TEJADA', 'SANTANDER DE QUILICHAO') 
    AND "AÑO_AcceCar" IN (2020, 2021, 2022)
GROUP BY 
    "MUNICIPIO_HECHO_AcceCar", 
    "AÑO_AcceCar", 
    "ZONA_AcceCar";


        `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});
//homicidios_2019_2022
app.get('/homicidios1922', async (req, res, next) => {
  try {
    const result = await client.query(`
    SELECT "MUNICIPIO_Homi1922_HECHO", "AÑO_Homi1922", "ZONA_Homi1922", COUNT(*) AS "CANTIDAD"
FROM public.homicidios_2019_2022
WHERE "MUNICIPIO_Homi1922_HECHO" IN ('GUACHENÉ', 'PUERTO TEJADA', 'SANTANDER DE QUILICHAO') and "AÑO_Homi1922" IN (2020, 2021, 2022)
GROUP BY 
    "MUNICIPIO_Homi1922_HECHO", 
    "AÑO_Homi1922", 
    "ZONA_Homi1922"
        `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

//lesionespersonales2019_2022
app.get('/lesionesPersonales', async (req, res, next) => {
  try {
    const result = await client.query(`
    SELECT 
    "MUNICIPIO_HECHO_LePe", 
    "AÑO_LePe", 
    "ZONA_LePe",
    COUNT(*) AS total_lesiones
FROM 
    public.lesionespersonales2019_2022
WHERE 
    "MUNICIPIO_HECHO_LePe" IN ('GUACHENÉ', 'PUERTO TEJADA', 'SANTANDER DE QUILICHAO') 
    AND "AÑO_LePe" IN (2020, 2021, 2022)
GROUP BY 
    "MUNICIPIO_HECHO_LePe", 
    "AÑO_LePe", 
    "ZONA_LePe"
ORDER BY 
    "MUNICIPIO_HECHO_LePe", 
    "AÑO_LePe", 
    "ZONA_LePe"
        `);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});

//hurtos2019_2022
app.get('/hurtos1922', async (req, res, next) => {
  try {
    const result = await client.query(`
    SELECT 
    "MUNICIPIO_HECHO_Hurto", 
    "AÑO_Hurto", 
    "ZONA_Hurto",
    COUNT(*) AS total_hurtos
FROM 
    public.hurtos2019_2022
WHERE 
    "MUNICIPIO_HECHO_Hurto" IN ('SANTANDER DE QUILICHAO', 'GUACHENÉ', 'PUERTO TEJADA')
    AND "AÑO_Hurto" IN ('2020', '2021', '2022')
GROUP BY 
    "MUNICIPIO_HECHO_Hurto", 
    "AÑO_Hurto",
    "ZONA_Hurto"
ORDER BY 
    "MUNICIPIO_HECHO_Hurto", 
    "AÑO_Hurto",
    "ZONA_Hurto";

        `);
        res.status(200).json(result.rows);
      } catch (error) {
        next(error);
      }
    });
    

//violenciasintrafamiliares2019_2022


// Ruta de prueba
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

// Middleware de error
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});