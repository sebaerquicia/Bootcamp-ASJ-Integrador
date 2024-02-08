package com.bootcamp.integradorback.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.ProveedorModel;
import com.bootcamp.integradorback.services.ProveedorService;
import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/proveedores")
public class ProveedorController {
    @Autowired
    ProveedorService proveedorService;
    
    @GetMapping()
    public ResponseEntity<List<ProveedorModel>> getProveedores() {
        List<ProveedorModel> proveedores = proveedorService.obtenerProveedores();
        return ResponseEntity.ok(proveedores);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProveedorModel> getProveedorById(@PathVariable int id) {
        Optional<ProveedorModel> proveedor = proveedorService.obtenerProveedorById(id);
        if (proveedor.isPresent()) {
            return ResponseEntity.ok(proveedor.get());
        } else {
            throw new ResourceNotFoundException("Proveedor no encontrado con ID: " + id);
        }
    }
    
    @GetMapping("/activos")
    public ResponseEntity<List<ProveedorModel>> getProveedoresActivos() {
        List<ProveedorModel> proveedoresActivos = proveedorService.obtenerProveedoresActivos();
        return ResponseEntity.ok(proveedoresActivos);
    }
    
    @PostMapping() 
	public ResponseEntity<List<ProveedorModel>> cargarProveedor(@RequestBody ProveedorModel proveedor){
		return ResponseEntity.ok(proveedorService.cargarProveedor(proveedor));

	}
    
    @PutMapping("/{id}")
    public ResponseEntity<String> updateProveedor(@PathVariable int id, @RequestBody ProveedorModel proveedor) {
        String mensaje = proveedorService.modificarProveedor(id, proveedor);
        return ResponseEntity.ok(mensaje);
    }
    
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProveedor(@PathVariable int id) {
        String mensaje = proveedorService.eliminarProveedorById(id);
        return ResponseEntity.ok(mensaje);
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
