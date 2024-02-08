package com.bootcamp.integradorback.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "categorias")
public class CategoriaModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@NotNull 
	@Column(unique = true)
	private String nombre_categoria;
	@Column
	private boolean eliminada;
	
	

	private LocalDateTime updated_at;

	private LocalDateTime created_at;
	
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNombre_categoria() {
		return nombre_categoria;
	}
	public void setNombre_categoria(String nombre_categoria) {
		this.nombre_categoria = nombre_categoria;
	}
	public LocalDateTime getUpdated_at() {
		return updated_at;
	}
	public void setUpdated_at(LocalDateTime updated_at) {
		this.updated_at = updated_at;
	}
	public LocalDateTime getCreated_at() {
		return created_at;
	}
	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public CategoriaModel() {
	}
	
	public boolean isEliminada() {
		return eliminada;
	}
	public void setEliminada(boolean eliminada) {
		this.eliminada = eliminada;
	}
	@PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
        updated_at = LocalDateTime.now();
    }

	 @PreUpdate
	 protected void onUpdate() {
	    updated_at = LocalDateTime.now();
	    }
	
	
	
}

