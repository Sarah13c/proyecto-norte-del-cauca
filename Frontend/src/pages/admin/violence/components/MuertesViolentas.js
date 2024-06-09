import React, { useState, useEffect } from "react";
import { Box, Flex, Text, useColorModeValue, Select } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import StackedBarChartAcc from "../../../../components/charts/violence/StackedBarChartAcc.js";
const MuertesViolentas = ({ data, ...rest }) => {
    const [selectedMunicipality, setSelectedMunicipality] = useState("");
    const [selectedYearRange, setSelectedYearRange] = useState({ start: "Todos los años", end: "Todos los años" });
  
    const municipalities = [...new Set(data.map((entry) => entry["MUNICIPIO DEL HECHO"]))];
    const years = [...new Set(data.map((entry) => entry.AÑO))].sort((a, b) => a - b);
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const handleMunicipalityChange = (event) => {
      setSelectedMunicipality(event.target.value);
    };
  
    const handleYearRangeChange = (event, type) => {
      setSelectedYearRange((prev) => ({
        ...prev,
        [type]: event.target.value,
      }));
    };
  
    const filteredData = data.filter((entry) => {
      const isMunicipalityMatch = selectedMunicipality ? entry["MUNICIPIO DEL HECHO"] === selectedMunicipality : true;
      const isYearMatch =
        (selectedYearRange.start === "Todos los años" || entry.AÑO >= selectedYearRange.start) &&
        (selectedYearRange.end === "Todos los años" || entry.AÑO <= selectedYearRange.end);
      return isMunicipalityMatch && isYearMatch;
    });
  
    return (
      <Card align="center" direction="column" w="100%" {...rest}>
        <Flex align="center" w="100%" px="15px" py="10px">
          <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
            Muertes Violentas por Municipio y Año
          </Text>
        </Flex>
        <Box mt="20px">
          {data && (
            <Flex justify="center">
              <Select
                placeholder="Desde Año"
                value={selectedYearRange.start}
                onChange={(event) => handleYearRangeChange(event, "start")}
                bg="white"
                color={textColor}
                borderColor="secondaryGray.400"
                _hover={{ borderColor: "secondaryGray.600" }}
                _focus={{ borderColor: "secondaryGray.600" }}
                mr="10px"
              >
                <option key="Todos los años" value="Todos los años">
                  Todos los años
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Hasta Año"
                value={selectedYearRange.end}
                onChange={(event) => handleYearRangeChange(event, "end")}
                bg="white"
                color={textColor}
                borderColor="secondaryGray.400"
                _hover={{ borderColor: "secondaryGray.600" }}
                _focus={{ borderColor: "secondaryGray.600" }}
                mr="10px"
              >
                <option key="Todos los años" value="Todos los años">
                  Todos los años
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Seleccione un municipio"
                value={selectedMunicipality}
                onChange={handleMunicipalityChange}
                bg="white"
                color={textColor}
                borderColor="secondaryGray.400"
                _hover={{ borderColor: "secondaryGray.600" }}
                _focus={{ borderColor: "secondaryGray.600" }}
              >
                <option key="Todos los municipios" value="">
                  Todos los municipios
                </option>
                {municipalities.map((municipality) => (
                  <option key={municipality} value={municipality}>
                    {municipality}
                  </option>
                ))}
              </Select>
            </Flex>
          )}
        </Box>
        <Box h="350px" mt="auto">
          {data && <StackedBarChartAcc data={filteredData} />}
        </Box>
      </Card>
    );
  };
  
  export default MuertesViolentas;