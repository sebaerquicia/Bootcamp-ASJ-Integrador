package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;
import com.bootcamp.integradorback.models.RubroModel;
import com.bootcamp.integradorback.repositories.RubroRepository;

@Service
public class RubroService {
    
    @Autowired
    RubroRepository rubroRepository;
    
    // Para obtener Rubros
    public List<RubroModel> obtenerRubros() {
        try {
            return rubroRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los rubros", e);
        }
    }
    
    // Para obtener un Rubro por su ID
    public Optional<RubroModel> obtenerRubroById(int id) {
        try {
            return rubroRepository.findById(id); 
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener el rubro con ID: " + id, e);
        }
    }

    // Para insertar un Rubro
    public List<RubroModel> cargarRubro(RubroModel rubro) {
        try {
            rubroRepository.save(rubro);
            return rubroRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al cargar el rubro", e);
        }
    }
}

