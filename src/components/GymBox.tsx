import { Box, Text, Image, Flex, IconButton } from "@chakra-ui/react";
import { GymBoxProps } from "../interfaces/gymbox_interface";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface GymBoxPropsExtended extends GymBoxProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const GymBox: React.FC<GymBoxPropsExtended> = ({ imageSrc, altText, gymName, gymAddress, gymId, isFavorite, onToggleFavorite }) => {
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
        <Flex justify="space-between" align="center" mb="2">
          <Text fontWeight="bold" fontSize="xl">
            {gymName}
          </Text>
          <IconButton
            aria-label="Favorite Gym"
            icon={isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
            onClick={onToggleFavorite}
            variant="ghost"
          />
        </Flex>
        <Text fontSize="md" color="gray.500">
          {gymAddress}
        </Text>
      </Box>
    </Box>
  );
};

export default GymBox;
