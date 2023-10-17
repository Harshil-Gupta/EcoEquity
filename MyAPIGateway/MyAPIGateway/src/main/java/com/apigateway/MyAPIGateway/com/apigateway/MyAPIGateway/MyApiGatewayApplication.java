package com.apigateway.MyAPIGateway.com.apigateway.MyAPIGateway;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class MyApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyApiGatewayApplication.class, args);
		System.out.println("My API Gateway");
	}

}
