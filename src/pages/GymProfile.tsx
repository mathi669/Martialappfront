import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  GridItem,
  Spinner,
  SimpleGrid,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import apiService from "../services/service";
import ClassBox from "../components/ClassBox";
import MapContainer from "../components/Maps";
import { User } from "../interfaces/user_interface";

const GymProfile = () => {
  const { gym_id } = useParams<{ gym_id: string }>();
  const [gym, setGym] = useState<any>(null);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const toast = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchGym = async () => {
      try {
        const data = await apiService.getGym(gym_id);
        setGym(data);
      } catch (error) {
        console.error("Error fetching gym:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchClasses = async () => {
      try {
        const data = await apiService.getClassesByGym(Number(gym_id));
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchGym();
    fetchClasses();
  }, [gym_id]);

  const handleReserve = async () => {
    if (!selectedClass || !selectedTime) {
      toast({
        title: "Error",
        description: "Debe seleccionar una clase y un horario",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const payload = {
      clase_id: selectedClass.id,
      gimnasio_id: gym[0],  // El ID del gimnasio
      usuario_id: user?.id, // ID del usuario autenticado
      fecha: selectedClass.df_fecha, // Usamos la fecha de la clase
      hora: selectedTime, // Usamos la hora seleccionada
    };

    try {
      await apiService.reservarClase(payload);
      toast({
        title: "Clase reservada",
        description: "La clase ha sido reservada exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al reservar la clase",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReserveClick = (clase: any) => {
    setSelectedClass(clase);
    setSelectedTime(clase.dc_horario.split(' - ')[0]); // Seleccionamos la primera hora por defecto
    onOpen();
  };

  if (loading || loadingClasses) {
    return <Spinner size="xl" />;
  }

  if (!gym) {
    return <Text>No se encontró el gimnasio.</Text>;
  }

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 5 }} spacing={6}>
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <HStack spacing={4} alignItems="center">
            <Avatar size="xl" name={gym[1]} src={gym[8]} />
            <VStack align="start">
              <HStack>
                <Text fontSize="2xl" fontWeight="bold">
                  {gym[1]}
                </Text>
                <FaCheckCircle color="blue" />
              </HStack>
              <Text>Ubicación: {gym[4]}</Text>
              <Text>Teléfono: {gym[3]}</Text>
              <Text>
                Fecha de ingreso: {new Date(gym[6]).toLocaleDateString()}
              </Text>
            </VStack>
          </HStack>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold" mb={2}>
              Ubicación del Gimnasio
            </Text>
            <MapContainer />
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <Box mt={-4} p={4} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold" mb={2}>
              Actividad reciente
            </Text>
            {classes.map((clase) => (
              <ClassBox
                key={clase.id}
                className={clase.dc_nombre_clase}
                schedule={clase.dc_horario}
                availableSpots={clase.nb_cupos_disponibles}
                imageUrl={clase.dc_imagen_url}
                onReserve={() => handleReserveClick(clase)}
              />
            ))}
          </Box>
        </GridItem>
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Reserva</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Clase: {selectedClass?.dc_nombre_clase}</Text>
            <Text>Fecha: {selectedClass?.df_fecha}</Text>
            <Text>Hora: {selectedClass?.dc_horario}</Text>
            <Box mt={4}>
              <Text fontWeight="bold">Seleccionar Horario:</Text>
              <HStack mt={2}>
                {selectedClass?.dc_horario.split(' - ').map((time: string) => (
                  <Button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    colorScheme={selectedTime === time ? "blue" : "gray"}
                  >
                    {time}
                  </Button>
                ))}
              </HStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleReserve}>
              Reservar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GymProfile;
