import { Box, Flex, FormControl, Input, Text, SimpleGrid, Button, Spinner, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import GymBox from "../components/GymBox";
import apiService from "../services/service.tsx";

const BuscarGimnasios = () => {
  const [searchType, setSearchType] = useState("gimnasio");
  const [searchTerm, setSearchTerm] = useState("");
  const [gyms, setGyms] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [filteredGyms, setFilteredGyms] = useState<any[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllGyms = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getAllGyms();
      setGyms(response.gimnasios);
      setFilteredGyms(response.gimnasios); // Set filtered gyms to all gyms initially
    } catch (error) {
      console.error("Error fetching all gyms:", error);
    }
    setIsLoading(false);
  };

  const fetchClassesByGym = async (gymId: number) => {
    setIsLoading(true);
    try {
      const response = await apiService.getClassesByGym(gymId);
      setClasses(response);
      setFilteredClasses(response); // Set filtered classes to all classes initially
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllGyms();
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    if (searchType === "gimnasio") {
      const filtered = gyms.filter(gym =>
        gym.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gym.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gym.horario.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGyms(filtered);
    } else if (searchType === "clase") {
      const filtered = classes.filter(clase =>
        clase.dc_nombre_clase.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClasses(filtered);
    }
    setSearchTerm("");
    setIsLoading(false);
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
    setSearchTerm("");
    if (e.target.value === "gimnasio") {
      fetchAllGyms();
    } else {
      setClasses([]);
      setFilteredClasses([]);
    }
  };

  return (
    <Flex direction="column" align="center" w="full" h="full" p={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={4}>¿dónde quieres entrenar?</Text>
      <FormControl w="full" maxW="600px" mb={8}>
        <Select
          placeholder="Seleccionar tipo de búsqueda"
          size="lg"
          borderRadius="full"
          borderWidth={2}
          borderColor="gray.300"
          mb={4}
          onChange={handleSearchTypeChange}
          value={searchType}
        >
          <option value="gimnasio">Buscar por Gimnasio</option>
          <option value="clase">Buscar por Clase</option>
        </Select>
        <Input
          type="text"
          placeholder={searchType === "gimnasio" ? "Buscar gimnasios" : "Buscar clases"}
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
      {isLoading ? (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4} w="full" maxW="1200px">
          {searchType === "gimnasio"
            ? filteredGyms.map((gym) => (
                <GymBox
                  key={gym.id}
                  imageSrc={gym.imagen_url}
                  altText={gym.nombre}
                  gymName={gym.nombre}
                  gymAddress={gym.ubicacion} 
                  gymId={0}                
                />
              ))
            : filteredClasses.map((clase) => (
                <GymBox
                  key={clase.id}
                  imageSrc={clase.dc_imagen_url}
                  altText={clase.dc_nombre_clase}
                  gymName={clase.dc_nombre_clase}
                  gymAddress={clase.dc_horario}
                  gymId={0}
                />
              ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};

export default BuscarGimnasios;
