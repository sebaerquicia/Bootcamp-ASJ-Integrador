package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	CategoriaService categoriaService;
	@Autowired
	CategoriaRepository catRepository;
	@Autowired
	ProveedorRepository proveedorRepository;
	
	// Para obtener todos los productos
	public List<ProductoModel> obtenerProductos(){
		return productoRepository.findAll();

	
	}
	
	// Para obtener un producto por id
	public Optional<ProductoModel> obtenerProductoById(int id){
		return productoRepository.findById(id); 
	}

	// Para insertar un producto
	public List<ProductoModel> cargarProducto(ProductoModel producto) {
		productoRepository.save(producto);
		return productoRepository.findAll();
	}
	
	
	// Para modificar producto
	public String modificarProducto(int id, ProductoModel producto) {
		ProductoModel p = productoRepository.findById(id).get(); 
		if(p != null) {
			p.setNombre_producto(producto.getNombre_producto());
			p.setPrecio_producto(producto.getPrecio_producto());;
			p.setDescripcion(producto.getDescripcion());
			p.setUrl_img(producto.getUrl_img());
			p.setCategoria(producto.getCategoria());
			productoRepository.save(p);
			return "Producto #" + id +" modificado";
		}
		return "No se encontro el producto";
	
	}
	

	public List<ProductoModel> obtenerProductoPorCategoria(int id){
		CategoriaModel categoria = catRepository.findById(id).get();
		List<ProductoModel> resul = productoRepository.findByCategoria(categoria);
		return resul;
		
	}
	
	
	public List<ProductoModel> obtenerProductoPorProveedor(int id){
		ProveedorModel proveedor = proveedorRepository.findById(id).get();
		List<ProductoModel> resul = productoRepository.findByProveedor(proveedor);
		return resul;
		
	}
	
	
	//Para eliminar producto por id
	public String eliminarProductoById(int id){		
		try {
		ProductoModel p = productoRepository.findById(id).get();
		if(p != null) {
			p.setEliminado(!p.isEliminado());
			productoRepository.save(p);
			return "Proveedor #" + id +" modificado";
		}
		return null;
		}
		catch(Exception err){
			
			return "Error";
		}
	}
	
}
