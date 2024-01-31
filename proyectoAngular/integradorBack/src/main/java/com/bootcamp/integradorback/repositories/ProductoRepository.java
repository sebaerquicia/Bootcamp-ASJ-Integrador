package com.bootcamp.integradorback.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integradorback.models.CategoriaModel;
import com.bootcamp.integradorback.models.ProductoModel;

public interface ProductoRepository extends JpaRepository<ProductoModel, Integer>{
	
	List<ProductoModel> findByCategoria(CategoriaModel categoria);
}
