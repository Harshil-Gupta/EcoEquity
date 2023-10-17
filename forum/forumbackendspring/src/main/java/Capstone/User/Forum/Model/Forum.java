package Capstone.User.Forum.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
@Data
public class Forum {
    @Id
    @Field("_id")
    private int _id;
    private String userName;
    private String stockId;
    private String userRating;
    private String comment;

    public Forum(int _id, String userName, String stockId, String userRating, String comment) {
        this._id = _id;
        this.userName = userName;
        this.stockId = stockId;
        this.userRating = userRating;
        this.comment = comment;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getStockId() {
        return stockId;
    }

    public void setStockId(String stockId) {
        this.stockId = stockId;
    }

    public String getUserRating() {
        return userRating;
    }

    public void setUserRating(String userRating) {
        this.userRating = userRating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

    @Override
    public String toString() {
        return "Forum{" +
                "_id=" + _id +
                ", userName='" + userName + '\'' +
                ", stockId='" + stockId + '\'' +
                ", userRating='" + userRating + '\'' +
                ", comment='" + comment + '\'' +
                '}';
    }
}
