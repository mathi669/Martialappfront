import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Stack,
  Image,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaBars,
  FaHome,
  FaInfoCircle,
  FaDumbbell,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import logo from "../static/img/MartialApps.png";

function NavbarMartial() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isDesktop) {
      onClose();
    }
  }, [isDesktop, onClose]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const userType = localStorage.getItem("userType");
    if (storedUser && userType) {
      setUser(JSON.parse(storedUser));
      setUserType(userType);
    }
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/home");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <Box bg="gray.100" px={4} className="full-width">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link to="/">
          <Image src={logo} alt="MartialApps Logo" boxSize="77px" />
        </Link>
        <Flex alignItems="center" ml="auto">
          <IconButton
            size="md"
            icon={<FaBars />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={onToggle}
          />
          <Stack
            direction="row"
            spacing={4}
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            ml={4} // Añade margen a la izquierda para separarlo del borde
          >
            <Link to="/">
              <Button leftIcon={<FaHome />} variant="link">
                INICIO
              </Button>
            </Link>
            {!user ? (
              <Link to="/about">
                <Button leftIcon={<FaInfoCircle />} variant="link">
                  ACERCA DE NOSOTROS
                </Button>
              </Link>
            ) : null}
            <Link to="/buscargimnasio">
              <Button leftIcon={<FaDumbbell />} variant="link">
                GIMNASIOS
              </Button>
            </Link>
            {!user ? (
              <Link to="/registro">
                <Button leftIcon={<FaUserPlus />} variant="link">
                  REGÍSTRATE
                </Button>
              </Link>
            ) : null}
            {user && userType === "gimnasio" ? (
              <Link to="/createClass">
                <Button leftIcon={<FaDumbbell />} variant="link">
                  ADMINISTRADOR DE CLASES
                </Button>
              </Link>
            ) : null}
            <Flex alignItems="center" mt={-2}>
              {user ? (
                <>
                  <Button
                    variant="solid"
                    colorScheme="red"
                    className="btn-PopUpLogin"
                    onClick={handleLogout}
                    leftIcon={<FaSignOutAlt />}
                  >
                    CERRAR SESIÓN
                  </Button>
                  <Box ml={4}>
                    <Link to="/profile" className="profileButton">
                      <FaUser className="NavBar-Nav-icon btn-PopUpLogin" />
                    </Link>
                  </Box>
                </>
              ) : (
                <Link to="/login">
                  <Button
                    variant="solid"
                    colorScheme="red"
                    className="btn-PopUpLogin"
                    leftIcon={<FaSignInAlt />}
                  >
                    INICIAR SESIÓN
                  </Button>
                </Link>
              )}
            </Flex>
          </Stack>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} textAlign="center"> {/* Alinea el contenido al centro */}
          <Stack as={"nav"} spacing={4} align="center"> {/* Alinea el Stack al centro */}
            <Link to="/">
              <Button leftIcon={<FaHome />} variant="link">
                INICIO
              </Button>
            </Link>
            {!user ? (
              <Link to="/about">
                <Button leftIcon={<FaInfoCircle />} variant="link">
                  ACERCA DE NOSOTROS
                </Button>
              </Link>
            ) : null}
            <Link to="/buscargimnasio">
              <Button leftIcon={<FaDumbbell />} variant="link">
                GIMNASIOS
              </Button>
            </Link>
            {!user ? (
              <Link to="/registro">
                <Button leftIcon={<FaUserPlus />} variant="link">
                  REGÍSTRATE
                </Button>
              </Link>
            ) : null}
            {user && userType === "gimnasio" ? (
              <Link to="/createClass">
                <Button leftIcon={<FaDumbbell />} variant="link">
                  CREAR CLASE
                </Button>
              </Link>
            ) : null}
            {user ? (
              <>
                <Text>Bienvenido, {user?.dc_nombre}</Text>
                <Button
                  variant="solid"
                  colorScheme="red"
                  className="btn-PopUpLogin"
                  onClick={handleLogout}
                  leftIcon={<FaSignOutAlt />}
                >
                  CERRAR SESIÓN
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button
                  variant="solid"
                  colorScheme="red"
                  className="btn-PopUpLogin"
                  leftIcon={<FaSignInAlt />}
                >
                  INICIAR SESIÓN
                </Button>
              </Link>
            )}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}

export default NavbarMartial;
