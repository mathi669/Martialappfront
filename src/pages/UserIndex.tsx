import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Image,
  Radio,
  Stack,
  Center,
} from "@chakra-ui/react";

const UserIndex = () => {
  return (
    <Box as="section" w="full" py={10}>
      {/* Banner del gimnasio */}
      <Box bgGradient="linear(to-b, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))">
      <Center w="full" h="300px" position="relative" bg="">
        <Image
          src="src/static/img/banner ejemplo.jpg"
          alt="Imagen del Gimnasio"
          objectFit="cover"
          w="full"
          h="full"
          position="absolute"
          top="0"
          left="0"
          zIndex="-1"
        />
        <Box
          bg="rgba(0, 0, 0, 0.5)"
          w="full"
          h="full"
          position="absolute"
          top="0"
          left="0"
        />
        <Heading color="white" zIndex="1">
          Nombre del Gimnasio
        </Heading>
      </Center>
      </Box>
      {/* Círculo de imagen de perfil del gimnasio */}
      <Container textAlign="center" mt={4}>
        <Image
          src="./src/static/img/user.png"
          alt="Imagen de Perfil del Gimnasio"
          borderRadius="full"
          boxSize="150px"
        />
      </Container>
      {/* Información del gimnasio */}
      <Container textAlign="center" mt={4}>
        {/* Nombre del gimnasio */}
        <Heading as="h3">Nombre del Gimnasio</Heading>
        {/* Ubicación */}
        <Text>Ubicación</Text>
        {/* Puntuación */}
        <Flex justifyContent="center" mt={2}>
          <Stack direction="row" spacing={1}>
            <Radio id="star5" name="rating" value="5" />
            <Radio id="star4" name="rating" value="4" />
            <Radio id="star3" name="rating" value="3" />
            <Radio id="star2" name="rating" value="2" />
            <Radio id="star1" name="rating" value="1" />
          </Stack>
        </Flex>
      </Container>
      {/* Cuadro grande con clases disponibles */}
      <Container textAlign="center" mt={4}>
        <Heading as="h3">Clases Disponibles</Heading>
        <Flex justifyContent="center" mt={4}>
          {/* Cuadros pequeños para cada clase */}
          <Box className="class-item" mr={4}>
            <Link to="/gymbanner?clase=Yoga">Yoga</Link>
          </Box>
          <Box className="class-item" mr={4}>
            <Link to="/gymbanner?clase=Kickboxing">Kickboxing</Link>
          </Box>
          <Box className="class-item">
            <Link to="/gymbanner?clase=Jiu-Jitsu">Jiu-Jitsu</Link>
          </Box>
          {/* Puedes agregar más clases aquí */}
        </Flex>
      </Container>
    </Box>
  );
};

export default UserIndex;
