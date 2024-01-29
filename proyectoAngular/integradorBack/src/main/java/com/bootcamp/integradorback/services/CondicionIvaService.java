package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.models.CondicionIvaModel;
import com.bootcamp.integradorback.repositories.CondicionIvaRepository;

@Service
public class CondicionIvaService {
	@Autowired
	CondicionIvaRepository ivaRepository;
	
	public List<CondicionIvaModel> obtenerCondicionesIva(){
		return ivaRepository.findAll();
	}
	
	public Optional<CondicionIvaModel> obtenerCondicionIvaById(int id){
		return ivaRepository.findById(id);
	}

}
