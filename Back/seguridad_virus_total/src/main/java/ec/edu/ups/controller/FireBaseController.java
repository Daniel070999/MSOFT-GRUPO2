package ec.edu.ups.controller;

import ec.edu.ups.entity.FirebaseUser;
import ec.edu.ups.service.IMyFirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("fireBase")
public class FireBaseController {

    @Autowired
    IMyFirebaseService myFirebaseService;

    @GetMapping("/getAllUser")
    public ResponseEntity<List<FirebaseUser>> getAllUser() throws Exception {
        List<FirebaseUser> listFirebaseUser = myFirebaseService.getAllUsers();
        if (listFirebaseUser == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(listFirebaseUser);
    }
}
