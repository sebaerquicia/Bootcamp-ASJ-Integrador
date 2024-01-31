package com.bootcamp.integradorback.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.ProveedorModel;
import com.bootcamp.integradorback.services.ProveedorService;



@RestController
@RequestMapping("/proveedores")
public class ProveedorController {
	@Autowired
	ProveedorService proveedorService;
	
	
	@GetMapping()
	public ResponseEntity<List<ProveedorModel>> getProveedores(){
		return ResponseEntity.ok(proveedorService.obtenerProveedores());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<ProveedorModel>> getProveedorById(@PathVariable int id){
		return ResponseEntity.ok(proveedorService.obtenerProveedorById(id));

	}
	
	
	
	@PostMapping() 
	public ResponseEntity<List<ProveedorModel>> cargarProveedor(@RequestBody ProveedorModel proveedor){
		return ResponseEntity.ok(proveedorService.cargarProveedor(proveedor));

	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateProveedor(@PathVariable int id, @RequestBody ProveedorModel proveedor){
	return ResponseEntity.ok(proveedorService.modificarProveedor(id, proveedor));
	}
	
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteProveedor(@PathVariable int id){		
	return ResponseEntity.ok(proveedorService.eliminarProveedorById(id));
	}
}
