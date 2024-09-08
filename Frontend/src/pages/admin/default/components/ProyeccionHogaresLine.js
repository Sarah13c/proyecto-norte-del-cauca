import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import LineChartGroup from "../../../../components/charts/common/LineChartGroup.js";

export default function ProyeccionHogaresLine({ data, areas, onAreaChange, ...rest }) {
  const [selectedArea, setSelectedArea] = useState("Total");
  const [lineChartData, setLineChartData] = useState(data);
  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {
    setLineChartData(data);
  }, [data]);

  const handleAreaChange = (event) => {
    const newArea = event.target.value;
    setSelectedArea(newArea);
    onAreaChange(newArea);
  };

  return (
    <Card
      justifyContent="center"
      align="center"
      direction="column"
      w="100%"
      h="auto" // Ajusta el tamaño de la tarjeta
      mb="0px"
      p="0" // Elimina el padding interno si es necesario
      {...rest}
    >
      <Flex
        justify="space-between"
        px="20px"
        py="10px" // Ajusta el padding
        w="100%"
        align="center"
      >
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          Proyección de Hogares
        </Text>
        <Select value={selectedArea} onChange={handleAreaChange} width="auto">
          {areas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </Select>
      </Flex>
      <Flex
        w="100%"
        h="100%" // Asegura que el contenido ocupe el espacio vertical disponible
        direction="column"
        align="center"
        justify="center"
      >
        <Box
          w="100%"
          h="100%"
          minH="260px"
          mt="auto"
          overflow="hidden" // Asegura que no haya desbordamiento
        >
          {lineChartData && <LineChartGroup data={lineChartData} />}
        </Box>
      </Flex>
    </Card>
  );
}
