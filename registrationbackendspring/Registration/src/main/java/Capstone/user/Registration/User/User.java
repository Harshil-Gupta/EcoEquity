package Capstone.user.Registration.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;


@Data
@Document(collection = "users")
public class User {
    @Id
    @Field("email")
    private String email;
    private String username;
    private String phone;
    private String password;
    private boolean agreeToTerms;
    private double wallet=0.0;
    
//	public User(User existingUser) { //Deep Copy 
//		existingUser.userId = this.getUserId();
//		existingUser.name = this.getName();
//		existingUser.phone = this.getPhone();
//		existingUser.email = this.getEmail();
//		existingUser.password = this.getPassword();
//		existingUser.agreeToTerms = this.isAgreeToTerms();
//		existingUser.wallet = this.getWallet();
//	}

	public User(String email, String username, String phone, String password, boolean agreeToTerms, double wallet) {
		this.email = email;
		this.username = username;
		this.phone = phone;
		this.password = password;
		this.agreeToTerms = agreeToTerms;
		this.wallet = wallet;
	}

	public String getEmail() {
		return this.email;
	}
	public String getUsername() {
		return username;
	}

	public void setUsername(String name) {
		this.username = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Override
	public String toString() {
		return "User [name=" + username + ", phone=" + phone + ", email=" + email + ", password="
				+ password + ", agreeToTerms=" + agreeToTerms + ", wallet=" + wallet + "]";
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isAgreeToTerms() {
		return agreeToTerms;
	}

	public void setAgreeToTerms(boolean agreeToTerms) {
		this.agreeToTerms = agreeToTerms;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public double getWallet() {
		return wallet;
	}

	public void setWallet(double wallet) {
		this.wallet = wallet;
	}

	public String getRol() {
		return "User";
	}

	public String getRole() {
		return "user";
	}
}
