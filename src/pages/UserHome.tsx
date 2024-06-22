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
  Skeleton,
} from "@chakra-ui/react";
import { User } from "../interfaces/user_interface";
import apiService from "../services/service";
import ScheduleReminder from "../components/ScheduleReminder";

const UserHome = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [isLoadingReservas, setIsLoadingReservas] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [reservations, setReservations] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isFavOpen,
    onOpen: onFavOpen,
    onClose: onFavClose,
  } = useDisclosure();

  const {
    isOpen: isReminderOpen,
    onOpen: onReminderOpen,
    onClose: onReminderClose,
  } = useDisclosure();

  const fetchReservations = async () => {
    setIsLoadingReservas(true);
    if (user) {
      try {
        const data = await apiService.getReservationRequests(user.id);
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setIsLoadingReservas(false);
      }
    }
    setIsLoadingReservas(false);
  };

  const fetchFavorites = async () => {
    if (user) {
      try {
        const data = await apiService.getFavorites(user.id);
        setFavorites(data.favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
  };

  const modal = () => {
    fetchReservations();
    onOpen();
  };

  const favModal = () => {
    fetchFavorites();
    onFavOpen();
  };

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
      if (user) {
        try {
          const data = await apiService.getReservationRequests(user.id);
          setReservations(data);
        } catch (error) {
          console.error("Error fetching reservations:", error);
        }
      }
    };

    fetchReservations();
  }, [user]);

  const cancelReservation = async (id: string) => {
    setCancelLoading(true);
    try {
      await apiService.cancelReservation(id);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== id)
      );
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
    fetchReservations();
    setCancelLoading(false);
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
              src={user.dc_imagen_url}
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
                EDITAR PERFIL
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
              <>
                <Button
                  w="full"
                  leftIcon={
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  }
                  onClick={modal}
                >
                  MIS SOLICITUDES DE RESERVA
                </Button>
                <Button
                  w="full"
                  leftIcon={<i className="fa fa-heart" aria-hidden="true"></i>}
                  onClick={favModal}
                >
                  MIS GIMNASIOS FAVORITOS
                </Button>
                <Button
                  w="full"
                  leftIcon={<i className="fa fa-bell" aria-hidden="true"></i>}
                  onClick={onReminderOpen}
                >
                  PROGRAMAR RECORDATORIO
                </Button>
              </>
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
                  Genero:
                </Text>
                <Text>{user.dc_genero}</Text>
              </Flex>
            </Stack>
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
                <Box
                  key={reservation.id}
                  p={4}
                  borderBottom="1px solid gray"
                  display="flex"
                  alignItems="center"
                >
                  <Image
                    src={reservation.dc_imagen_url}
                    alt={reservation.dc_nombre_clase}
                    boxSize="100px"
                    borderRadius="md"
                    mr={4}
                  />
                  <Box flex="1">
                    <Text fontWeight="bold">
                      Clase: {reservation.dc_nombre_clase}
                    </Text>
                    <Text>Fecha: {reservation.df_fecha}</Text>
                    <Text>Hora: {reservation.df_hora}</Text>
                    <Text>Descripción: {reservation.dc_nombre_clase}</Text>
                  </Box>
                  <Button
                    colorScheme="red"
                    onClick={() => cancelReservation(reservation.solicitud_id)}
                    isLoading={cancelLoading}
                  >
                    Cancelar
                  </Button>
                </Box>
              ))
            ) : isLoadingReservas ? (
              <Skeleton>
                <div>contents wrapped</div>
                <div>won't be visible</div>
              </Skeleton>
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

      <Modal isOpen={isFavOpen} onClose={onFavClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mis Gimnasios Favoritos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {favorites.length > 0 ? (
              favorites.map((gym) => (
                <Box
                  key={gym.id}
                  p={4}
                  borderBottom="1px solid gray"
                  display="flex"
                  alignItems="center"
                >
                  <Image
                    src={gym.imagen_url}
                    alt={gym.nombre}
                    boxSize="100px"
                    borderRadius="md"
                    mr={4}
                  />
                  <Box flex="1">
                    <Text fontWeight="bold">{gym.nombre}</Text>
                    <Text>Ubicación: {gym.ubicacion}</Text>
                  </Box>
                </Box>
              ))
            ) : (
              <Text>No tienes gimnasios favoritos aún.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onFavClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isReminderOpen} onClose={onReminderClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Programar Recordatorio</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ScheduleReminder />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onReminderClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default UserHome;
