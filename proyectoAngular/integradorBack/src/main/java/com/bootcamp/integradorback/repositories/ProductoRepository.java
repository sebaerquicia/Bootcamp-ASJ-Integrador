package com.bootcamp.integradorback.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bootcamp.integradorback.models.CategoriaModel;
import com.bootcamp.integradorback.models.ProductoModel;
import com.bootcamp.integradorback.models.ProveedorModel;


public interface ProductoRepository extends JpaRepository<ProductoModel, Integer>{
	@Query("SELECT p FROM ProductoModel p WHERE p.eliminado = false")
    List<ProductoModel> obtenerProductosActivos();
	
	List<ProductoModel> findByCategoria(CategoriaModel categoria);
	List<ProductoModel> findByProveedor(ProveedorModel proveedor);
	
}
