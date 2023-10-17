package Capstone.user.Registration.Controller;

import Capstone.user.Registration.Service.UserService;
import Capstone.user.Registration.User.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins="*") 
@RestController
@RequestMapping("/users")
public class UserController {
	private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/{username}")
    public void info(@PathVariable("username") String username) {
    	userService.info(username);
    }
    
    @PostMapping("/register")
    public User registerUser(@RequestBody User user)  {
        System.out.println(user.toString());
    	return userService.registerUser(user);
    }
    
    @GetMapping("/detailswallet/{username}")
    public ResponseEntity<Double> walletDetails(@PathVariable("username") String username) {
    	return userService.walletDetails(username);
    }
    
//    @PutMapping("/wallet/{email}")
//    public ResponseEntity<String> updateUserWallet(@PathVariable("email") String email, @RequestBody double updatedWalletVal) {
//        try {
//            User existingUser = userService.getUserByEmail(email);
//
//            if (existingUser != null) {
//                existingUser.setWallet(updatedWalletVal);
//                existingUser.setEmail(email);
//                userService.updateUser(existingUser);
//                return ResponseEntity.ok("User wallet updated successfully.");
//            } else {
//                return ResponseEntity.status(404).body("User not found with email: " + email);
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error updating user wallet: " + e.getMessage());
//        }
//    }
    @PutMapping("/wallet/{username}")
    public ResponseEntity<String> updateUserWallet(@PathVariable("username") String username, @RequestBody double updatedWalletVal) {
        try {
            User existingUser = userService.getUserByUsername(username);

            if (existingUser != null) {
                existingUser.setWallet(updatedWalletVal);
                userService.updateUser(existingUser);
                return ResponseEntity.ok("User wallet updated successfully.");
            } else {
                return ResponseEntity.status(404).body("User not found with username: " + username);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error updating user wallet: " + e.getMessage());
        }
    }
//    @GetMapping("/getemail/{username}")
//    public ResponseEntity<String> getUserEmailfromUsername(@PathVariable("username") String username){
//    	try {
//    		String existingUserEmail = userService.getUserEmailfromUsername(username);
//    		if(existingUserEmail!=null) {
//    			return ResponseEntity.ok(existingUserEmail);
//    		}
//    		else {
//    			return ResponseEntity.status(404).body("User email not found with username: " + username);
//    		}
//    	}
//    	catch(Exception e) {
//    		return ResponseEntity.status(500).body("Error in getemail from username" + e.getMessage());
//    	}
//    	
//    }

}
