// src/pages/GymProfile.tsx
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
  FormControl,
  FormLabel,
  Input,
  useToast,
  Grid
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
        console.log("Gym data fetched:", data); // Debug log for fetched data
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
        console.log("Classes data fetched:", data); // Debug log for fetched data
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
    if (!selectedDate || !selectedTime || !selectedClass) {
      toast({
        title: "Error",
        description: "Debe seleccionar fecha, hora y clase",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await apiService.reservarClase({
        clase_id: selectedClass.id,
        gimnasio_id: gym.id,
        usuario_id: user?.id, // Cambia esto por el ID del usuario actual
        fecha: selectedDate.toISOString().split('T')[0],
        hora: selectedTime,
      });
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

  // const handleDateChange = (value: Date) => {
  //   setSelectedDate(value);
  // };

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
          <HStack mt={4} mb={2} spacing={2} wrap="wrap"></HStack>
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
                onReserve={() => {
                  setSelectedClass(clase);
                  setSelectedTime(clase.dc_horario); // Selecciona automáticamente la hora de la clase
                  onOpen();
                }}
              />
            ))}
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Box
            mt={4}
            p={2}
            borderWidth="1px"
            borderRadius="md"
            maxW="fit-content"
            mx="auto"
          >
            <Text fontWeight="bold" mb={4}>
              Horarios:
            </Text>
            <Calendar  value={selectedDate} />
          </Box>
        </GridItem>
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reservar Clase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Fecha</FormLabel>
              <Input
                type="date"
                value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Hora</FormLabel>
              <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                {classes.map((clase) => (
                  <Button
                    key={clase.dc_horario}
                    onClick={() => setSelectedTime(clase.dc_horario)}
                    colorScheme={selectedTime === clase.dc_horario ? "blue" : "gray"}
                  >
                    {clase.dc_horario}
                  </Button>
                ))}
              </Grid>
            </FormControl>
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
