import React, { useEffect, useState } from "react";
import { Icon } from "@chakra-ui/react";
import {
  Box,
  SimpleGrid,
  useColorModeValue,
  Select,
  Text,
  Flex,
} from "@chakra-ui/react";
import Card from "../../../components/card/Card.js";
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import { MdSchool } from "react-icons/md";
import CalidadEducativaChart from "./components/CalidadEducativaChart";

export default function EducationReports() {
  const [data2021, setData2021] = useState([]);
  const [data2022, setData2022] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2022");
  const [selectedDepartamento, setSelectedDepartamento] = useState("Todos");

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2021 = await fetch('http://localhost:3001/calidadEducativa2021');
        const response2022 = await fetch('http://localhost:3001/calidadEducativa2022');
        
        if (!response2021.ok || !response2022.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        
        const data2021 = await response2021.json();
        const data2022 = await response2022.json();
        
        setData2021(data2021);
        setData2022(data2022);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleDepartamentoChange = (event) => {
    setSelectedDepartamento(event.target.value);
  };

  const currentData = selectedYear === "2022" ? data2022 : data2021;
  const filteredData = selectedDepartamento === "Todos" 
    ? currentData 
    : currentData.filter(item => item[selectedYear === "2022" ? "Departamento_caedu22" : "departamento_caedu21"] === selectedDepartamento);

  const promedioGlobal = filteredData.reduce((acc, item) => acc + parseFloat(item[selectedYear === "2022" ? "Promedio_del_puntaje_global_caedu22" : "promedio_del_puntaje_global_caedu21"]), 0) / filteredData.length;

  const departamentos = [...new Set(currentData.map(item => item[selectedYear === "2022" ? "Departamento_caedu22" : "departamento_caedu21"]))];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

      <SimpleGrid columns={{ base: 1, md: 1, lg: 1, "2xl": 1 }} gap='20px' mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdSchool} color={brandColor} />}
            />
          }
          name={`Promedio Global ${selectedYear}`}
          value={promedioGlobal.toFixed(2)}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        <Card>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <Select value={selectedYear} onChange={handleYearChange}>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </Select>
        <Select value={selectedDepartamento} onChange={handleDepartamentoChange}>
          <option value="Todos">Todos los departamentos</option>
          {departamentos.map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </Select>
      </SimpleGrid>
          <Flex direction='column'>
            <Flex justify='space-between' align='center' mb='1rem'>
              <Text color={textColor} fontSize='lg' fontWeight='700'>
                Calidad Educativa {selectedYear}
              </Text>
            </Flex>
            <Box minH='300px' mt='auto'>
              <CalidadEducativaChart data={filteredData} year={selectedYear} />
            </Box>
          </Flex>
        </Card>
      </SimpleGrid>
    </Box>
  );
}