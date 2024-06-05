// src/pages/BuscarGimnasios.tsx
import { Box, Flex, FormControl, Input, Text, SimpleGrid, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Maps from "../components/Maps";
import GymBox from "../components/GymBox";
import apiService from "../services/service.tsx";

const BuscarGimnasios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gyms, setGyms] = useState<any[]>([]);
  const [filteredGyms, setFilteredGyms] = useState<any[]>([]);

  // const fetchGyms = async (filters: any = {}) => {
  //   try {
  //     const response = await apiService.getFilteredGyms(filters);
  //     setGyms(response.gimnasios);
  //   } catch (error) {
  //     console.error("Error fetching gyms:", error);
  //   }
  // };

  const fetchAllGyms = async () => {
    try {
      const response = await apiService.getAllGyms();
      setGyms(response.gimnasios);
      setFilteredGyms(response.gimnasios);
    } catch (error) {
      console.error("Error fetching all gyms:", error);
    }
  };

  useEffect(() => {
    fetchAllGyms();
  }, []);

  const handleSearch = () => {
    const filtered = gyms.filter(gym =>
      gym.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.horario.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGyms(filtered);
  };

  return (
    <Flex direction="column" align="center" w="full" h="full" p={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={4}>Entonces, ¿dónde quieres entrenar?</Text>
      <FormControl w="full" maxW="600px" mb={8}>
        <Input
          type="text"
          placeholder="Buscar gimnasios"
          size="lg"
          borderRadius="full"
          borderWidth={2}
          borderColor="gray.300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={4}
        />
        <Button onClick={handleSearch} colorScheme="teal" size="lg" borderRadius="full" mb={4}>
          Buscar
        </Button>
      </FormControl>
      <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4} w="full" maxW="1200px">
        {filteredGyms.map((gym) => (
          <GymBox
            key={gym.id}
            imageSrc={gym.imagen_url}
            altText={gym.nombre}
            gymName={gym.nombre}
            gymAddress={gym.ubicacion}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default BuscarGimnasios;
