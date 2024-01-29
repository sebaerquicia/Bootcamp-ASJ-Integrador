package com.bootcamp.integradorback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integradorback.models.CategoriaModel;

public interface CategoriaRepository extends JpaRepository<CategoriaModel, Integer>{}