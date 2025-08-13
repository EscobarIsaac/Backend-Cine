package com.cine.asistencia.controller;

import com.cine.asistencia.model.Asistencia;
import com.cine.asistencia.repository.AsistenciaRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/asistencias")
@RequiredArgsConstructor
public class AsistenciaController {

    private final AsistenciaRepository repo;

    @GetMapping
    public List<Asistencia> listar() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asistencia> obtener(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<Asistencia> porUsuario(@PathVariable Long usuarioId) {
        return repo.findByUsuarioId(usuarioId);
    }

    @GetMapping("/evento/{eventoId}")
    public List<Asistencia> porEvento(@PathVariable Long eventoId) {
        return repo.findByEventoId(eventoId);
    }

    @PostMapping
    public ResponseEntity<Asistencia> crear(@RequestBody @Valid Asistencia body) {
        var saved = repo.save(body);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asistencia> actualizar(@PathVariable Long id, @RequestBody Asistencia body) {
        return repo.findById(id)
                .map(existing -> {
                    if (body.getUsuarioId() != null) existing.setUsuarioId(body.getUsuarioId());
                    if (body.getEventoId()  != null) existing.setEventoId(body.getEventoId());
                    if (body.getPuerta()    != null) existing.setPuerta(body.getPuerta());
                    return ResponseEntity.ok(repo.save(existing));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
