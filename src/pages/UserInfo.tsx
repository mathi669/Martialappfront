// UserSearchResults.tsx
import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  Avatar,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import apiService from "../services/service";
import { User } from "../interfaces/user_interface";

const UserSearchResults: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      apiService
        .searchUser(query)
        .then((response: SetStateAction<User[]>) => {
          setUsers(response);
          setLoading(false); 
        })
        .catch((error: any) => {
          console.error("Error al buscar usuarios:", error);
          setLoading(false); 
        });
    }
  }, [query]);

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
          Resultados de búsqueda
        </Text>
        {loading ? (
          <Spinner size="xl" />
        ) : users.length > 0 ? (
          users.map((user: any) => (
            <Box
              key={user[0]}
              w="full"
              mb={4}
              p={4}
              bg="gray.100"
              borderRadius="md"
            >
              <HStack spacing={4}>
                <Avatar
                  size="lg"
                  name={user[1]}
                  src={user[9]}
                />
                <VStack align="start">
                  <Text fontSize="2xl" fontWeight="bold">
                    {user[1]}
                  </Text>
                  <Text color="gray.500">
                    <Icon as={FaEnvelope} /> {user[2]}
                  </Text>
                  <Text color="gray.500">
                    <Icon as={FaPhone} /> {user[3]}
                  </Text>
                </VStack>
                <Button>ver perfil</Button>
              </HStack>
            </Box>
          ))
        ) : (
          <Text>No se encontraron usuarios</Text>
        )}
      </Box>
    </Flex>
  );
};

export default UserSearchResults;
