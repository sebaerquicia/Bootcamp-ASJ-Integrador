package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.models.DetalleOrdenModel;
import com.bootcamp.integradorback.repositories.DetalleOrdenRepository;

@Service
public class DetalleOrdenService {
	@Autowired
	DetalleOrdenRepository	detalleOrdenRepository;

	
	
	public List<DetalleOrdenModel> obtenerDetalles(){
		return detalleOrdenRepository.findAll();
	
	}
	
	public Optional<DetalleOrdenModel> obtenerDetalleById(int id){
		return detalleOrdenRepository.findById(id); 
	}

	public List<DetalleOrdenModel> cargarDetalle(DetalleOrdenModel detalle) {
		detalleOrdenRepository.save(detalle);
		return detalleOrdenRepository.findAll();
	}
	

	public List<DetalleOrdenModel> eliminarDetalle(int id) {
		detalleOrdenRepository.deleteById(id);
		return detalleOrdenRepository.findAll();
	} 
	
}
