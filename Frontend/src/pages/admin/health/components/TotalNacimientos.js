import React from "react";
import { Box, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import SlopeChart from "../../../../components/charts/common/SlopeChart.js";

export default function TotalNacimientos({
    nacimientosData,
    selectedYear,
    handleYearChange,
    ...rest
  }) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
  
    return (
      <Card align="center" direction="column" w="100%" {...rest}>
        <Flex align="center" w="100%" px="15px" py="10px">
          <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
            Nacimientos por Municipio
          </Text>
          <Select value={selectedYear} onChange={handleYearChange}>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </Select>
        </Flex>
        <Box h="350px" mt="auto">
          {nacimientosData && <SlopeChart data={nacimientosData} year={selectedYear} />}
        </Box>
      </Card>
    );
  }