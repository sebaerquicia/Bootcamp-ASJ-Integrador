package com.bootcamp.integradorback.repositories;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bootcamp.integradorback.models.ProveedorModel;

public interface ProveedorRepository extends JpaRepository<ProveedorModel, Integer>{
	@Query("SELECT p FROM ProveedorModel p WHERE p.eliminado = false")
    List<ProveedorModel> obtenerProveedoresActivos();
	
	@Query("SELECT p FROM ProveedorModel p ORDER BY p.razon_social ASC")
    List<ProveedorModel> findAllOrderedByRazonSocialAsc();
	
}
