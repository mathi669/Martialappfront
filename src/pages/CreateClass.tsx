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
    dc_nombre_clase: "",
    dc_horario: "",
    nb_cupos_disponibles: "",
    df_fecha: "",
    dc_descripcion: "",
    dc_imagen_url: "",
    tb_gimnasio_id: 1,
    id_categoria: 1,
    tb_clase_estado_id: 1,
    tb_arte_marcial_id: 1,
    tb_profesor_id: 1,
  });
  const [message, setMessage] = useState("");
  const [gymImageUrl, setGymImageUrl] = useState("");
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editClassId, setEditClassId] = useState<number | null>(null);

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
    try {
      const response = await apiService.getClassesByGym(gymId);
      setClasses(response);
    } catch (error) {}
    setIsLoading(false);
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
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
        if (reader.result) {
          setFormData((prevData) => ({
            ...prevData,
            imagen: (reader.result as string).split(",")[1] || "",
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const df_hora = formData.dc_horario.split(" - ")[0];
      const newData = { ...formData, df_hora };

      let response;
      if (editClassId) {
        // Llamar al endpoint de actualización
        response = await apiService.updateClass(editClassId, newData);
      } else {
        // Llamar al endpoint de creación
        response = await apiService.createClass(newData);
      }

      setMessage(response.message);
      onClose();
      fetchClasses(formData.tb_gimnasio_id);
    } catch (error: any) {
      setMessage(
        error.response?.data?.error || "Error creating/updating class"
      );
    } finally {
      setEditClassId(null); // Resetear el estado de edición
    }
  };

  const handleDelete = async (classId: any) => {
    try {
      await apiService.deleteClass(classId);
      fetchClasses(formData.tb_gimnasio_id);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Error deleting class");
    }
  };

  const handleEdit = (classData: ClassData) => {
    setEditClassId(classData.id);
    setFormData({
      dc_nombre_clase: classData.dc_nombre_clase,
      dc_horario:
        classData.dc_horario.split(" - ")[0] +
        " - " +
        classData.dc_horario.split(" - ")[1],
      nb_cupos_disponibles: classData.nb_cupos_disponibles,
      df_fecha: classData.df_fecha,
      dc_descripcion: classData.dc_descripcion || "",
      dc_imagen_url: classData.dc_imagen_url || "",
      tb_gimnasio_id: classData.tb_gimnasio_id,
      id_categoria: classData.id_categoria,
      tb_clase_estado_id: classData.tb_clase_estado_id,
      tb_arte_marcial_id: classData.tb_arte_marcial_id,
      tb_profesor_id: classData.tb_profesor_id,
    });
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
          onClick={() => {
            setEditClassId(null); // Resetear el estado de edición
            setFormData({
              dc_nombre_clase: "",
              dc_horario: "",
              nb_cupos_disponibles: "",
              df_fecha: "",
              dc_descripcion: "",
              dc_imagen_url: "",
              tb_gimnasio_id: formData.tb_gimnasio_id,
              id_categoria: 1,
              tb_clase_estado_id: 1,
              tb_arte_marcial_id: 1,
              tb_profesor_id: 1,
            });
            onOpen();
          }}
        >
          Crear Clase
        </Button>
      </Flex>

      <Box p={5}>
        {isLoading ? (
          <Center w="full" h="200px">
            <Spinner size="xl" />
          </Center>
        ) : classes.length > 0 ? (
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
              {classes.map((classData) => (
                <Tr key={classData.id}>
                  <Td>{classData.dc_nombre_clase}</Td>
                  <Td>{classData.dc_horario}</Td>
                  <Td>{new Date(classData.df_fecha).toLocaleDateString()}</Td>
                  <Td>
                    <IconButton
                      icon={<EditIcon />}
                      mr={2}
                      onClick={() => handleEdit(classData)}
                      aria-label="Editar clase"
                    />
                    <IconButton
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      onClick={() => handleDelete(classData.id)}
                      aria-label="Eliminar clase"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Center w="full" h="200px">
            <Box>
              <Text>Aún no tienes clases creadas.</Text>
            </Box>
          </Center>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editClassId ? "Actualizar Clase" : "Crear Nueva Clase"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl id="dc_nombre_clase" mb={4}>
                <FormLabel>Nombre de la Clase</FormLabel>
                <Input
                  name="dc_nombre_clase"
                  value={formData.dc_nombre_clase}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre de la clase"
                />
              </FormControl>
              <FormControl id="dc_horario" mb={4}>
                <FormLabel>Hora de Inicio</FormLabel>
                <Input
                  type="time"
                  name="dc_horario"
                  value={formData.dc_horario.split(" - ")[0]}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="dc_horario" mb={4}>
                <FormLabel>2da Hora de Inicio</FormLabel>
                <Input
                  type="time"
                  name="dc_horario"
                  value={formData.dc_horario.split(" - ")[1]}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="nb_cupos_disponibles" mb={4}>
                <FormLabel>Cupos Disponibles</FormLabel>
                <Input
                  type="number"
                  name="nb_cupos_disponibles"
                  value={formData.nb_cupos_disponibles}
                  onChange={handleChange}
                  placeholder="Ingrese la cantidad de cupos disponibles"
                />
              </FormControl>
              <FormControl id="df_fecha" mb={4}>
                <FormLabel>Fecha</FormLabel>
                <Input
                  type="date"
                  name="df_fecha"
                  value={formData.df_fecha}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="dc_descripcion" mb={4}>
                <FormLabel>Descripción</FormLabel>
                <Input
                  name="dc_descripcion"
                  value={formData.dc_descripcion}
                  onChange={handleChange}
                  placeholder="Ingrese la descripción de la clase"
                />
              </FormControl>
              <FormControl id="dc_imagen_url" mb={4}>
                <FormLabel>Imagen</FormLabel>
                <Input
                  type="file"
                  name="dc_imagen_url"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" mr={3}>
                {editClassId ? "Actualizar Clase" : "Guardar Clase"}
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
