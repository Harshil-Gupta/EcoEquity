package Capstone.user.Registration.User;


import Capstone.user.Registration.Repositry.UserRepository;
import Capstone.user.Registration.Service.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        final User user = this.userRepository.findByUsername(userName);
        System.out.println("email "+user.getEmail());

        if (user == null) {
            throw new UsernameNotFoundException("User not found !!");
        } else {
            return new CustomUserDetails(user);
        }


        //user database `

//        if (userName.equals("varsha")) {
//            return new User("varsha", "varsha", new ArrayList<>());
//        } else {
//            throw new UsernameNotFoundException("User not found !!");
//        }

    }
}
