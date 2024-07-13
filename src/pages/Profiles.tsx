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
        <Avatar
          src={user?.dc_imagen_url} // Imagen del usuario del gimnasio
          name={user?.dc_nombre}
          size="2xl"
          mb={4}
        />
        <Text fontSize="2xl" fontWeight="bold">
          {user?.dc_nombre}
        </Text>
        <Text color="gray.500" mb={4}>
          {user?.dc_correo_electronico}
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
                <Text>Teléfono: {user?.dc_telefono}</Text>
              </HStack>
              <HStack>
                <Icon as={FaHome} />
                <Text>Dirección: {user?.dc_ubicacion}</Text>
              </HStack>
              <HStack>
                <Icon as={FaBirthdayCake} />
                <Text>Fecha de ingreso: {user?.df_fecha_ingreso}</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>

        {userType === "gimnasio" ? (
          <>
            <Box textAlign="left" mb={6}>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Información del Gimnasio
              </Text>
              <Box p={4} bg="gray.100" borderRadius="md">
                <HStack>
                <Icon as={FaPhone} />
                <Text>Teléfono: {user?.dc_telefono}</Text>
              </HStack>
              <HStack>
                <Icon as={FaHome} />
                <Text>Dirección: {user?.dc_ubicacion}</Text>
              </HStack>
              </Box>
            </Box>
          </>
        ) : null}
      </Box>
    </Flex>
  );
};

export default Profile;
