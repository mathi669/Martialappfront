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

    try {
      if (userType === "Usuario") {
        await apiService.register(formData);
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
      });

      navigate("/");
    } catch (error) {
      console.error("Error en el registro:", error);
      setError(
        "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
      );
      toast({
        title: "Error",
        description: error.message || "Ha ocurrido un error en el registro",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
