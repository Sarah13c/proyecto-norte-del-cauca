import React, { useEffect, useState } from "react";
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import '../../../assets/css/App.css';
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import { MdWarning, MdLocalHospital, MdPeople } from "react-icons/md";

import VictimasDesplazamiento from "./components/VictimasDesplazamiento";
import ConflictosArmados from "./components/ConflictosArmados";
import MuertesViolentasDescriptivo from "./components/MuertesViolentasDescriptivo";
import MuertesViolentas from "./components/MuertesViolentas";

export default function ViolenceReports() {
  const [conflictosArmadosData, setConflictosArmadosData] = useState([]);
  const [muertesViolentasData, setMuertesViolentasData] = useState([]);
  const [dataDesplazados, setDataDesplazados] = useState([]);

  const [totalConflictos, setTotalConflictos] = useState(0);
  const [totalMuertesViolentas, setTotalMuertesViolentas] = useState(0);
  const [totalDesplazados, setTotalDesplazados] = useState(0);

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [conflictosResponse, muertesResponse, desplazadosResponse] = await Promise.all([
          fetch("https://backend-norte-cauca-prod-rbud.onrender.com/conflictosArmados"),
          fetch("https://backend-norte-cauca-prod-rbud.onrender.com/muertesViolentasTotal"),
          fetch("https://backend-norte-cauca-prod-rbud.onrender.com/desplazamientoForzado")
        ]);

        const conflictosData = await conflictosResponse.json();
        const muertesData = await muertesResponse.json();
        const desplazadosData = await desplazadosResponse.json();

        setConflictosArmadosData(conflictosData);
        setMuertesViolentasData(muertesData);
        setDataDesplazados(desplazadosData);

        // Calcular totales para KPIs
        const totalConflictos = conflictosData.reduce((sum, item) => sum + parseInt(item.Dato_Numérico), 0);
        const totalMuertes = muertesData.reduce((sum, item) => sum + parseInt(item.CANTIDAD), 0);
        const totalDesplazados = desplazadosData.reduce((sum, item) => sum + parseInt(item.Numero_Victimas), 0);

        setTotalConflictos(totalConflictos);
        setTotalMuertesViolentas(totalMuertes);
        setTotalDesplazados(totalDesplazados);

      } catch (error) {
        console.error("Error al obtener los datos:", error);
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
              icon={<Icon w='32px' h='32px' as={MdWarning} color={brandColor} />}
            />
          }
          name="Total Conflictos Armados"
          value={totalConflictos}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdLocalHospital} color={brandColor} />}
            />
          }
          name="Total Muertes Violentas"
          value={totalMuertesViolentas}
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
          name="Total Desplazados"
          value={totalDesplazados}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <ConflictosArmados data={conflictosArmadosData} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <MuertesViolentasDescriptivo data={muertesViolentasData} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="20px">
          <VictimasDesplazamiento data={dataDesplazados} />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <MuertesViolentas data={muertesViolentasData} />
      </SimpleGrid>
    </Box>
  );
}
