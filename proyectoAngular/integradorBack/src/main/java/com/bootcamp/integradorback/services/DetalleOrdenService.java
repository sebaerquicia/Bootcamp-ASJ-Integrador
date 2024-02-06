package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;
import com.bootcamp.integradorback.models.DetalleOrdenModel;
import com.bootcamp.integradorback.repositories.DetalleOrdenRepository;

@Service
public class DetalleOrdenService {
    
    @Autowired
    DetalleOrdenRepository detalleOrdenRepository;

    public List<DetalleOrdenModel> obtenerDetalles() {
        try {
            return detalleOrdenRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los detalles de orden", e);
        }
    }
    
    public Optional<DetalleOrdenModel> obtenerDetalleById(int id) {
        try {
            return detalleOrdenRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener el detalle de orden con ID: " + id, e);
        }
    }

    public List<DetalleOrdenModel> cargarDetalle(DetalleOrdenModel detalle) {
        try {
            detalleOrdenRepository.save(detalle);
            return detalleOrdenRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al cargar el detalle de orden", e);
        }
    }

    public List<DetalleOrdenModel> eliminarDetalle(int id) {
        try {
            detalleOrdenRepository.deleteById(id);
            return detalleOrdenRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar el detalle de orden con ID: " + id, e);
        }
    }
}
