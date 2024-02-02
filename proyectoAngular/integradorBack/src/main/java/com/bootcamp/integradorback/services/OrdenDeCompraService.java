package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.models.OrdenDeCompraModel;
import com.bootcamp.integradorback.models.ProductoModel;
import com.bootcamp.integradorback.repositories.OrdenDeCompraRepository;


@Service
public class OrdenDeCompraService {
	
	@Autowired
	OrdenDeCompraRepository ordenRepository;
	
	// Obtengo todas las ordenes
	public List<OrdenDeCompraModel> obtenerOrdenes(){
		return ordenRepository.findAll();
	}
	// Obtengo una orden por id
	public Optional<OrdenDeCompraModel> obtenerOrdenById(int id){
		return ordenRepository.findById(id); 
	}

	// Para insertar orden
	public List<OrdenDeCompraModel> cargarOrden(OrdenDeCompraModel orden) {
		ordenRepository.save(orden);
		return ordenRepository.findAll();
	}
	
	
	// Para modificar orden de compra
	public String modificarOrden(int id, OrdenDeCompraModel orden) {
		OrdenDeCompraModel o = ordenRepository.findById(id).get();
		if(o != null) {
			o.setFecha_entrega_esperada(orden.getFecha_entrega_esperada());
			o.setEstadoOrden(orden.getEstadoOrden());
			o.setInformacion_orden(orden.getInformacion_orden());
			
			ordenRepository.save(o);
			return "Orden #" + id +" modificada";
		}
		return "No se encontro la orden";
		
	}
	
	// Para eliminar Orden de compra
	public String eliminarOrdenById(int id) {
		try {
		OrdenDeCompraModel o = ordenRepository.findById(id).get();
		if(o != null) {
			o.setEliminada(!o.isEliminada());
			ordenRepository.save(o);
			return "Orden #" + id +" modificada";
		}
		return null;
		}
		catch(Exception err){
			
			return "Error";
		}
	}
	
}
