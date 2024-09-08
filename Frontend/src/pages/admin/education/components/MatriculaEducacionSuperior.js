import React from "react";
import {
  Box,
  Flex,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import LineChartES from "../../../../components/charts/education/LineChartES.js";

export default function MatriculaEducacionSuperior({ matriculaData, selectedMunicipio, handleMunicipioChange, ...rest }) {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
  
    // Verificar si matriculaData está definido y tiene elementos
    if (!matriculaData || matriculaData.length === 0) {
      return (
        <Card align='center' direction='column' w='100%' {...rest}>
          <Text color={textColor}>No hay datos disponibles</Text>
        </Card>
      );
    }
  
    // Lista de municipios disponibles
    const municipios = [...new Set(matriculaData.map(entry => entry.municipio))];
  
    return (
      <Card align='center' direction='column' w='100%' {...rest}>
        <Flex align='center' w='100%' px='15px' py='10px'>
          <Text
            me='auto'
            color={textColor}
            fontSize='xl'
            fontWeight='700'
            lineHeight='100%'>
            Matrícula en Educación Superior por Municipio
          </Text>
        </Flex>
  
        <Box mt='20px'>
          <Flex justify='center'>
            <Select
              placeholder="Todos los municipios"
              value={selectedMunicipio}
              onChange={handleMunicipioChange}
              bg="white"
              color={textColor}
              borderColor="secondaryGray.400"
              _hover={{ borderColor: "secondaryGray.600" }}
              _focus={{ borderColor: "secondaryGray.600" }}
            >
              {municipios.map(municipio => (
                <option key={municipio} value={municipio}>{municipio}</option>
              ))}
            </Select>
          </Flex>
        </Box>
  
        <LineChartES data={matriculaData} selectedMunicipio={selectedMunicipio} />
      </Card>
    );
  }