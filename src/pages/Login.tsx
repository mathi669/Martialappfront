import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
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
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import "../static/css/main.css";

const Login: React.FC = () => {
  const [userType, setUserType] = useState<string>("");
  const [dc_correo_electronico, setEmail] = useState<string>("");
  const [dc_contrasena, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleUserTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // Limpiar el mensaje de error al intentar iniciar sesión

    if (userType === "usuario") {
      loginUser("sp_AuthUser");
    } else if (userType === "gimnasio") {
      loginUser("sp_AuthGym");
    } else {
      setError("Por favor, seleccione un tipo de usuario.");
    }
  };

  const loginUser = (procedure: string) => {
    axios
      //.post("https://forthcoming-gwyneth-martialapps-61e88a95.koyeb.app/login", {
      .post("http://127.0.0.1:5000/login", {
        user_type: userType,
        dc_correo_electronico,
        dc_contrasena,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          navigate("/");
        } else {
          setError(
            "Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo."
          );
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setError("Credenciales inválidas. Por favor, inténtelo de nuevo.");
        } else {
          setError(
            "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
          );
        }
      });
  };

  const isDesktop = useBreakpointValue({ base: false, md: true });

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
      <Box
        maxW="md"
        mx="auto"
        bg="white"
        p={6}
        rounded="md"
        shadow="md"
      >
        <Stack spacing={4}>
          <Heading as="h4" size="lg" textAlign="center" color="gray.700">
            INICIAR SESIÓN
          </Heading>
          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
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
              </Select>
            </FormControl>

            {userType === "usuario" && (
              <>
                <FormControl id="emailUsuario" isRequired>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={dc_correo_electronico}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="passwordUsuario" isRequired mt={4}>
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

            {userType === "gimnasio" && (
              <>
                <FormControl id="emailGimnasio" isRequired>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={dc_correo_electronico}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="passwordGimnasio" isRequired mt={4}>
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
