package Capstone.user.Registration.Repositry;

import Capstone.user.Registration.User.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    User findByUsername(String username);
    // Add custom query methods if needed
}
