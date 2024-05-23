import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Icon, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { FaAddressBook } from "react-icons/fa";

const About = () => {
  return (
    <Box>
      <Flex
        w="full"
        h={{ base: "200px", md: "300px" }}
        bgImage="url('./src/static/img/header-index 2.png')"
        bgSize="cover"
        bgPosition="center"
        direction="column"
        justifyContent="center"
        alignItems="center"
        color="white"
        p={8}
      >
        <Text fontSize="4xl" textAlign="center">
          Acerca de Nosotros
        </Text>
      </Flex>
      <Divider borderColor="#000000" borderWidth={5} my={5} />
      <Flex direction={{ base: "column", md: "row" }} justify="space-between">
        <Box maxWidth={{ base: "90%", md: "60%" }} m="auto" textAlign="left">
          <Text mb={4}>
            Bienvenido a MartialApps, tu plataforma para encontrar gimnasios
            locales y realizar inscripciones de forma sencilla y rápida. Nos
            dedicamos a proporcionarte la mejor experiencia para que puedas
            alcanzar tus objetivos de salud y bienestar.
          </Text>
          <Text mb={4}>
            Nuestra aplicación te ofrece una amplia gama de gimnasios locales para
            que puedas elegir el que mejor se adapte a tus necesidades. Desde
            gimnasios tradicionales hasta centros especializados, estamos aquí
            para ayudarte a encontrar el lugar perfecto para tu rutina de
            ejercicios.
          </Text>
          <Text>
            Además, nuestra plataforma simplifica el proceso de inscripción,
            permitiéndote reservar clases, consultar horarios y obtener
            información sobre tarifas con tan solo unos pocos clics. Con
            MartialApps, estarás un paso más cerca de alcanzar tus metas de
            fitness.
          </Text>
        </Box>
        <Box m={5} maxWidth={{ base: "90%", md: "30%" }}>
          <VStack align="start" spacing={5}>
            <Heading size="lg">
              <Icon as={FaAddressBook} mr={2} />
              Contáctanos
            </Heading>
            <FormControl id="name" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input placeholder="Tu nombre" size="sm" />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Tu email" type="email" size="sm" />
            </FormControl>

            <FormControl id="message" isRequired>
              <FormLabel>Mensaje</FormLabel>
              <Textarea placeholder="Tu mensaje" size="sm" />
            </FormControl>

            <Button colorScheme="blue" size="sm" type="submit">
              Enviar
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default About;