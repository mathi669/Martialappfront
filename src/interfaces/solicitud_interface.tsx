export interface Solicitud {
    id_solicitud_registro: string;
    id_estado_solRegistro: number;
    df_fecha_solicitud: string;
    df_fecha_aprobacion?: string;
    nombre_gimnasio: string;
    telefono_gimnasio: string;
    correo_gimnasio: string;
    direccion_gimnasio: string;
    foto_gimnasio: string;
}