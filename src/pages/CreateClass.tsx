import { Box, Button, Flex, Heading, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Textarea, Center } from "@chakra-ui/react";

const CreateClass = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="section" w="full">
      <Flex
        w="full"
        h="200px"
        bgImage="url('./src/static/img/banner ejemplo.jpg')"
        bgSize="cover"
        bgPosition="center"
        direction="column"
        align="center"
        justify="center"
        color="white"
        position="relative"
      >
        <Heading as="h2" size="lg">
          Banner del Gimnasio
        </Heading>
      </Flex>

      <Flex w="full" justify="center">
        <Button
          colorScheme="blue"
          size="lg"
          leftIcon={<Box as="span" className="fa fa-plus" />}
          onClick={onOpen}
          m={5}
        >
          Crear Clase
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Nueva Clase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="tituloClase" mb={4}>
              <FormLabel>Título de la Clase</FormLabel>
              <Input placeholder="Ingrese el título de la clase" />
            </FormControl>
            <FormControl id="informacionClase" mb={4}>
              <FormLabel>Información de la Clase</FormLabel>
              <Textarea placeholder="Ingrese la información de la clase" rows={3} />
            </FormControl>
            <FormControl id="cantidadParticipantes" mb={4}>
              <FormLabel>Cantidad de Participantes</FormLabel>
              <Input type="number" placeholder="Ingrese la cantidad de participantes" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Guardar Clase
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {[1, 2, 3].map((classNumber) => (
        <Center key={classNumber} my={4}>
          <Box w="full" maxW="800px" bg="gray.100" p={5} borderRadius="md" shadow="md">
            <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center">
              <Box mb={{ base: 4, md: 0 }}>
                <Heading as="h3" size="md" mb={2}>
                  Información de la Clase {classNumber}
                </Heading>
                <Text mb={4}>
                  Esta es la información de la clase que proviene de perfilgimnasio.html.
                </Text>
              </Box>
              <Box textAlign="center">
                <Heading as="h4" size="sm" mb={2}>
                  Cantidad de participantes: {classNumber * 10}
                </Heading>
                <Button colorScheme="blue" mr={3}>
                  Editar
                </Button>
                <Button colorScheme="red">Cancelar</Button>
              </Box>
            </Flex>
          </Box>
        </Center>
      ))}
    </Box>
  );
};

export default CreateClass;
