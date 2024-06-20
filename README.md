# Запуск приложения Spring Boot + Angular

Этот проект содержит две части: серверную часть на базе Spring Boot и клиентскую часть на базе Angular. Ниже приведены инструкции по установке и запуску каждой из частей.

## Серверная часть (Spring Boot)

### Требования

- JDK 17 или выше
- Apache Maven
- Желательно MySQL при необзодимости в другой базе данных поменяйте конфигурацию в файле `application.properties`.

### Установка и запуск

1. **Клонирование репозитория**

   ```bash
   git clone https://github.com/Fed-Bauer/bouvetoya-store.git
   ```

2. **Сборка и запуск приложения**

   Перейдите в папку back-end
   
   ```bash
   mvn clean package
   ```

   Приложение будет запущено на `http://localhost:9090`.

4. **Настройка базы данных (по необходимости)**

   Приложение может использовать базу данных. Убедитесь, что вы сконфигурировали подключение к вашей базе данных в файле `application.properties`.

   Поменяйте под себя следующие поля:

   ```bash
   spring.datasource.url=jdbc:mysql://localhost:3306/bouvetoya_store
   spring.datasource.password=your-password
   spring.sql.init.platform=mysql
   ```
   
## Клиентская часть (Angular)

### Требования

- Node.js с npm (Node Package Manager)

### Установка и запуск

1. **Установите зависимости**

  Перейдите в папку front-end
  
   ```bash
   npm install
   ```

2. **Запустите Angular**

   ```bash
   npm start
   ```

   Приложение будет запущено на `http://localhost:4200`.


