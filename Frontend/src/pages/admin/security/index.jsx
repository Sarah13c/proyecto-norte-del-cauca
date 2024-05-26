import React, { useEffect, useState } from "react";
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  AspectRatio,
  Select,
} from "@chakra-ui/react";
import '../../../assets/css/App.css';
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
//mapa
import MapComponent from "../../../components/MapComponents/MapComponent";
//accesos carnales
import TotalAccesosCarnales from "../../admin/security/components/TotalAccesosCarnales";
//homicidios
import HomicidiosPorMunicipio from "../../admin/security/components/HomicidiosPorMunicipio";
//Violecia Intrafamiliar
import TotalViolenciaIntrafamiliar from "../../admin/security/components/TotalViolenciaIntrafamiliar";

export default function SecurityReports() {

  // Mapa
  const [mousePosition, setMousePosition] = useState(null);

  //acceos carnales
  const [dataAccesos, setDataAccesos] = useState([]);
  const [areas, setAreas] = useState([]);

  //homicidios
  const [dataHomicidios, setDataHomicidios] = useState([]);

  //Violencia Intrafamiliar
  const [dataViolenciaIntrafamiliar, setDataViolenciaIntrafamiliar] = useState([]);
  // Constants
  const center = [2.283333, -76.85];
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  
  useEffect(() => {
    // Fetch data accesos Carnales
    const fetchDataAccesos = async () => {
      try {
        const response = await fetch("http://localhost:3001/accesosCarnales");
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        setDataAccesos(data);
        setAreas([...new Set(data.map((d) => d.MUNICIPIO_HECHO_AcceCar))]);
      } catch (error) {
        console.error("Error al obtener los datos del servidor:", error);
      }
    };
// Fetch data homicidios
    const fetchDataHomicidios = async () => {
      try {
        const response = await fetch("http://localhost:3001/homicidios1922");
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        setDataHomicidios(data);
      } catch (error) {
        console.error("Error al obtener los datos del servidor:", error);
      }
    };

    //fetch ViolenciaIntrafamiliar;
    const fetchDataViolencia = async () => {
      try {
        const response = await fetch('http://localhost:3001/violenciaIntrafamiliar');
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        setDataViolenciaIntrafamiliar(data);
      } catch (error) {
        console.error("Error al obtener los datos del servidor:", error);
      }
    };

    fetchDataAccesos();
    fetchDataHomicidios();
    fetchDataViolencia();
  }, []);


  
  
  



  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2, "2xl": 2 }}
        gap='20px'
        mb='20px'
      >
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={BsGenderMale} color={brandColor} />
              }
            />
          }
          name={`Nacimientos de Hombres en `}
          value={22}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={BsGenderFemale} color={brandColor} />
              }
            />
          }
          name={`Nacimientos de Mujeres en 22`}
          value={22}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalAccesosCarnales
          data={dataAccesos}
          areas={areas}
          onAreaChange={() => { }}
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
        <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="20px">
          <HomicidiosPorMunicipio data={dataHomicidios} />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalAccesosCarnales
          data={dataViolenciaIntrafamiliar}
          areas={areas}
          onAreaChange={() => { }}
        />
        <TotalViolenciaIntrafamiliar data={dataViolenciaIntrafamiliar} />
      </SimpleGrid>
    </Box>
  );
}
