import { Box, Flex, Text, Button, Image, FormControl, Select, Input, Icon } from "@chakra-ui/react";
import { FaFlagCheckered, FaGamepad, FaMoneyBillWave } from "react-icons/fa";

function Home() {
  return (
    <Box>
      <Flex
        w="full"
        h={{ base: "200px", md: "400px" }} // Añade una altura mínima
        bgImage="url('./src/static/img/header-index 2.png')"
        bgSize="cover"
        bgPosition="center"
        direction="column"
        align="center"
        color="white"
        p={8}
      >
        <Text fontSize="2xl" textAlign="center">
          Somos la mejor aplicación
        </Text>
        <Text fontSize="xl" textAlign="center">
          Para la búsqueda de gimnasios de artes marciales…
        </Text>
      </Flex>
      <Box p={8}>
      <Flex direction={{ base: "column", md: "row" }} align="center" justify="center">
    <Box flex="1" textAlign="center" mb={{ base: 4, md: 0 }} mr={{ md: 4 }}>
      <Icon as={FaFlagCheckered} w={16} h={16} mb={2} color="green.500" />
      <Text>
        Olvídate del miedo a equivocarte y lánzate a por lo que quieres.
        Ya no importa lo que tienes, sino lo que puedes llegar a hacer.
      </Text>
    </Box>
    <Box flex="1" textAlign="center" mb={{ base: 4, md: 0 }} mr={{ md: 4 }}>
      <Icon as={FaGamepad} w={16} h={16} mb={2} color="green.500" />
      <Text>
        Disfruta hasta de tus cambios de opinión y vive todas las
        oportunidades que quieras, sin complejos.
      </Text>
    </Box>
    <Box flex="1" textAlign="center">
      <Icon as={FaMoneyBillWave} w={16} h={16} mb={2} color="green.500" />
      <Text>
        Consigue los mejores gimnasios mas cerca de ti de la forma más
        rápida y cómoda que existe.
      </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default Home;