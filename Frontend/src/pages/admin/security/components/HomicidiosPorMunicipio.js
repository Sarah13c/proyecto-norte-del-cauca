// HomicidiosPorMunicipio.js
import React, { useState } from "react";
import { Box, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import AreaChartAcc from "../../../../components/charts/security/AreaChartAcc.js";

export default function HomicidiosPorMunicipio({ data, ...rest }) {
  const [selectedZone, setSelectedZone] = useState("");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };

  // Obtener la lista de zonas disponibles
  const zones = [...new Set(data.map((entry) => entry.ZONA_Homi1922))];

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Homicidios por Municipio y Año (Área)
        </Text>
      </Flex>
      <Box mt="20px">
        <Flex justify="center">
          <Select
            placeholder="Seleccione una zona"
            value={selectedZone}
            onChange={handleZoneChange}
            bg="white"
            color={textColor}
            borderColor="secondaryGray.400"
            _hover={{ borderColor: "secondaryGray.600" }}
            _focus={{ borderColor: "secondaryGray.600" }}
          >
            {zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </Select>
        </Flex>
      </Box>
      <Box h="350px" mt="auto">
        <AreaChartAcc data={data} selectedZone={selectedZone} />
      </Box>
    </Card>
  );
}