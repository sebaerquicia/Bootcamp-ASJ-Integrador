package com.bootcamp.integradorback.repositories;



import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integradorback.models.ProveedorModel;

public interface ProveedorRepository extends JpaRepository<ProveedorModel, Integer>{

}
