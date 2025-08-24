package com.backend.services.impl;

import com.backend.exceptions.BadRequestException;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.models.dtos.CommandBodyDto;
import com.backend.models.dtos.CommandDto;
import com.backend.models.dtos.IdDto;
import com.backend.models.entities.Command;
import com.backend.models.entities.Product;
import com.backend.models.entities.User;
import com.backend.models.mappers.CommandMapper;
import com.backend.repositories.CommandRepository;
import com.backend.repositories.ProductRepository;
import com.backend.repositories.UserRepository;
import com.backend.services.CrudService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class CommandService implements CrudService<CommandDto> {
    private final CommandRepository commandRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private final CommandMapper commandMapper;

    @Override
    public List<CommandDto> getAll() {
        return commandRepository
//                .findAll()
                .findAllByDeletedIsFalse()
                .stream()
                .map((command) -> commandMapper.toCommandDto(command))
                .toList();
    }

    @Override
    public List<CommandDto> getAllDeleted() {
        return commandRepository
                .findAllByDeletedIsTrue()
                .stream()
                .map((command) -> commandMapper.toCommandDto(command))
                .toList();
    }

    @Override
    public CommandDto getById(Long id) {
        if (id == null || id <= 0) {
            throw new BadRequestException("Id-ul " + id + " este incorect.");
        }

        Command command = commandRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comanda nu a fost gasita."));
        return commandMapper.toCommandDto(command);
    }

    @Override
    public CommandDto create(CommandDto body) {
        return null;
    }

    public CommandDto create(CommandBodyDto body) {
        IdDto customerId = body.getCustomer();

        if (customerId == null || customerId.getId() == null) {
            throw new BadRequestException("Id-ul utilizatorului este incorect.");
        }

        List<IdDto> productsDtoIds = body.getProducts();
        if (productsDtoIds == null || productsDtoIds.isEmpty()) {
            throw new BadRequestException("Lipsesc produsele din comanda!");
        }

        User customer = userRepository.findById(customerId.getId()).orElseThrow(() -> new ResourceNotFoundException("Customer nu a fost gasit."));

        //Transformam lista de obiecte de tipul idDto intr-o lista de numere de tipul Long.
        List<Long> productIds = productsDtoIds
                .stream()
                .map((idDto) -> idDto.getId())
                .toList();

        List<Product> products = productRepository.findAllById(productIds);

//        double total = 0;
//        for (Product product : products) {
//            //   total += product.getPrice();
//            total = total + product.getPrice();
//        }

        Double total = products
                .stream()
                .mapToDouble(p -> p.getPrice())
                .sum();

        Command command = new Command();
        command.setCustomer(customer);
        command.setDate(LocalDate.parse(body.getDate()));
        command.setDetails(body.getDetails());
        command.setTotal(total);
        command.setProductList(products);
        command.setPaymentStatus(body.getPaymentStatus());

        return commandMapper.toCommandDto(commandRepository.save(command));

    }

    @Override
    public CommandDto update(CommandDto body) {
        throw new RuntimeException("Aceasta functie nu este disponibila!");
    }

    public CommandDto update(CommandBodyDto body) {
        if (body.getId() == null || body.getId() <= 0) {
            throw new BadRequestException("Id-ul este incorect.");
        }

        if (!commandRepository.existsById(body.getId())) {
            throw new ResourceNotFoundException("Comanda nu a fost gasita.");
        }

        IdDto customerId = body.getCustomer();

        if (customerId == null || customerId.getId() == null) {
            throw new BadRequestException("Id-ul utilizatorului  este incorect.");
        }

        List<IdDto> productsDtoIds = body.getProducts();

        if (productsDtoIds == null || productsDtoIds.isEmpty()) {
            throw new BadRequestException("Lipsesc produsele din comanda!");
        }

        User customer = userRepository.findById(customerId.getId()).orElseThrow(() -> new ResourceNotFoundException("Customer nu a fost gasit."));

        //Transformam lista de obiecte de tipul idDto intr-o lista de numere de tipul Long.
        List<Long> productIds = productsDtoIds
                .stream()
                .map((idDto) -> idDto.getId())
                .toList();

        List<Product> products = productRepository.findAllById(productIds);

//        double total = 0;
//        for (Product product : products) {
//            //   total += product.getPrice();
//            total = total + product.getPrice();
//        }

        Double total = products.stream().mapToDouble(p -> p.getPrice()).sum();

        Command command = new Command();
        command.setId(body.getId());
        command.setCustomer(customer);
        command.setDate(LocalDate.parse(body.getDate()));
        command.setDetails(body.getDetails());
        command.setTotal(total);
        command.setProductList(products);
        command.setPaymentStatus(body.getPaymentStatus());

        return commandMapper.toCommandDto(commandRepository.save(command));
    }

    @Override
    public void delete(Long id) {
        if (!commandRepository.existsById(id)) {
            throw new ResourceNotFoundException("Comanda nu a fost gasita.");
        }

        commandRepository.updateDeletedById(id, true);
//        Comment this line because we don't delete products from database, this will affect shop logic
//        commandRepository.deleteById(id);
    }

    @Override
    public void recover(Long id) {
        if (!commandRepository.existsById(id)) {
            throw new ResourceNotFoundException("Comanda nu a fost gasita.");
        }

        commandRepository.updateDeletedById(id, false);
    }
}
