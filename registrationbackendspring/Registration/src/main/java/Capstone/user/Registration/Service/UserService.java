package Capstone.user.Registration.Service;

import Capstone.user.Registration.Repositry.UserRepository;
import Capstone.user.Registration.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user)  {
        // Check if a user with the same email already exists
        User existingUser = userRepository.findByEmail(user.getEmail());
        User existingUser2 = userRepository.findByUsername(user.getUsername());

        if (existingUser != null) {
            // A user with the same email already exists, throw a custom exception
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"user email already exists");
        }
        else if(existingUser2 != null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"username already exists");
        }

        // No user with the same email exists, so save the new user
        return userRepository.save(user);
    }
    
    public void updateUser(User user) {
        userRepository.save(user);
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public ResponseEntity<Double> walletDetails(String username) {
		// TODO Auto-generated method stub
		try {
	        User existingUser = userRepository.findByUsername(username);

	        if (existingUser != null) {
	            return ResponseEntity.ok(existingUser.getWallet());
	        } else {
	            return ResponseEntity.status(404).body(0.0);
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(500).body(0.0);
	    }
	}

	public void info(String username) {
		User foundUser = userRepository.findByUsername(username); 
		System.out.println(foundUser);
		
	}
	
	public User getUserByUsername(String username) {
		return userRepository.findByUsername(username);
	}


	public String getUserEmailfromUsername(String username) {
		User foundUser = userRepository.findByUsername(username);
		if(foundUser==null) {
			return "Could not find email";
		}
		return foundUser.getEmail();
	}
//
//	
//	public ResponseEntity<Double> walletDetails(String email) {
//		// TODO Auto-generated method stub
//		try {
//	        User existingUser = userRepository.findByEmail(email);
//
//	        if (existingUser != null) {
//	            return ResponseEntity.ok(existingUser.getWallet());
//	        } else {
//	            return ResponseEntity.status(404).body(0.0);
//	        }
//	    } catch (Exception e) {
//	        return ResponseEntity.status(500).body(0.0);
//	    }
//	}
//
//	public void info(String email) {
//		User foundUser = userRepository.findByEmail(email); 
//		System.out.println(foundUser);
//		
//	}
//
}
