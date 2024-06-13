import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "../interfaces/user_interface";

const UserHome = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const userTypeData = localStorage.getItem("userType");

    if (userData) {

      setUser(JSON.parse(userData));
    }
    if (userTypeData) {
      setUserType(userTypeData);
    }
  }, []);

  if (!user || !userType) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
      </Flex>
    );
  }

  return (
    <Container maxW="container.xl" py={6}>
      <Flex direction={{ base: "column", md: "row" }} gap={6}>
        <Box w={{ base: "full", md: "25%" }}>
          <Button w="full" mb={4} display={{ base: "block", md: "none" }}>
            <i className="fa fa-user fa-fw" aria-hidden="true"></i> MOSTRAR MENÚ
          </Button>
          <Box textAlign="center" mb={6}>
            <Image
              src="./src/static/img/user.png"
              alt="User"
              borderRadius="full"
              boxSize="100px"
              mx="auto"
            />
            <Text mt={2}>
              <small>{user.dc_nombre}</small>
            </Text>
            <Flex justify="space-around" mt={2}>
              <Box textAlign="center">
                {userType === "gimnasio" ? "Gimnasio" : "Usuario"} <br />
                <small>Tipo</small>
              </Box>
            </Flex>
          </Box>
          <Stack spacing={2}>
            <Link to="/profiles">
              <Button
                w="full"
                leftIcon={
                  <i className="fa fa-user fa-fw" aria-hidden="true"></i>
                }
              >
                TU PERFIL
              </Button>
            </Link>
            <Link to="/editarperfil">
              <Button
                w="full"
                leftIcon={
                  <i className="fa fa-cogs fa-fw" aria-hidden="true"></i>
                }
              >
                CONFIGURACIÓN
              </Button>
            </Link>
            {userType === "gimnasio" ? (
              <Link to="/createClass">
                <Button
                  w="full"
                  leftIcon={
                    <i className="fa fa-dumbbell" aria-hidden="true"></i>
                  }
                >
                  MODULO DE CLASES
                </Button>
              </Link>
            ) : (
              <Link to="/reservations">
                <Button
                  w="full"
                  leftIcon={
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  }
                >
                  MIS SOLICITUDES DE RESERVA
                </Button>
              </Link>
            )}
          </Stack>
        </Box>
        <Box flex="1">
          <Box borderBottom="1px" borderColor="gray.200" mb={6} pb={2}>
            <Text fontSize="xl" fontWeight="bold">
              INFORMACIÓN DEL USUARIO
            </Text>
          </Box>
          <Box border="1px" borderColor="gray.200" p={6} borderRadius="md">
            <Text mb={4}>Aquí está la información del usuario.</Text>
            <Stack spacing={4}>
              <Flex>
                <Text fontWeight="bold" w="150px">
                  Nombre:
                </Text>
                <Text>{user.dc_nombre}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold" w="150px">
                  Correo electrónico:
                </Text>
                <Text>{user.dc_correo_electronico}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold" w="150px">
                  Teléfono:
                </Text>
                <Text>{user.dc_telefono}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold" w="150px">
                  ID de usuario:
                </Text>
                <Text>{user.id}</Text>
              </Flex>
            </Stack>
          </Box>
          <Box
            mt={6}
            p={6}
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
          >
            <Text mb={4} fontWeight="bold">
              Cambiar Contraseña
            </Text>
            <Link to="/change-password">
              <Button colorScheme="blue">CAMBIAR CONTRASEÑA</Button>
            </Link>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default UserHome;
