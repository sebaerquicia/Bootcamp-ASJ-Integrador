package com.bootcamp.integradorback.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.CondicionIvaModel;
import com.bootcamp.integradorback.services.CondicionIvaService;

@RestController
@RequestMapping("/condicionesiva")
public class CondicionIvaController {

	@Autowired 
	CondicionIvaService condicionIvaService;
	
	@GetMapping()
	public ResponseEntity<List<CondicionIvaModel>> getCondicionesIva(){
		return ResponseEntity.ok(condicionIvaService.obtenerCondicionesIva());
	}
	@GetMapping("/{id}")
	public ResponseEntity<Optional<CondicionIvaModel>> getCondicionesIva(@PathVariable int id){
		return ResponseEntity.ok(condicionIvaService.obtenerCondicionIvaById(id));
	}
}
