import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const Register: React.FC = () => {
  const [userType, setUserType] = useState<string>("");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleUserTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // Clear error message before trying to register

    const registrationData = {
      dc_correo_electronico: formData.correo,
      contrasena: formData.contrasena,
      nombre: formData.nombre,
      apellido: formData.apellidoPaterno + " " + formData.apellidoMaterno,
      telefono: formData.telefono || "",
      nivel_artes_marciales_id: formData.nivel_artes_marciales_id || "1",
      tipo_usuario_id: userType === "Usuario" ? "2" : "3",
      usuario_estado_id: "1",
      nivel_id: formData.nivel_id || "1",
      contacto_emergencia_id: formData.contacto_emergencia_id || "1",
      es_gimnasio: userType === "Gimnasio",
    };

    axios
      .post("http://127.0.0.1:5000/register", registrationData)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError(
            "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
          );
        }
      });
  };

  return (
    <Box mt={8} mb={8}>
      <Box p={4} maxW="600px" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h2" mb={4} textAlign="center" color="red.500">
          Tu cuenta
        </Heading>
        <Text mb={4} textAlign="center">
          Bienvenido a MartialApps, tu acceso directo a una comunidad de
          gimnasios locales. Descubre, entrena y alcanza tus metas con nosotros.
        </Text>
        <form onSubmit={handleSubmit}>
          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
          <FormControl mb={4}>
            <FormLabel htmlFor="tipoRegistro">Registrarse como:</FormLabel>
            <Select
              id="tipoRegistro"
              value={userType}
              onChange={handleUserTypeChange}
              placeholder="Selecciona una opción"
              required
            >
              <option value="Gimnasio">Gimnasio</option>
              <option value="Usuario">Usuario</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="fechaNacimiento">
              Fecha de nacimiento:
            </FormLabel>
            <Input
              type="date"
              id="fechaNacimiento"
              value={formData.fechaNacimiento || ""}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="correo">Correo:</FormLabel>
            <Input
              type="email"
              id="correo"
              placeholder="ejemplo@ejemplo.cl"
              value={formData.correo || ""}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="contrasena">Contraseña:</FormLabel>
            <Input
              type="password"
              id="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena || ""}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="repetirContraseña">
              Repetir contraseña:
            </FormLabel>
            <Input
              type="password"
              id="repetirContraseña"
              placeholder="Repetir contraseña"
              value={formData.repetirContraseña || ""}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          {userType === "Gimnasio" && (
            <>
              <FormControl mb={4}>
                <FormLabel htmlFor="nombreGimnasio">
                  Nombre del Gimnasio:
                </FormLabel>
                <Input
                  type="text"
                  id="nombreGimnasio"
                  placeholder="Nombre del Gimnasio"
                  value={formData.nombreGimnasio || ""}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="telefonoGimnasio">
                  Teléfono del Gimnasio:
                </FormLabel>
                <Input
                  type="text"
                  id="telefonoGimnasio"
                  placeholder="Teléfono del Gimnasio"
                  value={formData.telefonoGimnasio || ""}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor="ubicacionGimnasio">
                  Ubicación del Gimnasio:
                </FormLabel>
                <Input
                  type="text"
                  id="ubicacionGimnasio"
                  placeholder="Ubicación del Gimnasio"
                  value={formData.ubicacionGimnasio || ""}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
            </>
          )}
          <Button colorScheme="red" type="submit" mt={4} width="full" size="lg">
            CREAR CUENTA
          </Button>
        </form>
        <Box mt={4} textAlign="center">
          <Link to="/login">Ya tengo una cuenta</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
