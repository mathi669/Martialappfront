// src/pages/BuscarGimnasios.tsx
import { Box, Button, Flex, FormControl, Input, Text, VStack, Image, SimpleGrid } from "@chakra-ui/react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};
const center = {
  lat: -33.4489,
  lng: -70.6693,
};

const BuscarGimnasios = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <Flex direction="column" align="center" w="full" h="full" p={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={4}>Entonces, ¿dónde quieres entrenar?</Text>
      <FormControl id="search" w="full" maxW="600px" mb={8}>
        <Input
          type="text"
          placeholder="Ingresa tu ciudad, comuna o Código Postal"
          size="lg"
          borderRadius="full"
          borderWidth={2}
          borderColor="gray.300"
        />
      </FormControl>
      <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={4} w="full" maxW="1200px">
        <Box borderWidth={1} borderRadius="lg" overflow="hidden">
          <Image src="/path-to-your-image1.jpg" alt="Gimnasio 1" />
          <Box p={4}>
            <Text fontWeight="bold">Catedral</Text>
            <Text>Catedral 1850, Santiago, 1850 – , Santiago – Región Metropolitana</Text>
          </Box>
        </Box>
        <Box borderWidth={1} borderRadius="lg" overflow="hidden">
          <Image src="/path-to-your-image2.jpg" alt="Gimnasio 2" />
          <Box p={4}>
            <Text fontWeight="bold">Espacio M</Text>
            <Text>Compañía de Jesús 1214, local 218, 1214 – Santiago, Santiago – Región Metropolitana</Text>
          </Box>
        </Box>
        <Box borderWidth={1} borderRadius="lg" overflow="hidden">
          <Image src="/path-to-your-image3.jpg" alt="Gimnasio 3" />
          <Box p={4}>
            <Text fontWeight="bold">Vivo El Centro</Text>
            <Text>Calle Puente 689, Piso -1, Local 037-041, 689 – Santiago Centro, Santiago – Región Metropolitana</Text>
          </Box>
        </Box>
      </SimpleGrid>
      <Box w="full" h="400px" mt={8}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          onClick={(event) => {
            setMarkers((current) => [
              ...current,
              {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
              },
            ]);
          }}
        >
          {markers.map((marker) => (
            <Marker key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
      </Box>
    </Flex>
  );
};

export default BuscarGimnasios;
