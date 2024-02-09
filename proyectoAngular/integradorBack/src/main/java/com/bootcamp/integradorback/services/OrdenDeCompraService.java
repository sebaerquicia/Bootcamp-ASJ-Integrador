package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;
import com.bootcamp.integradorback.models.EstadoOrdenModel;
import com.bootcamp.integradorback.models.OrdenDeCompraModel;
import com.bootcamp.integradorback.repositories.EstadoOrdenRepository;
import com.bootcamp.integradorback.repositories.OrdenDeCompraRepository;

@Service
public class OrdenDeCompraService {
    
    @Autowired
    OrdenDeCompraRepository ordenRepository;
    @Autowired
    EstadoOrdenRepository estadoOrdenRepository;
    
    public List<OrdenDeCompraModel> obtenerOrdenes() {
        try {
            return ordenRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener las órdenes de compra", e);
        }
    }
    
    
    public List<OrdenDeCompraModel> obtenerOrdenesActivas() {
        try {
            return ordenRepository.obtenerOrdenesActivas();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener las órdenes de compra", e);
        }
    }
    
    
    public Optional<OrdenDeCompraModel> obtenerOrdenById(int id) {
        try {
            Optional<OrdenDeCompraModel> orden = ordenRepository.findById(id);
            if (orden.isPresent()) {
                return orden;
            } else {
                throw new ResourceNotFoundException("Orden de compra no encontrada con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener la orden de compra con ID: " + id, e);
        }
    }

    public List<OrdenDeCompraModel> cargarOrden(OrdenDeCompraModel orden) {
        try {
            ordenRepository.save(orden);
            return ordenRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al cargar la orden de compra", e);
        }
    }

    public OrdenDeCompraModel entregarOrden(int id, OrdenDeCompraModel orden) {
        try {
            Optional<OrdenDeCompraModel> existingOrden = ordenRepository.findById(id);
            Optional<EstadoOrdenModel> estadoEntregado = estadoOrdenRepository.findById(4);
            if (existingOrden.isPresent()) {
                OrdenDeCompraModel o = existingOrden.get();
                o.setEstadoOrden(estadoEntregado.get());
                
                return ordenRepository.save(o);
            } else {
                throw new ResourceNotFoundException("Orden de compra no encontrada con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al modificar la orden de compra con ID: " + id, e);
        }
    }

    public String eliminarOrdenById(int id) {
        try {
            Optional<OrdenDeCompraModel> existingOrden = ordenRepository.findById(id);
            if (existingOrden.isPresent()) {
                OrdenDeCompraModel o = existingOrden.get();
                o.setEliminada(!o.isEliminada());
                ordenRepository.save(o);
                return "Orden #" + id + " modificada";
            } else {
                throw new ResourceNotFoundException("Orden de compra no encontrada con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar la orden de compra con ID: " + id, e);
        }
    }
    

}

