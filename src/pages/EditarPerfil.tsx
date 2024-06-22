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
} from "@chakra-ui/react";
import { FaSignOutAlt, FaSave, FaKey } from "react-icons/fa";
import { User } from "../interfaces/user_interface";
import apiService from "../services/service";

const EditarPerfil: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();

  // Estado para los campos del gimnasio en un solo objeto
  const [gymData, setGymData] = useState({
    nombreGimnasio: "",
    telefonoGimnasio: "",
    ubicacionGimnasio: "",
    horario: "",
    descripcion: "",
    imagen_url: "",
    estadoId: 2,
    fechaIngreso: "",
  });

  // Estado para los campos del usuario
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const userTypeData = localStorage.getItem("userType");

    if (userData) {
      const parsedUser: User = JSON.parse(userData);
      setUser(parsedUser);
      setUserName(parsedUser.dc_nombre);
      setUserPhone(parsedUser.dc_telefono);

      if (userTypeData === "gimnasio") {
        setUserType(userTypeData);
        setGymData({
          nombreGimnasio: parsedUser.dc_nombre,
          telefonoGimnasio: parsedUser.dc_telefono,
          ubicacionGimnasio: parsedUser.dc_ubicacion || "",
          horario: parsedUser.dc_horario || "",
          descripcion: parsedUser.dc_descripcion || "",
          imagen_url: parsedUser.dc_imagen_url || "",
          estadoId: parsedUser.tb_gimnasio_estado_id || 2,
          fechaIngreso: parsedUser.df_fecha_ingreso || "",
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

    if (userType === "gimnasio" && user) {
      const dataToUpdate = {
        id: user?.id,
        dc_nombre: gymData.nombreGimnasio,
        dc_correo_electronico: user?.dc_correo_electronico,
        dc_contrasena: newPassword || undefined,
        dc_telefono: gymData.telefonoGimnasio,
        dc_ubicacion: gymData.ubicacionGimnasio,
        dc_horario: gymData.horario,
        dc_descripcion: gymData.descripcion,
        dc_imagen_url: gymData.imagen_url,
        tb_gimnasio_estado_id: gymData.estadoId,
      };
      await apiService.updateGym(dataToUpdate);
    } else {
      // const dataToUpdate = {
      //   id: user?.id,
      //   dc_nombre: userName,
      //   dc_correo_electronico: user?.dc_correo_electronico,
      //   dc_contrasena: newPassword || undefined, // Solo incluir la contraseña si se ha cambiado
      //   dc_telefono: userPhone,
      //   // Otros campos necesarios para actualizar el usuario
      // };
      // await apiService.updateUser(dataToUpdate);
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
    onClose();
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
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Apellido</FormLabel>
                  <Input type="text" placeholder="Apellido" />
                </FormControl>
              </Flex>
              <Flex mb={4} justify="space-between" gap={6}>
                <FormControl>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input
                    type="email"
                    defaultValue={user?.dc_correo_electronico}
                    disabled
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    type="text"
                    placeholder="Número telefónico"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                  />
                </FormControl>
              </Flex>
              <Flex mb={4} justify="space-between" gap={6}>
                <FormControl>
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <Input type="date" />
                </FormControl>
                <FormControl>
                  <FormLabel>Género</FormLabel>
                  <Select placeholder="Seleccione género">
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </Select>
                </FormControl>
              </Flex>
              <FormControl mb={4}>
                <FormLabel>Dirección</FormLabel>
                <Input type="text" placeholder="Dirección" />
              </FormControl>
              <FormControl mb={6}>
                <FormLabel>Foto de perfil</FormLabel>
                <Input type="file" />
              </FormControl>
            </>
          )}

          <Button
            colorScheme="blue"
            leftIcon={<FaKey />}
            onClick={onOpen}
            mb={6}
          >
            Cambiar Contraseña
          </Button>

          {user && userType === "gimnasio" ? (
            <>
              <Text fontSize="lg" fontWeight="bold" mb={2} mt={6}>
                Información del Gimnasio
              </Text>
              <FormControl mb={4}>
                <FormLabel>Nombre del Gimnasio</FormLabel>
                <Input
                  type="text"
                  placeholder="Nombre del gimnasio"
                  name="nombreGimnasio"
                  value={gymData.nombreGimnasio}
                  onChange={handleGymDataChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Teléfono del Gimnasio</FormLabel>
                <Input
                  type="text"
                  placeholder="Teléfono del gimnasio"
                  name="telefonoGimnasio"
                  value={gymData.telefonoGimnasio}
                  onChange={handleGymDataChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Ubicación del Gimnasio</FormLabel>
                <Input
                  type="text"
                  placeholder="Ubicación del gimnasio"
                  name="ubicacionGimnasio"
                  value={gymData.ubicacionGimnasio}
                  onChange={handleGymDataChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Horario del Gimnasio</FormLabel>
                <Input
                  type="text"
                  placeholder="Horario del gimnasio"
                  name="horario"
                  value={gymData.horario}
                  onChange={handleGymDataChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Fecha de Ingreso al Gimnasio</FormLabel>
                <Input
                  type="date"
                  name="fechaIngreso"
                  value={gymData.fechaIngreso}
                  onChange={handleGymDataChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Descripción del Gimnasio</FormLabel>
                <Textarea
                  placeholder="Descripción del gimnasio"
                  name="descripcion"
                  value={gymData.descripcion}
                  onChange={handleGymDataChange}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>URL de la Imagen del Gimnasio</FormLabel>
                <Input
                  type="text"
                  placeholder="URL de la imagen del gimnasio"
                  name="imagen_url"
                  value={gymData.imagen_url}
                  onChange={handleGymDataChange}
                />
              </FormControl>
              <FormControl mb={6}>
                <FormLabel>Foto de perfil</FormLabel>
                <Input type="file" />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Estado del Gimnasio</FormLabel>
                <Select
                  name="estadoId"
                  value={gymData.estadoId}
                  onChange={handleGymDataChange}
                >
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </Select>
              </FormControl>
            </>
          ) : null}

          {user && userType !== "gimnasio" && (
            <>
              <Text fontSize="lg" fontWeight="bold" mb={2} mt={6}>
                Información de Contacto de Emergencia
              </Text>
              <Flex mb={4} justify="space-between" gap={6}>
                <FormControl>
                  <FormLabel>Nombre</FormLabel>
                  <Input type="text" placeholder="Nombre" />
                </FormControl>
                <FormControl>
                  <FormLabel>Apellido</FormLabel>
                  <Input type="text" placeholder="Apellido" />
                </FormControl>
              </Flex>
              <FormControl mb={6}>
                <FormLabel>Relación con el Usuario</FormLabel>
                <Input type="text" placeholder="Relación con el Usuario" />
              </FormControl>
              <FormControl mb={6}>
                <FormLabel>Número telefónico</FormLabel>
                <Input type="text" placeholder="Número telefónico" />
              </FormControl>
            </>
          )}

          <Flex justify="space-between">
            <Button
              colorScheme="blackAlpha"
              leftIcon={<FaSave />}
              onClick={handleSaveChanges}
            >
              Guardar cambios
            </Button>
          </Flex>
        </form>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cambiar Contraseña</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Contraseña Nueva</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Repetir Contraseña Nueva</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveChanges}>
              Cambiar Contraseña
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default EditarPerfil;
