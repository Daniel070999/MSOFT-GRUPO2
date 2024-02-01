package ec.edu.ups.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class Util {

    public static boolean isValidIP(String ipAddress) {
        try {
            InetAddress address = InetAddress.getByName(ipAddress);
            return !address.isLoopbackAddress();
        } catch (Exception e) {
            return false;
        }
    }

    public static String encodeContent(String content) {
        // Utilizamos URLEncoder.encode para codificar el contenido en formato URL-encoded
        // Utilizamos StandardCharsets.UTF_8 para especificar la codificación de caracteres
        return URLEncoder.encode(content, StandardCharsets.UTF_8);
    }

    public static boolean isValidUrl(String urlString) {
        try {
            // Intenta crear una instancia de URL con la cadena proporcionada
            new URL(urlString);
            return true; // La URL es válida
        } catch (MalformedURLException e) {
            return false; // La URL no es válida
        }
    }

    public Map<String, Object> getMapOfString(String text) {

        try {
            return new ObjectMapper().readValue(text, Map.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("ERROR AL CONVERTIR DE STRING A MAPA" + e.getMessage());
        }

    }
}
