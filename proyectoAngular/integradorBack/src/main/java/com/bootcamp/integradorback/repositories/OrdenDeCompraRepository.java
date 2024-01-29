package com.bootcamp.integradorback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integradorback.models.OrdenDeCompraModel;

public interface OrdenDeCompraRepository extends JpaRepository<OrdenDeCompraModel, Integer>{}