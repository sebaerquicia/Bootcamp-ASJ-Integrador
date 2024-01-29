package com.bootcamp.integradorback.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name = "rubros")
public class RubroModel {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotNull
	private String nombre_rubro;
	


	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNombre_rubro() {
		return nombre_rubro;
	}
	public void setNombre_rubro(String nombre_rubro) {
		this.nombre_rubro = nombre_rubro;
	}

	public RubroModel() {
	}
	
	
	
}
