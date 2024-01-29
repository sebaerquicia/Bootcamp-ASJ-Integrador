package com.bootcamp.integradorback.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integradorback.models.ProvinciaModel;



public interface ProvinciaRepository extends JpaRepository<ProvinciaModel, Integer>{
	
	List<ProvinciaModel> findByPais_id(int id);
}