import React from 'react';
import { Box} from '@chakra-ui/react';

const Modelo = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      overflow="hidden"
      m={0}
      p={0}
      pt="50px"
    >
      <iframe
        src="https://predicciones-norte-cauca.onrender.com"
        style={{ width: '100%', height: '100%', border: 'none', margin: 0, padding: 0 }}
        title="Modelo Predictivo"
      />
    </Box>
  );
};

export default Modelo;