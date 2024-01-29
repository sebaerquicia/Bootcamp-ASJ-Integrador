package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.models.PaisModel;
import com.bootcamp.integradorback.repositories.PaisRepository;

@Service
public class PaisService {

	@Autowired
	PaisRepository paisRepository;
	
	
	// Para obtener Paises
	public List<PaisModel> obtenerPaises(){
		return paisRepository.findAll();

	}
	
	//para obtener 1 pais
	public Optional<PaisModel> obtenerPaisById(int id){
		return paisRepository.findById(id); 
	}

	public String updatePais(Integer id, PaisModel paisEdit) {
		PaisModel p = paisRepository.findById(id).get();
		if(p != null) {
			p.setNombre_pais(paisEdit.getNombre_pais());			
			paisRepository.save(p);
			return "Pais modificado con exito";
		}
		return"Error";
		
	}


}
