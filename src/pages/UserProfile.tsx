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
} from "@chakra-ui/react";
import {
  FaUser,
  FaPhone,
  FaBirthdayCake,
} from "react-icons/fa";
import apiService from "../services/service";

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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

  const handleReportUser = () => {
    // Aquí puedes agregar la lógica para reportar al usuario
    console.log("Usuario reportado:", user);
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
            <Text color="gray.500" mb={4}>{user.correo_electronico}</Text>

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
                    <Text>Genero: {user.genero}</Text>
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
                    <Text>Relación con el Usuario: {user.contacto_emergencia.relacion}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaPhone} />
                    <Text>Número telefónico: {user.contacto_emergencia.telefono}</Text>
                  </HStack>
                </VStack>
              </Box>
            </Box>

            <Button 
              colorScheme="red" 
              onClick={handleReportUser}
              mt={4}
            >
              Reportar usuario
            </Button>
          </>
        ) : (
          <Text>Usuario no encontrado</Text>
        )}
      </Box>
    </Flex>
  );
};

export default UserProfile;
