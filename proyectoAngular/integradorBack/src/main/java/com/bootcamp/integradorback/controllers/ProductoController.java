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

import com.bootcamp.integradorback.models.ProductoModel;
import com.bootcamp.integradorback.services.ProductoService;

@RestController
@RequestMapping("/productos")
public class ProductoController {
	  @Autowired
		ProductoService productoService;
		
		
		@GetMapping()
		public ResponseEntity<List<ProductoModel>> getProductos(){
			return ResponseEntity.ok(productoService.obtenerProductos());
		}
		
		@GetMapping("/{id}")
		public ResponseEntity<Optional<ProductoModel>> getProductoById(@PathVariable int id){
			return ResponseEntity.ok(productoService.obtenerProductoById(id));
	
		}
		@GetMapping("/categorias/{id}")
		public ResponseEntity<List<ProductoModel>> getCatProductoById(@PathVariable int id){
			return ResponseEntity.ok(productoService.obtenerProductoPorCategoria(id));
	
		}
		
		@PostMapping() 
		public ResponseEntity<List<ProductoModel>> cargarProducto(@RequestBody ProductoModel producto){
			return ResponseEntity.ok(productoService.cargarProducto(producto));
		}
		
		@PutMapping("/{id}")
		public ResponseEntity<String> updateProducto(@PathVariable int id, @RequestBody ProductoModel producto){			
			return ResponseEntity.ok(productoService.modificarProducto(id, producto));

		}
		@DeleteMapping("/{id}")
		public ResponseEntity<String> deleteProducto(@PathVariable int id){		
		return ResponseEntity.ok(productoService.eliminarProductoById(id));
		}
}
