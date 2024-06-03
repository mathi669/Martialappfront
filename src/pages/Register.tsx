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
import axios from "axios";
const Register: React.FC = () => {
  const [userType, setUserType] = useState<string>("");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const toast = useToast();

  const handleUserTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // Clear error message before trying to register

    if (userType === "Usuario") {
      const registrationData = {
        dc_correo_electronico: formData.correo,
        dc_contrasena: formData.contrasena,
        dc_nombre: formData.nombre,
        dc_apellido: formData.nombre + " " + formData.nombre,
        dc_telefono: formData.telefono || "",
        tb_nivel_artes_marciales_id: formData.nivel_artes_marciales_id || "1",
        tb_tipo_usuario_id: "2", // Usuario
        tb_usuario_estado_id: "1",
        tb_nivel_id: formData.nivel_id || "1",
        tb_contacto_emergencia_id: formData.contacto_emergencia_id || "1",
        es_gimnasio: false,
      };

      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/register",
          registrationData
        );
        console.log(res);
        // Send confirmation email
        //await axios.post("http://127.0.0.1:5000/send_email", { dc_correo_electronico: formData.correo });
        navigate("/");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response && err.response.data.error) {
            setError(err.response.data.error);
          } else {
            setError(
              "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
            );
          }
        } else {
          setError(
            "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
          );
        }
        toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else if (userType === "Gimnasio") {
      const registrationData = {
        dc_nombre: formData.nombreGimnasio,
        dc_correo_electronico: formData.correo,
        dc_telefono: formData.telefonoGimnasio,
        dc_ubicacion: formData.ubicacionGimnasio,
        dc_horario: "09:00-21:00", // Example horario, adjust as needed
        tb_gimnasio_estado_id: "1",
        image: formData.image, // Ensure you handle the image upload in the backend
        dc_contrasena: formData.contrasena,
      };

      try {
        const res = await axios.post(
          "http://127.0.0.1:5000/createGym",
          registrationData
        );
        console.log(res);
        // Send confirmation email
        //await axios.post("http://127.0.0.1:5000/send_email", { dc_correo_electronico: formData.correo });
        navigate("/");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response && err.response.data.error) {
            setError(err.response.data.error);
          } else {
            setError(
              "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
            );
          }
        } else {
          setError(
            "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
          );
        }
        toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
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
                    <FormControl id="nombre" mb={4} isRequired>
                      <FormLabel>Nombre:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Juan"
                        value={formData.nombre || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="apellidoPaterno" mb={4} isRequired>
                      <FormLabel>Apellido Paterno:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Rodriguez"
                        value={formData.apellidoPaterno || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="apellidoMaterno" mb={4} isRequired>
                      <FormLabel>Apellido Materno:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Perez"
                        value={formData.apellidoMaterno || ""}
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
                    <FormControl id="fechaNacimiento" mb={4} isRequired>
                      <FormLabel>Fecha de nacimiento:</FormLabel>
                      <Input
                        type="date"
                        value={formData.fechaNacimiento || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl id="correo" mb={4} isRequired>
                      <FormLabel>Correo:</FormLabel>
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
                    <FormControl id="telefonoGimnasio" mb={4} isRequired>
                      <FormLabel>Teléfono del Gimnasio:</FormLabel>
                      <Input
                        type="text"
                        placeholder="Teléfono del Gimnasio"
                        value={formData.telefonoGimnasio || ""}
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
                    <FormControl id="imagen_url" mb={4}>
                      <FormLabel>Imagen URL</FormLabel>
                      <Input
                        name="imagen_url"
                        value={formData.imagen_url}
                        onChange={handleInputChange}
                        placeholder="Ingrese la URL de la imagen"
                      />
                    </FormControl>
                  </>
                )}
                <Text mt={4}>
                  Al registrarte aceptas las
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
