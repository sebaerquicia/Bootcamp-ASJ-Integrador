package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;
import com.bootcamp.integradorback.models.ProvinciaModel;
import com.bootcamp.integradorback.repositories.ProvinciaRepository;

@Service
public class ProvinciaService {

    @Autowired
    ProvinciaRepository provinciaRepository;
    
    @Autowired
    PaisService paisService;
    
    // Para obtener Provincias
    public List<ProvinciaModel> obtenerProvincias() {
        try {
            return provinciaRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener las provincias", e);
        }
    }
    
    // Para obtener una provincia por ID de país
    public List<ProvinciaModel> obtenerProvinciaByIdPais(int id) {
        try {
            return provinciaRepository.findByPais_id(id); 
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener las provincias del país con ID: " + id, e);
        }
    }

    // Para actualizar una provincia
    public String updateProvincia(Integer id, ProvinciaModel provinciaEdit) {
        try {
            Optional<ProvinciaModel> existingProvincia = provinciaRepository.findById(id);
            if (existingProvincia.isPresent()) {
                ProvinciaModel p = existingProvincia.get();
                p.setNombre_provincia(provinciaEdit.getNombre_provincia());
                paisService.updatePais(provinciaEdit.getPais().getId(), provinciaEdit.getPais());
                provinciaRepository.save(p);
                return "Provincia modificada con éxito";
            } else {
                throw new ResourceNotFoundException("Provincia no encontrada con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al modificar la provincia con ID: " + id, e);
        }
    }
}

