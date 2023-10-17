package Capstone.User.Forum.Service;

import Capstone.User.Forum.Model.Forum;
import Capstone.User.Forum.Repository.ForumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForumService {
    private ForumRepository fr;

    @Autowired
    public ForumService(ForumRepository fr) {
        this.fr = fr;
    }

    //post a comment
    public ResponseEntity<?> saveComment(Forum comment){
        Forum obj = fr.save(comment);
        return ResponseEntity.ok(obj);
    }

    //get all comments
    public List<Forum> getComments(){
        return fr.findAll();
    }

    //delete a comment with given id
    public String deleteComment(int id){
        fr.deleteById(String.valueOf(id));
        return "Deleted Successfully";
    }

    //get list of comments with stockId as given stock
    public List<Forum> getStockComments(String stockId){
        return fr.findByStockId(stockId);
    }
}
