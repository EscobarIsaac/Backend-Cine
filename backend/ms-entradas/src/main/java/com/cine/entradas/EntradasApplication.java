package com.cine.entradas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EntradasApplication {
    public static void main(String[] args) {
        SpringApplication.run(EntradasApplication.class, args);
    }
}