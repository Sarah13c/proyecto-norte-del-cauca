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
    <Card justifyContent="center" align="center" direction="column" w="100%" mb="0px" {...rest}>
      <Flex justify="space-between" ps="0px" pe="20px" pt="5px">
        <Flex align="center" w="100%">
          <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
            Proyección de Hogares
          </Text>
        </Flex>
        <Select value={selectedArea} onChange={handleAreaChange}>
          {areas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </Select>
      </Flex>
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Box minH="260px" minW="100%" mt="auto">
          {lineChartData && <LineChartGroup data={lineChartData} />}
        </Box>
      </Flex>
    </Card>
  );
}
