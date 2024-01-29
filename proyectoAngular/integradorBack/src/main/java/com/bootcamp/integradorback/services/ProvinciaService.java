package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.models.ProvinciaModel;
import com.bootcamp.integradorback.repositories.ProvinciaRepository;


@Service
public class ProvinciaService {

	@Autowired
	ProvinciaRepository provinciaRepository;
	@Autowired
	PaisService paisService;
	
	// Para obtener Provincias
	public List<ProvinciaModel> obtenerProvincias(){
		return provinciaRepository.findAll();
	
	}
	
	// Para obtener una provincia
	public List<ProvinciaModel> obtenerProvinciaByIdPais(int id){
		return provinciaRepository.findByPais_id(id); 
	}

	public String updateProvincia(Integer id, ProvinciaModel provinciaEdit) {
		
		ProvinciaModel p = provinciaRepository.findById(id).get();
		if (p != null) {
			p.setNombre_provincia(provinciaEdit.getNombre_provincia());
			paisService.updatePais(provinciaEdit.getPais().getId(), provinciaEdit.getPais());
			provinciaRepository.save(p);
			return "Modificado con exito";
		}
		return "Error";
	}
}
