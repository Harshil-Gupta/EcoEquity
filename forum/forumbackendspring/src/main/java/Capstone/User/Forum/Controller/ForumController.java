package Capstone.User.Forum.Controller;

import Capstone.User.Forum.Model.Forum;
import Capstone.User.Forum.Repository.ForumRepository;
import Capstone.User.Forum.Service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/forum")
public class ForumController {
    @Autowired
    private ForumService forum_service;

    //post a comment to forum database
    @PostMapping("/addComment")
    public ResponseEntity<?> addComment(@RequestBody Forum comment) {
        return forum_service.saveComment(comment);
    }

    //get all comments
    @GetMapping("/getAllComments")
    public List<Forum> getComments() {
        return forum_service.getComments();
    }

    //delete comment with given id
    @DeleteMapping("/deleteComment/{id}")
    public String deleteComment(@PathVariable int id){
        return forum_service.deleteComment(id);
    }

    //get all comments with given stockid
    @GetMapping("/getStockComments/{stockId}")
    public List<Forum> getStockComments(@PathVariable String stockId) {
        return forum_service.getStockComments(stockId);
    }
}
