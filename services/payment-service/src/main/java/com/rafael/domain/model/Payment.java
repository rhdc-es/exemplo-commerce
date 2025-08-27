package com.rafael.domain.model;

import com.rafael.utils.enums.PaymentMethod;
import com.rafael.utils.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.UUID;

import static com.rafael.utils.validators.requireValue.*;

@Entity
@Table(name = "payments")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @UuidGenerator
    @JdbcTypeCode(SqlTypes.UUID)
    private UUID id;

    private UUID orderId;
    private Double amount;

    @Enumerated(EnumType.STRING)
    private PaymentMethod method;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        var now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        this.updatedAt = Instant.now();
    }

    public boolean isPending()    { return status == PaymentStatus.PENDING; }
    public boolean isAuthorized() { return status == PaymentStatus.AUTHORIZED; }
    public boolean isFailed()     { return status == PaymentStatus.FAILED; }

    public static Payment createPending(UUID orderId,
                                        Double amount,
                                        PaymentMethod method) {
        var p = new Payment();
        p.orderId = orderId;
        p.amount = requirePositive(amount, "amount");
        p.method = requireNotNull(method, "method");
        p.status = PaymentStatus.PENDING;
        return p;
    }
}
