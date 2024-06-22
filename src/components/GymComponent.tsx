import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Box,
  Container,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import apiService from "../services/service";

interface GymComponentProps {
  gymId: any;
}

const GymComponent: React.FC<GymComponentProps> = ({ gymId }) => {
  const [posts, setPosts] = useState<
    {
      id: number;
      dc_imagen_url: string;
      dc_descripcion: string;
      fecha: string;
    }[]
  >([]);
  const [formData, setFormData] = useState({
    dc_descripcion: "",
    imagen_base64: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

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

  const handleCreatePost = async () => {
    setIsLoading(true);
    try {
      await apiService.createGymPost({
        id_gimnasio: gymId,
        dc_descripcion: formData.dc_descripcion,
        dc_imagen_base64: formData.imagen_base64,
      });
      fetchPosts();
      setFormData({
        dc_descripcion: "",
        imagen_base64: "",
      });
      toast({
        title: "Publicación creada",
        description: "Tu publicación se ha creado exitosamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error creating gym post:", error);
      toast({
        title: "Error",
        description: "Hubo un error al crear la publicación.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            imagen_base64: (reader.result as string).split(",")[1] || "",
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxW="container.md" py="8">
      <Heading as="h2" size="lg" mb="4">
        Publicaciones de Gimnasio
      </Heading>
      <Tabs isFitted variant="enclosed">
        <TabList mb="4">
          <Tab>Crear publicación</Tab>
          <Tab>Ver publicaciones</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormControl mb="4">
              <FormLabel>Descripción</FormLabel>
              <Textarea
                placeholder="Escribe la descripción de la publicación"
                value={formData.dc_descripcion}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dc_descripcion: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Imagen</FormLabel>
              <Input type="file" onChange={handleImageChange} />
              {formData.imagen_base64 && (
                <Box mt="2">
                  <Image
                    src={`data:image/jpeg;base64,${formData.imagen_base64}`}
                    alt="Vista previa de la imagen"
                    maxH="200px"
                  />
                </Box>
              )}
            </FormControl>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={isLoading}
            >
              Publicar
            </Button>
          </TabPanel>
          <TabPanel>
            <List spacing="4">
              {posts.map((post) => (
                <ListItem
                  key={post.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  p="4"
                  boxShadow="md"
                >
                  <Box>
                    <Image
                      src={post.dc_imagen_url}
                      alt="Publicación de gimnasio"
                      maxH="200px"
                    />
                  </Box>
                  <Box mt="2">
                    <Text>{post.dc_descripcion}</Text>
                    <Text fontSize="sm" color="gray.500">
                      Fecha: {new Date(post.fecha).toLocaleDateString()}
                    </Text>
                  </Box>
                </ListItem>
              ))}
            </List>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default GymComponent;
