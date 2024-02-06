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
import com.bootcamp.integradorback.models.CategoriaModel;
import com.bootcamp.integradorback.services.CategoriaService;
import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    CategoriaService categoriaService;
    
    @GetMapping()
    public ResponseEntity<List<CategoriaModel>> getCategorias() {
        List<CategoriaModel> categorias = categoriaService.obtenerCategorias();
        return ResponseEntity.ok(categorias);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CategoriaModel> getCategoriaById(@PathVariable int id) {
        CategoriaModel categoria = categoriaService.obtenerCategoriaById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada con id: " + id));
        return ResponseEntity.ok(categoria);
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    
}}
