package com.rafael.domain.repository;

import com.rafael.domain.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    Optional<Payment> findTopByOrderIdOrderByCreatedAtDesc(UUID orderId);
}
