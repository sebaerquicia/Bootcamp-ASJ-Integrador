package com.bootcamp.integradorback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integradorback.models.PaisModel;

public interface PaisRepository extends JpaRepository<PaisModel, Integer>{}