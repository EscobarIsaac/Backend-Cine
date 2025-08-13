package com.cine.notificaciones.controller;

import com.cine.notificaciones.model.Notificacion;
import com.cine.notificaciones.repository.NotificacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notificaciones")
public class NotificacionesController {

    @Autowired
    private NotificacionRepository repo;

    @PostMapping
    public Notificacion crear(@RequestBody Notificacion n) {
        return repo.save(n);
    }

    @GetMapping
    public List<Notificacion> listar() {
        return repo.findAll();
    }
}
