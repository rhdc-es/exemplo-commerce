package com.rafael.api.controller;

import com.rafael.api.request.CreateOrderRequest;
import com.rafael.api.response.OrderResponse;
import com.rafael.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {

    private final OrderService service;

    @PostMapping
    public ResponseEntity<OrderResponse> create(@Valid @RequestBody CreateOrderRequest request) {
        OrderResponse orderCreated = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(orderCreated);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAll() {
        List<OrderResponse> orders = service.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getById(@PathVariable("id") UUID id) {
        OrderResponse order = service.getById(id);
        return ResponseEntity.status(HttpStatus.OK).body(order);
    }
}
