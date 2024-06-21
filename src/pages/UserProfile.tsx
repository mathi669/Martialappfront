import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
  Spinner,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaUser, FaPhone, FaBirthdayCake } from "react-icons/fa";
import apiService from "../services/service";

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [isReportReasonValid, setIsReportReasonValid] = useState(true);
  const [isReportDetailsValid, setIsReportDetailsValid] = useState(true);
  const toast = useToast();
  const [userSession, setUserSession] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const userData: any = localStorage.getItem("user");

    if (userData) {
      setUserSession(JSON.parse(userData));
    }
    apiService
      .getUserById(userId)
      .then((response) => {
        setUser(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener usuario:", error);
        setLoading(false);
      });
  }, [userId]);

  const reporter_id = userSession?.id;
  const reporterType = "gimnasio";

  const handleReportUser = () => {
    onOpen();
  };

  const validateForm = () => {
    let isValid = true;

    if (!reportReason) {
      setIsReportReasonValid(false);
      isValid = false;
    } else {
      setIsReportReasonValid(true);
    }

    if (!reportDetails) {
      setIsReportDetailsValid(false);
      isValid = false;
    } else {
      setIsReportDetailsValid(true);
    }

    return isValid;
  };

  const handleSubmitReport = async () => {
    if (validateForm()) {
      try {
        await apiService.reportUser(
          userId,
          reporter_id,
          reporterType,
          reportReason,
          reportDetails
        );
        toast({
          title: "Reporte enviado.",
          description: "El reporte se ha enviado correctamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      } catch (error) {
        const errorMessage =
          error.response?.data?.error ||
          "Hubo un problema al enviar el reporte. Por favor, inténtalo de nuevo.";
        toast({
          title: "Error al enviar reporte.",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.50"
      p={6}
    >
      <Box
        w="full"
        maxW="800px"
        bg="white"
        shadow="lg"
        borderRadius="lg"
        p={6}
        textAlign="center"
      >
        {loading ? (
          <Spinner size="xl" />
        ) : user ? (
          <>
            <Text fontSize="3xl" fontWeight="bold" mb={6}>
              Perfil de usuario
            </Text>
            <Avatar size="2xl" src="..\static\img\user.png" mb={4} />
            <Text fontSize="2xl" fontWeight="bold">
              {user.nombre}
            </Text>
            <Text color="gray.500" mb={4}>
              {user.correo_electronico}
            </Text>

            <Divider mb={4} />

            <Box textAlign="left" mb={6}>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Información Personal
              </Text>
              <Box p={4} bg="gray.100" borderRadius="md">
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Icon as={FaPhone} />
                    <Text>Teléfono: {user.telefono}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaBirthdayCake} />
                    <Text>Fecha de registro: {user.fecha_solicitud}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaUser} />
                    <Text>Género: {user.genero}</Text>
                  </HStack>
                </VStack>
              </Box>
            </Box>

            <Box textAlign="left" mb={6}>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Información de Contacto de Emergencia
              </Text>
              <Box p={4} bg="gray.100" borderRadius="md">
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Icon as={FaUser} />
                    <Text>Nombre: {user.contacto_emergencia.nombre}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaUser} />
                    <Text>Apellido: {user.contacto_emergencia.apellido}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaUser} />
                    <Text>
                      Relación con el Usuario:{" "}
                      {user.contacto_emergencia.relacion}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaPhone} />
                    <Text>
                      Número telefónico: {user.contacto_emergencia.telefono}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </Box>

            <Button colorScheme="red" onClick={handleReportUser} mt={4}>
              Reportar usuario
            </Button>
          </>
        ) : (
          <Text>Usuario no encontrado</Text>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reportar Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={!isReportReasonValid}>
              <FormLabel>Motivo del Reporte</FormLabel>
              <Select
                placeholder="Seleccione un motivo"
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
              >
                <option value="conducta_inapropiada">
                  Conducta Inapropiada
                </option>
                <option value="informacion_falsa">Información Falsa</option>
                <option value="spam">Spam</option>
                <option value="acoso">Acoso</option>
              </Select>
              {!isReportReasonValid && (
                <FormErrorMessage>Este campo es obligatorio.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={!isReportDetailsValid}>
              <FormLabel>Detalles Adicionales</FormLabel>
              <Textarea
                placeholder="Proporcione más detalles sobre el reporte"
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
              />
              {!isReportDetailsValid && (
                <FormErrorMessage>Este campo es obligatorio.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitReport}>
              Enviar Reporte
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default UserProfile;
