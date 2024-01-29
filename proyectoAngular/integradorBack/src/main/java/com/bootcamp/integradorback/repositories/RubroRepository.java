package com.bootcamp.integradorback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integradorback.models.RubroModel;

public interface RubroRepository extends JpaRepository<RubroModel, Integer>{}