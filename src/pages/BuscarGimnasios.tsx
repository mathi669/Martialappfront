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

const BuscarGimnasios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gyms, setGyms] = useState<any[]>([]);
  const [filteredGyms, setFilteredGyms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // const handleSearch = () => {
  //   setIsLoading(true);
  //   if (searchType === "gimnasio") {
  //     const filtered = gyms.filter(gym =>
  //       gym.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       gym.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       gym.horario.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFilteredGyms(filtered);
  //   } else if (searchType === "clase") {
  //     const filtered = classes.filter(clase =>
  //       clase.dc_nombre_clase.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFilteredClasses(filtered);
  //   }
  //   setSearchTerm("");
  //   setIsLoading(false);
  // };

  // const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSearchType(e.target.value);
  //   setSearchTerm("");
  //   if (e.target.value === "gimnasio") {
  //     fetchAllGyms();
  //   } else {
  //     setClasses([]);
  //     setFilteredClasses([]);
  //   }
  // };

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
            />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};

export default BuscarGimnasios;
