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
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="productos")
public class ProductoModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="proveedor_id", referencedColumnName = "id", nullable = false, updatable = false)
	private ProveedorModel proveedor;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="categoria_id", referencedColumnName = "id", nullable = false)
	private CategoriaModel categoria;
	
	@NotNull
	@Column(unique = true)
	private String codigo_sku;
	
	@NotNull
	private String nombre_producto;
	
	
	private String descripcion;
	
	private String url_img;
	
	@NotNull
	private double precio_producto;
	

	private boolean eliminado = false;
    
	private LocalDateTime updated_at;
	
	private LocalDateTime created_at;
	
	


	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public ProveedorModel getProveedor() {
		return proveedor;
	}
	public void setProveedor(ProveedorModel proveedor) {
		this.proveedor = proveedor;
	}
	public CategoriaModel getCategoria() {
		return categoria;
	}
	public void setCategoria(CategoriaModel categoria) {
		this.categoria = categoria;
	}
	public String getCodigo_sku() {
		return codigo_sku;
	}
	public void setCodigo_sku(String codigo_sku) {
		this.codigo_sku = codigo_sku;
	}
	public String getNombre_producto() {
		return nombre_producto;
	}
	public void setNombre_producto(String nombre_producto) {
		this.nombre_producto = nombre_producto;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getUrl_img() {
		return url_img;
	}
	public void setUrl_img(String url_img) {
		this.url_img = url_img;
	}
	public double getPrecio_producto() {
		return precio_producto;
	}
	public void setPrecio_producto(double precio_producto) {
		this.precio_producto = precio_producto;
	}
	
	public boolean isEliminado() {
		return eliminado;
	}
	public void setEliminado(boolean eliminado) {
		this.eliminado = eliminado;
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
	public ProductoModel() {
	}
	
	
}
