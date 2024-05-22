import React, { useEffect, useState } from "react";
import {
    Box,
    Icon,
    SimpleGrid,
    useColorModeValue,
    AspectRatio,
} from "@chakra-ui/react";
import '../../../assets/css/App.css';
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import {
    MdBarChart,
    MdFace3,
    MdFace6,
} from "react-icons/md";
import TotalSpent from "../../admin/health/components/TotalDisability";
import TotalAfiliaciones from "../../admin/health/components/TotalAfiliaciones";
import MapComponent from "../../../components/MapComponents/MapComponent";

export default function HeatlhReports() {
    //Afiliaciones
    const [selectedYear, setSelectedYear] = useState(null);
    const [AfiliacionesData, setAfiiacionesData] = useState(null);

    //Mapa   
    const [mousePosition, setMousePosition] = useState(null);

    // Discapacidades
    const [dataDiscapacidad, setDataDiscapacidad] = useState([]);
    const [areas, setAreas] = useState([]);

    // Constants
    const center = [2.283333, -76.85];
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");


    // Fetch data Dsicapacidades
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/discapacidadesSalud');
                if (!response.ok) {
                    throw new Error("Error al obtener los datos del servidor");
                }
                const data = await response.json();
                setDataDiscapacidad(data);
                setAreas([...new Set(data.map(d => d.municipioDAP))]);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);


    // Fecth Afliaciones
    useEffect(() => {
        const fetchData = async () => {
            try {

                // Fetch data for Pyramid Data
                const responseAfiliados = await fetch('http://localhost:3001/totalAfiliaciones');
                if (!responseAfiliados.ok) {
                    throw new Error("Error al obtener los datos del servidor");
                }
                const dataAfiliados = await responseAfiliados.json();
                setAfiiacionesData(dataAfiliados);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);

    // Handle Year Change

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3, "2xl": 3 }}
                gap='20px'
                mb='20px'>

                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
                            }
                        />
                    }
                    name='Total Población'
                    value={200}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdFace6} color={brandColor} />
                            }
                        />
                    }
                    name='Cantidad de Hombres'
                    value={300}
                />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={MdFace3} color={brandColor} />
                            }
                        />
                    } name='Cantidad de Mujeres'
                    value={100} />
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
                <TotalSpent
                    data={dataDiscapacidad}
                    areas={areas}
                    onAreaChange={() => { }}
                />
                <TotalAfiliaciones
                    afiliacionesPorMunicipio={AfiliacionesData}
                    selectedYear={selectedYear}
                    handleYearChange={handleYearChange}
                />
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
                <AspectRatio ratio={16 / 9}>
                    <MapComponent
                        center={center}
                        mousePosition={mousePosition}
                        setMousePosition={setMousePosition}
                    />
                </AspectRatio>
                <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="20px">
                    Holi :D
                    paicar
                </SimpleGrid>
            </SimpleGrid>
        </Box>
    );

}