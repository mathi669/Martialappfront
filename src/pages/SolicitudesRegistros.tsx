import { SetStateAction, useEffect, useState } from "react";
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
  Flex,
  Center,
  Heading,
  Image,
} from "@chakra-ui/react";
import apiService from "../services/service";
import { Solicitud } from "../interfaces/solicitud_interface";

const SolicitudesRegistro = () => {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({}); // Estado para controlar el loading de los botones
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

  const handleAceptarSolicitud = async (idSolicitud: string) => {
    setLoading((prev) => ({ ...prev, [idSolicitud]: true }));
    try {
      await apiService.aceptarSolicitud(idSolicitud);
      const data = await apiService.getSolicitudesRegistro();
      setSolicitudes(data.solicitudes_registro);
      toast({
        title: "Solicitud aceptada",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
      toast({
        title: "Error",
        description: "Hubo un error al aceptar la solicitud",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading((prev) => ({ ...prev, [idSolicitud]: false }));
    }
  };

  const handleRechazarSolicitud = async (idSolicitud: string) => {
    setLoading((prev) => ({ ...prev, [idSolicitud]: true }));
    try {
      await apiService.rechazarSolicitud(idSolicitud);
      const data = await apiService.getSolicitudesRegistro();
      setSolicitudes(data.solicitudes_registro);
      toast({
        title: "Solicitud rechazada",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error al rechazar la solicitud:", error);
      toast({
        title: "Error",
        description: "Hubo un error al rechazar la solicitud",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading((prev) => ({ ...prev, [idSolicitud]: false }));
    }
  };

  const handleRowClick = (solicitud: SetStateAction<Solicitud | null>) => {
    setSelectedSolicitud(solicitud);
    onOpen();
  };

  return (
    <Center minHeight="100vh" p={4} bg="gray.50">
      <Box
        width="100%"
        maxWidth="800px"
        p={4}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
      >
        <Flex justifyContent="center" mb={4}>
          <Heading as="h2" size="xl">
            Solicitudes de Registro
          </Heading>
        </Flex>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Estado</Th>
              <Th>Fecha de Solicitud</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {solicitudes.map((solicitud) => (
              <Tr
                key={solicitud.id_solicitud_registro}
                onClick={() => handleRowClick(solicitud)}
              >
                <Td>
                  <Text>
                    {solicitud.id_estado_solRegistro === 1
                      ? "Pendiente"
                      : solicitud.id_estado_solRegistro === 2
                      ? "Aceptado"
                      : "Rechazado"}
                  </Text>
                </Td>
                <Td>
                  {new Date(solicitud.df_fecha_solicitud).toLocaleString()}
                </Td>
                <Td>
                  <Button
                    colorScheme="green"
                    size="sm"
                    mr={2}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAceptarSolicitud(solicitud.id_solicitud_registro);
                    }}
                    isDisabled={solicitud.id_estado_solRegistro !== 1}
                    isLoading={loading[solicitud.id_solicitud_registro]}
                  >
                    Aceptar
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRechazarSolicitud(solicitud.id_solicitud_registro);
                    }}
                    isDisabled={solicitud.id_estado_solRegistro !== 1}
                    isLoading={loading[solicitud.id_solicitud_registro]}
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
                  {selectedSolicitud.id_estado_solRegistro === 1
                    ? "Pendiente"
                    : selectedSolicitud.id_estado_solRegistro === 2
                    ? "Aceptado"
                    : "Rechazado"}
                </Text>
                <Text>
                  <strong>Fecha de Solicitud:</strong>{" "}
                  {new Date(
                    selectedSolicitud.df_fecha_solicitud
                  ).toLocaleString()}
                </Text>
                <Text>
                  <strong>Fecha de Aprobación:</strong>{" "}
                  {selectedSolicitud.df_fecha_aprobacion
                    ? new Date(
                        selectedSolicitud.df_fecha_aprobacion
                      ).toLocaleString()
                    : "No aprobada"}
                </Text>
                <Text>
                  <strong>Nombre del Gimnasio:</strong>{" "}
                  {selectedSolicitud.nombre_gimnasio}
                </Text>
                <Text>
                  <strong>Teléfono:</strong>{" "}
                  {selectedSolicitud.telefono_gimnasio}
                </Text>
                <Text>
                  <strong>Correo:</strong> {selectedSolicitud.correo_gimnasio}
                </Text>
                <Text>
                  <strong>Dirección:</strong>{" "}
                  {selectedSolicitud.direccion_gimnasio}
                </Text>
                <Image
                  src={selectedSolicitud.foto_gimnasio}
                  alt="Foto del gimnasio"
                  borderRadius="md"
                  mt={4}
                />
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
    </Center>
  );
};

export default SolicitudesRegistro;
