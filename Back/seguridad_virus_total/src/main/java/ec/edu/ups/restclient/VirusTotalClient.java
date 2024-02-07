package ec.edu.ups.restclient;

import lombok.extern.slf4j.Slf4j;
import org.asynchttpclient.*;
import org.asynchttpclient.request.body.multipart.FilePart;
import org.asynchttpclient.request.body.multipart.StringPart;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
public class VirusTotalClient {

    @Value("${apikey}")
    private String apiKey;

    @Value("${api.virus.total}")
    private String apiVirusTotal;

    /**
     * Envia a virus total la peticion de analisis de una url
     *
     * @param body peticion en formato Json
     * @return String response en formato json
     */
    public String sendUrlScanRequest(String body) {

        DefaultAsyncHttpClientConfig.Builder clientConfigBuilder = new DefaultAsyncHttpClientConfig.Builder();
        try (AsyncHttpClient asyncHttpClient = new DefaultAsyncHttpClient(clientConfigBuilder.build())) {
            BoundRequestBuilder requestBuilder = asyncHttpClient.preparePost(apiVirusTotal.concat("urls"));
            requestBuilder.setHeader("Content-Type", "multipart/form-data");
            requestBuilder.setHeader("x-apikey", apiKey);

            requestBuilder.addBodyPart(new StringPart("url", body));

            CompletableFuture<Response> responseFuture = requestBuilder.execute().toCompletableFuture();

            Response response = responseFuture.join();

            if (response.getStatusCode() != 200) throw new RuntimeException("ERROR AL CONSULTAR VIRUS TOTAL");

            return response.getResponseBody();

        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    /**
     * Envia a virus total la peticion de analisis de un archivo
     *
     * @param file archivo que se va a analizar
     * @return String response en formato json
     */
    public String sendFileScanRequest(File file) {
        DefaultAsyncHttpClientConfig.Builder clientConfigBuilder = new DefaultAsyncHttpClientConfig.Builder();
        try (AsyncHttpClient asyncHttpClient = new DefaultAsyncHttpClient(clientConfigBuilder.build())) {

            BoundRequestBuilder requestBuilder = asyncHttpClient.preparePost(apiVirusTotal.concat("files"));
            requestBuilder.setHeader("Content-Type", "multipart/form-data");
            requestBuilder.setHeader("x-apikey", apiKey);

            requestBuilder.addBodyPart(new FilePart("file", file));

            CompletableFuture<Response> responseFuture = requestBuilder.execute().toCompletableFuture();

            Response response = responseFuture.join();

            if (response.getStatusCode() != 200) throw new RuntimeException("ERROR AL CONSULTAR VIRUS TOTAL");

            return response.getResponseBody();

        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    /**
     * Este metodo se encarga de solicitar la respuesta del analisis de una url o un archivo
     *
     * @param newUrl url a donde se debe enviar la peticion
     * @return String esponse en formato Json
     */
    public String sendResponseRequest(String newUrl) {

        DefaultAsyncHttpClientConfig.Builder clientConfigBuilder = new DefaultAsyncHttpClientConfig.Builder();

        try (AsyncHttpClient asyncHttpClient = new DefaultAsyncHttpClient(clientConfigBuilder.build())) {
            BoundRequestBuilder requestBuilder = asyncHttpClient.prepareGet(newUrl);
            requestBuilder.setHeader("x-apikey", apiKey);

            CompletableFuture<Response> responseFuture = requestBuilder.execute().toCompletableFuture();

            Response response = responseFuture.join();

            if (response.getStatusCode() != 200) throw new RuntimeException("ERROR AL CONSULTAR VIRUS TOTAL");

            return response.getResponseBody();

        } catch (IOException e) {
            throw new RuntimeException(e.getMessage());
        }

    }

}
