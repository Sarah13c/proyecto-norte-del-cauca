import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import BarChartComponent from "../../../../components/charts/BarChart.js";
import Card from "../../../../components/card/Card.js";

export default function DailyTraffic(props) {
  const { dataDbPoblacion, ...rest } = props; // Recibimos los datos como una propiedad
  
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' me='20px'>
          <Flex w='100%'>
            <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
              Barra de {dataDbPoblacion && dataDbPoblacion.length > 0 ? Object.keys(dataDbPoblacion[0])[1] : "Columna1"} por {dataDbPoblacion && dataDbPoblacion.length > 0 ? Object.keys(dataDbPoblacion[0])[0] : "Columna2"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box h='240px' mt='auto'>
        <BarChartComponent data={dataDbPoblacion} xAxisDataKey="MunicipioAS" barDataKey="Poblacion_DANE" />
      </Box>
    </Card>
  );
}
