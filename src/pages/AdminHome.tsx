import { Link } from "react-router-dom";
import { Button, Container, Flex, Text } from "@chakra-ui/react";

const AdminHome = () => {
  // Obtener información del usuario administrador del localStorage
  const user: any = JSON.parse(localStorage?.getItem("user"));

  return (
    <Container maxW="container.xl">
      <Flex>
        <Flex
          flexDir="column"
          mr={4}
          bg="gray.200"
          p={4}
          borderRadius="md"
          minWidth="240px"
        >
          {/* Sidebar Content */}
          <Button colorScheme="blue" mb={2} as={Link} to="/userModule">
            Módulo de Usuarios
          </Button>
          <Button colorScheme="teal" mb={2} as={Link} to="/bookingRequests">
            Solicitudes de Reserva
          </Button>
          <Button
            colorScheme="green"
            mb={2}
            as={Link}
            to="/SolicitudesRegistro"
          >
            Solicitudes de Registro
          </Button>
        </Flex>
        <Flex flexDir="column" flexGrow={1}>
          {/* Main Content */}
          <Flex align="center" mb={4}>
            <Text fontSize="xl" mr={2}>
              <i className="fa fa-user fa-fw" aria-hidden="true"></i>
            </Text>
            <Text fontSize="xl">Información del Usuario Administrador</Text>
          </Flex>
          <Flex
            p={4}
            border="1px solid #e1e1e1"
            borderRadius="md"
            flexDirection="column"
          >
            <Text mb={4}>
              <strong>Nombre:</strong> {user.nombre}
            </Text>
            <Text mb={4}>
              <strong>Correo Electrónico:</strong> {user.correo_electronico}
            </Text>
            <Text mb={4}>
              <strong>Teléfono:</strong> {user.telefono}
            </Text>
            <Text mb={4}>
              <strong>Dirección:</strong> {user.direccion}
            </Text>
            <Text mb={4}>
              <strong>Estado:</strong> {user.estado}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default AdminHome;