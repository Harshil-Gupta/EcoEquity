package Capstone.stockdetail.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Capstone.stockdetail.Model.StockDetail;
import Capstone.stockdetail.Repository.StockDetailRepository;

@Service
public class StockDetailService {
	
	private StockDetailRepository stockDetailRepository;

    @Autowired
    public StockDetailService(StockDetailRepository stockDetailRepository) {
        this.stockDetailRepository = stockDetailRepository;
    }
    
    public StockDetail createStock(StockDetail stockdetail) {
        return stockDetailRepository.save(stockdetail);
    }
    public List<StockDetail> getStocksForUser(String username) {
        List<StockDetail> userStocks = stockDetailRepository.findByUsername(username);
    	for (StockDetail stock : userStocks) {
    		System.out.println(stock.toString());
    	}
    	return userStocks;
    }
    public List<StockDetail> getAllStocks() {
        return stockDetailRepository.findAll();
    }
    
    public double averageBuyPriceForStock(String username, String stockName) throws Exception {
        // Input validation
        if (stockName == null || stockName.isEmpty()) {
            throw new IllegalArgumentException("Stock name cannot be null or empty");
        }

        List<StockDetail> stocks = stockDetailRepository.findByStockName(stockName);

        // Checks if stocks are found for the given stockName
        if (stocks.isEmpty()) {
            throw new Exception("No stocks found for stock name: " + stockName);
        }

        int totalOwnedStocks = stocks.stream()
                .filter(stock -> stock.getType().equalsIgnoreCase("Buy"))
                .filter(stock -> stock.getUsername().equalsIgnoreCase(username))
                .mapToInt(StockDetail::getQuantity)
                .sum();
        
        // Checks if there are owned stocks
        if (totalOwnedStocks == 0) {
            return 0;
        }

        double totalInvestment = stocks.stream()
                .filter(stock -> stock.getType().equalsIgnoreCase("Buy"))
                .filter(stock -> stock.getUsername().equalsIgnoreCase(username))
                .mapToDouble(stock -> stock.getStockPrice() * stock.getQuantity())
                .sum();
        
        return totalInvestment / totalOwnedStocks;
    }
    
    public int totalOwnedStocksForStock(String username, String stockName) {
        List<StockDetail> stocks = stockDetailRepository.findByStockName(stockName);

        int totalOwnedStocks = stocks.stream()
        		.filter(stock -> stock.getUsername().equalsIgnoreCase(username))
                .mapToInt(stock -> stock.getType().equalsIgnoreCase("Buy") ? stock.getQuantity() : -stock.getQuantity())
                .sum();

        return totalOwnedStocks;
    }
    
    public double getTotalInvestedValueForUser(String username) {
        List<StockDetail> userStocks = stockDetailRepository.findByUsername(username);

        double totalInvestedValue = userStocks.stream()
                .filter(stock -> stock.getType().equalsIgnoreCase("Buy"))
                .filter(stock -> stock.getUsername().equalsIgnoreCase(username))
                .mapToDouble(stock -> stock.getStockPrice() * stock.getQuantity())
                .sum();

        return totalInvestedValue;
    }

    public double getTotalValueOfSoldStocksForUser(String username) {
        List<StockDetail> userStocks = stockDetailRepository.findByUsernameAndType(username, "Sell");

        double totalValueOfSoldStocks = userStocks.stream()
        		.filter(stock -> stock.getUsername().equalsIgnoreCase(username))
                .mapToDouble(stock -> stock.getStockPrice() * stock.getQuantity())
                .sum();

        return totalValueOfSoldStocks;
    }
}
