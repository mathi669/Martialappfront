import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import apiService from "../services/service";

const SolicitudesRegistro = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const data = await apiService.getSolicitudesRegistro();
        setSolicitudes(data.solicitudes_registro);
      } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
      }
    };
    fetchSolicitudes();
  }, []);

  const handleAceptarSolicitud = async (idSolicitud: any) => {
    try {
      await apiService.aceptarSolicitud(idSolicitud);
      const data = await apiService.getSolicitudesRegistro();
      setSolicitudes(data.solicitudes_registro);
      toast({
        title: "Solicitud aceptada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
      toast({
        title: "Error",
        description: "Hubo un error al aceptar la solicitud",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRechazarSolicitud = async (idSolicitud: any) => {
    try {
      await apiService.rechazarSolicitud(idSolicitud);
      const data = await apiService.getSolicitudesRegistro();
      setSolicitudes(data.solicitudes_registro);
      toast({
        title: "Solicitud rechazada",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
      toast({
        title: "Error",
        description: "Hubo un error al rechazar la solicitud",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRowClick = (solicitud: React.SetStateAction<null>) => {
    setSelectedSolicitud(solicitud);
    onOpen();
  };

  return (
    <Box>
      <Box mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Solicitudes de Registro
        </Text>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Estado</Th>
            <Th>Fecha de Solicitud</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {solicitudes.map((solicitud) => (
            <Tr key={solicitud[0]} onClick={() => handleRowClick(solicitud)}>
              <Td>
                {
                  <Text>
                    {solicitud[1] === 1
                      ? "Pendiente"
                      : solicitud[1] === 2
                      ? "Aceptado"
                      : "Rechazado"}
                  </Text>
                }
              </Td>
              <Td>{new Date(solicitud[3]).toLocaleString()}</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size="sm"
                  mr={2}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAceptarSolicitud(solicitud[0]);
                  }}
                >
                  Aceptar
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRechazarSolicitud(solicitud[0]);
                  }}
                >
                  Rechazar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedSolicitud && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Detalles de la Solicitud</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                <strong>Estado:</strong>{" "}
                <Text>
                  {selectedSolicitud[1] === 1
                    ? "Pendiente"
                    : selectedSolicitud[1] === 2
                    ? "Aceptado"
                    : "Rechazado"}
                </Text>
              </Text>
              <Text>
                <strong>Fecha de Solicitud:</strong>{" "}
                {new Date(selectedSolicitud[3]).toLocaleString()}
              </Text>
              <Text>
                <strong>Fecha de Aprobación:</strong>{" "}
                {selectedSolicitud[4]
                  ? new Date(selectedSolicitud[4]).toLocaleString()
                  : "No aprobada"}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default SolicitudesRegistro;
