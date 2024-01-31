package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.models.ProveedorModel;
import com.bootcamp.integradorback.repositories.ProveedorRepository;

@Service
public class ProveedorService {
	
	@Autowired
	ProveedorRepository provRepository;
	@Autowired
	ProvinciaService provinciaService;
	@Autowired
	DatosDeContactoService contactoService;
	
	
	// Para obtener Proveedores
	public List<ProveedorModel> obtenerProveedores(){
		return provRepository.findAll();
	
	}
	
	// Para obtener un proveedor
	public Optional<ProveedorModel> obtenerProveedorById(int id){
		return provRepository.findById(id); 
	}

	// Para agregar un proveedor
	public List<ProveedorModel> cargarProveedor(ProveedorModel proveedor) {
		contactoService.cargarContacto(proveedor.getContacto());
		provRepository.save(proveedor);
		return provRepository.findAll();
	}
	
	
	// Para modificar proveedor
	public String modificarProveedor(int id, ProveedorModel proveedor) {
		try {
		ProveedorModel p = provRepository.findById(id).get();
		if(p != null) {
			p.setWeb(proveedor.getWeb());
			p.setCalle(proveedor.getCalle());
			p.setNumero_calle(proveedor.getNumero_calle());
			p.setLocalidad(proveedor.getLocalidad());
			p.setRazon_social(proveedor.getRazon_social());
			p.setCodigo_proveedor(proveedor.getCodigo_proveedor());
			p.setImg(proveedor.getImg());
			p.setCodigo_postal(proveedor.getCodigo_postal());
			p.setRubro_proveedor(proveedor.getRubro_proveedor());
			//provinciaService.updateProvincia(proveedor.getProvincia().getId(), proveedor.getProvincia());
			p.setProvincia(proveedor.getProvincia());
			p.setIva(proveedor.getIva());
			contactoService.updateContacto(p.getContacto().getId(), proveedor.getContacto());
			provRepository.save(p);
			return "Proveedor #" + id +" modificado";
		}
		return "No se encontro el proveedor";
		}
		catch(Exception err){
			return "Error modificando el proveedor";
		}
	}
	
	
	//Para eliminar proveedor por id
	public String eliminarProveedorById(int id){		
		try {
		ProveedorModel p = provRepository.findById(id).get();
		if(p != null) {
			p.setEliminado(!p.isEliminado());
			provRepository.save(p);
			return "Proveedor #" + id +" modificado";
		}
		return null;
		}
		catch(Exception err){
			
			return "Error";
		}
	}
	

}
