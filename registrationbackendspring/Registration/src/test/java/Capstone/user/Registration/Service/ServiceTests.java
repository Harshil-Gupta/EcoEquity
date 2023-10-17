package Capstone.user.Registration.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.util.ArrayList;
import java.util.List;

import Capstone.user.Registration.Repositry.UserRepository;
import Capstone.user.Registration.User.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@ExtendWith(MockitoExtension.class)
public class ServiceTests {
    @InjectMocks
    UserService service;
    @Mock
    UserRepository ur;

    @BeforeEach void setUp()
    {
        this.service = new UserService(this.ur);
    }

    //test adding user
    @Test
    void testSaveComment() {
        User user = new User("a.gmail.com", "a", "1234567890", "xyx", true, 20.0);
        //test
        User u = service.registerUser(user);
        verify(ur, times(1)).save(user);
    }

    //test get wallet details
    @Test
    void testWalletDetails() {
        //test
        User user = new User("a.gmail.com", "a", "1234567890", "xyx", true, 20.0);
        when(ur.findByUsername("xyz")).thenReturn(user);
        ResponseEntity<Double> resp = service.walletDetails("xyz");
        ResponseEntity<Double> expected = new ResponseEntity<>(20.0, HttpStatus.OK);
        assertEquals(expected, resp);
        verify(ur, times(1)).findByUsername("xyz");
    }

    // test get email
    @Test
    void testGetEmail() {
        //test
        User user = new User("a.gmail.com", "a", "1234567890", "xyx", true, 20.0);
        when(ur.findByUsername("xyz")).thenReturn(user);
        String resp = service.getUserEmailfromUsername("xyz");
        assertEquals("a.gmail.com", resp);
        verify(ur, times(1)).findByUsername("xyz");
    }

    // test get email
    @Test
    void testGetEmailWhenNull() {
        //test
        when(ur.findByUsername("xyz")).thenReturn(null);
        String resp = service.getUserEmailfromUsername("xyz");
        assertEquals("Could not find email", resp);
        verify(ur, times(1)).findByUsername("xyz");
    }

}
