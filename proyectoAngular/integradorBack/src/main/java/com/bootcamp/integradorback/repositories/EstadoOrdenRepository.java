package com.bootcamp.integradorback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integradorback.models.EstadoOrdenModel;

public interface EstadoOrdenRepository extends JpaRepository<EstadoOrdenModel, Integer>{}
