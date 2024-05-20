// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card.js";
import PieChart from "../../../../components/charts/PieChart.js";

import React from "react";

export default function Conversion({ data }) {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card p='30px' align='center' direction='column' w='100%'>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
              <Text
          me='auto'
          color={textColor}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Grafica de Pastel
        </Text>

      </Flex>

      {data ? (
        <PieChart data={data} /> 
      ) : (
        <div>Cargando...</div>
      )}
    </Card>
  );
}
