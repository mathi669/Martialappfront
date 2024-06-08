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
} from "@chakra-ui/react";
import apiService from "../services/service";

const CreateClass = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    nombre_clase: "",
    horario: "",
    cupos_disponibles: 0,
    fecha: "",
    hora: "",
    imagen: "",
    categoria_id: 0,
    clase_estado_id: 0,
    gimnasio_id: 0,
    arte_marcial_id: 0,
    profesor_id: 0,
  });
  const [message, setMessage] = useState<string>("");
  const [gymImageUrl, setGymImageUrl] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setGymImageUrl(user.dc_imagen_url);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imagen: reader.result?.split(",")[1] || "", // Remover el prefijo de base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiService.createClass(formData);
      setMessage(response.message);
      onClose(); // Close the modal after successful submission
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Error creating class");
    }
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
      >
        <Heading as="h2" size="lg">
          Banner del Gimnasio
        </Heading>
      </Flex>

      <Flex w="full" justify="center">
        <Button
          colorScheme="blue"
          size="lg"
          leftIcon={<Box as="span" className="fa fa-plus" />}
          onClick={onOpen}
          m={5}
        >
          Crear Clase
        </Button>
      </Flex>

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
              <FormControl id="horario" mb={4}>
                <FormLabel>Horario</FormLabel>
                <Input
                  name="horario"
                  value={formData.horario}
                  onChange={handleChange}
                  placeholder="Ingrese el horario de la clase"
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
              <FormControl id="hora" mb={4}>
                <FormLabel>Hora</FormLabel>
                <Input
                  type="time"
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
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

      {message && <Text>{message}</Text>}
    </Box>
  );
};

export default CreateClass;
