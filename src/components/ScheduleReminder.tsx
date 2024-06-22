import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import apiService from "../services/service";

const ScheduleReminder = () => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    id_usuario: "",
    fecha: "",
    hora: "",
    mensaje: "",
  });

  const toast = useToast();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userParsed = JSON.parse(userData);
      setUser(userParsed);
      setFormData((prevFormData) => ({
        ...prevFormData,
        id_usuario: userParsed.id,
      }));
    }
  }, []);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Ajustar la hora para incluir segundos si no están presentes
    const horaConSegundos =
      formData.hora.length === 5 ? `${formData.hora}:00` : formData.hora;
    const formDataConSegundos = { ...formData, hora: horaConSegundos };

    try {
      const response = await apiService.scheduleReminder(formDataConSegundos);
      toast({
        title: "Recordatorio programado correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Error programando el recordatorio",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="fecha" isRequired mb={4}>
        <FormLabel>Fecha</FormLabel>
        <Input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl id="hora" isRequired mb={4}>
        <FormLabel>Hora</FormLabel>
        <Input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl id="mensaje" isRequired mb={4}>
        <FormLabel>Mensaje</FormLabel>
        <Textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Mensaje"
        />
      </FormControl>

      <Button type="submit" colorScheme="blue">
        Programar Recordatorio
      </Button>
    </form>
  );
};

export default ScheduleReminder;
