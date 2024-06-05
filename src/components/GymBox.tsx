// src/components/GymBox.tsx
import { Box, Text, Image } from "@chakra-ui/react";
import { GymBoxProps } from "../interfaces/gymbox_interface";

const GymBox: React.FC<GymBoxProps> = ({ imageSrc, altText, gymName, gymAddress }) => {
  return (
    <Box borderWidth={1} borderRadius="lg" overflow="hidden">
      <Image src={imageSrc} alt={altText} />
      <Box p={4}>
        <Text fontWeight="bold">{gymName}</Text>
        <Text>{gymAddress}</Text>
      </Box>
    </Box>
  );
};

export default GymBox;
