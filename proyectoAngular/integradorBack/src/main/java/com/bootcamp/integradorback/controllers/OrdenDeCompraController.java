package com.bootcamp.integradorback.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.OrdenDeCompraModel;
import com.bootcamp.integradorback.services.OrdenDeCompraService;

@RestController
@RequestMapping("/ordenes_de_compra")
public class OrdenDeCompraController {

	  @Autowired
		OrdenDeCompraService ordenService;
		
		
		@GetMapping()
		public ResponseEntity<List<OrdenDeCompraModel>> getOrdenes(){
			return ResponseEntity.ok(ordenService.obtenerOrdenes());
		}
		
		@GetMapping("/{id}")
		public ResponseEntity<Optional<OrdenDeCompraModel>> getOrdenesById(@PathVariable int id){
			return ResponseEntity.ok(ordenService.obtenerOrdenById(id));

		}
		
		@PostMapping() 
		public ResponseEntity<List<OrdenDeCompraModel>> cargarOrden(@RequestBody OrdenDeCompraModel orden){
			return ResponseEntity.ok(ordenService.cargarOrden(orden));

		}
		
		@PutMapping("/{id}")
		public ResponseEntity<String> updateOrden(@PathVariable int id, @RequestBody OrdenDeCompraModel orden){
			
			return ResponseEntity.ok(ordenService.modificarOrden(id, orden));

		}
//		@DeleteMapping("/{id}")
//		public ResponseEntity<List<OrdenDeCompraModel>> deleteOrden(@PathVariable int id){
//			
//			return ResponseEntity.ok(ordenService.eliminarOrden(id));
//
//		}
}
