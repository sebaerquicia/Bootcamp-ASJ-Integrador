package com.bootcamp.integradorback.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.CategoriaModel;
import com.bootcamp.integradorback.services.CategoriaService;


@RestController
@RequestMapping("/categorias")
public class CategoriaController {
	@Autowired
	CategoriaService categoriaService;
	
	
	@GetMapping()
	public ResponseEntity<List<CategoriaModel>> getCategorias(){
		return ResponseEntity.ok(categoriaService.obtenerCategorias());

	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<CategoriaModel>> getCategoriasById(@PathVariable int id){
		return ResponseEntity.ok(categoriaService.obtenerCategoriaById(id));
	}
}
