package com.backend.services.impl;

import com.backend.exceptions.BadRequestException;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.models.dtos.ProductDto;
import com.backend.models.entities.Product;
import com.backend.models.entities.ProductImage;
import com.backend.models.mappers.ProductMapper;
import com.backend.repositories.ProductRepository;
import com.backend.services.CrudService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements CrudService<ProductDto> {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    public List<ProductDto> getAll() {
//        List<Product> productList = productRepository.findAll();
//
//        List<ProductDto> productDtoList = new ArrayList<>();
//
//        for (Product p: productList) {
//            ProductDto dto = this.productMapper.toProductDto(p);
//
//            productDtoList.add(dto);
//
//        }
//
//        return productDtoList;

        return productRepository
                .findAllByDeletedIsFalse()
                .stream()
                .map((p) -> this.productMapper.toProductDto(p))
                .toList();
    }

    @Override
    public List<ProductDto> getAllDeleted() {
        return productRepository
                .findAllByDeletedIsTrue()
                .stream()
                .map((p) -> this.productMapper.toProductDto(p))
                .toList();
    }

    @Override
    public ProductDto getById(Long id) {
        if (id < 0) {
            throw new RuntimeException("Id-ul este invalid!");
        }
        Optional<Product> productOptional = productRepository.findById(id);
        //Daca optionalul are valoarea null, atunci se v-a arunca exceptia  ResourceNotFoundException
        //Daca optionalul contine o valoare diferita de null, atunci se v-a returna valoarea respectiva
        Product product = productOptional.orElseThrow(() -> new ResourceNotFoundException("Produsul nu a fost gasit!"));

        return this.productMapper.toProductDto(product);
    }

    @Override
    public ProductDto create(ProductDto body) {
        Product product = this.productMapper.toProduct(body);

        Product savedProduct = productRepository.save(product);

        return this.productMapper.toProductDto(savedProduct);


    }

    @Override
    public ProductDto update(ProductDto body) {
        if (body.getId() == null || body.getId() < 1) {
            throw new BadRequestException("Id-ul este incorect!");
        }

        Optional<Product> productOptional = productRepository.findById(body.getId());
        //Daca optionalul are valoarea null, atunci se v-a arunca exceptia  ResourceNotFoundException
        //Daca optionalul contine o valoare diferita de null, atunci se v-a returna valoarea respectiva
        Product product = productOptional.orElseThrow(() -> new ResourceNotFoundException("Produsul nu a fost gasit!!"));

        product.setDescription(body.getDescription());
        product.setName(body.getName());
        product.setPrice(body.getPrice());

        // clear images from previous object and add the new images
        product.getImages().clear();
        product.getImages().addAll(body.getImages());

        Product updatedProduct = productRepository.save(product);

        return this.productMapper.toProductDto(updatedProduct);
    }

    @Override
    public void delete(Long id) {
        //Daca metoda readProductById() se executa fara sa arunce exceptie inseamna ca produsul exista in baza de date.
        //Daca produsul nu exista se v-a arunca exceptia resource not found cu codul 404.
        ProductDto product = getById(id);
//        Comment this line because we don't delete products from database, this will affect shop logic
//        productRepository.deleteById(product.getId());

        productRepository.updateDeletedById(product.getId(), true);
    }

    @Override
    public void recover(Long id) {
        ProductDto product = getById(id);

        productRepository.updateDeletedById(product.getId(), false);
    }
}
