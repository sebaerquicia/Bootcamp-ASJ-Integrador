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
			//provinciaService.updateProvincia(proveedor.getProvincia().getId(), proveedor.getProvincia());
			p.setProvincia(provinciaService.obtenerProvinciaByIdPais(proveedor.getProvincia().getId()).get(id));
			contactoService.updateContacto(proveedor.getContacto().getId(), proveedor.getContacto());
			provRepository.save(p);
			return "Proveedor #" + id +" modificado";
		}
		return "No se encontro el proveedor";
		}
		catch(Exception err){
			return "error";
		}
		
		
	}
	

}
