import { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  Button,
  Flex,
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
import { ClassData } from "../interfaces/class_data";

const CreateClass = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    nombre_clase: "",
    horaInicio: "",
    horaFin: "",
    cupos_disponibles: "",
    fecha: "",
    descripcion: "",
    dc_imagen_url: "",
    gimnasio_id: 1,
    categoria_id: 1,
    clase_estado_id: 1,
    arte_marcial_id: 1,
    profesor_id: 1,
  });
  const [message, setMessage] = useState("");
  const [gymImageUrl, setGymImageUrl] = useState("");
  const [classes, setClasses] = useState<ClassData[]>([]);
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

  const fetchClasses = async (gymId: number) => {
    setIsLoading(true);
    try {
      const response = await apiService.getClassesByGym(gymId);
      setClasses(response);
    } catch (error) {}
    setIsLoading(false);
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if(reader.result){

          setFormData((prevData) => ({
            ...prevData,
            imagen: (reader.result as string).split(",")[1] || "",
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      
      // Crear la clase con la URL de la imagen
      const { horaInicio, horaFin, ...rest } = formData;
      const horario = `${horaInicio} - ${horaFin}`;
      const hora = horaInicio;
      const newData = { ...rest, horario, hora };

      const response = await apiService.createClass(newData);
      setMessage(response.message);
      onClose();
      fetchClasses(formData.gimnasio_id);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Error creating class");
    }
  };

  const handleDelete = async (classId: any) => {
    try {
      await apiService.deleteClass(classId);
      fetchClasses(formData.gimnasio_id);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Error deleting class");
    }
  };

  const handleEdit = (classData: ClassData) => {
    setFormData((prevData) => ({
      ...prevData,
      nombre_clase: classData.dc_nombre_clase,
      horaInicio: classData.dc_horario.split(" - ")[0],
      horaFin: classData.dc_horario.split(" - ")[1],
      fecha: classData.df_fecha,
    }));
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
        {classes.length > 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Horario</Th>
                <Th>Fecha</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
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
                        onClick={() => handleEdit(classData)} aria-label={""}                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => handleDelete(classData.id)} aria-label={""}                      />
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        ) : (
          <Text>Aún no existen clases, crea la primera</Text>
        )}
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
