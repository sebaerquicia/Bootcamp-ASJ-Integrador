package com.bootcamp.integradorback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.DetalleOrdenModel;
import com.bootcamp.integradorback.services.DetalleOrdenService;
import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/detallesordenes")
public class DetalleOrdenController {
    @Autowired
    DetalleOrdenService detalleService;
    
    @GetMapping()
    public ResponseEntity<List<DetalleOrdenModel>> getDetalles() {
        List<DetalleOrdenModel> detalles = detalleService.obtenerDetalles();
        return ResponseEntity.ok(detalles);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DetalleOrdenModel> getDetalleById(@PathVariable int id) {
        DetalleOrdenModel detalle = detalleService.obtenerDetalleById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Detalle de orden no encontrado con id: " + id));
        return ResponseEntity.ok(detalle);
    }
    
    @PostMapping() 
    public ResponseEntity<List<DetalleOrdenModel>> cargarDetalle(@RequestBody DetalleOrdenModel detalle) {
        List<DetalleOrdenModel> detallesCargados = detalleService.cargarDetalle(detalle);
        return ResponseEntity.ok(detallesCargados);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<List<DetalleOrdenModel>> deleteDetalle(@PathVariable int id) {
        List<DetalleOrdenModel> detallesActualizados = detalleService.eliminarDetalle(id);
        return ResponseEntity.ok(detallesActualizados);
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
