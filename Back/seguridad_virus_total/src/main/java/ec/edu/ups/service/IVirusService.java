package ec.edu.ups.service;

import ec.edu.ups.model.InformationRequest;

import java.io.IOException;

public interface IVirusService {

    String getConsultIP(InformationRequest informationRequest) throws IOException;

}
