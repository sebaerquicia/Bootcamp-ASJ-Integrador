package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.bootcamp.integradorback.models.EstadoOrdenModel;
import com.bootcamp.integradorback.repositories.EstadoOrdenRepository;

@Service
public class EstadoOrdenService {
	@Autowired
	EstadoOrdenRepository estadoRepository;

	
	
	public List<EstadoOrdenModel> obtenerEstadosOrdenes(){
		return estadoRepository.findAll();
	
	}
	
	public Optional<EstadoOrdenModel> obtenerEstadoOrdenById(int id){
		return estadoRepository.findById(id); 
	}
	
	public List<EstadoOrdenModel> modificarEstadoOrden(@PathVariable int id,@RequestBody EstadoOrdenModel estado) {
		estadoRepository.save(estado);
		return estadoRepository.findAll();
	}
	
}
