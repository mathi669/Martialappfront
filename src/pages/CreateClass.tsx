import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Center,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import apiService from "../services/service";

const CreateClass = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    nombre_clase: "",
    horaInicio: "",
    horaFin: "",
    cupos_disponibles: "",
    fecha: "",
    descripcion: "",
    gimnasio_id: "",
    categoria_id: 1,
    clase_estado_id: 1,
    arte_marcial_id: 1,
    profesor_id: 1,
  });
  const [message, setMessage] = useState("");
  const [gymImageUrl, setGymImageUrl] = useState("");
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setGymImageUrl(user.dc_imagen_url);
      setFormData((prevData) => ({
        ...prevData,
        gimnasio_id: user.id,
      }));
      fetchClasses(user.id);
    }
  }, []);

  const fetchClasses = async (gymId) => {
    setIsLoading(true);
    try {
      const response = await apiService.getClassesByGym(gymId);
      setClasses(response);
    } catch (error) {}
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imagen: reader.result?.split(",")[1] || "",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { horaInicio, horaFin, ...rest } = formData;
    const horario = `${horaInicio} - ${horaFin}`;
    const hora = horaInicio;
    const newData = { ...rest, horario, hora };
    try {
      const response = await apiService.createClass(newData);
      setMessage(response.message);
      onClose();
      fetchClasses(formData.gimnasio_id);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error creating class");
    }
  };

  const handleDelete = async (classId) => {
    try {
      await apiService.deleteClass(classId);
      fetchClasses(formData.gimnasio_id);
    } catch (error) {}
  };

  const handleEdit = (classData) => {
    setFormData(classData);
    onOpen();
  };

  return (
    <Box as="section" w="full">
      <Flex
        w="full"
        h="200px"
        bgImage={`url(${gymImageUrl})`}
        bgSize="cover"
        bgPosition="center"
        direction="column"
        align="center"
        justify="center"
        color="white"
        position="relative"
      ></Flex>

      <Flex w="full" justify="center" mt={5}>
        <Button
          colorScheme="blue"
          size="lg"
          leftIcon={<Box as="span" className="fa fa-plus" />}
          onClick={onOpen}
        >
          Crear Clase
        </Button>
      </Flex>

      <Box p={5}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Horario</Th>
              <Th>Fecha</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          {classes != [] ? (
            <Tbody>
              {isLoading ? (
                <Center w="full" h="200px">
                  <Spinner size="xl" />
                </Center>
              ) : (
                classes?.map((classData) => (
                  <Tr key={classData.id}>
                    <Td>{classData.dc_nombre_clase}</Td>
                    <Td>{classData.dc_horario}</Td>
                    <Td>{new Date(classData.df_fecha).toLocaleDateString()}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        mr={2}
                        onClick={() => handleEdit(classData)}
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => handleDelete(classData.id)}
                      />
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          ) : (
            <Text>Aún no existen clases, crea la primera</Text>
          )}
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Nueva Clase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl id="nombre_clase" mb={4}>
                <FormLabel>Nombre de la Clase</FormLabel>
                <Input
                  name="nombre_clase"
                  value={formData.nombre_clase}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre de la clase"
                />
              </FormControl>
              <FormControl id="horaInicio" mb={4}>
                <FormLabel>Hora de Inicio</FormLabel>
                <Input
                  type="time"
                  name="horaInicio"
                  value={formData.horaInicio}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="horaFin" mb={4}>
                <FormLabel>Hora de Fin</FormLabel>
                <Input
                  type="time"
                  name="horaFin"
                  value={formData.horaFin}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="cupos_disponibles" mb={4}>
                <FormLabel>Cupos Disponibles</FormLabel>
                <Input
                  type="number"
                  name="cupos_disponibles"
                  value={formData.cupos_disponibles}
                  onChange={handleChange}
                  placeholder="Ingrese la cantidad de cupos disponibles"
                />
              </FormControl>
              <FormControl id="fecha" mb={4}>
                <FormLabel>Fecha</FormLabel>
                <Input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="descripcion" mb={4}>
                <FormLabel>Descripción</FormLabel>
                <Input
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Ingrese la descripción de la clase"
                />
              </FormControl>
              <FormControl id="imagen" mb={4}>
                <FormLabel>Imagen</FormLabel>
                <Input
                  type="file"
                  name="imagen"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" mr={3}>
                Guardar Clase
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {message && (
        <Text color="red" textAlign="center" mt={5}>
          {message}
        </Text>
      )}
    </Box>
  );
};

export default CreateClass;
