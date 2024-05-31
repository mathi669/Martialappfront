import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Input,
  Select,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBars, FaHome, FaLifeRing, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

function NavbarMartial() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      onClose();
    }
  }, [isDesktop, onClose]);

  const handleLogout = () => {
    axios.post("http://127.0.0.1:5000/logout")
      .then((res) => {
        if (res.data.success) {
          // Eliminar cualquier token de autenticación almacenado (si lo hay)
          localStorage.removeItem('token');
          
          setIsLoggedIn(false); // Actualiza el estado de autenticación del usuario
          // También podrías redirigir al usuario a la página de inicio o a donde desees
        } else {
          console.error("Error al cerrar sesión:", res.data.error);
        }
      })
      .catch((err) => {
        console.error("Error al cerrar sesión:", err);
      });
  };

  return (
    <>
      <Box bg="gray.100" px={2} className="full-width">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box className="text-semi-bold">MartialApps</Box>
          <IconButton
            size="md"
            icon={<FaBars />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={onToggle}
          />
          <Flex alignItems="center" mt={2}>
            <Stack
              direction="row"
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Link to="/">
                <Button leftIcon={<FaHome />} variant="link">
                  INICIO
                </Button>
              </Link>
              <Link to="/about">
                <Button leftIcon={<FaLifeRing />} variant="link">
                  ACERCA DE NOSOTROS
                </Button>
              </Link>
              <Link to="/registro">
                <Button leftIcon={<FaLifeRing />} variant="link">
                  REGISTRATE
                </Button>
              </Link>
              <Link to="/createClass">
                <Button leftIcon={<FaLifeRing />} variant="link">
                  CREAR CLASE
                </Button>
              </Link>
              <Spacer />
              <Flex alignItems="center" mt={-2}>
                {isLoggedIn ? (
                  <Button variant="solid" colorScheme="red" className="btn-PopUpLogin" onClick={handleLogout}>
                    CERRAR SESIÓN
                  </Button>
                ):(

                  <Link to="/login">
                    <Button
                      variant="solid"
                      colorScheme="red"
                      className="btn-PopUpLogin"
                    >
                      INICIAR SESIÓN
                    </Button>
                  </Link>
                )}
                <Link to="/login">
                  <FaUser className="NavBar-Nav-icon btn-PopUpLogin" />
                </Link>
              </Flex>
            </Stack>
          </Flex>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Box pb={4}>
            <Stack as={"nav"} spacing={4}>
              <Link to="/">
                <Button leftIcon={<FaHome />} variant="link">
                  INICIO
                </Button>
              </Link>
              <Link to="/about">
                <Button leftIcon={<FaLifeRing />} variant="link">
                  ACERCA DE NOSOTROS
                </Button>
              </Link>
              <Link to="/registro">
                <Button leftIcon={<FaLifeRing />} variant="link">
                  REGISTRATE
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="solid"
                  colorScheme="red"
                  className="btn-PopUpLogin"
                >
                  INICIAR SESIÓN
                </Button>
              </Link>
            </Stack>
          </Box>
        </Collapse>
      </Box>
      <Box className="full-width PopUpLogin">
        <Stack spacing={4} p={4}>
          <Text fontSize="xl" textAlign="center">
            ¡Bienvenido!
          </Text>
          <form action="login.html">
            <Select
              placeholder="Seleccione tipo de inicio de sesión"
              id="userType"
              name="userType"
            >
              <option value="usuario">Iniciar sesión como usuario</option>
              <option value="gimnasio">Iniciar sesión como gimnasio</option>
            </Select>
            <Box id="usuarioForm" display="none">
              <Input
                type="email"
                placeholder="Correo electrónico"
                required
                name="emailUsuario"
              />
              <Input
                type="password"
                placeholder="Contraseña"
                required
                name="passwordUsuario"
              />
            </Box>
            <Box id="gimnasioForm" display="none">
              <Input
                type="email"
                placeholder="Correo electrónico"
                required
                name="emailGimnasio"
              />
              <Input
                type="password"
                placeholder="Contraseña"
                required
                name="passwordGimnasio"
              />
            </Box>
            <Link to="#!" className="text-left text-light">
              No recuerdo mi contraseña
            </Link>
            <Stack direction="row" align="center">
              <input type="checkbox" />
              <Text>No cerrar sesión</Text>
            </Stack>
            <Button type="submit" colorScheme="red" size="lg">
              INICIAR SESIÓN
            </Button>
          </form>
          <Box className="full-width divider" />
          <Text textAlign="center">¿Aún no tienes cuenta?</Text>
          <Link to="newaccount.html" className="text-light">
            CRÉATE UNA GRATIS
          </Link>
        </Stack>
      </Box>
      <Box className="full-width hidden-md hidden-lg Search-mobile">
        <form action="commercial.html" style={{ paddingTop: "15px" }}>
          <Stack spacing={4}>
            <Input type="text" placeholder="Estoy buscando..." required />
            <Input
              type="text"
              placeholder="Provincia, ciudad, distrito..."
              required
            />
            <Button type="submit" colorScheme="red" size="lg">
              BUSCAR
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default NavbarMartial;
