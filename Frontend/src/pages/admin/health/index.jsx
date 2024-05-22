import React, { useEffect, useState } from "react";
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  AspectRatio,
} from "@chakra-ui/react";
import '../../../assets/css/App.css';
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import {
  MdBarChart,
  MdFace3,
  MdFace6,
} from "react-icons/md";
import DailyTraffic from "./components/DailyTraffic";
import PieCard from "./components/PieCard";
import TotalSpent from "./components/TotalSpent";
import WeeklyRevenue from "./components/WeeklyRevenue";
import MapComponent from "../../../components/MapComponents/MapComponent";


export default function UserReports() {
  // State variables
  const [totalPoblacion, setTotalPoblacion] = useState(null);
  const [pyramidData, setPyramidData] = useState(null);
  const [selectedMunicipio, setSelectedMunicipio] = useState(null);
  const [pyramidDataMunicipio, setPyramidDataMunicipio] = useState(null);
  const [dataDb, setDataDb] = useState(null);
  
  
  const [lineChartData, setLineChartData] = useState(null);
  const [selectedArea, setSelectedArea] = useState("Total");
  const [dataDbPoblacion, setDataDbPoblacion] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);
  const [totalPoblacionMunicipio, setTotalPoblacionMunicipio] = useState(null); // Nuevo estado para el total de población del municipio seleccionado
  const [dataDiscapacidad, setDataDiscapacidad] = useState([]);
  const [areas, setAreas] = useState([]);

  // Constants
  const center = [2.283333, -76.85];
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/discapacidadesSalud');
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        setDataDiscapacidad(data);
        setAreas([...new Set(data.map(d => d.municipioDAP))]);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  // Effect to fetch data for DailyTraffic component
  useEffect(() => {
    const fetchDataPoblacion = async () => {
      try {
        const response = await fetch('http://localhost:3001/datos2022Poblacion');
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        setDataDbPoblacion(data);
      } catch (error) {
        console.error("Error al obtener los datos de la base de datos:", error);
      }
    };

    fetchDataPoblacion();
  }, []);

  // Main effect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch data for Pyramid Data
        const responsePyramid = await fetch('http://localhost:3001/piramidePoblacional');
        if (!responsePyramid.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const dataPyramid = await responsePyramid.json();
        setPyramidData(dataPyramid);

        // Fetch data for Total Poblacion
        const responseTotalPoblacion = await fetch('http://localhost:3001/total2022Poblacion');
        if (!responseTotalPoblacion.ok) {
          throw new Error('Error al obtener los datos del servidor');
        }
        const dataTotalPoblacion = await responseTotalPoblacion.json();
        setTotalPoblacion(dataTotalPoblacion);

        // Fetch data for Data Db
        const responseDataDb = await fetch('http://localhost:3001/datos2022Poblacion');
        if (!responseDataDb.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const dataDbResponse = await responseDataDb.json();
        setDataDb(dataDbResponse);

        // Fetch data for Total Pyramid Data
        const responseTotalPyramidData = await fetch('http://localhost:3001/piramidePoblacionalTotal');
        if (!responseTotalPyramidData.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const dataTotalPyramid = await responseTotalPyramidData.json();
        setPyramidDataMunicipio(dataTotalPyramid);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const transformData = (data) => {
    const transformedData = [];
    data.forEach(d => {
      Object.keys(d).forEach(year => {
        if (year.match(/^\d{4}$/)) {
          const entry = transformedData.find(e => e.year === year) || { year };
          entry[d.Tipo] = d[year];
          if (!transformedData.includes(entry)) {
            transformedData.push(entry);
          }
        }
      });
    });
    return transformedData;
  };



  const handleMunicipioChange = (event) => {
    const selectedMunicipio = event.target.value;
    setSelectedMunicipio(selectedMunicipio);
    fetchPoblacionMunicipio(selectedMunicipio);
  };

  const fetchPoblacionMunicipio = (municipio) => {
    const formattedSelectedMunicipio = municipio.replace("Santander de Quilichao", "Santander De Quilichao");
    const selectedMunicipioData = dataDb ? dataDb.find(entry => entry.MunicipioAS === formattedSelectedMunicipio) : null;
    // Actualizar totalPoblacionMunicipio
    if (selectedMunicipioData) {
      setTotalPoblacionMunicipio(selectedMunicipioData.Poblacion_DANE);
    } else {
      setTotalPoblacionMunicipio(null);
    }
  };

  const formattedSelectedMunicipio = selectedMunicipio === "Santander De Quilichao" ? "Santander de Quilichao" : selectedMunicipio;



  const totalHombres = pyramidDataMunicipio ? pyramidDataMunicipio.reduce((acc, curr) => acc + parseInt(curr.hombres), 0) : 'Cargando...';
  const totalMujeres = pyramidDataMunicipio ? pyramidDataMunicipio.reduce((acc, curr) => acc + parseInt(curr.mujeres), 0) : 'Cargando...';

  const filteredData = dataDb
    ? dataDb.filter(
      entry =>
        entry.MunicipioAS.includes("Santander De Quilichao") ||
        entry.MunicipioAS.includes("Guachené") ||
        entry.MunicipioAS.includes("Puerto Tejada")
    )
    : [];

  const uniqueFilteredData = Array.from(
    new Set(filteredData.map(entry => entry.MunicipioAS))
  ).map(municipio => {
    return filteredData.find(entry => entry.MunicipioAS === municipio);
  });



  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
        gap='20px'
        mb='20px'>
        {totalPoblacion && (
          <MiniStatistics
            startContent={
              <IconBox
                w='56px'
                h='56px'
                bg={boxBg}
                icon={
                  <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
                }
              />
            }
            name='Total Población'
            value={selectedMunicipio ? totalPoblacionMunicipio || 'Cargando...' : totalPoblacion[0].total_poblacion}
          />
        )}

        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFace6} color={brandColor} />
              }
            />
          }
          name='Cantidad de Hombres'
          value={formattedSelectedMunicipio ? (pyramidDataMunicipio ? pyramidDataMunicipio.find(data => data.municipio === formattedSelectedMunicipio)?.hombres : 'Cargando...') : totalHombres}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFace3} color={brandColor} />
              }
            />
          } name='Cantidad de Mujeres'
          value={formattedSelectedMunicipio ? (pyramidDataMunicipio ? pyramidDataMunicipio.find(data => data.municipio === formattedSelectedMunicipio)?.mujeres : 'Cargando...') : totalMujeres} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
      <TotalSpent
          data={dataDiscapacidad}
          areas={areas}
          onAreaChange={() => {}}
        />
        <WeeklyRevenue
          pyramidData={pyramidData}
          selectedMunicipio={selectedMunicipio}
          handleMunicipioChange={handleMunicipioChange}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <AspectRatio ratio={16 / 9}>
          <MapComponent
            center={center}
            mousePosition={mousePosition}
            setMousePosition={setMousePosition}
          />
        </AspectRatio>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic
            dataDbPoblacion={dataDbPoblacion}
            setSelectedMunicipio={(municipio) => {
              setSelectedMunicipio(municipio);
              fetchPoblacionMunicipio(municipio); // Trae los datos de la población del municipio seleccionado
            }}
          />
          <PieCard
            data={uniqueFilteredData}
            onClick={(municipio) => {
              setSelectedMunicipio(municipio);
              fetchPoblacionMunicipio(municipio); // Trae los datos de la población del municipio seleccionado
            }}
          />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}