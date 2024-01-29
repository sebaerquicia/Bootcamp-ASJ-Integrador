package com.bootcamp.integradorback.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "estadosorden")
public class EstadoOrdenModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotNull
	private String nombre_estado;
	

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNombre_estado() {
		return nombre_estado;
	}
	public void setNombre_estado(String nombre_estado) {
		this.nombre_estado = nombre_estado;
	}

	public EstadoOrdenModel() {
	}
	
	
	
}