package com.cine.eventos.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "eventos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;
    private String fecha;
    private String hora;
    private String sala;
}