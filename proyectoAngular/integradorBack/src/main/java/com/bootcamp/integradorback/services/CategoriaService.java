package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.models.CategoriaModel;
import com.bootcamp.integradorback.repositories.CategoriaRepository;


@Service
public class CategoriaService {
	@Autowired
	CategoriaRepository categoriaRepository;
	
	public List<CategoriaModel> obtenerCategorias(){
		return categoriaRepository.findAll();
	}
	
	public Optional<CategoriaModel> obtenerCategoriaById(int id){
		return categoriaRepository.findById(id);
	}
	
	

	public String updateCategoria(int id, CategoriaModel catEdit) {
		CategoriaModel c = categoriaRepository.findById(id).get(); 
		if(c != null) {
			c.setNombre_categoria(catEdit.getNombre_categoria());
			return "Categoria modificada";
		}
		return "Error";
	}

	
	
}
