package Capstone.stockdetail.Service;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import Capstone.stockdetail.Model.StockDetail;
import Capstone.stockdetail.Repository.StockDetailRepository;
import Capstone.stockdetail.Service.StockDetailService;

import java.util.ArrayList;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class StockDetailServiceTests {

    @InjectMocks
    StockDetailService service;

    @Mock
    StockDetailRepository stockDetailRepository;

    @BeforeEach
    void setUp() {
        this.service = new StockDetailService(stockDetailRepository);
    }


    // Test getting stocks for a user
    @Test
    void testGetStocksForUser() {
        String username = "testUser";
        List<StockDetail> stocks = new ArrayList<>();
        // Add StockDetail objects to the 'stocks' list.

        when(stockDetailRepository.findByUsername(username)).thenReturn(stocks);

        List<StockDetail> result = service.getStocksForUser(username);

        assertEquals(stocks.size(), result.size());
    }

    // Test getting all stocks
    @Test
    void testGetAllStocks() {
        List<StockDetail> allStocks = new ArrayList<>();
        // Add StockDetail objects to the 'allStocks' list.

        when(stockDetailRepository.findAll()).thenReturn(allStocks);

        List<StockDetail> result = service.getAllStocks();

        assertEquals(allStocks.size(), result.size());
    }

   
}

