package com.cine.usuario.controller;

import com.cine.usuario.dto.LoginRequest;
import com.cine.usuario.model.Usuario;
import com.cine.usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        if (usuario.getEmail() == null || usuario.getEmail().isBlank()
                || usuario.getPassword() == null || usuario.getPassword().isBlank()
                || usuario.getNombre() == null || usuario.getNombre().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "nombre, email y password son obligatorios"));
        }
        Usuario saved = usuarioRepository.save(usuario);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        if (req == null || req.email() == null || req.password() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "email y password son obligatorios"));
        }

        List<Usuario> users = usuarioRepository.findByEmail(req.email());
        if (users.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message", "Credenciales inválidas"));
        }
        if (users.size() > 1) {
            // Hay duplicados. Devuelve 409 para que sepas que hay que limpiar la tabla.
            return ResponseEntity.status(409).body(Map.of(
                    "message", "Email duplicado en base de datos. Contacte al admin para depurar."
            ));
        }

        Usuario u = users.get(0);
        if (!u.getPassword().equals(req.password())) {
            return ResponseEntity.status(401).body(Map.of("message", "Credenciales inválidas"));
        }

        // Aquí podrías generar JWT. Por ahora devolvemos el usuario.
        return ResponseEntity.ok(u);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> getAll() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("message", "Usuario no encontrado")));
    }
}
