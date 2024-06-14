import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
} from "@chakra-ui/react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaBirthdayCake,
  FaDumbbell,
  FaMedal,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaTrophy,
} from "react-icons/fa";
import { User } from "../interfaces/user_interface";


const Profile: React.FC = () => {

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
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Perfil de usuario
        </Text>
        <Avatar size="2xl" src="/path-to-your-image.jpg" mb={4} />
        <Text fontSize="2xl" fontWeight="bold">
          {user?.dc_nombre}
        </Text>
        <Text color="gray.500" mb={4}>{user?.dc_correo_electronico}</Text>

        <Divider mb={4} />

        <Box textAlign="left" mb={6}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Información Personal
          </Text>
          <Box p={4} bg="gray.100" borderRadius="md">
            <VStack align="start" spacing={2}>
              <HStack>
                <Icon as={FaPhone} />
                <Text>Teléfono: {user?.dc_telefono}</Text>
              </HStack>
              <HStack>
                <Icon as={FaHome} />
                <Text>Dirección: 123 Calle Falsa, Ciudad, País</Text>
              </HStack>
              <HStack>
                <Icon as={FaBirthdayCake} />
                <Text>Fecha de Nacimiento: 01/01/1990</Text>
              </HStack>
              <HStack>
                <Icon as={FaUser} />
                <Text>Género: Masculino</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>

        <Box textAlign="left" mb={6}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Información del Gimnasio
          </Text>
          <Box p={4} bg="gray.100" borderRadius="md">
            <VStack align="start" spacing={2}>
              <HStack>
                <Icon as={FaMedal} />
                <Text>Nivel/Grado: Cinturón Negro</Text>
              </HStack>
              <HStack>
                <Icon as={FaDumbbell} />
                <Text>Estilo de Artes Marciales: Karate</Text>
              </HStack>
              <HStack>
                <Icon as={FaMapMarkerAlt} />
                <Text>Gimnasio: Gimnasio XYZ</Text>
              </HStack>
              <HStack>
                <Icon as={FaCalendarAlt} />
                <Text>Fecha de Ingreso al Gimnasio: 01/01/2015</Text>
              </HStack>
              <HStack>
                <Icon as={FaClock} />
                <Text>Horas de Entrenamiento Semanales: 10</Text>
              </HStack>
              <HStack>
                <Icon as={FaBook} />
                <Text>Clases Registradas: Clase de Kata, Clase de Kumite</Text>
              </HStack>
              <HStack>
                <Icon as={FaTrophy} />
                <Text>Próximos Eventos/Competencias: Campeonato Nacional</Text>
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
                <Text>Nombre: Jane Doe</Text>
              </HStack>
              <HStack>
                <Icon as={FaUser} />
                <Text>Apellido: Doe</Text>
              </HStack>
              <HStack>
                <Icon as={FaUser} />
                <Text>Relación con el Usuario: Esposa</Text>
              </HStack>
              <HStack>
                <Icon as={FaPhone} />
                <Text>Número telefónico: +987654321</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Profile;
