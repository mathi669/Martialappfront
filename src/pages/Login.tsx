import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import "../static/css/main.css";
import apiService from "../services/service";

const Login: React.FC = () => {
  const [userType, setUserType] = useState<string>("");
  const [dc_correo_electronico, setEmail] = useState<string>("");
  const [dc_contrasena, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast(); // Crear una instancia de toast

  const handleUserTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setisLoading(true);

    if (userType === "") {
      toast({
        title: "Tipo de usuario no seleccionado.",
        description: "Por favor, seleccione un tipo de usuario.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setisLoading(false);
      return;
    }

    try {
      const response = await apiService.loginUser(
        userType,
        dc_correo_electronico,
        dc_contrasena
      );
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("userType", userType);
        toast({
          title: "Inicio de sesión exitoso.",
          description: `Bienvenido, ${
            response.user.dc_nombre ?? response.user.nombre
          }.`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        navigate("/", { state: { user: response.user } });
      } else {
        toast({
          title: "Error en el inicio de sesión.",
          description:
            response.message ||
            "Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error en el inicio de sesión.",
        description: err?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setisLoading(false);
    }
  };


  return (
    <Box
      className="full-width section"
      bg="gray.50"
      minH="100vh"
      py={12}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box maxW="md" mx="auto" bg="white" p={6} rounded="md" shadow="md">
        <Stack spacing={4}>
          <Heading as="h4" size="lg" textAlign="center" color="gray.700">
            INICIAR SESIÓN
          </Heading>
          <form id="loginForm" onSubmit={handleSubmit}>
            <FormControl id="userType" isRequired>
              <FormLabel>Seleccione tipo de inicio de sesión</FormLabel>
              <Select
                placeholder="Seleccione tipo de inicio de sesión"
                value={userType}
                onChange={handleUserTypeChange}
              >
                <option value="usuario">Iniciar sesión como usuario</option>
                <option value="gimnasio">Iniciar sesión como gimnasio</option>
                <option value="administrador">
                  Iniciar sesión como Administrador
                </option>
              </Select>
            </FormControl>

            {userType && (
              <>
                <FormControl id="email" isRequired>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={dc_correo_electronico}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired mt={4}>
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      value={dc_contrasena}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement h="full">
                      <Button
                        variant="ghost"
                        onClick={() => setShowPassword((show) => !show)}
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </>
            )}

            <Button
              type="submit"
              colorScheme="red"
              size="lg"
              mt={6}
              width="full"
              isLoading={isLoading}
              loadingText="Verificando"
            >
              INICIAR SESIÓN
            </Button>
          </form>
          <Box textAlign="left" color="gray.600">
            <Link to="#!">No recuerdo mi contraseña</Link>
          </Box>
          <Box textAlign="center" color="gray.600">
            <Link to="/registro">Si eres nuevo ¡Crea una cuenta!</Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
