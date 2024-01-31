package com.bootcamp.integradorback.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integradorback.models.CategoriaModel;
import com.bootcamp.integradorback.models.ProvinciaModel;

public interface CategoriaRepository extends JpaRepository<CategoriaModel, Integer>{

}