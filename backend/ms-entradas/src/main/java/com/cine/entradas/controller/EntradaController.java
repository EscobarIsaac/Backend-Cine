package com.cine.entradas.controller;

import com.cine.entradas.model.Entrada;
import com.cine.entradas.repository.EntradaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/entradas") // <- importante: SIN /api
public class EntradaController {

    @Autowired
    private EntradaRepository repository;

    @PostMapping
    public ResponseEntity<Entrada> create(@RequestBody Entrada entrada) {
        Entrada saved = repository.save(entrada);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public List<Entrada> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entrada> getById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
