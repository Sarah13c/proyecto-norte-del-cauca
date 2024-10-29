import React, { useEffect, useState } from "react";
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Text,
  Flex,

} from "@chakra-ui/react";
import Card from "../../../components/card/Card";
import '../../../assets/css/App.css';
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import TotalDisability from "../../dashboard/salud/components/TotalDisability";
import TotalAfiliaciones from "../../dashboard/salud/components/TotalAfiliaciones";
import TotalNacimientos from "../../dashboard/salud/components/TotalNacimientos";
import MapComponent from "../../../components/MapComponents/MapComponent";

export default function HealthReports() {
  // Afiliaciones
  const [selectedYear, setSelectedYear] = useState(null);
  const [afiliacionesData, setAfiliacionesData] = useState(null);

  // Mapa
  const [mousePosition, setMousePosition] = useState(null);

  // Discapacidades
  const [dataDiscapacidad, setDataDiscapacidad] = useState([]);
  const [areas, setAreas] = useState([]);

  // Nacimientos
  const [selectedNacimientosYear, setSelectedNacimientosYear] = useState(2021);
  const [nacimientosData, setNacimientosData] = useState([]);
  const [totalHombres, setTotalHombres] = useState(0);
  const [totalMujeres, setTotalMujeres] = useState(0);

  // Constants
  const center = [2.283333, -76.85];
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  // Fetch data Nacimientos
  useEffect(() => {
    const fetchData = async (year) => {
      const url = year === "2022" ? "http://localhost:3001/nacimientos22" : "http://localhost:3001/nacimientos21";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const data = await response.json();
        setNacimientosData(data);

        // Calculate totals for the selected year
        if (year === "2022") {
          const totalHombres = data.reduce((sum, item) => sum + item.hombresNA22, 0);
          const totalMujeres = data.reduce((sum, item) => sum + item.mujeresNA22, 0);
          setTotalHombres(totalHombres);
          setTotalMujeres(totalMujeres);
        } else {
          const totalHombres = data.reduce((sum, item) => sum + item.hombresNA21, 0);
          const totalMujeres = data.reduce((sum, item) => sum + item.mujeresNA21, 0);
          setTotalHombres(totalHombres);
          setTotalMujeres(totalMujeres);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData(selectedNacimientosYear);
  }, [selectedNacimientosYear]);

  // Fetch data Discapacidades
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
        console.error("Error al obtener los datos del servidor:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch data Afiliaciones
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAfiliados = await fetch('http://localhost:3001/totalAfiliaciones');
        if (!responseAfiliados.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        const dataAfiliados = await responseAfiliados.json();
        setAfiliacionesData(dataAfiliados);
      } catch (error) {
        console.error("Error al obtener los datos del servidor:", error);
      }
    };
    fetchData();
  }, []);

  // Handle Year Change
  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
  };

  // Handle Nacimientos Year Change
  const handleNacimientosYearChange = (event) => {
    setSelectedNacimientosYear(event.target.value);
  };

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
          name={`Nacimientos de Hombres en ${selectedNacimientosYear}`}
          value={totalHombres}
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
          name={`Nacimientos de Mujeres en ${selectedNacimientosYear}`}
          value={totalMujeres}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <Card justifyContent="center" align="center" direction="column" w="100%" mb="0px">
          <Flex align="center" w="100%">
            <Text me="auto" fontSize="xl" fontWeight="700" lineHeight="100%" mb="4">
              Mapa Demográfico del Norte del Cauca
            </Text>
          </Flex>

          <Box minH="260px" minW="100%">
            <MapComponent
              center={center}
              mousePosition={mousePosition}
              setMousePosition={setMousePosition}
            />
          </Box>
        </Card>
        <TotalNacimientos
          nacimientosData={nacimientosData}
          selectedYear={selectedNacimientosYear}
          handleYearChange={handleNacimientosYearChange}
        />

      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalDisability
          data={dataDiscapacidad}
          areas={areas}
          onAreaChange={() => { }}
        />
        <TotalAfiliaciones
          afiliacionesPorMunicipio={afiliacionesData}
          selectedYear={selectedYear}
          handleYearChange={handleYearChange}
        />


      </SimpleGrid>
    </Box>
  );
}
