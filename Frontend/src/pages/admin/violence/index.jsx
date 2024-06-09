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

//Violecia Intrafamiliar
import VictimasDesplazamiento from "../violence/components/VictimasDesplazamiento";

//Conflictos armados
import ConflictosArmados from "../violence/components/ConflictosArmados";

export default function ViolenceReports() {

  const [areas, setAreas] = useState([]);

  //Conflictos Armados
  const [conflictosArmadosData, setConflictosArmadosData] = useState([]);

  //Violencia Intrafamiliar
  const [dataViolenciaIntrafamiliar, setDataViolenciaIntrafamiliar] = useState([]);

  //Violencia Intrafamiliar
  const [dataDesplazados, setDataDesplazados] = useState([]);

  // Constants
  const center = [2.283333, -76.85];
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");


  useEffect(() => {
    // Fetch data Desplazamientos forzados
    const fetchDataDesplazados = async () => {
      try {
        const response = await fetch("http://localhost:3001/desplazamientoForzado");
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        setDataDesplazados(data);
      } catch (error) {
        console.error("Error al obtener los datos del servidor:", error);
      }
    };
    fetchDataDesplazados();
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/conflictosArmados");
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        setConflictosArmadosData(data);
      } catch (error) {
        console.error("Error al obtener los datos del servidor:", error);
      }
    };

    fetchData();
  }, []);




  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 3, "2xl": 3 }}
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
          name={`oli`}
          value={2020}
        />
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
          name={`Nacimientos de Hombres en 2022`}
          value={20202}
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
          name={`Nacimientos de Mujeres en 2021`}
          value={4334}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <ConflictosArmados data={conflictosArmadosData} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="20px">
          <VictimasDesplazamiento data={dataDesplazados} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
