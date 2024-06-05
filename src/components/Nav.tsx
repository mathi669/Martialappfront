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
  FaLifeRing,
  FaUser,
  FaSignOutAlt,
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
  }, [localStorage.getItem("user")]);

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
        <Link to={"/"}>
          <Image src={logo} alt="MartialApps Logo" boxSize="77px" />
        </Link>
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
            {!user ? (
              <Link to="/about">
                <Button leftIcon={<FaLifeRing />} variant="link">
                  ACERCA DE NOSOTROS
                </Button>
              </Link>
            ) : (
              <></>
            )}
            {!user ? (
              <Link to="/registro">
                <Button leftIcon={<FaLifeRing />} variant="link">
                  REGÍSTRATE
                </Button>
              </Link>
            ) : (
              <></>
            )}

            {user && userType === "gimnasio" ? (
              <Link to="/createClass">
                <Button leftIcon={<FaLifeRing />} variant="link">
                  ADMINISTRADOR DE CLASES
                </Button>
              </Link>
            ) : (
              <></>
            )}
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
        <Box pb={4}>
          <Stack as={"nav"} spacing={4}>
            <Link to="/">
              <Button leftIcon={<FaHome />} variant="link">
                INICIO
              </Button>
            </Link>
            {!user ? (
              <Link to="/about">
                <Button leftIcon={<FaLifeRing />} variant="link">
                  ACERCA DE NOSOTROS
                </Button>
              </Link>
            ) : (
              <></>
            )}
            {!user ? (
              <Link to="/registro">
                <Button leftIcon={<FaLifeRing />} variant="link">
                  REGÍSTRATE
                </Button>
              </Link>
            ) : (
              <></>
            )}
            {user && userType === '"gimnasio"' ? (
              <Link to="/createClass">
                <Button leftIcon={<FaLifeRing />} variant="link">
                  CREAR CLASE
                </Button>
              </Link>
            ) : (
              <></>
            )}
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
