package com.bootcamp.integradorback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.EstadoOrdenModel;
import com.bootcamp.integradorback.services.EstadoOrdenService;
import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/estadoorden")
public class EstadoOrdenController {
    @Autowired
    EstadoOrdenService estadoService;
    
    @GetMapping()
    public ResponseEntity<List<EstadoOrdenModel>> getEstadosOrdenes() {
        List<EstadoOrdenModel> estadosOrdenes = estadoService.obtenerEstadosOrdenes();
        return ResponseEntity.ok(estadosOrdenes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EstadoOrdenModel> getEstadoOrdenById(@PathVariable int id) {
        EstadoOrdenModel estadoOrden = estadoService.obtenerEstadoOrdenById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Estado de orden no encontrado con id: " + id));
        return ResponseEntity.ok(estadoOrden);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<List<EstadoOrdenModel>> updateEstadoOrden(@PathVariable int id, @RequestBody EstadoOrdenModel estado) {
        List<EstadoOrdenModel> estadosActualizados = estadoService.modificarEstadoOrden(id, estado);
        return ResponseEntity.ok(estadosActualizados);
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
