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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.OrdenDeCompraModel;
import com.bootcamp.integradorback.services.OrdenDeCompraService;
import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/ordenes_de_compra")
public class OrdenDeCompraController {

    @Autowired
    OrdenDeCompraService ordenService;
    
    @GetMapping()
    public ResponseEntity<List<OrdenDeCompraModel>> getOrdenes() {
        List<OrdenDeCompraModel> ordenes = ordenService.obtenerOrdenes();
        return ResponseEntity.ok(ordenes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<OrdenDeCompraModel> getOrdenesById(@PathVariable int id) {
        OrdenDeCompraModel orden = ordenService.obtenerOrdenById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Orden de compra no encontrada con id: " + id));
        return ResponseEntity.ok(orden);
    }
    
    @PostMapping() 
    public ResponseEntity<List<OrdenDeCompraModel>> cargarOrden(@RequestBody OrdenDeCompraModel orden) {
        List<OrdenDeCompraModel> ordenes = ordenService.cargarOrden(orden);
        return ResponseEntity.ok(ordenes);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<String> updateOrden(@PathVariable int id, @RequestBody OrdenDeCompraModel orden) {
        String mensaje = ordenService.modificarOrden(id, orden);
        return ResponseEntity.ok(mensaje);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrden(@PathVariable int id) {
        String mensaje = ordenService.eliminarOrdenById(id);
        return ResponseEntity.ok(mensaje);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
