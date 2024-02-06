package com.bootcamp.integradorback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.CondicionIvaModel;
import com.bootcamp.integradorback.services.CondicionIvaService;
import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/condicionesiva")
public class CondicionIvaController {

    @Autowired 
    CondicionIvaService condicionIvaService;
    
    @GetMapping()
    public ResponseEntity<List<CondicionIvaModel>> getCondicionesIva() {
        List<CondicionIvaModel> condicionesIva = condicionIvaService.obtenerCondicionesIva();
        return ResponseEntity.ok(condicionesIva);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CondicionIvaModel> getCondicionIvaById(@PathVariable int id) {
        CondicionIvaModel condicionIva = condicionIvaService.obtenerCondicionIvaById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Condición IVA no encontrada con id: " + id));
        return ResponseEntity.ok(condicionIva);
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
