import { Box, Button, Flex, Heading, Image, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";

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

      <Button
        colorScheme="blue"
        size="lg"
        leftIcon={<Box as="span" className="fa fa-plus" />}
        onClick={onOpen}
        m={5}
      >
        Crear Clase
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Clase</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Modal de creación de clase */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Crear
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {[1, 2, 3].map((classNumber) => (
        <Box bg="white" m={5} p={5} borderRadius="md" shadow="md">
          <Heading as="h3" size="md" mb={2}>
            Información de la Clase {classNumber}
          </Heading>
          <Text mb={4}>
            Esta es la información de la clase que proviene de perfilgimnasio.html.
          </Text>
          <Text mb={4}>Cantidad de participantes: {classNumber * 10}</Text>
          <Button colorScheme="blue" mr={3}>
            Editar
          </Button>
          <Button colorScheme="red">Cancelar</Button>
        </Box>
      ))}
    </Box>
  );
};

export default CreateClass;