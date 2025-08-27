package com.rafael.api.request;

import com.rafael.utils.enums.PaymentMethod;
import jakarta.validation.constraints.*;

import java.util.List;
import java.util.UUID;

public record CreateOrderRequest(
        @NotNull UUID customerId,
        @Size(min = 1) List<Item> items,
        @NotNull PaymentMethod paymentMethod
) {
    public record Item(
            @NotBlank String name,
            @Min(1) int quantity,
            @DecimalMin("0.00") Double price
    ) {}
}
