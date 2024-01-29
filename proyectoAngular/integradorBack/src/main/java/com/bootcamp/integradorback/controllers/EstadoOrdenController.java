package com.bootcamp.integradorback.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.EstadoOrdenModel;
import com.bootcamp.integradorback.services.EstadoOrdenService;

@RestController
@RequestMapping("/estadoorden")
public class EstadoOrdenController {
	@Autowired
	EstadoOrdenService estadoService;
	
	
	@GetMapping()
	public ResponseEntity<List<EstadoOrdenModel>> getEstadosOrdenes(){
		return ResponseEntity.ok(estadoService.obtenerEstadosOrdenes());

	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<EstadoOrdenModel>> getEstadoOrdenById(@PathVariable int id){
		return ResponseEntity.ok(estadoService.obtenerEstadoOrdenById(id));

	}
	
	@PutMapping("/{id}")
	public ResponseEntity<List<EstadoOrdenModel>> updateEstadoOrden(@PathVariable int id, @RequestBody EstadoOrdenModel estado){		
		return ResponseEntity.ok(estadoService.modificarEstadoOrden(id, estado));
		}
}
