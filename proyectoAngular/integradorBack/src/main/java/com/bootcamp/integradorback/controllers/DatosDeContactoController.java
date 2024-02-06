package com.bootcamp.integradorback.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integradorback.models.DatosDeContactoModel;
import com.bootcamp.integradorback.services.DatosDeContactoService;
import com.bootcamp.integradorback.exceptions.ResourceNotFoundException;

@RestController
@RequestMapping("/datosdecontacto")
public class DatosDeContactoController {
    @Autowired
    DatosDeContactoService contactoService;
    
    @GetMapping()
    public ResponseEntity<List<DatosDeContactoModel>> getContactos() {
        List<DatosDeContactoModel> contactos = contactoService.obtenerContactos();
        return ResponseEntity.ok(contactos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DatosDeContactoModel> getContactoById(@PathVariable int id) {
        DatosDeContactoModel contacto = contactoService.obtenerContactoById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Contacto no encontrado con id: " + id));
        return ResponseEntity.ok(contacto);
    }
    
    @PostMapping() 
    public ResponseEntity<String> cargarContacto(@RequestBody DatosDeContactoModel contacto) {
        String mensaje = contactoService.cargarContacto(contacto);
        return ResponseEntity.ok(mensaje);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<String> updateContacto(@PathVariable int id, @RequestBody DatosDeContactoModel contacto) {
        String mensaje = contactoService.modificarContacto(id, contacto);
        return ResponseEntity.ok(mensaje);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<List<DatosDeContactoModel>> deleteContacto(@PathVariable int id) {
        List<DatosDeContactoModel> contactos = contactoService.eliminarContacto(id);
        return ResponseEntity.ok(contactos);
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
