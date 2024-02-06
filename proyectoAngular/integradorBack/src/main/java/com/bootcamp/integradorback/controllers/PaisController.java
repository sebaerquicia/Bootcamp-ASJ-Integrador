package com.bootcamp.integradorback.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.PaisModel;
import com.bootcamp.integradorback.services.PaisService;
import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/paises")
public class PaisController {
    
    @Autowired 
    PaisService paisService;
    
    @GetMapping()
    public ResponseEntity<List<PaisModel>> getPaises() {
        List<PaisModel> paises = paisService.obtenerPaises();
        return ResponseEntity.ok(paises);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PaisModel> getPaisById(@PathVariable int id) {
        PaisModel pais = paisService.obtenerPaisById(id)
            .orElseThrow(() -> new ResourceNotFoundException("País no encontrado con ID: " + id));
        return ResponseEntity.ok(pais);
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
