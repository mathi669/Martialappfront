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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { User } from "../interfaces/user_interface";

const UserHome = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  useEffect(() => {
    const fetchReservations = async () => {
      const mockReservations = [
        {
          id: 1,
          class: "Yoga",
          date: "2023-06-12",
          time: "10:00 AM",
          description: "Clase de Yoga para principiantes",
          gymImage: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          class: "Pilates",
          date: "2023-06-14",
          time: "12:00 PM",
          description: "Pilates intermedio",
          gymImage: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          class: "Spinning",
          date: "2023-06-16",
          time: "6:00 PM",
          description: "Spinning avanzado",
          gymImage: "https://via.placeholder.com/150",
        },
      ];
      setReservations(mockReservations);
    };

    fetchReservations();
  }, []);

  const cancelReservation = (id: number) => {
    setReservations((prevReservations) =>
      prevReservations.filter((reservation) => reservation.id !== id)
    );
  };

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
                EDITAR DE PERFIL
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
              <Button
                w="full"
                leftIcon={
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                }
                onClick={onOpen}
              >
                MIS SOLICITUDES DE RESERVA
              </Button>
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

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mis Solicitudes de Reserva</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <Box key={reservation.id} p={4} borderBottom="1px solid gray" display="flex" alignItems="center">
                  <Image
                    src={reservation.gymImage}
                    alt={reservation.class}
                    boxSize="100px"
                    borderRadius="md"
                    mr={4}
                  />
                  <Box flex="1">
                    <Text fontWeight="bold">Clase: {reservation.class}</Text>
                    <Text>Fecha: {reservation.date}</Text>
                    <Text>Hora: {reservation.time}</Text>
                    <Text>Descripción: {reservation.description}</Text>
                  </Box>
                  <Button colorScheme="red" onClick={() => cancelReservation(reservation.id)}>
                    Cancelar
                  </Button>
                </Box>
              ))
            ) : (
              <Text>No tienes reservas aún.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default UserHome;
