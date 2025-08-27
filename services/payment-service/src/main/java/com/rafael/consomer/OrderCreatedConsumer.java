package com.rafael.consomer;

import com.rafael.messaging.OrderCreatedV1;
import com.rafael.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class OrderCreatedConsumer {

    private final PaymentService paymentService;
    private static final String OrdersV1 = "orders.v1";

    @KafkaListener(
            topics = OrdersV1,
            groupId = "payment-service",
            containerFactory = "orderCreatedContainerFactory"
    )
    public void processPayment(
            @Payload OrderCreatedV1 orderEvent,
            @Header(KafkaHeaders.RECEIVED_KEY) String key) {
        log.info("KafkaHeaders.RECEIVED_KEY: {}", key);
        paymentService.process(orderEvent.orderId, orderEvent.total, orderEvent.paymentMethod);
    }
}
