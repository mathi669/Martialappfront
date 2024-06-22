// src/components/MapContainer.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import {
  Box,
  useDisclosure,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const mapContainerStyle = {
  width: "100%",
  height: "200px",
  maxWidth: "670px",
};

const mapContainerStyleLarge = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -33.446994,
  lng: -70.656863,
};

interface MapContainerProps {
  gymAddress: string;
}

const MapContainer: React.FC<MapContainerProps> = ({ gymAddress }) => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [modalMapCenter, setModalMapCenter] = useState(defaultCenter);
  const [modalMarker, setModalMarker] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const geocodeAddress = async (address: string) => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.status === "OK") {
          if (data.results.length > 0) {
            const location = data.results[0].geometry.location;
            setMapCenter(location);
            setMarker(location);
            setModalMapCenter(location); // Actualizamos el centro del mapa del modal
            setModalMarker(location); // Actualizamos el marcador del mapa del modal
          }
        } else {
          setError(data.error_message || "Geocoding API request failed");
        }
      } catch (error) {
        setError("Error geocoding address");
        console.error("Error geocoding address:", error);
      }
    };

    geocodeAddress(gymAddress);
  }, [gymAddress]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarker({ lat, lng });
    }
  };

  const handleModalMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setModalMarker({ lat, lng });
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
        setModalMapCenter({ lat, lng }); // Actualizamos el centro del mapa del modal
        setModalMarker({ lat, lng }); // Actualizamos el marcador del mapa del modal
      }
    }
  };

  const handleMarkerClick = () => {
    if (marker) {
      const { lat, lng } = marker;
      window.open(
        `https://www.google.com/maps/@${lat},${lng},17z?hl=es-419&entry=ttu`,
        "_blank"
      );
    }
  };

  const handleModalMarkerClick = () => {
    if (modalMarker) {
      const { lat, lng } = modalMarker;
      window.open(
        `https://www.google.com/maps/@${lat},${lng},17z?hl=es-419&entry=ttu`,
        "_blank"
      );
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <Box>
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
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

        {/* <Modal isOpen={isOpen} onClose={onClose} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ubicación del Gimnasio</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <GoogleMap
                mapContainerStyle={mapContainerStyleLarge}
                zoom={10}
                center={modalMapCenter}
                onClick={handleModalMapClick}
              >
                {modalMarker && (
                  <Marker
                    position={modalMarker}
                    onClick={handleModalMarkerClick}
                  />
                )}
              </GoogleMap>
              <Box mt={4} display="flex" justifyContent="center">
                <Autocomplete
                  onLoad={(autocomplete) =>
                    (autocompleteRef.current = autocomplete)
                  }
                  onPlaceChanged={handlePlaceChanged}
                >
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
              <Button colorScheme="blue" onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
      </Box>
    </LoadScript>
  );
};

export default MapContainer;
