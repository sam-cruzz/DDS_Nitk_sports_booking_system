# Build stage
FROM maven:3.9.7-amazoncorretto-21 as build
WORKDIR /workspace/app

COPY pom.xml ./
COPY src src

RUN mvn clean install -DskipTests

# Production stage
FROM amazoncorretto:21
WORKDIR /paymentservice
COPY --from=build /workspace/app/target/*.jar paymentservice.jar
EXPOSE 1115
ENTRYPOINT ["java","-jar","paymentservice.jar"]
