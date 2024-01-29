package com.bootcamp.integradorback.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.PaisModel;
import com.bootcamp.integradorback.services.PaisService;

@RestController
@RequestMapping("/paises")
public class PaisController {
	@Autowired 
	PaisService paisService;
	
	@GetMapping()
	public ResponseEntity<List<PaisModel>> getPaises(){
		return ResponseEntity.ok(paisService.obtenerPaises());

	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<PaisModel>> getPaisById(@PathVariable int id ){
		return ResponseEntity.ok(paisService.obtenerPaisById(id));

	}
	
}
