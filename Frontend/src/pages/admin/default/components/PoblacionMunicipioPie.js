// PieCard.js
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import PieChart from "../../../../components/charts/common/PieChart.js";
import React from "react";

export default function PoblacionMunicipioPie({ data, onClick }) {
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
          Población Total
        </Text>
      </Flex>

      {data ? (
        <PieChart data={data} onClick={onClick} />
      ) : (
        <div>Cargando...</div>
      )}
    </Card>
  );
}
