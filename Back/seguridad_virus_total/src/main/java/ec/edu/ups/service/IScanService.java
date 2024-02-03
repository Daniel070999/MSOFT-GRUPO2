package ec.edu.ups.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface IScanService {

    Map<String, Object> scanUrlProcess(String url);

    Map<String, Object> scanFile(MultipartFile multipartFile);


}
