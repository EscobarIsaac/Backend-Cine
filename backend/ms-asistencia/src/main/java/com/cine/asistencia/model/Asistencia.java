package com.cine.asistencia.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "asistencias")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Asistencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // En tu DB son INT8 -> usamos Long
    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "evento_id")
    private Long eventoId;

    // Columna existente en la tabla
    @Column(name = "puerta", length = 30)
    private String puerta;
}
