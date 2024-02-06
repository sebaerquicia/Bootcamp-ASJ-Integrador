package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;
import com.bootcamp.integradorback.models.DatosDeContactoModel;
import com.bootcamp.integradorback.repositories.DatosDeContactoRepository;

@Service
public class DatosDeContactoService {
    
    @Autowired
    DatosDeContactoRepository datosContactoRepository;
    
    public List<DatosDeContactoModel> obtenerContactos() {
        try {
            return datosContactoRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los contactos", e);
        }
    }
    
    public Optional<DatosDeContactoModel> obtenerContactoById(int id) {
        try {
            return datosContactoRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener el contacto con ID: " + id, e);
        }
    }

    public String cargarContacto(DatosDeContactoModel contacto) {
        try {
            datosContactoRepository.save(contacto);
            return "Creado datos de contacto";
        } catch (Exception e) {
            throw new RuntimeException("Error al cargar el contacto", e);
        }
    }

    public String modificarContacto(int id, DatosDeContactoModel contacto) {
        try {
            DatosDeContactoModel c = datosContactoRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Contacto no encontrado con ID: " + id));
            if (c != null) {
                c.setNombre_contacto(contacto.getNombre_contacto());
                c.setApellido_contacto(contacto.getApellido_contacto());
                c.setRol(contacto.getRol());
                c.setTelefono_contacto(contacto.getTelefono_contacto());
                c.setEmail_contacto(contacto.getEmail_contacto());
                datosContactoRepository.save(c);
                return "Contacto #" + id + " modificado";
            }
            throw new ResourceNotFoundException("No se encontró el contacto con ID: " + id);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error al modificar el contacto con ID: " + id, e);
        }
    }

    public List<DatosDeContactoModel> eliminarContacto(int id) {
        try {
            datosContactoRepository.deleteById(id);
            return datosContactoRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar el contacto con ID: " + id, e);
        }
    }

    public String updateContacto(Integer id, DatosDeContactoModel contactoEdit) {
        try {
            DatosDeContactoModel dc = datosContactoRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Contacto no encontrado con ID: " + id));
            if (dc != null) {
                dc.setApellido_contacto(contactoEdit.getApellido_contacto());
                dc.setNombre_contacto(contactoEdit.getNombre_contacto());
                dc.setRol(contactoEdit.getRol());
                dc.setEmail_contacto(contactoEdit.getEmail_contacto());
                dc.setTelefono_contacto(contactoEdit.getTelefono_contacto());
                return "Modificado con éxito";
            }
            throw new ResourceNotFoundException("No se encontró el contacto con ID: " + id);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error al modificar el contacto con ID: " + id, e);
        }
    }
}

