// src/components/ClassBox.tsx
import { Box, Text, Image, Button } from "@chakra-ui/react";
import { ClassBoxProps } from "../interfaces/classbox_interface";

const ClassBox: React.FC<ClassBoxProps> = ({
  className,
  schedule,
  availableSpots,
  imageUrl,
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
          height="150px"
          mb={4}
        />
      )}
    </Box>
  );
};

export default ClassBox;
