package com.bootcamp.integradorback.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.ProvinciaModel;
import com.bootcamp.integradorback.services.ProvinciaService;

@RestController
@RequestMapping("/provincias")
public class ProvinciaController {
	@Autowired
	ProvinciaService provinciaService;
	
	@GetMapping()
	public ResponseEntity<List<ProvinciaModel>> getProvincias(){
		return ResponseEntity.ok(provinciaService.obtenerProvincias());
	}
	@GetMapping("/por_pais/{id}")
	public ResponseEntity<List<ProvinciaModel>> getProvinciaByIdPais(@PathVariable int id){
		return ResponseEntity.ok(provinciaService.obtenerProvinciaByIdPais(id));
	
	}
}
