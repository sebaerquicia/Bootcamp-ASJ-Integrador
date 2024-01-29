package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.models.RubroModel;
import com.bootcamp.integradorback.repositories.RubroRepository;


@Service
public class RubroService {
	
	@Autowired
	RubroRepository rubroRepository;
	
	// Para obtener Rubros
	public List<RubroModel> obtenerRubros(){
		return rubroRepository.findAll();	
	}
	
	// Para obtener un Rubro
	public Optional<RubroModel> obtenerRubroById(int id){
		return rubroRepository.findById(id); 
	}

	// Para insertar Rubro
	public List<RubroModel> cargarRubro(RubroModel rubro) {
		rubroRepository.save(rubro);
		return rubroRepository.findAll();
	}
	
}
