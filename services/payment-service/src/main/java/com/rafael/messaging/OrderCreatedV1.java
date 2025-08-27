package com.rafael.messaging;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.rafael.utils.enums.PaymentMethod;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

@ToString
@Getter
@NoArgsConstructor
public class OrderCreatedV1 implements Serializable {
    public UUID eventId;
    public UUID orderId;
    public UUID customerId;
    public Double total;
    public Instant occuredAt;
    public PaymentMethod paymentMethod;

    public OrderCreatedV1(
            @JsonProperty("orderId") UUID orderId,
            @JsonProperty("customerId") UUID customerId,
            @JsonProperty("total") Double total,
            @JsonProperty("paymentMethod") PaymentMethod paymentMethod,
            @JsonProperty("eventId") UUID eventId,
            @JsonProperty("occuredAt") Instant occuredAt
    ) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.total = total;
        this.paymentMethod = paymentMethod;
        this.eventId = eventId;
        this.occuredAt = occuredAt;
    }
}

