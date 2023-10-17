package Capstone.User.Forum.Repository;

import Capstone.User.Forum.Model.Forum;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ForumRepository extends MongoRepository<Forum, String> {
    // custom query method to find list of comments by stockId
    List<Forum> findByStockId(String stockId);
}
