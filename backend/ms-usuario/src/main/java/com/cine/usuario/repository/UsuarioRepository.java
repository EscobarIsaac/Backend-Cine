package com.cine.usuario.repository;

import com.cine.usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Versión tolerante: devuelve LISTA (evita reventar si hay duplicados)
    List<Usuario> findByEmail(String email);
}
