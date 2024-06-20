# Используйте официальный образ Java
FROM openjdk:11-jre-slim

# Установите рабочую директорию
WORKDIR /app

# Скопируйте JAR-файл в контейнер
COPY target/your-app.jar app.jar

# Установите точку входа для контейнера
ENTRYPOINT ["java", "-jar", "app.jar"]
