import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Avatar,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const GymProfile = () => {
  return (
    <Box p={4}>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem colSpan={5}>
          <HStack spacing={4} alignItems="center">
            <Avatar size="xl" name="Ignatius Keller" src="path/to/avatar.jpg" />
            <VStack align="start">
              <HStack>
                <Text fontSize="2xl" fontWeight="bold">Ignatius Keller</Text>
                <FaCheckCircle color="blue" />
              </HStack>
              <Text>Product Manager</Text>
              <Text>Sausalito, California, United States</Text>
              <Text>376 connect</Text>
            </VStack>
          </HStack>
          <HStack mt={4} spacing={2}>
            <Button size="sm">Open to</Button>
            <Button size="sm">Add profile section</Button>
            <Button size="sm">More</Button>
            <Button size="sm">Disciplinas</Button>
            <Button size="sm">Cancelar clase</Button>
            <Button size="sm">Revisar horario</Button>
          </HStack>
        </GridItem>
        <GridItem colSpan={4}>
          <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold" mb={2}>Actividad reciente</Text>
            <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
              <Text>Actividad 1</Text>
              <Button size="sm" mt={2}>Modificar</Button>
            </Box>
            <Box borderWidth="1px" borderRadius="md" p={4}>
              <Text>Actividad 2</Text>
              <Button size="sm" mt={2}>Modificar</Button>
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold" mb={4}>Horarios:</Text>
            <Calendar />
            <Button size="sm" mt={4}>Agendar clase</Button>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default GymProfile;
