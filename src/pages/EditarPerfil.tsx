import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Text,
  VStack,
  HStack,
  Icon,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaSignOutAlt, FaSave } from "react-icons/fa";

const EditarPerfil: React.FC = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="white"
      p={6}
    >
      <Box
        w="full"
        maxW="800px"
        bg="white"
        shadow="lg"
        borderRadius="lg"
        p={6}
        textAlign="center"
      >
        <Avatar size="2xl" src="/path-to-your-image.jpg" mb={4} />
        <Text fontSize="2xl" fontWeight="bold">
          John Doe
        </Text>
        <Text color="gray.500" mb={4}>john@example.com</Text>

        <form>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Información Personal
          </Text>
          <Flex mt={6} mb={4} justify="space-between" gap={6}>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input type="text" defaultValue="John" />
            </FormControl>
            <FormControl>
              <FormLabel>Apellido</FormLabel>
              <Input type="text" defaultValue="Doe" />
            </FormControl>
          </Flex>
          <Flex mb={4} justify="space-between" gap={6}>
            <FormControl>
              <FormLabel>Correo electrónico</FormLabel>
              <Input type="email" defaultValue="john@example.com" disabled />
            </FormControl>
            <FormControl>
              <FormLabel>Teléfono</FormLabel>
              <Input type="text" placeholder="Número telefónico" />
            </FormControl>
          </Flex>
          <Flex mb={4} justify="space-between" gap={6}>
            <FormControl>
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl>
              <FormLabel>Género</FormLabel>
              <Select placeholder="Seleccione género">
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </Select>
            </FormControl>
          </Flex>
          <FormControl mb={4}>
            <FormLabel>Dirección</FormLabel>
            <Input type="text" placeholder="Dirección" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Foto de perfil</FormLabel>
            <Input type="file" />
          </FormControl>

          <Text fontSize="lg" fontWeight="bold" mb={2} mt={6}>
            Información del Gimnasio
          </Text>
          <FormControl mb={4}>
            <FormLabel>Nivel/Grado</FormLabel>
            <Select placeholder="Seleccione nivel">
              <option value="blanco">Cinturón Blanco</option>
              <option value="azul">Cinturón Azul</option>
              <option value="negro">Cinturón Negro</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Estilo de Artes Marciales</FormLabel>
            <Input type="text" placeholder="Estilo de Artes Marciales" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Gimnasio</FormLabel>
            <Input type="text" placeholder="Nombre del gimnasio" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Fecha de Ingreso al Gimnasio</FormLabel>
            <Input type="date" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Horas de Entrenamiento Semanales</FormLabel>
            <Input type="number" placeholder="Horas de Entrenamiento Semanales" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Clases Registradas</FormLabel>
            <Input type="text" placeholder="Clases Registradas" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Próximos Eventos/Competencias</FormLabel>
            <Textarea placeholder="Próximos Eventos/Competencias" />
          </FormControl>

          <Text fontSize="lg" fontWeight="bold" mb={2} mt={6}>
            Información de Contacto de Emergencia
          </Text>
          <Flex mb={4} justify="space-between" gap={6}>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input type="text" placeholder="Nombre" />
            </FormControl>
            <FormControl>
              <FormLabel>Apellido</FormLabel>
              <Input type="text" placeholder="Apellido" />
            </FormControl>
          </Flex>
          <FormControl mb={6}>
            <FormLabel>Relación con el Usuario</FormLabel>
            <Input type="text" placeholder="Relación con el Usuario" />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Número telefónico</FormLabel>
            <Input type="text" placeholder="Número telefónico" />
          </FormControl>

          <Flex justify="space-between">
            <Button variant="outline" leftIcon={<FaSignOutAlt />}>
              Cerrar sesión
            </Button>
            <Button colorScheme="blackAlpha" leftIcon={<FaSave />}>
              Guardar cambios
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default EditarPerfil;