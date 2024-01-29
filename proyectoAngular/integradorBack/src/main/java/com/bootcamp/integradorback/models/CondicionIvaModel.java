package com.bootcamp.integradorback.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name = "condicionesiva")
public class CondicionIvaModel {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@NotNull
	private String nombre_iva;
	
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNombre_iva() {
		return nombre_iva;
	}
	public void setNombre_iva(String nombre_iva) {
		this.nombre_iva = nombre_iva;
	}

	public CondicionIvaModel() {
	}
	
	
	
}
