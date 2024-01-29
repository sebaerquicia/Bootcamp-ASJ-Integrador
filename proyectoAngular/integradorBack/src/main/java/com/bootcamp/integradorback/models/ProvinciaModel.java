package com.bootcamp.integradorback.models;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name="provincias")
public class ProvinciaModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotNull
	private String nombre_provincia;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="pais_id", referencedColumnName = "id", nullable = false, updatable = false)
	private PaisModel pais;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNombre_provincia() {
		return nombre_provincia;
	}
	public void setNombre_provincia(String nombre_provincia) {
		this.nombre_provincia = nombre_provincia;
	}

	public PaisModel getPais() {
		return pais;
	}
	public void setPais(PaisModel pais) {
		this.pais = pais;
	}
	public ProvinciaModel() {
	}
	
	

}