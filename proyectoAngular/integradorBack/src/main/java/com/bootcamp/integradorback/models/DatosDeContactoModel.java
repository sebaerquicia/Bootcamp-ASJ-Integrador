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
@Table(name = "datosdecontacto")
public class DatosDeContactoModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
//	@OneToOne (fetch = FetchType.EAGER)
//	@JoinColumn(name= "proveedor_id", referencedColumnName = "id" , nullable=false)
//	private ProveedorModel proveedor;
	@NotNull 
	@Column
	private String nombre_contacto;
	@NotNull 
	@Column
	private String apellido_contacto;
	public String rol;
	@Column
	private String telefono_contacto;
	private String email_contacto;
	private LocalDateTime updated_at;
	private LocalDateTime created_at;
	

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNombre_contacto() {
		return nombre_contacto;
	}
	public void setNombre_contacto(String nombre_contacto) {
		this.nombre_contacto = nombre_contacto;
	}
	public String getApellido_contacto() {
		return apellido_contacto;
	}
	public void setApellido_contacto(String apellido_contacto) {
		this.apellido_contacto = apellido_contacto;
	}
	
	public String getRol() {
		return rol;
	}
	public void setRol(String rol) {
		this.rol = rol;
	}
	public String getTelefono_contacto() {
		return telefono_contacto;
	}
	public void setTelefono_contacto(String telefono_contacto) {
		this.telefono_contacto = telefono_contacto;
	}
	public String getEmail_contacto() {
		return email_contacto;
	}
	public void setEmail_contacto(String email_contacto) {
		this.email_contacto = email_contacto;
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

	public DatosDeContactoModel() {
	}
	
	
	
}
