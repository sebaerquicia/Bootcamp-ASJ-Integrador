package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;
import com.bootcamp.integradorback.models.CategoriaModel;
import com.bootcamp.integradorback.models.ProductoModel;
import com.bootcamp.integradorback.models.ProveedorModel;
import com.bootcamp.integradorback.repositories.CategoriaRepository;
import com.bootcamp.integradorback.repositories.ProductoRepository;
import com.bootcamp.integradorback.repositories.ProveedorRepository;

@Service
public class ProductoService {
    
    @Autowired
    ProductoRepository productoRepository;
    
    @Autowired
    CategoriaRepository catRepository;
    
    @Autowired
    ProveedorRepository proveedorRepository;

    // Para obtener todos los productos
    public List<ProductoModel> obtenerProductos() {
        try {
            return productoRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los productos", e);
        }
    }
    
    // Para obtener un producto por id
    public Optional<ProductoModel> obtenerProductoById(int id) {
        try {
            Optional<ProductoModel> producto = productoRepository.findById(id);
            if (producto.isPresent()) {
                return producto;
            } else {
                throw new ResourceNotFoundException("Producto no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener el producto con ID: " + id, e);
        }
    }

    // Para insertar un producto
    public List<ProductoModel> cargarProducto(ProductoModel producto) {
        try {
            productoRepository.save(producto);
            return productoRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al cargar el producto", e);
        }
    }
    
    
    // Para modificar producto
    public String modificarProducto(int id, ProductoModel producto) {
        try {
            Optional<ProductoModel> existingProducto = productoRepository.findById(id);
            if (existingProducto.isPresent()) {
                ProductoModel p = existingProducto.get();
                p.setNombre_producto(producto.getNombre_producto());
                p.setPrecio_producto(producto.getPrecio_producto());
                p.setDescripcion(producto.getDescripcion());
                p.setUrl_img(producto.getUrl_img());
                p.setCategoria(producto.getCategoria());
                productoRepository.save(p);
                return "Producto #" + id + " modificado";
            } else {
                throw new ResourceNotFoundException("Producto no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al modificar el producto con ID: " + id, e);
        }
    }

    public List<ProductoModel> obtenerProductoPorCategoria(int id) {
        try {
            CategoriaModel categoria = catRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con ID: " + id));
            return productoRepository.findByCategoria(categoria);
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los productos por categoría", e);
        }
    }
    
    
    public List<ProductoModel> obtenerProductoPorProveedor(int id) {
        try {
            ProveedorModel proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado con ID: " + id));
            return productoRepository.findByProveedor(proveedor);
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los productos por proveedor", e);
        }
    }
    
    
    // Para eliminar producto por id
    public String eliminarProductoById(int id) {
        try {
            Optional<ProductoModel> existingProducto = productoRepository.findById(id);
            if (existingProducto.isPresent()) {
                ProductoModel p = existingProducto.get();
                p.setEliminado(!p.isEliminado());
                productoRepository.save(p);
                return "Producto #" + id + " modificado";
            } else {
                throw new ResourceNotFoundException("Producto no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar el producto con ID: " + id, e);
        }
    }
}

