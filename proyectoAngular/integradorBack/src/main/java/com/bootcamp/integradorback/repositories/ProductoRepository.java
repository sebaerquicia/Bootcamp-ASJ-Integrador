package com.bootcamp.integradorback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integradorback.models.ProductoModel;

public interface ProductoRepository extends JpaRepository<ProductoModel, Integer>{}
