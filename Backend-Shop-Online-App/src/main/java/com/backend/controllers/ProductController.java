package com.backend.controllers;

import com.backend.models.dtos.ProductDto;
import com.backend.services.impl.ProductService;
import com.backend.services.impl.UserService;
import com.backend.utils.ApiResponse;
import com.backend.utils.ResponseHandler;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin("http://localhost:4200")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllProducts() {
        List<ProductDto> productList = this.productService.getAll();

        return ResponseHandler.success("Lista cu toate produse.", productList);
    }

    @GetMapping("/recover")
    public ResponseEntity<ApiResponse> getAllDeletedProducts() {
        return ResponseHandler.success("Lista cu toate produsele sterse.", productService.getAllDeleted());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable long id) {
        ProductDto product = this.productService.getById(id);

        return ResponseHandler.success("Produsul cu id-ul: " + id, product);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createProduct(@Valid @RequestBody ProductDto body) {
        ProductDto savedProduct = this.productService.create(body);

        return ResponseHandler.success("Produsul cu id: " + savedProduct.getId(), savedProduct);
    }

    @PutMapping
    public ResponseEntity<ApiResponse> updateProduct(@Valid @RequestBody ProductDto body) {
        ProductDto updatedProduct = this.productService.update(body);

        return ResponseHandler.success("Produsul cu id: " + body.getId() + " a fost modificat.", updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long id) {
        this.productService.delete(id);

        return ResponseHandler.success("Produsul cu id: " + id + " a fost sters cu succes!");
    }

    @PostMapping("/recover/{id}")
    public ResponseEntity<ApiResponse> recoverProductById(@PathVariable Long id) {
        this.productService.recover(id);

        return ResponseHandler.success("Produsul cu id: " + id + " a fost recuperat cu succes!");
    }
}
