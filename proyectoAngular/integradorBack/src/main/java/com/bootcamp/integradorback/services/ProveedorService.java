package com.bootcamp.integradorback.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;
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
    public List<ProveedorModel> obtenerProveedores() {
        try {
            return provRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los proveedores", e);
        }
    }
    
    // Para obtener un proveedor
    public Optional<ProveedorModel> obtenerProveedorById(int id) {
        try {
            Optional<ProveedorModel> proveedor = provRepository.findById(id);
            if (proveedor.isPresent()) {
                return proveedor;
            } else {
                throw new ResourceNotFoundException("Proveedor no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener el proveedor con ID: " + id, e);
        }
    }

    // Para agregar un proveedor
    public List<ProveedorModel> cargarProveedor(ProveedorModel proveedor) {
        try {
            contactoService.cargarContacto(proveedor.getContacto());
            provRepository.save(proveedor);
            return provRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error al cargar el proveedor", e);
        }
    }
    
    
    // Para modificar proveedor
    public String modificarProveedor(int id, ProveedorModel proveedor) {
        try {
            Optional<ProveedorModel> existingProveedor = provRepository.findById(id);
            if (existingProveedor.isPresent()) {
                ProveedorModel p = existingProveedor.get();
                p.setWeb(proveedor.getWeb());
                p.setCalle(proveedor.getCalle());
                p.setNumero_calle(proveedor.getNumero_calle());
                p.setLocalidad(proveedor.getLocalidad());
                p.setRazon_social(proveedor.getRazon_social());
                p.setCodigo_proveedor(proveedor.getCodigo_proveedor());
                p.setImg(proveedor.getImg());
                p.setCodigo_postal(proveedor.getCodigo_postal());
                p.setRubro_proveedor(proveedor.getRubro_proveedor());
                p.setProvincia(proveedor.getProvincia());
                p.setIva(proveedor.getIva());
                contactoService.updateContacto(p.getContacto().getId(), proveedor.getContacto());
                provRepository.save(p);
                return "Proveedor #" + id + " modificado";
            } else {
                throw new ResourceNotFoundException("Proveedor no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al modificar el proveedor con ID: " + id, e);
        }
    }
    
    
    //Para eliminar proveedor por id
    public String eliminarProveedorById(int id) {
        try {
            Optional<ProveedorModel> existingProveedor = provRepository.findById(id);
            if (existingProveedor.isPresent()) {
                ProveedorModel p = existingProveedor.get();
                p.setEliminado(!p.isEliminado());
                provRepository.save(p);
                return "Proveedor #" + id + " modificado";
            } else {
                throw new ResourceNotFoundException("Proveedor no encontrado con ID: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar el proveedor con ID: " + id, e);
        }
    }

    public List<ProveedorModel> obtenerProveedoresActivos() {
        try {
            return provRepository.obtenerProveedoresActivos();
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los proveedores activos", e);
        }
    }
}

