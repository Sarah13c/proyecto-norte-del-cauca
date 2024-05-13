import {
  Box,
  Flex,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  AspectRatio,
} from "@chakra-ui/react";
// Assets
import '../../../assets/css/App.css';
// Custom components
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import React, { useEffect, useState } from "react";
import {
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "./components/CheckTable";
import DailyTraffic from "./components/DailyTraffic";
import PieCard from "./components/PieCard";
import TotalSpent from "./components/TotalSpent";
import WeeklyRevenue from "./components/WeeklyRevenue";
import MapComponent from "../../../components/MapComponents/MapComponent";

export default function UserReports() {
  // Chakra Color Mode

  const center = [2.283333, -76.85];
  const [mousePosition, setMousePosition] = useState(null);
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [totalPoblacion, setTotalPoblacion] = useState(null); // Estado para almacenar el total de población

  //Total Población:
  useEffect(() => {
    const fetchTotalPoblacion = async () => {
        try {
          const response = await fetch('http://localhost:3001/total2022Poblacion');
          if (!response.ok) {
            throw new Error('Error al obtener los datos del servidor');
          }
          const data = await response.json();
          setTotalPoblacion(data);
        } catch (error) {
          console.error('Error al obtener el total de población:', error);
         
        }
      };
    fetchTotalPoblacion();
}, []);


//Datos de Municipios

  const [dataDb, setDataDb] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/datos2022Poblacion');
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        setDataDb(data);
      } catch (error) {
        console.error("Error al obtener los datos de la base de datos:", error);
      }
    };

    fetchData();
  }, []);

  // Filtrar datos para Santander de Quilichao, Guachené y Puerto Tejada
  const filteredData = dataDb
    ? dataDb.filter(
      entry =>
        entry.MunicipioAS === "Santander De Quilichao" ||
        entry.MunicipioAS === "Guachené" ||
        entry.MunicipioAS === "Puerto Tejada"
    )
    : [];

  // Eliminar duplicados
  const uniqueFilteredData = Array.from(
    new Set(filteredData.map(entry => entry.MunicipioAS))
  ).map(municipio => {
    return filteredData.find(entry => entry.MunicipioAS === municipio);
  });
  //fin del piechart


  return (


    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
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
          value= {totalPoblacion ? totalPoblacion[0].total_poblacion : 'Cargando...'}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Spend this month'
          value='$642.39'
        />
        <MiniStatistics growth='+23%' name='Sales' value='$574.34' />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
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
          <DailyTraffic />
          <PieCard data={uniqueFilteredData} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}