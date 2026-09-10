package com.fulfillx.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.UUID;

@Service
public class ImageStorageService {

    private final S3Client s3Client;
    private final String bucketName;
    private final String region;

    public ImageStorageService(
            S3Client s3Client,
            @Value("${aws.s3.bucket-name}") String bucketName,
            @Value("${aws.region}") String region) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
        this.region = region;
    }

    public ImageUploadResponse generateUploadMetadata(String fileName, String craftCategory) {
        String cleanCategory = (craftCategory != null && !craftCategory.isBlank())
                ? craftCategory.toLowerCase().replaceAll("[^a-z0-9]", "-")
                : "handicrafts";

        String uniqueFileName = UUID.randomUUID().toString().substring(0, 8) + "-" + fileName;
        String s3Key = "craft-images/" + cleanCategory + "/" + uniqueFileName;

        String publicUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, s3Key);

        return new ImageUploadResponse(
                s3Key,
                bucketName,
                region,
                publicUrl);
    }

    public record ImageUploadResponse(
            String s3Key,
            String bucket,
            String region,
            String publicUrl) {
    }
}
