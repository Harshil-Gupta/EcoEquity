package Capstone.stockdetail.Controller;


import static org.junit.jupiter.api.Assertions.assertTrue;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;

import Capstone.stockdetail.Model.StockDetail;
import Capstone.stockdetail.Service.StockDetailService;

@ExtendWith(MockitoExtension.class)
public class StockDetailControllerTest {

    @InjectMocks
    StockDetailController controller;

    @Mock
    StockDetailService stockDetailService;



    // Test creating a stock
//    @Test
//    void testCreateStock() {
//        StockDetail stockDetail = new StockDetail(/* Initialize the StockDetail object */);
//        when(stockDetailService.createStock(stockDetail)).thenReturn(stockDetail);
//
//        ResponseEntity<StockDetail> response = controller.createStock(stockDetail);
//
//        assertEquals(stockDetail, response.getBody());
//    }

    // Test getting stocks for a user
    @Test
    void testGetStocksForUser() {
        String username = "testUser";
        List<StockDetail> stocks = new ArrayList<>();
        // Add StockDetail objects to the 'stocks' list.

        when(stockDetailService.getStocksForUser(username)).thenReturn(stocks);

        List<StockDetail> result = controller.getStocksForUser(username);

        assertEquals(stocks.size(), result.size());
    }

    // Test getting all stocks
    @Test
    void testGetAllStocks() {
        List<StockDetail> allStocks = new ArrayList<>();
        // Add StockDetail objects to the 'allStocks' list.

        when(stockDetailService.getAllStocks()).thenReturn(allStocks);

        List<StockDetail> result = controller.getAllStocks();

        assertEquals(allStocks.size(), result.size());
    }

 // Test getting total invested value for a user
    @Test
    void testGetTotalInvestedValueForUser() {
        String username = "testUser";
        
        // Simulate a scenario where the total invested value is expected to be a positive value
        when(stockDetailService.getTotalInvestedValueForUser(username)).thenReturn(1000.0); 
        
        double result = controller.getTotalInvestedValueForUser(username);
        
        assertTrue(result > 0); // Verify that the result is a positive value
    }

    
 // Test getting total value of sold stocks for a user
    @Test
    void testGetTotalValueOfSoldStocksForUser() {
        String username = "testUser";
        
        // Simulate a scenario where total value of sold stocks is expected to be greater than 0
        when(stockDetailService.getTotalValueOfSoldStocksForUser(username)).thenReturn(500.0); 
        
        double result = controller.getTotalValueOfSoldStocksForUser(username);
        
        assertTrue(result > 0); // Verify that the result is a positive value
    }

    
}
