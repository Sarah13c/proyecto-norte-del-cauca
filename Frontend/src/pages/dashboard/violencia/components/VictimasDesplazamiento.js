import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import SlopeChart from "../../../../components/charts/violence/SlopeVictimsChart.js";

export default function VictimasDesplazamiento({
    data,
    ...rest
  }) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
  
    return (
      <Card align="center" direction="column" w="100%" {...rest}>
        <Flex align="center" w="100%" px="15px" py="10px">
          <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
            Victimas De desplazamiento
          </Text>
        </Flex>
        <Box h="350px" mt="auto">
          {data && <SlopeChart data={data} />}
        </Box>
      </Card>
    );
  }