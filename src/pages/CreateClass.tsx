import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Textarea, 
  Center 
} from "@chakra-ui/react";

const CreateClass = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    nombre_clase: '',
    horario: '',
    cupos_disponibles: 0,
    fecha: '',
    hora: '',
    imagen_url: '',
    categoria_id: 0,
    clase_estado_id: 0,
    gimnasio_id: 0,
    arte_marcial_id: 0,
    profesor_id: 0
  });
  const [message, setMessage] = useState<string>('');

  // useEffect(() => {
  //   const fetchAdditionalInfo = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/getAdditionalInfo');
  //       setFormData(prevFormData => ({
  //         ...prevFormData,
  //         ...response.data.additional_info
  //       }));
  //     } catch (error: any) {
  //       setMessage(error.response?.data?.error || "Error fetching additional information");
  //     }
  //   };

  //   if (isOpen) {
  //     fetchAdditionalInfo();
  //   }
  // }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/create_class', formData);
      setMessage(response.data.message);
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
        bgImage="url('./src/static/img/banner ejemplo.jpg')"
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
                <Input name="nombre_clase" value={formData.nombre_clase} onChange={handleChange} placeholder="Ingrese el nombre de la clase" />
              </FormControl>
              <FormControl id="horario" mb={4}>
                <FormLabel>Horario</FormLabel>
                <Input name="horario" value={formData.horario} onChange={handleChange} placeholder="Ingrese el horario de la clase" />
              </FormControl>
              <FormControl id="cupos_disponibles" mb={4}>
                <FormLabel>Cupos Disponibles</FormLabel>
                <Input type="number" name="cupos_disponibles" value={formData.cupos_disponibles} onChange={handleChange} placeholder="Ingrese la cantidad de cupos disponibles" />
              </FormControl>
              <FormControl id="fecha" mb={4}>
                <FormLabel>Fecha</FormLabel>
                <Input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
              </FormControl>
              <FormControl id="hora" mb={4}>
                <FormLabel>Hora</FormLabel>
                <Input type="time" name="hora" value={formData.hora} onChange={handleChange} />
              </FormControl>
              <FormControl id="imagen_url" mb={4}>
                <FormLabel>Imagen URL</FormLabel>
                <Input name="imagen_url" value={formData.imagen_url} onChange={handleChange} placeholder="Ingrese la URL de la imagen" />
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

      {[1, 2, 3].map((classNumber) => (
        <Center key={classNumber} my={4}>
          <Box w="full" maxW="800px" bg="gray.100" p={5} borderRadius="md" shadow="md">
            <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center">
              <Box mb={{ base: 4, md: 0 }}>
                <Heading as="h3" size="md" mb={2}>
                  Información de la Clase {classNumber}
                </Heading>
                <Text mb={4}>
                  Esta es la información de la clase que proviene de perfilgimnasio.html.
                </Text>
              </Box>
              <Box textAlign="center">
                <Heading as="h4" size="sm" mb={2}>
                  Cantidad de participantes: {classNumber * 10}
                </Heading>
                <Button colorScheme="blue" mr={3}>
                  Editar
                </Button>
                <Button colorScheme="red">Cancelar</Button>
              </Box>
            </Flex>
          </Box>
        </Center>
      ))}
      {message && <Text>{message}</Text>}
    </Box>
  );
};

export default CreateClass;
