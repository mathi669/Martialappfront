// src/pages/GymProfile.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Avatar,
  Grid,
  GridItem,
  Spinner,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import apiService from "../services/service";
import ClassBox from "../components/ClassBox";
import MapContainer from "../components/Maps";

const GymProfile = () => {
  const { gym_id } = useParams<{ gym_id: string }>();
  const [gym, setGym] = useState<any>(null);

  const [loadingClasses, setLoadingClasses] = useState(true);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            <Calendar />
            <Button size="sm" mt={4}>
              Agendar clase
            </Button>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default GymProfile;
