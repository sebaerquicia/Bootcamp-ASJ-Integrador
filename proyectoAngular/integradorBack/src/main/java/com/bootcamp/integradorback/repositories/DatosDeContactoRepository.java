package com.bootcamp.integradorback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integradorback.models.DatosDeContactoModel;

public interface DatosDeContactoRepository extends JpaRepository<DatosDeContactoModel, Integer>{}
