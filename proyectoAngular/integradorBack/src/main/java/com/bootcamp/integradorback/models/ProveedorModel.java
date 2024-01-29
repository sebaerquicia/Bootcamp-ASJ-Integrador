package com.bootcamp.integradorback.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "proveedores")
public class ProveedorModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotNull 
	@Column(unique = true)
	private String codigo_proveedor;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="rubro_proveedor_id", referencedColumnName = "id", nullable = false, updatable = false)
	private RubroModel rubro_proveedor;
	
	@NotNull 
	@Column(unique = true)
	private String razon_social ;
		
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="provincia_id", referencedColumnName = "id", nullable = false, updatable = false)
	private ProvinciaModel provincia;
	private String localidad;
	private Integer codigo_postal;
	private String calle ;
	private Integer numero_calle;

	@NotNull 
	@Column(unique = true)
	private String cuit_proveedor;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "datosContacto_id", referencedColumnName = "id", nullable = false)
	private DatosDeContactoModel contacto;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="iva_id", referencedColumnName = "id", nullable = false, updatable = false)
	private CondicionIvaModel iva;
	private String web;
	private String img;
	

   
	private boolean eliminado = false;

	private LocalDateTime updated_at;
	private LocalDateTime created_at;
	
	
	public boolean isEliminado() {
		return eliminado;
	}
	public void setEliminado(boolean eliminado) {
		this.eliminado = eliminado;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCodigo_proveedor() {
		return codigo_proveedor;
	}
	public void setCodigo_proveedor(String codigo_proveedor) {
		this.codigo_proveedor = codigo_proveedor;
	}

	public String getRazon_social() {
		return razon_social;
	}
	public void setRazon_social(String razon_social) {
		this.razon_social = razon_social;
	}

	public String getLocalidad() {
		return localidad;
	}
	public void setLocalidad(String localidad) {
		this.localidad = localidad;
	}
	public Integer getCodigo_postal() {
		return codigo_postal;
	}
	public void setCodigo_postal(Integer codigo_postal) {
		this.codigo_postal = codigo_postal;
	}
	public String getCalle() {
		return calle;
	}
	public void setCalle(String calle) {
		this.calle = calle;
	}
	public Integer getNumero_calle() {
		return numero_calle;
	}
	public void setNumero_calle(Integer numero_calle) {
		this.numero_calle = numero_calle;
	}
	public String getCuit_proveedor() {
		return cuit_proveedor;
	}
	public void setCuit_proveedor(String cuit_proveedor) {
		this.cuit_proveedor = cuit_proveedor;
	}
	
	public DatosDeContactoModel getContacto() {
		return contacto;
	}
	public void setContacto(DatosDeContactoModel contacto) {
		this.contacto = contacto;
	}
	public String getWeb() {
		return web;
	}
	public void setWeb(String web) {
		this.web = web;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
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
	
	public RubroModel getRubro_proveedor() {
		return rubro_proveedor;
	}
	public void setRubro_proveedor(RubroModel rubro_proveedor) {
		this.rubro_proveedor = rubro_proveedor;
	}
	public ProvinciaModel getProvincia() {
		return provincia;
	}
	public void setProvincia(ProvinciaModel provincia) {
		this.provincia = provincia;
	}
	public CondicionIvaModel getIva() {
		return iva;
	}
	public void setIva(CondicionIvaModel iva) {
		this.iva = iva;
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
	
	public ProveedorModel() {
		
	}
	

}
