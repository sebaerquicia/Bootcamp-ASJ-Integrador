package com.bootcamp.integradorback.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;
import com.bootcamp.integradorback.models.CondicionIvaModel;
import com.bootcamp.integradorback.repositories.CondicionIvaRepository;

@Service
public class CondicionIvaService {
    @Autowired
    CondicionIvaRepository ivaRepository;
    
    public List<CondicionIvaModel> obtenerCondicionesIva() {
        try {
            return ivaRepository.findAll();
        } catch (Exception e) {
            
            throw new RuntimeException("Error al obtener las condiciones IVA", e);
        }
    }
    
    public CondicionIvaModel obtenerCondicionIvaById(int id) {
        try {
            return ivaRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Condición IVA no encontrada con ID: " + id));
        } catch (Exception e) {
            
            throw new RuntimeException("Error al obtener la condición IVA por ID: " + id, e);
        }
    }
}

