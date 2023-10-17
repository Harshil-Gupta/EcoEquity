package Capstone.User.Forum.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;

import Capstone.User.Forum.Model.Forum;
import Capstone.User.Forum.Repository.ForumRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

@ExtendWith(MockitoExtension.class)
public class ServiceTests {

    @InjectMocks
    ForumService service;

    @Mock
    ForumRepository fr;

    @BeforeEach void setUp()
    {
        this.service = new ForumService(this.fr);
    }

    //test getting all comments
    @Test
    void testGetComments() {
        List<Forum> list = new ArrayList<Forum>();
        Forum f1 = new Forum(1, "A", "AAPL", "Buy", "Buy");
        Forum f2 = new Forum(1, "B", "AAPL", "Sell", "Sell");
        list.add(f1);
        list.add(f2);

        when(fr.findAll()).thenReturn(list);

        //test
        List<Forum> ForumList = service.getComments();

        //check size
        assertEquals(2, ForumList.size());
        verify(fr, times(1)).findAll();
    }

    //test getting comments by stockid
    @Test
    void testGetCommentsByStock() {
        List<Forum> list = new ArrayList<Forum>();
        Forum f1 = new Forum(1, "A", "GOOGL", "Buy", "Buy");
        Forum f2 = new Forum(1, "B", "GOOGL", "Sell", "Sell");
        list.add(f1);
        list.add(f2);

        when(fr.findByStockId("GOOGL")).thenReturn(list);

        //test
        List<Forum> ForumList  = service.getStockComments("GOOGL");

        //check size
        assertEquals(2, ForumList.size());
        verify(fr, times(1)).findByStockId("GOOGL");
    }

    //test delete comment
    @Test
    void testDeleteComment() {
        //test
        service.deleteComment(1);
        verify(fr, times(1)).deleteById("1");
    }

    //test adding comment
    @Test
    void testSaveComment() {
        Forum f1 = new Forum(1, "A", "GOOGL", "Buy", "Buy");
        //test
        ResponseEntity<?> r = service.saveComment(f1);
        verify(fr, times(1)).save(f1);
    }
}
