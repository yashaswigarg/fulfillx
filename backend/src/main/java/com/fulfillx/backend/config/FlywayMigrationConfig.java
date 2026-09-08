package com.fulfillx.backend.config;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@ConditionalOnProperty(prefix = "spring.flyway", name = "enabled", havingValue = "true", matchIfMissing = true)
public class FlywayMigrationConfig {

    @Bean(initMethod = "migrate")
    public Flyway flyway(DataSource dataSource) {
        System.out.println(">>> Initializing Flyway and executing database migrations...");
        Flyway flyway = Flyway.configure()
                .dataSource(dataSource)
                .locations("classpath:db/migration")
                .baselineOnMigrate(true)
                .load();
        flyway.migrate();
        System.out.println(">>> Flyway database migrations executed successfully!");
        return flyway;
    }

    @Bean
    public static BeanFactoryPostProcessor dependsOnPostProcessor() {
        return beanFactory -> {
            for (String beanName : beanFactory.getBeanNamesForType(jakarta.persistence.EntityManagerFactory.class)) {
                beanFactory.getBeanDefinition(beanName).setDependsOn("flyway");
            }
        };
    }
}
