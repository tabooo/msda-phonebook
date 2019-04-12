package phonebook.work.users.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The persistent class for the users database table.
 * 
 */
@Entity
@Table(name = "user_rights")
public class UserRight implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "USER_RIGHT_ID")
	private Integer userRightId;

	@Column(name = "USER_ID")
	private Integer userId;

	@Column(name = "RIGHT_ID")
	private Integer rightId;

	public Integer getUserRightId() {
		return userRightId;
	}

	public void setUserRightId(Integer userRightId) {
		this.userRightId = userRightId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getRightId() {
		return rightId;
	}

	public void setRightId(Integer rightId) {
		this.rightId = rightId;
	}

}