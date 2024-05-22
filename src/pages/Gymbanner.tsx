import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
} from "@chakra-ui/react";


const GymBanner = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const {
    isOpen: isDateOpen,
    onOpen: onDateOpen,
    onClose: onDateClose,
  } = useDisclosure();

  const times = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];

  return (
    <Box as="section" w="full" py={10}>
      <Center w="full" h="300px" position="relative" bg="">
        <Image
          src="assets/img/banner.jpg"
          alt="Imagen del Gimnasio"
          objectFit="cover"
          w="full"
          h="full"
          position="absolute"
          top="0"
          left="0"
          zIndex="-1"
        />
        <Box
          bg="rgba(0, 0, 0, 0.5)"
          w="full"
          h="full"
          position="absolute"
          top="0"
          left="0"
        />
        <Heading color="white" zIndex="1">
          Clase
        </Heading>
      </Center>

      <Box w="full" maxW="1200px" mx="auto" mt={10}>
        <Flex wrap="wrap" justify="space-between">
          <Box
            w={{ base: "full", md: "48%" }}
            bg="gray.100"
            p={5}
            borderRadius="md"
            boxShadow="md"
            mb={{ base: 5, md: 0 }}
          >
            <Heading as="h3" size="lg" mb={4}>
              Descripción del Gimnasio
            </Heading>
            <Text mb={4}>
              Esta es la descripción del gimnasio que proviene de
              perfilgimnasio.html.
            </Text>
            <Box mb={4}>
              <Button
                colorScheme="blue"
                border="2px"
                borderColor="blue.500"
                onClick={onOpen}
              >
                Profesor
              </Button>
            </Box>
            <Box bg="gray.200" p={3} borderRadius="md" boxShadow="sm">
              <Text>Cupos Disponibles: 20</Text>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Perfil del Profesor</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Center flexDirection="column">
                    <Image
                      src="src/assets/img/user.png"
                      borderRadius="full"
                      boxSize="100px"
                      alt="Imagen del Profesor"
                    />
                    <Heading as="h4" size="md" mt={4}>
                      Nombre del Profesor
                    </Heading>
                    <Text>Descripción del Profesor</Text>
                  </Center>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" onClick={onClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>

          <Box
            w={{ base: "full", md: "48%" }}
            bg="gray.100"
            p={5}
            borderRadius="md"
            boxShadow="md"
          >
            <Heading as="h2" size="lg" mb={4}>
              Tomar clase
            </Heading>
            <Button colorScheme="blue" onClick={onDateOpen} mb={4}>
              Seleccione fecha
            </Button>
            {selectedDate && (
              <Text mb={4}>
                Fecha seleccionada: {selectedDate.toLocaleDateString()}
              </Text>
            )}
            <Modal isOpen={isDateOpen} onClose={onDateClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Seleccione una fecha</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Center>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: Date) => setSelectedDate(date)}
                      inline
                    />
                  </Center>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" onClick={onDateClose}>
                    Cerrar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Heading as="h3" size="md" mb={4}>
              Horarios disponibles
            </Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={2} mb={4}>
              {times.map((time) => (
                <GridItem
                  key={time}
                  w="full"
                  p={2}
                  textAlign="center"
                  bg={selectedTime === time ? "blue.500" : "gray.200"}
                  color={selectedTime === time ? "white" : "black"}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </GridItem>
              ))}
            </Grid>
            <Button colorScheme="blue" id="btnTomarClase">
              Tomar clase
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default GymBanner;
