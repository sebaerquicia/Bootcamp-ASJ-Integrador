package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;
import com.bootcamp.integradorback.models.PaisModel;
import com.bootcamp.integradorback.repositories.PaisRepository;

@Service
public class PaisService {

    @Autowired
    PaisRepository paisRepository;
    
    public List<PaisModel> obtenerPaises() {
        try {
            return paisRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los países", e);
        }
    }
    
    public Optional<PaisModel> obtenerPaisById(int id) {
        try {
            Optional<PaisModel> pais = paisRepository.findById(id);
            if (pais.isPresent()) {
                return pais;
            } else {
                throw new ResourceNotFoundException("País no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener el país con ID: " + id, e);
        }
    }

    public String updatePais(Integer id, PaisModel paisEdit) {
        try {
            Optional<PaisModel> existingPais = paisRepository.findById(id);
            if (existingPais.isPresent()) {
                PaisModel p = existingPais.get();
                p.setNombre_pais(paisEdit.getNombre_pais());
                paisRepository.save(p);
                return "País modificado con éxito";
            } else {
                throw new ResourceNotFoundException("País no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al modificar el país con ID: " + id, e);
        }
    }
}

