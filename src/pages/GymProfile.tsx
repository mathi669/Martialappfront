import { Link } from "react-router-dom";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";

const GymProfile = () => {
  return (
    <VStack className="full-width section" align="stretch" spacing="4">
      <Box className="container">
        <Box className="row" alignItems="flex-start">
          <Box className="col-xs-12 col-sm-4 col-md-3">
            <Button
              className="btn btn-default btn-block visible-xs btn-dropdown-container"
              data-drop-cont=".user-menu-xs"
            >
              <i className="fa fa-user fa-fw" aria-hidden="true"></i> MOSTRAR
              MENÚ <i className="fa fa-sort pull-right" aria-hidden="true"></i>
            </Button>
            <VStack className="full-width post-user-info" spacing="4">
              <img
                src="./src/static/img/user.png"
                className="NavBar-Nav-icon"
                alt="User"
              />
              <Text>
                <small id="nombreGimnasio"></small>
              </Text>
              <VStack className="full-width div-table" spacing="4">
                <Box className="div-table-row">
                  <Box
                    className="div-table-cell div-table-cell-xs"
                    id="ubicacionGimnasio"
                  >
                    Ubicación <br />
                    <small>Ciudad, País</small>
                  </Box>
                  <Box
                    className="div-table-cell div-table-cell-xs"
                    id="telefonoGimnasio"
                  >
                    Teléfono <br />
                    <small>Número de contacto</small>
                  </Box>
                </Box>
              </VStack>
              <VStack
                className="full-width list-group"
                borderRadius="0"
                spacing="4"
              >
                <Text className="list-group-item text-center">
                  <small>Desde Fecha de Registro</small>
                </Text>
                <Link to="/profile">
                  <Button className="list-group-item active">
                    <i className="fa fa-user fa-fw" aria-hidden="true"></i> TU
                    PERFIL
                  </Button>
                </Link>
                <Link to="/adminPage">
                  <Button className="list-group-item">
                    <i className="fa fa-cogs fa-fw" aria-hidden="true"></i>{" "}
                    CONFIGURACIÓN
                  </Button>
                </Link>
              </VStack>
            </VStack>
          </Box>
          <Box className="col-xs-12 col-sm-8 col-md-9">
            <Box className="full-width bar-info-user" py="2" px="4">
              <i className="fa fa-user fa-fw" aria-hidden="true"></i>
              <Text>TU PERFIL</Text>
            </Box>
            {/* Contenido*/}
            <Box
              className="full-width"
              p="4"
              border="1px solid #E1E1E1"
              borderRadius="md"
            >
              <form action="">
                <Text className="text-muted text-center">
                  Seleccione una imagen
                </Text>
                <Box className="form-group">
                  <Box className="custom-input-file">
                    <Button as="label" htmlFor="fileInput">
                      <Input type="file" id="fileInput" display="none" />
                      <i className="fa fa-picture-o" aria-hidden="true"></i>
                    </Button>
                  </Box>
                  <Text className="text-muted text-center archivo">
                    Archivo...
                  </Text>
                </Box>
                <Box className="form-group">
                  <Text>Nombre del Gimnasio</Text>
                  <Input
                    type="text"
                    placeholder="Nombre del Gimnasio"
                    className="form-control"
                  />
                </Box>
                <Box className="form-group">
                  <Text>
                    Teléfono <small></small>
                  </Text>
                  <Input
                    type="text"
                    placeholder="¿Cuál es tu teléfono?"
                    className="form-control"
                  />
                </Box>
                <Box className="form-group">
                  <Text>
                    Ubicación <small>¿Cuál es tu ubicación?</small>
                  </Text>
                  <Input
                    type="text"
                    placeholder="Ubicación"
                    className="form-control"
                  />
                </Box>
                <Box className="form-group">
                  <Text>Correo electrónico</Text>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                  />
                </Box>
                <Box className="form-group">
                  <Text>Contraseña</Text>
                  <Button
                    ref="#!"
                    className="btn btn-default btn-xs pull-right btn-dropdown-container"
                    data-drop-cont=".perfil-password"
                  >
                    Mostrar/Ocultar{" "}
                    <i className="fa fa-sort" aria-hidden="true"></i>
                  </Button>
                  <VStack className="full-width perfil-password" spacing="4">
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      className="form-control"
                    />
                    <Input
                      type="password"
                      placeholder="Nueva Contraseña"
                      className="form-control"
                    />
                    <Input
                      type="password"
                      placeholder="Confirmar Contraseña"
                      className="form-control"
                    />
                  </VStack>
                </Box>
                <Text className="text-center">
                  <Button colorScheme="red">GUARDAR</Button>
                </Text>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </VStack>
  );
};

export default GymProfile;
