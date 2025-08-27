package com.rafael.domain.model;

import com.rafael.utils.enums.OrderStatus;
import com.rafael.utils.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static java.lang.System.currentTimeMillis;

@Entity @Table(name="orders")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @UuidGenerator
    @JdbcTypeCode(SqlTypes.UUID)
    private UUID id;

    private UUID customerId;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private Instant createdAt;

    private PaymentMethod paymentMethod;

    public Order(List<OrderItem> items, UUID customerId, PaymentMethod paymentMethod) {
        if (items == null || items.isEmpty()) throw new IllegalArgumentException("Não é possível criar Ordem com lista de itens vazia");

        this.items = items;
        this.items.forEach(item -> item.setOrder(this));
        this.customerId = customerId;
        this.paymentMethod = paymentMethod;
        this.status = OrderStatus.PENDING;
        this.createdAt = Instant.now();
    }

    public Double total() {
        return items.stream()
                .mapToDouble(OrderItem::getSubTotal)
                .sum();
    }

    public void confirm() { this.status = OrderStatus.CONFIRMED; }
    public void cancel()  { this.status = OrderStatus.CANCELLED; }
}
