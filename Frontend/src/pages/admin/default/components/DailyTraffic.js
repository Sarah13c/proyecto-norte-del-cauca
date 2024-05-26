import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import BarChartComponent from "../../../../components/charts/BarChart.js";
import Card from "../../../../components/card/Card.js";

export default function DailyTraffic({ dataDbPoblacion, setSelectedMunicipio, ...rest }) {


  const textColor = useColorModeValue("secondaryGray.900", "white");

  const handleBarClick = (municipio) => {
    setSelectedMunicipio(municipio);
  };

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex justify="space-between" align="start" px="10px" pt="5px">
        <Flex flexDirection="column" align="start" me="20px">
          <Flex w="100%">
            <Text
              me='auto'
              color={textColor}
              fontSize='xl'
              fontWeight='700'
              lineHeight='100%'>
              Gráfica de Población por Municipio
            </Text>

          </Flex>
        </Flex>
      </Flex>
      <Box h="240px" mt="auto">
        <BarChartComponent
          data={dataDbPoblacion}
          xAxisDataKey="MunicipioAS"
          barDataKey="Poblacion_DANE"
          onClick={handleBarClick} // Pasa la función de manejo de clics como prop
        />
      </Box>
    </Card>
  );
}
