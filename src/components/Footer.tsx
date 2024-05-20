import { Box, Text, Link, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaFacebook, FaLinkedin, FaGooglePlus, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" width="full" p={5} backgroundColor="gray.800" color="white">
      <VStack spacing={5} align="stretch">
        <Text fontWeight="semibold">
          Descubre, entrena y alcanza tus metas con MartialApps. Tu acceso
          directo a una comunidad de gimnasios locales.
        </Text>
        <Text>
          ¡Únete hoy y comienza tu viaje hacia una vida más saludable y activa!
        </Text>
        <Box>
          <Text fontWeight="light" textAlign="center">
            Síguenos en las redes sociales
          </Text>
          <HStack justifyContent="center" spacing={5}>
            <Link href="#!"><Icon as={FaFacebook} /></Link>
            <Link href="#!"><Icon as={FaLinkedin} /></Link>
            <Link href="#!"><Icon as={FaGooglePlus} /></Link>
            <Link href="#!"><Icon as={FaTwitter} /></Link>
            <Link href="#!"><Icon as={FaYoutube} /></Link>
            <Link href="#!"><Icon as={FaInstagram} /></Link>
          </HStack>
        </Box>
        <Box>
          <Text textAlign="center">&copy; 2024 MartialApps</Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Footer;