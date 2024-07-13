import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState, ChangeEvent, FormEvent } from "react";
import apiService from "../services/service";

const Register: React.FC = () => {
  const [userType, setUserType] = useState<string>("");
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({});
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false); // Estado para controlar el loading de los botones

  const handleUserTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            imagen_base64: (reader.result as string).split(",")[1] || "",
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    setError(""); // Clear error message before trying to register

    try {
      console.log("Datos del formulario:", formData);
      if (userType === "Usuario") {
        const newData = {
          ...formData,
          tb_tipo_usuario_id: 2,
          tb_usuario_estado_id: 1,
          tb_nivel_id: 1,
        }; // Asignar el ID del tipo de usuario para usuarios
        await apiService.register(newData);
      } else if (userType === "Gimnasio") {
        await apiService.registerGym(formData);
      }

      toast({
        title: "Registro exitoso",
        description:
          "¡Nos comunicaremos con usted a la brevedad para confirmar el estado de su registro!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });

      navigate("/");
    } catch (error: any) {
      console.error("Error en el registro:", error);
      setError(
        "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
      );
      toast({
        title: "Error",
        description:
          error.response.data.error || "Ha ocurrido un error en el registro",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <Box as="section" width="100%">
      <Container maxW="container.xl" py={8}>
        <Stack direction={{ base: "column", md: "row" }} spacing={8}>
          <Box flex={1} display={{ base: "none", md: "block" }}>
            <Heading as="h2" size="xl" textAlign="center" color="red.500">
              Tu cuenta
            </Heading>
            <Text textAlign="center" fontSize="lg" mt={4}>
              Bienvenido a MartialApps, tu acceso directo a una comunidad de
              gimnasios locales. Descubre, entrena y alcanza tus metas con
              nosotros.
            </Text>
            <Image src="./src/static/img/Devices.png" alt="Devices" mt={4} />
          </Box>
          <Box flex={1}>
            <Box p={8} borderRadius="lg" boxShadow="lg" bg="white">
              <Heading
                as="h4"
                size="md"
                textAlign="center"
                mb={4}
                color="gray.700"
              >
                CREA UNA CUENTA
              </Heading>
              {error && (
                <Text textAlign="center" color="red.500">
                  {error}
                </Text>
              )}
              <form id="registerForm" onSubmit={handleSubmit}>
                <FormControl id="tipoRegistro" mb={4} isRequired>
                  <FormLabel>Registrarse como:</FormLabel>
                  <Select value={userType} onChange={handleUserTypeChange}>
                    <option value="">Selecciona una opción</option>
                    <option value="Gimnasio">Gimnasio</option>
                    <option value="Usuario">Usuario</option>
                  </Select>
                </FormControl>
                {userType && userType === "Usuario" && (
                  <>
                    <FormControl id="dc_nombre" mb={4} isRequired>
                      <FormLabel>Nombre:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Juan"
                        value={formData.dc_nombre || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="dc_apellido" mb={4} isRequired>
                      <FormLabel>Apellido Paterno:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Rodriguez"
                        value={formData.dc_apellido || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="dc_apellido_materno" mb={4} isRequired>
                      <FormLabel>Apellido Materno:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Perez"
                        value={formData.dc_apellido_materno || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="genero" mb={4} isRequired>
                      <FormLabel>Género:</FormLabel>
                      <Select
                        value={formData.genero || ""}
                        onChange={handleInputChange}
                      >
                        <option value="">Selecciona tu género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                      </Select>
                    </FormControl>
                    <FormControl id="fecha_nacimiento" mb={4} isRequired>
                      <FormLabel>Fecha de nacimiento:</FormLabel>
                      <Input
                        type="date"
                        value={formData.fecha_nacimiento || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="dc_correo_electronico" mb={4} isRequired>
                      <FormLabel>Correo:</FormLabel>
                      <Input
                        type="email"
                        placeholder="ejemplo@ejemplo.cl"
                        value={formData.dc_correo_electronico || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="dc_telefono" mb={4} isRequired>
                      <FormLabel>Teléfono:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Teléfono"
                        value={formData.dc_telefono || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="dc_contrasena" mb={4} isRequired>
                      <FormLabel>Contraseña:</FormLabel>
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        value={formData.dc_contrasena || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl
                      id="repetirContrasena"
                      mb={4}
                      isRequired
                      isInvalid={
                        formData.dc_contrasena !== formData.repetirContrasena
                      }
                    >
                      <FormLabel>Repetir contraseña:</FormLabel>
                      <Input
                        type="password"
                        placeholder="Repetir contraseña"
                        value={formData.repetirContrasena || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </>
                )}
                {userType === "Gimnasio" && (
                  <>
                    <FormControl id="nombreGimnasio" mb={4} isRequired>
                      <FormLabel>Nombre del Gimnasio:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Nombre del Gimnasio"
                        value={formData.nombreGimnasio || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="correo" mb={4} isRequired>
                      <FormLabel>Correo del Gimnasio:</FormLabel>
                      <Input
                        type="email"
                        placeholder="ejemplo@ejemplo.cl"
                        value={formData.correo || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="contrasena" mb={4} isRequired>
                      <FormLabel>Contraseña:</FormLabel>
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        value={formData.contrasena || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="repetirContraseña" mb={4} isRequired>
                      <FormLabel>Repetir contraseña:</FormLabel>
                      <Input
                        type="password"
                        placeholder="Repetir contraseña"
                        value={formData.repetirContraseña || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="telefonoGimnasio" mb={4} isRequired>
                      <FormLabel>Teléfono del Gimnasio:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Teléfono del Gimnasio"
                        value={formData.telefonoGimnasio || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="horario" mb={4} isRequired>
                      {" "}
                      {/* Nuevo campo */}
                      <FormLabel>Horario del Gimnasio:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Horario del Gimnasio"
                        value={formData.horario || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="ubicacionGimnasio" mb={4} isRequired>
                      <FormLabel>Ubicación del Gimnasio:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Ubicación del Gimnasio"
                        value={formData.ubicacionGimnasio || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="descripcion" mb={4} isRequired>
                      <FormLabel>Descripción del Gimnasio:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Descripción del Gimnasio"
                        value={formData.descripcion || ""}
                        onChange={handleInputChange}
                        maxLength={250}
                      />
                    </FormControl>
                    <FormControl id="redSocial" mb={4} isRequired>
                      <FormLabel>Red Social del Gimnasio:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Red Social del Gimnasio"
                        value={formData.redSocial || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="imagen" mb={4} isRequired>
                      <FormLabel>Imagen del Gimnasio:</FormLabel>
                      <Input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </FormControl>
                  </>
                )}
                <Text mt={4}>
                  Al registrarte aceptas las{" "}
                  <RouterLink
                    to="#!"
                    style={{
                      display: "inline-block",
                      marginLeft: "4px",
                      color: "blue.500",
                    }}
                  >
                    condiciones de uso y la Política de Privacidad
                  </RouterLink>
                </Text>
                <Button
                  isLoading={loading}
                  id="btnRegistro"
                  colorScheme="red"
                  size="lg"
                  mt={4}
                  type="submit"
                  width="full"
                >
                  CREAR CUENTA
                </Button>
                <Text textAlign="center" mt={4}>
                  <RouterLink to="/login">Ya tengo una cuenta</RouterLink>
                </Text>
              </form>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Register;
