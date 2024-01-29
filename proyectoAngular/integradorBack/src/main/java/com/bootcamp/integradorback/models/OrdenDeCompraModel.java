package com.bootcamp.integradorback.models;

import java.sql.Date;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="ordenesdecompra")
public class OrdenDeCompraModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="estado_id", referencedColumnName = "id", nullable = false)
	private EstadoOrdenModel estadoOrden;
	
	@NotNull 
	@Column(unique = true)
	private Integer numero_orden;
	
	@NotNull 
	@Column
	private Date fecha_emision;
	
	@NotNull 
	@Column
	private Date fecha_entrega_esperada;
	
	private String informacion_orden;
	private LocalDateTime updated_at;
	private LocalDateTime created_at;


	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public EstadoOrdenModel getEstadoOrden() {
		return estadoOrden;
	}
	public void setEstadoOrden(EstadoOrdenModel estadoOrden) {
		this.estadoOrden = estadoOrden;
	}
	public Integer getNumero_orden() {
		return numero_orden;
	}
	public void setNumero_orden(Integer numero_orden) {
		this.numero_orden = numero_orden;
	}
	public Date getFecha_emision() {
		return fecha_emision;
	}
	public void setFecha_emision(Date fecha_emision) {
		this.fecha_emision = fecha_emision;
	}
	public Date getFecha_entrega_esperada() {
		return fecha_entrega_esperada;
	}
	public void setFecha_entrega_esperada(Date fecha_entrega_esperada) {
		this.fecha_entrega_esperada = fecha_entrega_esperada;
	}
	public String getInformacion_orden() {
		return informacion_orden;
	}
	public void setInformacion_orden(String informacion_orden) {
		this.informacion_orden = informacion_orden;
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
	@PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
        updated_at = LocalDateTime.now();
    }

	 @PreUpdate
	 protected void onUpdate() {
	    updated_at = LocalDateTime.now();
	    }

	public OrdenDeCompraModel() {
	}
	
	
	
}
