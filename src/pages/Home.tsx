import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { FaFlagCheckered, FaGamepad, FaMoneyBillWave } from "react-icons/fa";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";

function Home() {
  const userType = localStorage.getItem("userType");

  return (
    <>
      {!localStorage.getItem("user") ? (
        <Box>
          <Flex
            w="full"
            h={{ base: "200px", md: "400px" }} // Añade una altura mínima
            bgImage="url('./src/static/img/header-index 2.png')"
            bgSize="cover"
            bgPosition="center"
            direction="column"
            align="center"
            color="white"
            p={8}
          >
            <Text fontSize="2xl" textAlign="center">
              Bienvenido
            </Text>
            <Text fontSize="xl" textAlign="center">
              Para la búsqueda de gimnasios de artes marciales…
            </Text>
          </Flex>
          <Box p={8}>
            <Flex
              direction={{ base: "column", md: "row" }}
              align="center"
              justify="center"
            >
              {/* Sección existente */}
              <Box
                flex="1"
                textAlign="center"
                mb={{ base: 4, md: 0 }}
                mr={{ md: 4 }}
              >
                <Icon
                  as={FaFlagCheckered}
                  w={16}
                  h={16}
                  mb={2}
                  color="green.500"
                />
                <Text>
                  Olvídate del miedo a equivocarte y lánzate a por lo que
                  quieres. Ya no importa lo que tienes, sino lo que puedes
                  llegar a hacer.
                </Text>
              </Box>
              {/* Sección existente */}
              <Box
                flex="1"
                textAlign="center"
                mb={{ base: 4, md: 0 }}
                mr={{ md: 4 }}
              >
                <Icon as={FaGamepad} w={16} h={16} mb={2} color="green.500" />
                <Text>
                  Disfruta hasta de tus cambios de opinión y vive todas las
                  oportunidades que quieras, sin complejos.
                </Text>
              </Box>
              {/* Sección existente */}
              <Box flex="1" textAlign="center">
                <Icon
                  as={FaMoneyBillWave}
                  w={16}
                  h={16}
                  mb={2}
                  color="green.500"
                />
                <Text>
                  Consigue los mejores gimnasios más cerca de ti de la forma más
                  rápida y cómoda que existe.
                </Text>
              </Box>
            </Flex>
          </Box>
          {/* Nuevas secciones */}
          <Box p={8}>
            <Text fontSize="xl" textAlign="center" mb={4}>
              Recursos adicionales sobre artes marciales:
            </Text>
            <Flex
              direction={{ base: "column", md: "row" }}
              align="center"
              justify="center"
            >
              {/* Puedes agregar aquí tus nuevas secciones */}
              {/* Por ejemplo: */}
              <Box
                flex="1"
                textAlign="center"
                mb={{ base: 4, md: 0 }}
                mr={{ md: 4 }}
              >
                <Text fontWeight="bold">Consejos de entrenamiento:</Text>
                <Text>
                  Descubre consejos útiles para mejorar tu técnica y rendimiento en las artes marciales.
                </Text>
              </Box>
              {/* Aquí puedes agregar más secciones similares */}
            </Flex>
          </Box>
        </Box>
      ) : (
        <Box>{userType === "administrador" ? <AdminHome /> : <UserHome />}</Box>
      )}
    </>
  );
}

export default Home;
