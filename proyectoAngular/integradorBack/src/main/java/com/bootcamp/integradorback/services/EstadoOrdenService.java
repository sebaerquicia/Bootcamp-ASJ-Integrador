package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;
import com.bootcamp.integradorback.models.EstadoOrdenModel;
import com.bootcamp.integradorback.repositories.EstadoOrdenRepository;

@Service
public class EstadoOrdenService {
    
    @Autowired
    EstadoOrdenRepository estadoRepository;

    public List<EstadoOrdenModel> obtenerEstadosOrdenes() {
        try {
            return estadoRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los estados de orden", e);
        }
    }
    
    public Optional<EstadoOrdenModel> obtenerEstadoOrdenById(int id) {
        try {
            Optional<EstadoOrdenModel> estado = estadoRepository.findById(id);
            if (estado.isPresent()) {
                return estado;
            } else {
                throw new ResourceNotFoundException("Estado de orden no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener el estado de orden con ID: " + id, e);
        }
    }

    public List<EstadoOrdenModel> modificarEstadoOrden(int id, EstadoOrdenModel estado) {
        try {
            Optional<EstadoOrdenModel> existingEstado = estadoRepository.findById(id);
            if (existingEstado.isPresent()) {
                estado.setId(id); 
                estadoRepository.save(estado);
                return estadoRepository.findAll();
            } else {
                throw new ResourceNotFoundException("Estado de orden no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al modificar el estado de orden con ID: " + id, e);
        }
    }
}
