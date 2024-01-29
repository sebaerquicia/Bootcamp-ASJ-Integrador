package com.bootcamp.integradorback.models;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table (name = "detallesorden")
public class DetalleOrdenModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@ManyToOne (fetch = FetchType.EAGER)
	@JoinColumn(name="orden_id", referencedColumnName = "id", nullable = false, updatable = false)
	private OrdenDeCompraModel orden_de_compra;
	@ManyToOne (fetch = FetchType.EAGER)
	@JoinColumn(name="proveedor_id", referencedColumnName = "id", nullable = false, updatable = false)
	private ProveedorModel proveedor;
	@ManyToOne (fetch = FetchType.EAGER)
	@JoinColumn(name="producto_id", referencedColumnName = "id", nullable = false, updatable = false)
	private ProductoModel producto;
	private Integer cantidad_producto;
	private double precio_hist;
	private double total;
	
	

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public OrdenDeCompraModel getOrden_de_compra() {
		return orden_de_compra;
	}
	public void setOrden_de_compra(OrdenDeCompraModel orden_de_compra) {
		this.orden_de_compra = orden_de_compra;
	}
	public ProveedorModel getProveedor() {
		return proveedor;
	}
	public void setProveedor(ProveedorModel proveedor) {
		this.proveedor = proveedor;
	}
	public ProductoModel getProducto() {
		return producto;
	}
	public void setProducto(ProductoModel producto) {
		this.producto = producto;
	}

	public Integer getCantidad_producto() {
		return cantidad_producto;
	}
	public void setCantidad_producto(Integer cantidad_producto) {
		this.cantidad_producto = cantidad_producto;
	}
	public double getPrecio_hist() {
		return precio_hist;
	}
	public void setPrecio_hist(double precio_hist) {
		this.precio_hist = precio_hist;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	
	public DetalleOrdenModel() {
	}
	
	

}
