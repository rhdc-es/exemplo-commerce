package com.rafael;

import org.springframework.boot.SpringApplication;

public class TestPaymentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(Startup::main).with(TestcontainersConfiguration.class).run(args);
	}

}
