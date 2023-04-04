FROM openjdk:18-jdk-alpine3.14
WORKDIR /app
ADD . .
RUN ./gradlew build
CMD  java -jar ./build/libs/chatApp-0.0.1-SNAPSHOT.jar