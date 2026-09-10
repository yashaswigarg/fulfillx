package com.fulfillx.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI karigarSetuOpenAPI() {

        return new OpenAPI()
                .info(
                        new Info()
                                .title("KarigarSetu API")
                                .version("v1")
                                .description(
                                        "Authentic Indian artisanal crafts and fulfillment platform API.")
                                .contact(
                                        new Contact()
                                                .name("KarigarSetu")))
                .components(
                        new Components()
                                .addSecuritySchemes(
                                        "bearerAuth",
                                        new SecurityScheme()
                                                .type(
                                                        SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")));
    }
}