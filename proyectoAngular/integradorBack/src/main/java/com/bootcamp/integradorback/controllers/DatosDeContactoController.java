package com.bootcamp.integradorback.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.DatosDeContactoModel;
import com.bootcamp.integradorback.services.DatosDeContactoService;

@RestController
@RequestMapping("/datosdecontacto")
public class DatosDeContactoController {
	@Autowired
	DatosDeContactoService contactoService;
	
	
	@GetMapping()
	public ResponseEntity<List<DatosDeContactoModel>> getContactos(){
		return ResponseEntity.ok(contactoService.obtenerContactos());
	
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<DatosDeContactoModel>> getContactoById(@PathVariable int id){
		return ResponseEntity.ok(contactoService.obtenerContactoById(id));
		
	}
	
	@PostMapping() 
	public ResponseEntity<List<DatosDeContactoModel>> cargarContacto(@RequestBody DatosDeContactoModel contacto){
		return ResponseEntity.ok(contactoService.cargarContacto(contacto));
		
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateContacto(@PathVariable int id, @RequestBody DatosDeContactoModel contacto){
		return ResponseEntity.ok(contactoService.modificarContacto(id, contacto));
		
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<List<DatosDeContactoModel>> deleteContacto(@PathVariable int id){
		return ResponseEntity.ok(contactoService.eliminarContacto(id));
	}
}