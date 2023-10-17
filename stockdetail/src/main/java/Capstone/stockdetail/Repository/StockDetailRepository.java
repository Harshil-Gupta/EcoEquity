package Capstone.stockdetail.Repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import Capstone.stockdetail.Model.StockDetail;

public interface StockDetailRepository extends MongoRepository<StockDetail, String> {
	List<StockDetail> findByUsername(String username);
	Optional<StockDetail> findById(String stockId);
	List<StockDetail> findByStockName(String stockName);
	List<StockDetail> findByUsernameAndType(String username, String type);
}

