package ec.edu.ups.service;

import com.google.firebase.auth.FirebaseAuthException;
import ec.edu.ups.entity.FirebaseUser;

import java.util.List;

public interface IMyFirebaseService {

    List<FirebaseUser> getAllUsers() throws FirebaseAuthException;
}
