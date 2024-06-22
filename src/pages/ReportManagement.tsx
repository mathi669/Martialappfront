import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import apiService from "../services/service";

const ReportManagement: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getPendingReports();
      setReports(response.reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast({
        title: "Error al obtener reportes",
        description: "Hubo un problema al obtener los reportes.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptReport = async (reportId: number, reporterId: number) => {
    try {
      setIsLoading(true);
      await apiService.acceptReport(reportId, { reporter_id: reporterId });
      toast({
        title: "Reporte aceptado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchReports();
    } catch (error) {
      console.error("Error accepting report:", error);
      toast({
        title: "Error al aceptar reporte",
        description: "Hubo un problema al aceptar el reporte.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectReport = async () => {
    try {
      setIsLoading(true);
      await apiService.rejectReport(selectedReport.reporter_id, rejectReason);
      toast({
        title: "Reporte rechazado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      sendRejectionEmail();
      setIsRejectModalOpen(false);
      fetchReports();
    } catch (error) {
      console.error("Error rejecting report:", error);
      toast({
        title: "Error al rechazar reporte",
        description: "Hubo un problema al rechazar el reporte.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendRejectionEmail = async () => {
    try {
      await apiService.rejectReport(selectedReport.user_id, rejectReason);
      toast({
        title: "Correo de rechazo enviado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error sending rejection email:", error);
      toast({
        title: "Error al enviar correo de rechazo",
        description: "Hubo un problema al enviar el correo de rechazo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const openRejectModal = (report: any) => {
    setSelectedReport(report);
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setRejectReason("");
  };

  const openAcceptModal = (report: any) => {
    setSelectedReport(report);
    setIsAcceptModalOpen(true);
  };

  const closeAcceptModal = () => {
    setIsAcceptModalOpen(false);
  };

  return (
    <Box p={4} textAlign="center">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Administración de Reportes de Usuarios
      </Text>
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        reports.map((report) => (
          <Box
            key={report.report_id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            mb={4}
            textAlign="left"
          >
            <Text fontSize="lg" fontWeight="bold">
              ID del Reporte: {report.report_id}
            </Text>
            <Text>Reportado por: {report.user_name}</Text>
            <Text>Motivo: {report.report_reason}</Text>
            <Text>Detalles: {report.report_details}</Text>
            <Button
              colorScheme="green"
              mt={2}
              onClick={() => openAcceptModal(report)}
            >
              Ver Detalles y Aceptar
            </Button>
            <Button
              colorScheme="red"
              mt={2}
              ml={2}
              onClick={() => openRejectModal(report)}
            >
              Ver Detalles y Rechazar
            </Button>
          </Box>
        ))
      )}
      {/* Modal para aceptar reporte */}
      <Modal isOpen={isAcceptModalOpen} onClose={closeAcceptModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles del Reporte</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg" fontWeight="bold">
              ID del Reporte: {selectedReport?.report_id}
            </Text>
            <Text>Reportado por: {selectedReport?.user_name}</Text>
            <Text>Motivo: {selectedReport?.report_reason}</Text>
            <Text>Detalles: {selectedReport?.report_details}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={() =>
                handleAcceptReport(
                  selectedReport?.report_id,
                  selectedReport?.user_id
                )
              }
            >
              Aceptar Reporte
            </Button>
            <Button variant="ghost" onClick={closeAcceptModal}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal para rechazar reporte */}
      <Modal isOpen={isRejectModalOpen} onClose={closeRejectModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rechazar Reporte</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Ingrese la razón de rechazo para enviar al reportador:</Text>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="chakra-input"
              placeholder="Escriba aquí la razón de rechazo..."
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleRejectReport}>
              Enviar Correo de Rechazo
            </Button>
            <Button variant="ghost" onClick={closeRejectModal}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ReportManagement;
