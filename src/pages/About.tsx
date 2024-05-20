import { Box, Heading, Divider, Text, Flex, chakra } from "@chakra-ui/react";

const About = () => {
  return (
    <Box as="section" p={5}>
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
          Acerca de Nosotros
        </Text>
      </Flex>
      <Divider borderColor="#00a9e2" borderWidth={5} my={5} />
      <Box>
        <Text mb={4}>
          Bienvenido a MartialApps, tu plataforma para encontrar gimnasios
          locales y realizar inscripciones de forma sencilla y rápida. Nos
          dedicamos a proporcionarte la mejor experiencia para que puedas
          alcanzar tus objetivos de salud y bienestar.
        </Text>
        <Text mb={4}>
          Nuestra aplicación te ofrece una amplia gama de gimnasios locales
          para que puedas elegir el que mejor se adapte a tus necesidades.
          Desde gimnasios tradicionales hasta centros especializados,
          estamos aquí para ayudarte a encontrar el lugar perfecto para tu
          rutina de ejercicios.
        </Text>
        <Text>
          Además, nuestra plataforma simplifica el proceso de inscripción,
          permitiéndote reservar clases, consultar horarios y obtener
          información sobre tarifas con tan solo unos pocos clics. Con
          MartialApps, estarás un paso más cerca de alcanzar tus metas de
          fitness.
        </Text>
      </Box>
    </Box>
  );
};

export default About;