package ec.edu.ups.service.impl;

import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.ListUsersPage;
import com.google.firebase.auth.UserRecord;
import ec.edu.ups.entity.FirebaseUser;
import ec.edu.ups.service.IMyFirebaseService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyFirebaseServiceImpl implements IMyFirebaseService {
    private final FirebaseApp firebaseApp;

    public MyFirebaseServiceImpl(FirebaseApp firebaseApp) {
        this.firebaseApp = firebaseApp;
    }

    public List<FirebaseUser> getAllUsers() throws FirebaseAuthException {
        List<FirebaseUser> userList = new ArrayList<>();
        ListUsersPage page = FirebaseAuth.getInstance().listUsers(null);

        for (UserRecord userRecord : page.iterateAll()) {
            FirebaseUser firebaseUser = new FirebaseUser();
            firebaseUser.setUid(userRecord.getUid());
            firebaseUser.setEmail(userRecord.getEmail());

            userList.add(firebaseUser);
        }

        return userList;
    }


}
