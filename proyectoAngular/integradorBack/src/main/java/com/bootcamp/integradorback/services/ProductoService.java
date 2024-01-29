package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.models.ProductoModel;
import com.bootcamp.integradorback.repositories.ProductoRepository;

@Service
public class ProductoService {
	
	@Autowired
	ProductoRepository productoRepository;
	@Autowired
	CategoriaService categoriaService;
	
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
			categoriaService.updateCategoria(producto.getCategoria().getId(), producto.getCategoria());
			
			productoRepository.save(p);
			return "Producto #" + id +" modificado";
		}
		return "No se encontro el producto";
	
	}
	
//	// Para eliminar tarea
//	public List<TareaModel> eliminarProducto(int id) {
//		tareaRepository.deleteById(id);
//		return tareaRepository.findAll();
//	}
//	
}
