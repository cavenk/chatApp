FROM openjdk:18-jdk-alpine3.14
WORKDIR /app
ADD ./build/libs/chatApp-0.0.1-SNAPSHOT.jar ./app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
EXPOSE 8080
