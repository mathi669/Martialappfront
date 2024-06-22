import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  Text,
  Image,
  Container,
  Heading,
  Avatar,
} from "@chakra-ui/react";
import apiService from "../services/service";

interface GymPostsTabProps {
  gymId: any;
}

const GymPostsTab: React.FC<GymPostsTabProps> = ({ gymId }) => {
  const [posts, setPosts] = useState<
    {
      id: number;
      dc_imagen_url: string;
      dc_descripcion: string;
      fecha: string;
      imagen_usuario: string; // Nueva propiedad para la imagen del usuario del gimnasio
    }[]
  >([]);

  const fetchPosts = async () => {
    try {
      const postsData = await apiService.getGymPosts(gymId);
      setPosts(postsData.posts);
    } catch (error) {
      console.error("Error fetching gym posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [gymId]);

  return (
    <Container maxW="container.md" py="8">
      <Heading as="h2" size="lg" mb="4">
        Publicaciones del Gimnasio
      </Heading>
      <List spacing="8">
        {posts.map((post) => (
          <ListItem
            key={post.id}
            borderWidth="1px"
            borderRadius="lg"
            p="4"
            boxShadow="lg"
            position="relative"
          >
            <Avatar
              src={post.imagen_usuario} // Imagen del usuario del gimnasio
              size="sm"
              position="absolute"
              top="2"
              left="2"
            />
            <Box ml="10">
              <Image
                src={post.dc_imagen_url}
                alt="Publicación de gimnasio"
                maxH="300px"
                borderRadius="lg"
                mb="4"
              />
              <Text fontSize="lg" fontWeight="bold" mb="2">
                {post.dc_descripcion}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Fecha: {new Date(post.fecha).toLocaleDateString()}
              </Text>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default GymPostsTab;
