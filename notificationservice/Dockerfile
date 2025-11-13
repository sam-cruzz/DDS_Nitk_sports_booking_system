# Use official JDK runtime as base image
FROM eclipse-temurin:21-jdk-alpine

# Add the Spring Boot JAR file to the container
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Expose the port your service runs on
EXPOSE 1117

# Run the application
ENTRYPOINT ["java","-jar","/app.jar"]
