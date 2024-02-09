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

import com.bootcamp.integradorback.models.ProductoModel;
import com.bootcamp.integradorback.models.ProveedorModel;
import com.bootcamp.integradorback.services.ProductoService;
import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    ProductoService productoService;
    
    @GetMapping()
    public ResponseEntity<List<ProductoModel>> getProductos() {
        List<ProductoModel> productos = productoService.obtenerProductos();
        return ResponseEntity.ok(productos);
    }
    
    @GetMapping("/activos")
    public ResponseEntity<List<ProductoModel>> getProductosActivos() {
        List<ProductoModel> productosActivos = productoService.obtenerProductosActivos();
        return ResponseEntity.ok(productosActivos);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<ProductoModel> getProductoById(@PathVariable int id) {
        Optional<ProductoModel> producto = productoService.obtenerProductoById(id);
        if (producto.isPresent()) {
            return ResponseEntity.ok(producto.get());
        } else {
            throw new ResourceNotFoundException("Producto no encontrado con ID: " + id);
        }
    }
    
    @GetMapping("/categorias/{id}")
    public ResponseEntity<List<ProductoModel>> getCatProductoById(@PathVariable int id) {
        List<ProductoModel> productos = productoService.obtenerProductoPorCategoria(id);
        return ResponseEntity.ok(productos);
    }
    
    @GetMapping("/proveedor/{id}")
    public ResponseEntity<List<ProductoModel>> getProductosByProveedorId(@PathVariable int id) {
        List<ProductoModel> productos = productoService.obtenerProductoPorProveedor(id);
        return ResponseEntity.ok(productos);
    }
    
    @PostMapping() 
    public ResponseEntity<List<ProductoModel>> cargarProducto(@RequestBody ProductoModel producto) {
        List<ProductoModel> productos = productoService.cargarProducto(producto);
        return ResponseEntity.ok(productos);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<String> updateProducto(@PathVariable int id, @RequestBody ProductoModel producto) {
        String mensaje = productoService.modificarProducto(id, producto);
        return ResponseEntity.ok(mensaje);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProducto(@PathVariable int id) {
        String mensaje = productoService.eliminarProductoById(id);
        return ResponseEntity.ok(mensaje);
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
