package com.bootcamp.integradorback.controllers;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.DetalleOrdenModel;
import com.bootcamp.integradorback.services.DetalleOrdenService;

@RestController
@RequestMapping("/datallesordenes")
public class DetalleOrdenController {
	@Autowired
	DetalleOrdenService detalleService;
	
	
	@GetMapping()
	public ResponseEntity<List<DetalleOrdenModel>> getDetalles(){
		return ResponseEntity.ok(detalleService.obtenerDetalles());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<DetalleOrdenModel>> getDetalleById(@PathVariable int id){
		return ResponseEntity.ok(detalleService.obtenerDetalleById(id));
	
	}
	
	@PostMapping() 
	public ResponseEntity<List<DetalleOrdenModel>> cargarDetalle(@RequestBody DetalleOrdenModel detalle){
		return ResponseEntity.ok(detalleService.cargarDetalle(detalle));
	
	}
	
//	@PutMapping("/{id}")
//	public ResponseEntity<String> updateDetalle(@PathVariable int id, @RequestBody DetalleOrdenModel detalle){		
//		return ResponseEntity.ok(detalleService.modificarDetalle(id, detalle));		
//	}
	@DeleteMapping("/{id}")
	public ResponseEntity<List<DetalleOrdenModel>> deleteDetalle(@PathVariable int id){
		
		return ResponseEntity.ok(detalleService.eliminarDetalle(id));

	}
}