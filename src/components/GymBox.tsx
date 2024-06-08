// src/components/GymBox.tsx
import { Box, Text, Image } from "@chakra-ui/react";
import { GymBoxProps } from "../interfaces/gymbox_interface";
import { useNavigate } from "react-router-dom";

const GymBox: React.FC<GymBoxProps> = ({ imageSrc, altText, gymName, gymAddress, gymId }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/gymprofile/${gymId}`);
  };
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "xl", cursor: "pointer" }}
      >
      <Image
        src={imageSrc}
        alt={altText}
        objectFit="cover"
        width="100%"
        height="200px"
        onClick={handleImageClick}
        _hover={{ transform: "scale(1.05)" }}
        transition="transform 0.3s ease-in-out"
      />
      <Box p="6">
        <Text fontWeight="bold" fontSize="xl" mb="2">
          {gymName}
        </Text>
        <Text fontSize="md" color="gray.500">
          {gymAddress}
        </Text>
      </Box>
    </Box>
  );
};

export default GymBox;
