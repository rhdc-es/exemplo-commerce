package com.rafael.service;

import com.rafael.api.request.CreateOrderRequest;
import com.rafael.api.response.OrderResponse;
import com.rafael.domain.model.Order;
import com.rafael.domain.model.OrderItem;
import com.rafael.domain.repository.OrderRepository;
import com.rafael.messaging.OrderCreatedV1;
import com.rafael.messaging.OrderEventProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Service
public class OrderService {

    private final OrderRepository repository;
    private final OrderEventProducer producer;

    @Transactional
    public OrderResponse create(CreateOrderRequest request) {
        log.info("Criando nova ordem de compra!");

        var items = request.items().stream()
                .map(i -> new OrderItem(i.name(), i.price(), i.quantity()))
                .toList();

        var order = new Order(items, request.customerId(), request.paymentMethod());

        var saved = repository.save(order);

        log.info("Order criada: id={}, status={}, total={}",
                saved.getId(), saved.getStatus(), saved.total());

        var orderCreatedEvent = new OrderCreatedV1(
                order.getId(),
                order.getCustomerId(),
                order.total(),
                order.getPaymentMethod()
        );
        producer.publishOrderCreated(orderCreatedEvent);
        log.info("Evento de nova ordem de compra publicado!");

        return new OrderResponse(
                saved.getId(),
                saved.getCustomerId(),
                saved.getStatus(),
                order.total(),
                order.getPaymentMethod(),
                order.getCreatedAt()
        );
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getAll() {
        return repository.findAll().stream()
                .map(order ->
                        new OrderResponse(
                                order.getId(),
                                order.getCustomerId(),
                                order.getStatus(),
                                order.total(),
                                order.getPaymentMethod(),
                                order.getCreatedAt()
                        ))
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getById(Long id) {
        Order orderResponse = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordem não encontrada: " + id));
        return new OrderResponse(
                orderResponse.getId(),
                orderResponse.getCustomerId(),
                orderResponse.getStatus(),
                orderResponse.total(),
                orderResponse.getPaymentMethod(),
                orderResponse.getCreatedAt());
    }
}
