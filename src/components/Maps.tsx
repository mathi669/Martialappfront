// src/components/MapContainer.tsx
import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const mapContainerStyle = {
  width: '100%', // Adjust to full width
  height: '200px', // Adjust height for square shape
  maxWidth: '670px', // Ensure it's square on larger screens
};

const mapContainerStyleLarge = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: -33.446994,
  lng: -70.656863,
};

const MapContainer: React.FC = () => {
  const [marker, setMarker] = useState<{ lat: number, lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState(center);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
    }
  };

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location?.lat() || 0;
        const lng = place.geometry.location?.lng() || 0;
        setMapCenter({ lat, lng });
        setMarker({ lat, lng });
      }
    }
  };

  const handleMarkerClick = () => {
    if (marker) {
      const { lat, lng } = marker;
      window.open(`https://www.google.com/maps/@${lat},${lng},17z?hl=es-419&entry=ttu`, '_blank');
    }
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <Box>
        <Box onClick={onOpen} cursor="pointer">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={mapCenter}
            onClick={handleMapClick}
          >
            {marker && <Marker position={marker} onClick={handleMarkerClick} />}
          </GoogleMap>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ubicación del Gimnasio</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <GoogleMap
                mapContainerStyle={mapContainerStyleLarge}
                zoom={10}
                center={mapCenter}
                onClick={handleMapClick}
              >
                {marker && <Marker position={marker} onClick={handleMarkerClick} />}
              </GoogleMap>
              <Box mt={4} display="flex" justifyContent="center">
                <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={handlePlaceChanged}>
                  <InputGroup width="80%">
                    <Input
                      type="text"
                      placeholder="Ingresa una ubicación"
                      boxShadow="0 2px 6px rgba(0, 0, 0, 0.3)"
                      borderRadius="md"
                    />
                    <InputRightElement pointerEvents="none">
                      <SearchIcon color="gray.300" />
                    </InputRightElement>
                  </InputGroup>
                </Autocomplete>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </LoadScript>
  );
};

export default MapContainer;
