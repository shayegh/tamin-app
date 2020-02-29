#### Stage 1: Build the application
FROM openjdk:8-jdk-alpine as build

# Add a volume pointing to /tmp
VOLUME /tmp

# Make port 8080 available to the world outside this container
EXPOSE 8080

# The application's jar file
ARG JAR_FILE=target/supervision-0.0.4-SNAPSHOT.jar


# Add the application's jar to the container
ADD ${JAR_FILE} supervision.jar

# Run the jar file
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/supervision.jar"]