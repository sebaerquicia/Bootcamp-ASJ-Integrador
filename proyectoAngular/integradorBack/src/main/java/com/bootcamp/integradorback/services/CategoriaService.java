package com.bootcamp.integradorback.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;
import com.bootcamp.integradorback.models.CategoriaModel;
import com.bootcamp.integradorback.models.ProductoModel;
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
	
	
	 public List<CategoriaModel> obtenerCategoriasActivas() {
		 
	        List<CategoriaModel> categorias = categoriaRepository.findAll();
	        return categorias.stream()
	                        .filter(categoria -> !categoria.isEliminada())
	                        .collect(Collectors.toList());
	    }

	public List<CategoriaModel> cargarCategoria(CategoriaModel categoria) {
	try {
		categoriaRepository.save(categoria);
		return categoriaRepository.findAll();
	} catch (Exception e) {
        throw new RuntimeException("Error al cargar la categoria", e);
    }
		}
		

	public String actualizarCategoria(int id, CategoriaModel catEdit) {
		CategoriaModel c = categoriaRepository.findById(id).get(); 
		if(c != null) {
			c.setNombre_categoria(catEdit.getNombre_categoria());
			return "Categoria modificada";
		}
		return "Error";
	}

	//Modificar categoria
	public String modificarCategoria(int id, CategoriaModel categoria) {
		  try {
	            Optional<CategoriaModel> existingCategoria = categoriaRepository.findById(id);
	            if (existingCategoria.isPresent()) {
	                CategoriaModel c = existingCategoria.get();
	                c.setNombre_categoria(categoria.getNombre_categoria());
	                c.setEliminada(categoria.isEliminada());
	                categoriaRepository.save(c);
	                return "Categoria #" + id + " modificada";
	            } else {
	                throw new ResourceNotFoundException("Producto no encontrado con ID: " + id);
	            }
	        } catch (Exception e) {
	            throw new RuntimeException("Error al modificar el producto con ID: " + id, e);
	        }

	}
	
	
	   // Eliminar Categoria por id
    public String eliminarCategoriaById(int id) {
        try {
            Optional<CategoriaModel> existingCategoria = categoriaRepository.findById(id);
            if (existingCategoria.isPresent()) {
                CategoriaModel c = existingCategoria.get();
                c.setEliminada(!c.isEliminada());
                categoriaRepository.save(c);
                return "Categoria #" + id + " modificada";
            } else {
                throw new ResourceNotFoundException("Categoria no encontrada con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar la categoria con ID: " + id, e);
        }
    }



	
	
}
