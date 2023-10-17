package Capstone.stockdetail.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Capstone.stockdetail.Model.StockDetail;
import Capstone.stockdetail.Service.StockDetailService3;
import Capstone.stockdetail.Service.StockDetailService;

@RestController
@RequestMapping("/stocks")
@CrossOrigin(origins = "http://localhost:3000")
public class StockDetailController {

    private StockDetailService stockDetailService;
   
    public StockDetailController(StockDetailService stockdetailservice) {
    	this.stockDetailService = stockdetailservice;
    }
    
  @PostMapping
  public StockDetail createStock(@RequestBody StockDetail stockDetail) {
      return stockDetailService.createStock(stockDetail);
  }
  
  @GetMapping("/{username}")
  public List<StockDetail> getStocksForUser(@PathVariable("username") String username) {
	  return stockDetailService.getStocksForUser(username);
  }
  
  @GetMapping
  public List<StockDetail> getAllStocks() {
	  return stockDetailService.getAllStocks();
  }
  
  @GetMapping("/{username}/avgprice/{stockName}")
  public double averageBuyPriceForStock(@PathVariable("username") String username, @PathVariable("stockName") String stockName) {
	  try {
		return stockDetailService.averageBuyPriceForStock(username, stockName);
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return 0;
  }
  
  @GetMapping("/{username}/qty/{stockName}")
  public double totalOwnedStocksForStock(@PathVariable("username") String username, @PathVariable("stockName") String stockName) {
	  return stockDetailService.totalOwnedStocksForStock(username, stockName);
  }
  
  @GetMapping("/{username}/totalInvestedValue")
  public Double getTotalInvestedValueForUser(@PathVariable("username") String username) {
      double totalInvestedValue = stockDetailService.getTotalInvestedValueForUser(username);
      return totalInvestedValue;
  }
  
  @GetMapping("/{username}/totalRealisedValue")
  public Double getTotalValueOfSoldStocksForUser(@PathVariable("username") String username) {
      double totalValueOfSoldStocks = stockDetailService.getTotalValueOfSoldStocksForUser(username);
      return (totalValueOfSoldStocks);
  }
  
//    @Autowired
//    public StockDetailController(StockDetailService stockDetailService) {
//        this.stockDetailService = stockDetailService;
//    }
//
//    @PostMapping
//    public StockDetail createStock(@RequestBody StockDetail stockDetail) {
//        return stockDetailService.createStock(stockDetail);
//    }
//    
//    @GetMapping("/{username}")
//    public List<StockDetail> getStocksForUser(@PathVariable String username) {
//        return stockDetailService.getStocksForUser(username);
//    }
//    
//    @GetMapping("/{username}/qty/{stockname}")
//    public int getStocksOwnedByUser(@PathVariable String username, @PathVariable String stockname) {
//        return stockDetailService.getStocksOwnedByUser(username,stockname);
//    }
//    
//    @GetMapping("/{username}/avgprice/{stockname}")
//    public double getAvgStockPriceByUser(@PathVariable String username, @PathVariable String stockname) {
//        return stockDetailService.getAvgStockPriceByUser(username,stockname);
//    }
//    
//    
//    @GetMapping("/{username}/qty")
//    public List<Pair<String,Integer>> getAllStocksOwnedByUser(@PathVariable String username) {
//        return stockDetailService.getAllStocksOwnedByUser(username);
//    }
//    
//    @GetMapping
//    public List<StockDetail> getAllStocks() {
//        return stockDetailService.getAllStocks();
//    }
//    
//    
    
}

