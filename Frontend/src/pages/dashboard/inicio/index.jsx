import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  Button,
  HStack,
  useColorModeValue,
  Image,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaUserInjured,FaMapMarkerAlt, FaChartBar, FaChartLine, FaHospital, FaShieldAlt, FaUserGraduate, FaChild, FaChartPie, FaDatabase, FaInfoCircle, FaUserFriends, FaSkull } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

const MotionBox = motion(Box);

const FeatureBox = ({ title, icon, description, linkTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (linkTo) {
      if (linkTo.startsWith('http')) {
        window.open(linkTo, '_blank');
      } else {
        navigate(linkTo);
      }
    }
  };

  return (
    <MotionBox
      p={6}
      shadow="xl"
      borderWidth="1px"
      borderRadius="lg"
      bg={useColorModeValue('white', 'gray.700')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      cursor={linkTo ? "pointer" : "default"}
    >
      <VStack spacing={4} align="center">
        <Icon as={icon} w={12} h={12} color="blue.500" />
        <Heading fontSize="2xl">{title}</Heading>
        <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.300')}>{description}</Text>
      </VStack>
    </MotionBox>
  );
};

const SectionItem = ({ icon, text }) => (
  <HStack spacing={4} width="100%" justifyContent="flex-start">
    <Icon as={icon} w={6} h={6} color="blue.500" />
    <Text>{text}</Text>
  </HStack>
);

const TechnologiesModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Tecnologías Utilizadas</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <VStack align="start" spacing={4}>
          <HStack>
            <Icon as={FaChartPie} w={8} h={8} color="blue.500" />
            <Text>React para el frontend</Text>
          </HStack>
          <HStack>
            <Icon as={FaDatabase} w={8} h={8} color="orange.500" />
            <Text>Node.js y PostgreSQL para el backend</Text>
          </HStack>
        </VStack>
        <Text mt={4}>
          La plataforma ofrece datos y analítica avanzada para explorar indicadores socioeconómicos de Norte del Cauca.
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Cerrar
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const PrincipalDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box>
      <Box height="400px" position="relative" overflow="hidden">
        <Slider {...settings}>
          <Image src="https://radio1040am.com/wp-content/uploads/2023/04/image-21.png" alt="Demografía" objectFit="cover" w="100%" h="400px" />
          <Image src="https://occidente.co/wp-content/uploads/2024/08/Comunidades-indigenas-toman-medidas-en-Santander-de-Quilichao.jpg" alt="Salud" objectFit="cover" w="100%" h="400px" />
          <Image src="https://micrositios.centrodememoriahistorica.gov.co/jovenes-teatro-comunidad/wp-content/uploads/4PuertoTejada.jpg" alt="Seguridad" objectFit="cover" w="100%" h="400px" />
          
        </Slider>
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="rgba(0,0,0,0.6)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={4}>
            <Heading color="white" size="2xl" textAlign="center">Norte del Cauca Como Vamos</Heading>
            <Text color="white" fontSize="xl" textAlign="center" maxWidth="800px">
              Plataforma interactiva para el análisis de indicadores socioeconómicos y modelos predictivos de Norte del Cauca.
            </Text>
          </VStack>
        </Box>
      </Box>

      <Container maxW="container.xl" mt={12}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={16}>
          <FeatureBox
            title="Demografía"
            icon={FaChild}
            description="Explora datos poblacionales y tendencias demográficas."
            linkTo="/dashboard/demografia"
          />
          <FeatureBox
            title="Salud"
            icon={FaHospital}
            description="Consulta información sobre salud y servicios hospitalarios."
            linkTo="/dashboard/salud"
          />
          <FeatureBox
            title="Seguridad"
            icon={FaShieldAlt}
            description="Estadísticas de seguridad y análisis de delitos en la región."
            linkTo="/dashboard/seguridad"
          />
          <FeatureBox
            title="Violencia"
            icon={FaChartLine}
            description="Datos sobre tipos de violencia y su evolución en Norte del Cauca."
            linkTo="/dashboard/violencia"
          />
          <FeatureBox
            title="Educación"
            icon={FaUserGraduate}
            description="Datos sobre niveles educativos y programas de formación."
            linkTo="/dashboard/educacion"
          />
        </SimpleGrid>


        {/* Modelos Predictivos Section */}

        <Heading size="xl" mb={6} textAlign="center">Modelos Predictivos</Heading>
        <Text fontSize="lg" mb={6}>
          La plataforma emplea machine learning para predecir indicadores como acceso a la educación, desplazamientos forzados y tasa de homicidios.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} mb={16}>
          <FeatureBox
            title="Piramide Poblacional"
            icon={FaUserFriends}
            description="Predice tendencias demográficas y migratorias."
            linkTo="https://predicciones-norte-cauca.onrender.com/poblacion"
          />
          <FeatureBox
            title="Accesos Carnales"
            icon={FaUserInjured}
            description="Modelo para predicción de incidentes relacionados con accesos carnales."
            linkTo="https://predicciones-norte-cauca.onrender.com/accesos"
          />
          <FeatureBox
            title="Desplazamiento Forzado"
            icon={FaShieldAlt}
            description="Proyecta desplazamientos forzados en el tiempo."
            linkTo="https://predicciones-norte-cauca.onrender.com/desplazamiento"
          />
          <FeatureBox
            title="Homicidios"
            icon={FaSkull}
            description="Modelo predictivo de tasas de homicidio basado en datos históricos."
            linkTo="https://predicciones-norte-cauca.onrender.com/homicidios"
          />
        </SimpleGrid>


        <Heading size="xl" mb={8} textAlign="center">
          Municipios en Análisis
        </Heading>
       
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={16}>
          <Box bg={useColorModeValue('gray.50', 'gray.700')} p={6} borderRadius="lg">
            <Heading size="lg" mb={4}>Guachené</Heading>
            <VStack align="start" spacing={4}>
              <SectionItem icon={FaMapMarkerAlt} text="Ubicación estratégica en el Norte del Cauca" />
              <SectionItem icon={FaChartPie} text="Análisis de crecimiento y desarrollo local" />
              <SectionItem icon={FaInfoCircle} text="Fuente de datos: DANE" />
            </VStack>
          </Box>

          <Box bg={useColorModeValue('gray.50', 'gray.700')} p={6} borderRadius="lg">
            <Heading size="lg" mb={4}>Santander de Quilichao</Heading>
            <VStack align="start" spacing={4}>
              <SectionItem icon={FaMapMarkerAlt} text="Municipio con relevancia económica en la región" />
              <SectionItem icon={FaChartBar} text="Indicadores clave de desarrollo y bienestar" />
              <SectionItem icon={FaInfoCircle} text="Fuente de datos: DANE" />
            </VStack>
          </Box>

          <Box bg={useColorModeValue('gray.50', 'gray.700')} p={6} borderRadius="lg">
            <Heading size="lg" mb={4}>Puerto Tejada</Heading>
            <VStack align="start" spacing={4}>
              <SectionItem icon={FaMapMarkerAlt} text="Centro urbano con diversidad sociocultural" />
              <SectionItem icon={FaChartLine} text="Estudios sobre crecimiento y dinámica poblacional" />
              <SectionItem icon={FaInfoCircle} text="Fuente de datos: DANE" />
            </VStack>
          </Box>
        </SimpleGrid>

        <Flex justify="center" gap={4}>
          <Button
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            colorScheme="blue"
            size={{ base: 'md', md: 'lg' }}
            px={{ base: 4, md: 8 }}
            py={{ base: 4, md: 6 }}
            fontSize={{ base: 'md', md: 'xl' }}
            minWidth="120px"
            maxWidth="200px"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            onClick={() => navigate('/dashboard/demografia')}
          >
            Comenzar Exploración
          </Button>
          <Button onClick={onOpen} colorScheme="teal" size="lg">
            Tecnologías Usadas
          </Button>
        </Flex>

        <TechnologiesModal isOpen={isOpen} onClose={onClose} />
      </Container>
    </Box>
  );
};

export default PrincipalDashboard;
