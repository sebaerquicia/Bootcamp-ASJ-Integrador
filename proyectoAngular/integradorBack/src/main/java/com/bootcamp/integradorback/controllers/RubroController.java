package com.bootcamp.integradorback.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.RubroModel;
import com.bootcamp.integradorback.services.RubroService;



@RestController
@RequestMapping("/rubros")
public class RubroController {
	@Autowired
	RubroService rubroService;
	
	@GetMapping()
	public ResponseEntity<List<RubroModel>> getRubros(){
		return ResponseEntity.ok(rubroService.obtenerRubros());
	}
	@GetMapping("/{id}")
	public ResponseEntity<Optional<RubroModel>> getRubroById (@PathVariable int id) {
		return ResponseEntity.ok(rubroService.obtenerRubroById(id));
	}
	
	@PostMapping() 
	public ResponseEntity<List<RubroModel>> cargarRubro(@RequestBody RubroModel rubro){
		return ResponseEntity.ok(rubroService.cargarRubro(rubro));
	}
}
