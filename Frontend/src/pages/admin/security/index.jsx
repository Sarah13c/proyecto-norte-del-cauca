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
import { MdLocalPolice, MdWarning, MdPeople, MdHome, MdDirectionsRun } from "react-icons/md";
import TotalAccesosCarnales from "../../admin/security/components/TotalAccesosCarnales";
import HomicidiosPorMunicipio from "../../admin/security/components/HomicidiosPorMunicipio";
import TotalLesiones from "./components/TotalLesiones";
import TotalHurtos from "./components/TotalHurtos";
import TotalViolenciaIntrafamiliar from "../../admin/security/components/TotalViolenciaIntrafamiliar";

export default function SecurityReports() {
  const [dataAccesos, setDataAccesos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [dataHurtos, setDataHurtos] = useState([]);
  const [dataLesiones, setDataLesiones] = useState([]);
  const [dataHomicidios, setDataHomicidios] = useState([]);
  const [dataViolenciaIntrafamiliar, setDataViolenciaIntrafamiliar] = useState([]);

  const [totalHomicidios, setTotalHomicidios] = useState(0);
  const [totalAccesosCarnales, setTotalAccesosCarnales] = useState(0);
  const [totalLesiones, setTotalLesiones] = useState(0);
  const [totalHurtos, setTotalHurtos] = useState(0);
  const [totalViolenciaIntrafamiliar, setTotalViolenciaIntrafamiliar] = useState(0);

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [accesosResponse, homicidiosResponse, lesionesResponse, hurtosResponse, violenciaResponse] = await Promise.all([
          fetch("http://localhost:3001/accesosCarnales"),
          fetch("http://localhost:3001/homicidios1922"),
          fetch("http://localhost:3001/lesionesPersonales"),
          fetch("http://localhost:3001/hurtos1922"),
          fetch("http://localhost:3001/violenciaIntrafamiliar")
        ]);

        const accesosData = await accesosResponse.json();
        const homicidiosData = await homicidiosResponse.json();
        const lesionesData = await lesionesResponse.json();
        const hurtosData = await hurtosResponse.json();
        const violenciaData = await violenciaResponse.json();

        setDataAccesos(accesosData);
        setDataHomicidios(homicidiosData);
        setDataLesiones(lesionesData);
        setDataHurtos(hurtosData);
        setDataViolenciaIntrafamiliar(violenciaData);

        setAreas([...new Set(accesosData.map((d) => d.MUNICIPIO_HECHO_AcceCar))]);

        // Calcular totales para KPIs
        setTotalHomicidios(homicidiosData.reduce((sum, item) => sum + parseInt(item.CANTIDAD), 0));
        setTotalAccesosCarnales(accesosData.reduce((sum, item) => sum + parseInt(item.CANTIDAD), 0));
        setTotalLesiones(lesionesData.reduce((sum, item) => sum + parseInt(item.total_lesiones), 0));
        setTotalHurtos(hurtosData.reduce((sum, item) => sum + parseInt(item.total_hurtos), 0));
        setTotalViolenciaIntrafamiliar(violenciaData.reduce((sum, item) => sum + parseInt(item.CANTIDAD), 0));

      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 5, "2xl": 5 }}
        gap='20px'
        mb='20px'
      >
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdLocalPolice} color={brandColor} />}
            />
          }
          name="Total Homicidios"
          value={totalHomicidios}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdWarning} color={brandColor} />}
            />
          }
          name="Accesos Carnales"
          value={totalAccesosCarnales}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdPeople} color={brandColor} />}
            />
          }
          name="Lesiones Personales"
          value={totalLesiones}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdDirectionsRun} color={brandColor} />}
            />
          }
          name="Total Hurtos"
          value={totalHurtos}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdHome} color={brandColor} />}
            />
          }
          name="Violencia Intrafamiliar"
          value={totalViolenciaIntrafamiliar}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <HomicidiosPorMunicipio data={dataHomicidios} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalAccesosCarnales
          data={dataAccesos}
          areas={areas}
          onAreaChange={() => { }}
        />
        <TotalLesiones data={dataLesiones} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <AspectRatio ratio={16 / 9}>
          <TotalHurtos
            data={dataHurtos}
          />
        </AspectRatio>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="20px">
          <TotalViolenciaIntrafamiliar data={dataViolenciaIntrafamiliar} />
        </SimpleGrid>
      </SimpleGrid>

      
    </Box>
  );
}
