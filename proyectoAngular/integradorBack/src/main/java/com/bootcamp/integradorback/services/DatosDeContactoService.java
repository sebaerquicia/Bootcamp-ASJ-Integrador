package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.models.DatosDeContactoModel;
import com.bootcamp.integradorback.repositories.DatosDeContactoRepository;


@Service
public class DatosDeContactoService {
	
	@Autowired
	DatosDeContactoRepository datosContactoRepository;
	
	
	public List<DatosDeContactoModel> obtenerContactos(){
		return datosContactoRepository.findAll();

	
	}
	
	public Optional<DatosDeContactoModel> obtenerContactoById(int id){
		return datosContactoRepository.findById(id); 
	}

	public String cargarContacto(DatosDeContactoModel contacto) {
		datosContactoRepository.save(contacto);
		return "creado datos de contacto";
	}
	

	public String modificarContacto(int id, DatosDeContactoModel contacto) {
		DatosDeContactoModel c = datosContactoRepository.findById(id).get();
		if(c != null) {
			c.setNombre_contacto(contacto.getNombre_contacto());
			c.setApellido_contacto(contacto.getApellido_contacto());
			c.setRol(contacto.getRol());
			c.setTelefono_contacto(contacto.getTelefono_contacto());
			c.setEmail_contacto(contacto.getEmail_contacto());
			datosContactoRepository.save(c);
			return "Contacto #" + id +" modificado";
		}
		return "No se encontro el contacto";
		
	}
	

	public List<DatosDeContactoModel> eliminarContacto(int id) {
		datosContactoRepository.deleteById(id);
		return datosContactoRepository.findAll();
	}

	public String updateContacto(Integer id, DatosDeContactoModel contactoEdit) {
			DatosDeContactoModel dc = datosContactoRepository.findById(id).get();
			if (dc != null) {
				dc.setApellido_contacto(contactoEdit.getApellido_contacto());
				dc.setNombre_contacto(contactoEdit.getNombre_contacto());				
				dc.setRol(contactoEdit.getRol());
				dc.setEmail_contacto(contactoEdit.getEmail_contacto());
				dc.setTelefono_contacto(contactoEdit.getTelefono_contacto());
				return "Modificado con exito";
			}
			return "Error modificando el contacto";
		
	}
	
}
