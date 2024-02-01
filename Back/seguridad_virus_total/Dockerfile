# Usa una imagen base con Java y Maven
FROM amazoncorretto:17.0.7-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo JAR construido en el paso de compilación al contenedor
COPY target/seguridad_virus_total-0.0.1-SNAPSHOT.jar seguridad_virus_total-0.0.1-SNAPSHOT.jar

# Expone el puerto en el que se ejecuta tu aplicación
EXPOSE 8080

# Comando para ejecutar tu aplicación cuando se inicie el contenedor
CMD ["java", "-jar", "seguridad_virus_total-0.0.1-SNAPSHOT.jar"]
