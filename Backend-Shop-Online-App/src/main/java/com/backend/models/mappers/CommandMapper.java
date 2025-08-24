package com.backend.models.mappers;

import com.backend.models.dtos.CommandDto;
import com.backend.models.dtos.ProductDto;
import com.backend.models.dtos.UserDto;
import com.backend.models.entities.Command;
import com.backend.models.entities.Product;
import com.backend.models.entities.User;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class CommandMapper {
    private final UserMapper userMapper;
    private final ProductMapper productMapper;

    public CommandMapper(UserMapper userMapper, ProductMapper productMapper) {
        this.userMapper = userMapper;
        this.productMapper = productMapper;
    }

    public Command toCommand(CommandDto commandDto) {
        Command command = new Command();

        command.setId(commandDto.getId());
        command.setPaymentStatus(commandDto.getPaymentStatus());
        command.setTotal(commandDto.getTotal());
        command.setDate(LocalDate.parse(commandDto.getDate()));
        command.setDetails(commandDto.getDetails());

        User customer = userMapper.toUser(commandDto.getCustomer());
        command.setCustomer(customer);

        List<Product> productList = commandDto.getProducts()
                .stream()
                .map((productDto) -> productMapper.toProduct(productDto))
                .toList();

        command.setProductList(productList);
        return command;
    }

    public CommandDto toCommandDto(Command command) {
        CommandDto commandDto = new CommandDto();

        commandDto.setId(command.getId());
        commandDto.setDate(command.getDate().toString());
        commandDto.setDetails(command.getDetails());
        commandDto.setPaymentStatus(command.getPaymentStatus());

        UserDto customer = userMapper.toUserDto(command.getCustomer());
        commandDto.setCustomer(customer);

        List<ProductDto> productDtoList = command.getProductList()
                .stream()
                .map((product) -> productMapper.toProductDto(product))
                .toList();

        // calculate total using streams
        Double total = productDtoList
                .stream()
                .mapToDouble((p) -> p.getPrice())
                .sum();

        commandDto.setTotal(total);
        commandDto.setProducts(productDtoList);

        return commandDto;
    }
}
