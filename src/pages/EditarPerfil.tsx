import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Text,
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FaSignOutAlt, FaSave, FaKey, FaEdit } from "react-icons/fa";
import { User } from "../interfaces/user_interface";
import apiService from "../services/service";

const EditarPerfil: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  // Estado para los campos del gimnasio en un solo objeto
  const [gymData, setGymData] = useState({
    nombreGimnasio: "",
    telefonoGimnasio: "",
    ubicacionGimnasio: "",
    horario: "",
    descripcion: "",
    estadoId: 2,
    fechaIngreso: "",
    redSocial: "",
  });

  // Estado para almacenar la imagen como base64
  const [imageFile, setImageFile] = useState<string | ArrayBuffer | null>(null);

  // Función para manejar el cambio de archivo y convertir a base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result); // Guardar el base64 en el estado
      };
      reader.readAsDataURL(file); // Leer el archivo como base64
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const userTypeData = localStorage.getItem("userType");

    if (userData) {
      const parsedUser: User = JSON.parse(userData);
      setUser(parsedUser);
      if (userTypeData === "gimnasio") {
        setUserType(userTypeData);
        setGymData({
          nombreGimnasio: parsedUser.dc_nombre,
          telefonoGimnasio: parsedUser.dc_telefono,
          ubicacionGimnasio: parsedUser.dc_ubicacion || "",
          horario: parsedUser.dc_horario || "",
          descripcion: parsedUser.dc_descripcion || "",
          estadoId: parsedUser.tb_gimnasio_estado_id || 2,
          fechaIngreso: parsedUser.df_fecha_ingreso || "",
          redSocial: parsedUser.dc_red_social || "",
        });
      }
    }

    if (userTypeData && userTypeData !== "gimnasio") {
      setUserType(userTypeData);
    }
  }, []);

  const handleGymDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setGymData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      let dataToUpdate: any = {
        id: user?.id,
        dc_nombre: gymData.nombreGimnasio,
        dc_correo_electronico: user?.dc_correo_electronico,
        dc_contrasena: newPassword || undefined,
        dc_telefono: gymData.telefonoGimnasio,
        dc_ubicacion: gymData.ubicacionGimnasio,
        dc_horario: gymData.horario,
        dc_descripcion: gymData.descripcion,
        dc_imagen_base64: imageFile, // Aquí se envía la imagen como base64
        tb_gimnasio_estado_id: gymData.estadoId,
        dc_red_social: gymData.redSocial,
      };

      // Si no hay imagen nueva, se evita enviar dc_imagen_base64
      if (!imageFile) {
        delete dataToUpdate.dc_imagen_base64;
      }

      if (userType === "gimnasio" && user) {
        await apiService.updateGym(dataToUpdate).then((res: any) => {
          localStorage.setItem("user", JSON.stringify(res.gimnasio));
        });
      } else {
        // Lógica para actualizar datos del usuario normal
      }

      toast({
        title: "Éxito",
        description: "Datos actualizados correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setNewPassword("");
      setConfirmPassword("");
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Error actualizando los datos:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar los datos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsSaving(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="white"
      p={6}
    >
      <Box
        w="full"
        maxW="800px"
        bg="white"
        shadow="lg"
        borderRadius="lg"
        p={6}
        textAlign="center"
      >
        <Avatar size="2xl" src={user?.dc_imagen_url} mb={4} />
        <Text fontSize="2xl" fontWeight="bold">
          {user?.dc_nombre}
        </Text>
        <Text color="gray.500" mb={4}>
          {user?.dc_correo_electronico}
        </Text>

        <form>
          {user && userType !== "gimnasio" && (
            <>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Información Personal
              </Text>
              <Flex mt={6} mb={4} justify="space-between" gap={6}>
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    type="text"
                    placeholder="Nombre"
                    value={gymData.nombreGimnasio}
                    onChange={handleGymDataChange}
                    name="nombreGimnasio"
                    isDisabled={!isEditing}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    type="text"
                    placeholder="Apellido"
                    isDisabled={!isEditing}
                  />
                </FormControl>
              </Flex>
              <Flex mb={4} justify="space-between" gap={6}>
                <FormControl>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input
                    type="email"
                    defaultValue={user?.dc_correo_electronico}
                    isDisabled
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    type="text"
                    placeholder="Número telefónico"
                    value={gymData.telefonoGimnasio}
                    onChange={handleGymDataChange}
                    name="telefonoGimnasio"
                    isDisabled={!isEditing}
                  />
                </FormControl>
              </Flex>
              <Flex mb={4} justify="space-between" gap={6}>
                <FormControl>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <Input type="date" isDisabled={!isEditing} />
                </FormControl>
                <FormControl>
                  <FormLabel>Género</FormLabel>
                  <Select
                    placeholder="Seleccione género"
                    isDisabled={!isEditing}
                  >
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </Select>
                </FormControl>
              </Flex>
              <FormControl mb={4}>
                <FormLabel>Dirección</FormLabel>
                <Input
                  type="text"
                  placeholder="Dirección"
                  value={gymData.ubicacionGimnasio}
                  onChange={handleGymDataChange}
                  name="ubicacionGimnasio"
                  isDisabled={!isEditing}
                />
              </FormControl>
            </>
          )}

          {userType === "gimnasio" && (
            <>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Información del Gimnasio
              </Text>
              <Flex mt={6} mb={4} justify="space-between" gap={6}>
                <FormControl>
                  <FormLabel>Nombre del Gimnasio</FormLabel>
                  <Input
                    type="text"
                    placeholder="Nombre del Gimnasio"
                    value={gymData.nombreGimnasio}
                    onChange={handleGymDataChange}
                    name="nombreGimnasio"
                    isDisabled={!isEditing}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Teléfono del Gimnasio</FormLabel>
                  <Input
                    type="text"
                    placeholder="Teléfono del Gimnasio"
                    value={gymData.telefonoGimnasio}
                    onChange={handleGymDataChange}
                    name="telefonoGimnasio"
                    isDisabled={!isEditing}
                  />
                </FormControl>
              </Flex>
              <FormControl mb={4}>
                <FormLabel>Ubicación</FormLabel>
                <Input
                  type="text"
                  placeholder="Ubicación del Gimnasio"
                  value={gymData.ubicacionGimnasio}
                  onChange={handleGymDataChange}
                  name="ubicacionGimnasio"
                  isDisabled={!isEditing}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Horario</FormLabel>
                <Input
                  type="text"
                  placeholder="Horario del Gimnasio"
                  value={gymData.horario}
                  onChange={handleGymDataChange}
                  name="horario"
                  isDisabled={!isEditing}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Descripción del Gimnasio"
                  value={gymData.descripcion}
                  onChange={handleGymDataChange}
                  name="descripcion"
                  isDisabled={!isEditing}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Redes Sociales</FormLabel>
                <Input
                  type="text"
                  placeholder="Redes Sociales del Gimnasio"
                  value={gymData.redSocial}
                  onChange={handleGymDataChange}
                  name="redSocial"
                  isDisabled={!isEditing}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Estado</FormLabel>
                <Select
                  placeholder="Seleccione el estado del Gimnasio"
                  value={gymData.estadoId.toString()}
                  onChange={handleGymDataChange}
                  name="estadoId"
                  isDisabled={!isEditing}
                >
                  <option value="1">Activo</option>
                  <option value="2">Inactivo</option>
                </Select>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Imagen del Gimnasio</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange} // Manejar cambio de archivo para convertir a base64
                  disabled={!isEditing}
                />
                {imageFile && (
                  <Avatar size="md" src={imageFile as string} mt={2} />
                )}
              </FormControl>
            </>
          )}

          {isEditing && (
            <Flex mt={6} justify="center">
              <Button
                leftIcon={<FaSave />}
                colorScheme="blue"
                variant="solid"
                onClick={handleSaveChanges}
                isLoading={isSaving}
                loadingText="Guardando"
              >
                Guardar Cambios
              </Button>
            </Flex>
          )}
        </form>

        {!isEditing && (
          <Button
            mt={6}
            leftIcon={<FaEdit />}
            colorScheme="blue"
            variant="solid"
            onClick={handleEdit}
          >
            Editar
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default EditarPerfil;
