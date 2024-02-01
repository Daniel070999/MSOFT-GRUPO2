package ec.edu.ups.service.impl;


import ec.edu.ups.model.InformationRequest;
import ec.edu.ups.service.IVirusService;
import org.asynchttpclient.AsyncHttpClient;
import org.asynchttpclient.DefaultAsyncHttpClient;
import org.asynchttpclient.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;

import static ec.edu.ups.utils.Util.isValidIP;

@Service
public class VirusServiceImpl implements IVirusService {


    private static final String VIRUSTOTAL_API_URL = "https://www.virustotal.com/api/v3";
    @Value("${apikey}")
    private String API_KEY;

    public String getConsultIP(InformationRequest informationRequest) throws IOException {

        if (!isValidIP(informationRequest.getIp())) {
            return null;
        }

        AsyncHttpClient client = new DefaultAsyncHttpClient();
        String apiUrl = VIRUSTOTAL_API_URL.concat("/ip_addresses/").concat(informationRequest.getIp());

        CompletableFuture<Response> future = client.prepare("GET", apiUrl)
                .setHeader("accept", "application/json")
                .setHeader("x-apikey", API_KEY)
                .execute()
                .toCompletableFuture();

        // Esperar a que se complete la solicitud y obtener la respuesta
        Response response = future.join();

        // Cerrar el cliente después de obtener la respuesta
        client.close();

        // Verificar si la solicitud fue exitosa (código de estado 200)
        if (response.getStatusCode() == 200) {
            return response.getResponseBody();
        } else {
            throw new RuntimeException("Error al realizar la solicitud. Código de estado: " + response.getStatusCode());
        }
    }
}
