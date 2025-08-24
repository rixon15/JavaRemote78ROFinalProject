package com.backend.controllers;

import com.backend.models.dtos.CommandBodyDto;
import com.backend.services.impl.CommandService;
import com.backend.utils.ApiResponse;
import com.backend.utils.ResponseHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/commands")
@CrossOrigin("http://localhost:4200")
public class CommandController {
    private final CommandService commandService;

    public CommandController(CommandService commandService) {
        this.commandService = commandService;
    }
    @GetMapping
    public ResponseEntity<ApiResponse> getAllCommands() {
       return ResponseHandler.success("Lista cu toate comenzile." , commandService.getAll());
    }

    @GetMapping("/recover")
    public ResponseEntity<ApiResponse> getAllDeletedCommands() {
        return ResponseHandler.success("Lista cu toate comenzile sterse.", commandService.getAllDeleted());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCommandById(@PathVariable("id") Long id) {
        return ResponseHandler.success("Comanda cu id-ul: " + id, commandService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> create(@RequestBody CommandBodyDto body) {
        return ResponseHandler.success("Comanda adaugata cu succes!", commandService.create(body));
    }

    @PutMapping
    public ResponseEntity<ApiResponse> update(@RequestBody CommandBodyDto body) {
        return ResponseHandler.success("Comanda modificata cu succes!", commandService.update(body));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCommandById(@PathVariable("id") Long id) {
        commandService.delete(id);

        return ResponseHandler.success("Comanda a fost stearsa cu succes.");
    }



    @PostMapping("/recover/{id}")
    public ResponseEntity<ApiResponse> recoverCommandById(@PathVariable("id") Long id) {
        commandService.recover(id);

        return ResponseHandler.success("Comanda a fost recuperata cu succes.");
    }
}
