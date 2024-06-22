import {
  Flex,
  FormControl,
  Input,
  Text,
  SimpleGrid,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import GymBox from "../components/GymBox";
import apiService from "../services/service.tsx";
import { User } from "../interfaces/user_interface.tsx";

const BuscarGimnasios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gyms, setGyms] = useState<any[]>([]);
  const [filteredGyms, setFilteredGyms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState("");



  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const userType = localStorage.getItem("userType");
    if (storedUser && userType) {
      setUser(JSON.parse(storedUser));
      setUserType(userType);
    }
  }, [localStorage.getItem("user")]);

  useEffect(() => {
    fetchAllGyms();
  }, []);

  const fetchAllGyms = async (query: string = "") => {
    setIsLoading(true);
    try {
      const response = await apiService.getAllGyms(query);
      setGyms(response.gimnasios);
      setFilteredGyms(response.gimnasios);
    } catch (error) {
      console.error("Error fetching all gyms:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    if (query.trim() === "") {
      setFilteredGyms(gyms);
    } else {
      try {
        const response = await apiService.searchGyms(query);
        setFilteredGyms(response.gimnasios);
      } catch (error) {
        console.error("Error searching gyms:", error);
      }
    }
  };

  const toggleFavorite = async (gymId: number) => {
    try {
      const response = await apiService.addFavorite(user?.id, gymId);
      if (response.message === "Gimnasio ya está en favoritos") {
        // Eliminar de favoritos si ya está agregado
        setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== gymId));
      } else {
        // Agregar a favoritos si no está agregado
        setFavorites((prevFavorites) => [...prevFavorites, gymId]);
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };
  

  return (
    <Flex direction="column" align="center" w="full" h="full" p={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
        ¿dónde quieres entrenar?
      </Text>
      <FormControl w="full" maxW="600px" mb={8}>
        <Input
          type="text"
          placeholder="Buscar gimnasios"
          size="lg"
          borderRadius="full"
          borderWidth={2}
          borderColor="gray.300"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          mb={4}
        />
        <Select
          placeholder="Seleccionar Gimnasio"
          size="lg"
          borderRadius="full"
          borderWidth={2}
          borderColor="gray.300"
          mb={4}
          onChange={(e) => handleSearch(e.target.value)}
        >
          {gyms.map((gym) => (
            <option key={gym.id} value={gym.nombre}>
              {gym.nombre}
            </option>
          ))}
        </Select>
      </FormControl>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        <SimpleGrid
          columns={{ sm: 1, md: 3 }}
          spacing={4}
          w="full"
          maxW="1200px"
        >
          {filteredGyms.map((gym) => (
            <GymBox
              key={gym.id}
              imageSrc={gym.imagen_url}
              altText={gym.nombre}
              gymName={gym.nombre}
              gymAddress={gym.ubicacion}
              gymId={gym.id}
              isFavorite={favorites.includes(gym.id)}
              onToggleFavorite={() => toggleFavorite(gym.id)}
              horario={gym.horario}
              status={gym.status}
            />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};

export default BuscarGimnasios;
