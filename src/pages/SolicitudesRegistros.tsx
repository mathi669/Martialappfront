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
} from "@chakra-ui/react";
import apiService from "../services/service";

const SolicitudesRegistro = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const data = await apiService.getSolicitudesRegistro();
        setSolicitudes(data);
      } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
      }
    };
    fetchSolicitudes();
  }, []);

  const handleAceptarSolicitud = async (idSolicitud: any) => {
    try {
      await apiService.aceptarSolicitud(idSolicitud);
      // Actualizar la lista de solicitudes después de aceptar una
      const data = await apiService.getSolicitudesRegistro();
      setSolicitudes(data);
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
      // Actualizar la lista de solicitudes después de rechazar una
      const data = await apiService.getSolicitudesRegistro();
      setSolicitudes(data);
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

  return (
    <Box>
      <Box mb={4}>
        <h2>Solicitudes de Registro</h2>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Correo Electrónico</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {solicitudes.map((solicitud: any) => (
            <Tr key={solicitud.id}>
              <Td>{solicitud.nombre}</Td>
              <Td>{solicitud.correo}</Td>
              <Td>
                <Button
                  colorScheme="green"
                  size="sm"
                  mr={2}
                  onClick={() => handleAceptarSolicitud(solicitud.id)}
                >
                  Aceptar
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleRechazarSolicitud(solicitud.id)}
                >
                  Rechazar
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SolicitudesRegistro;
