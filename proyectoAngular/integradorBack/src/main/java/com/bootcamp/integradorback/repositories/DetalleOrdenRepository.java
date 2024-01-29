package com.bootcamp.integradorback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integradorback.models.DetalleOrdenModel;

public interface DetalleOrdenRepository extends JpaRepository<DetalleOrdenModel, Integer>{}