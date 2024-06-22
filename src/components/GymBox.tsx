import { Box, Text, Image, Flex, useToast, Button } from "@chakra-ui/react";
import { GymBoxProps } from "../interfaces/gymbox_interface";
import { useNavigate } from "react-router-dom";
import apiService from "../services/service";

interface GymBoxPropsExtended extends GymBoxProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  horario: string;
  status: string;
}

const GymBox: React.FC<GymBoxPropsExtended> = ({
  imageSrc,
  altText,
  gymName,
  gymAddress,
  gymId,
  onToggleFavorite,
  horario,
  status,
}) => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleImageClick = () => {
    navigate(`/gymprofile/${gymId}`);
  };

  const handleFavoriteClick = async () => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    if (user) {
      
      const response = await apiService.addFavorite(user.id, gymId);
      if(response.color === "success"){
        toast({
          title: "Exito",
          description: response.message,
          status: response.color,
          duration: 5000,
          isClosable: true,
          position: "top"
        });

      } else {
        toast({
          title: "Error",
          description: response.message,
          status: response.color,
          duration: 5000,
          isClosable: true,
          position: "top"
        });
      }
      onToggleFavorite();
    }
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
        <Flex justify="space-between" align="center" mb="2">
          <Text fontWeight="bold" fontSize="xl">
            {gymName}
          </Text>
        </Flex>
        <Text fontSize="md" color="gray.500">
          {gymAddress}
        </Text>
        <Text fontSize="md" color="gray.500">
          {horario}
        </Text>
        <Text fontSize="md" color="gray.500">
          {status}
        </Text>
        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          borderColor="green.500"
          onClick={handleFavoriteClick}
        >
          Añadir a favoritos
        </Button>
      </Box>
    </Box>
  );
};

export default GymBox;
