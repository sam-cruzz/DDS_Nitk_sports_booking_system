# Build stage
FROM maven:3.9.7-amazoncorretto-21 as build
WORKDIR /workspace/app

COPY pom.xml ./
COPY src src

RUN mvn clean install -DskipTests

# Production stage
FROM amazoncorretto:21
WORKDIR /bookingservice
COPY --from=build /workspace/app/target/*.jar bookingservice.jar
EXPOSE 1116
ENTRYPOINT ["java","-jar","bookingservice.jar"]
