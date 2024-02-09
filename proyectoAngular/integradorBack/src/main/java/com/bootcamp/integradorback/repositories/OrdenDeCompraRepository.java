package com.bootcamp.integradorback.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bootcamp.integradorback.models.OrdenDeCompraModel;

public interface OrdenDeCompraRepository extends JpaRepository<OrdenDeCompraModel, Integer>{
	
	
	@Query("SELECT o FROM OrdenDeCompraModel o WHERE o.eliminada = false")
    List<OrdenDeCompraModel> obtenerOrdenesActivas();
}