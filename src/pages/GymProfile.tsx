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
  FormControl,
  FormLabel,
  Textarea,
  Input,
} from "@chakra-ui/react";
import { FaCheckCircle, FaStar } from "react-icons/fa";
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
  const [loadingReserva, setLoadingReserva] = useState(false);
  const [loadingComentario, setLoadingComentario] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [starSelected, setStarSelected] = useState(false);
  const [recommendationCount, setRecommendationCount] = useState<number>(0);
  const [gymStatus, setGymStatus] = useState<string>("");

  const toast = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        // Primero fetchGym
        const gymData = await apiService.getGym(gym_id);
        setGym(gymData);

        // Luego fetchClasses
        const classesData = await apiService.getClassesByGym(Number(gym_id));
        setClasses(classesData);

        // Después fetchComments
        const commentsData = await apiService.getGymComments(gym_id);
        setComments(commentsData);

        // A continuación fetchGymStatus
        const gymStatusData = await apiService.getGymStatus(Number(gym_id));
        setGymStatus(gymStatusData.status);

        // Por último fetchRecommendationCount
        const recommendationCountData = await apiService.getRecommendationCount(
          gym_id
        );
        setRecommendationCount(recommendationCountData.recommendation_count);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setLoadingClasses(false); // Si tenías un estado para clases
      }
    };

    fetchData();
  }, [gym_id]); // Asegúrate de incluir gym_id en la dependencia si cambia

  const handleReserve = async () => {
    setLoadingReserva(true);
    if (!selectedClass || !selectedDate) {
      toast({
        title: "Error",
        description: "Debe seleccionar una clase, una fecha y un horario",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const horaInicio = selectedClass.dc_horario.split(" - ")[0];

    const payload = {
      clase_id: selectedClass.id,
      gimnasio_id: gym[0],
      usuario_id: user?.id,
      fecha: selectedDate,
      hora: horaInicio,
    };

    console.log("Payload:", payload);

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
      setLoadingReserva(false);
    }
    setLoadingReserva(false);
  };

  const handleReserveClick = (clase: any) => {
    setSelectedClass(clase);
    setSelectedTime(clase.dc_horario.split(" - ")[0]); // Seleccionamos la primera hora por defecto
    onOpen();
  };

  const handleAddComment = async () => {
    setLoadingComentario(true);
    if (!newComment || newRating === 0) {
      toast({
        title: "Error",
        description: "Debe ingresar un comentario y una calificación",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await apiService.addGymComment(
        Number(gym_id),
        user?.id,
        newComment,
        newRating
      );
      if (response.status === 201) {
        toast({
          title: "Comentario agregado",
          description: "Su comentario ha sido agregado con éxito",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setNewComment("");
        setNewRating(0);
        setStarSelected(false);
        const data = await apiService.getGymComments(Number(gym_id));
        setComments(data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoadingComentario(false);
  };

  const handleStarClick = (rating: number) => {
    setNewRating(rating);
    setStarSelected(true);
  };

  const handleStarHover = (rating: number) => {
    if (!starSelected) {
      setHoverRating(rating);
    }
  };

  const handleStarLeave = () => {
    if (!starSelected) {
      setHoverRating(0);
    }
  };

  const handleRecommend = async () => {
    try {
      await apiService.recommendGym(gym_id, user?.id);
      toast({
        title: "Recomendación exitosa",
        description: "Has recomendado este gimnasio exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      const updatedCount = await apiService.getRecommendationCount(gym_id);
      setRecommendationCount(updatedCount.recommendation_count);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al recomendar el gimnasio",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
              <Button colorScheme="teal" onClick={handleRecommend}>
                Recomendar
              </Button>
              <Text>{recommendationCount} usuarios recomiendan este gym</Text>
              <Text color={gymStatus === "abierto" ? "green" : "red"}>
                Estado: {gymStatus === "abierto" ? "Abierto" : "Cerrado"}
              </Text>
            </VStack>
          </HStack>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold" mb={2}>
              Ubicación del Gimnasio
            </Text>
            <MapContainer gymAddress={gym[4]} />
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
              <Text fontWeight="bold">Seleccionar Fecha:</Text>
              <Input
                type="date"
                value={selectedDate || ""}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <Text fontWeight="bold" mt={4}>
                Seleccionar Horario:
              </Text>
              <HStack mt={2}>
                {selectedClass?.dc_horario.split(" - ").map((time: string) => (
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
            <Button
              colorScheme="blue"
              isLoading={loadingReserva}
              onClick={handleReserve}
            >
              Reservar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box mt={8}>
        <VStack align="start" spacing={4}>
          <Text fontWeight="bold" fontSize="xl">
            Comentarios y Calificaciones
          </Text>
          {comments.comments.map((comment: any, index: number) => (
            <Box key={index} borderWidth="1px" p={4} borderRadius="md">
              <HStack>
                <Avatar size="sm" name={comment.user} />
                <VStack align="start">
                  <HStack>
                    <Text fontWeight="bold">{comment.user}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {comment.date}
                    </Text>
                  </HStack>
                  <HStack>
                    {[...Array(comment.rating)].map((_, i) => (
                      <FaStar key={i} color="yellow.400" />
                    ))}
                    {[...Array(5 - comment.rating)].map((_, i) => (
                      <FaStar key={i} color="gray.300" />
                    ))}
                  </HStack>
                </VStack>
              </HStack>
              <Text mt={2}>{comment.comment}</Text>
            </Box>
          ))}
          <FormControl id="comment" isRequired>
            <FormLabel>Nuevo Comentario</FormLabel>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ingrese su comentario..."
            />
          </FormControl>
          <FormControl id="rating" isRequired>
            <FormLabel>Calificación</FormLabel>
            <HStack spacing={1}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <FaStar
                  key={rating}
                  color={
                    (hoverRating || newRating) >= rating
                      ? "yellow.400"
                      : "gray.300"
                  }
                  onMouseEnter={() => handleStarHover(rating)}
                  onMouseLeave={handleStarLeave}
                  onClick={() => handleStarClick(rating)}
                />
              ))}
            </HStack>
          </FormControl>
          <Button
            colorScheme="blue"
            onClick={handleAddComment}
            isLoading={loadingComentario}
          >
            Agregar Comentario
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default GymProfile;
