import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Input,
  Select,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBars, FaHome, FaLifeRing, FaUser } from "react-icons/fa";
import { useEffect } from "react";
import "../static/css/main.css";

function NavbarMartial() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    if (isDesktop) {
      onClose();
    }
  }, [isDesktop, onClose]);

  return (
    <>
      <Box bg="gray.100" px={4} className="full-width">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box className="text-semi-bold">MartialApps</Box>
          <IconButton
            size="md"
            icon={<FaBars />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={onToggle}
          />
          <Flex alignItems="center">
            <Stack direction="row" spacing={7} display={{ base: "none", md: "flex" }}>
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
                <Button variant="solid" colorScheme="red" className="btn-PopUpLogin">
                  INICIAR SESIÓN
                </Button>
              </Link>
              <FaUser className="NavBar-Nav-icon btn-PopUpLogin" />
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
                <Button variant="solid" colorScheme="red" className="btn-PopUpLogin">
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
            <Select placeholder="Seleccione tipo de inicio de sesión" id="userType" name="userType">
              <option value="usuario">Iniciar sesión como usuario</option>
              <option value="gimnasio">Iniciar sesión como gimnasio</option>
            </Select>
            <Box id="usuarioForm" display="none">
              <Input type="email" placeholder="Correo electrónico" required name="emailUsuario" />
              <Input type="password" placeholder="Contraseña" required name="passwordUsuario" />
            </Box>
            <Box id="gimnasioForm" display="none">
              <Input type="email" placeholder="Correo electrónico" required name="emailGimnasio" />
              <Input type="password" placeholder="Contraseña" required name="passwordGimnasio" />
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
            <Input type="text" placeholder="Provincia, ciudad, distrito..." required />
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
