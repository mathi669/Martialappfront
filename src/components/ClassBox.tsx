// src/components/ClassBox.tsx
import { Box, Text, Image, Button  } from "@chakra-ui/react";
import { ClassBoxProps } from "../interfaces/classbox_interface";

const ClassBox: React.FC<ClassBoxProps> = ({
  className,
  schedule,
  availableSpots,
  imageUrl,
  onReserve,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      p={4}
      mb={4}
    >
      <Text fontWeight="bold" fontSize="lg" mb={2}>
        {className}
      </Text>
      <Text fontSize="md" color="gray.500" mb={2}>
        Horario: {schedule}
      </Text>
      <Text fontSize="md" color="gray.500" mb={2}>
        Cupos Disponibles: {availableSpots}
      </Text>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={className}
          objectFit="cover"
          width="100%"
          height="250px"
          mb={4}
        />
      )}
      <Button colorScheme="teal" size="sm" onClick={onReserve}>
        Reservar Clase
      </Button>
    </Box>
  );
};

export default ClassBox;
