package phonebook.work.phonebook.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * The persistent class for the users database table.
 */
@Entity
@Table(name = "group_phones")
public class GroupPhone implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GROUP_PHONE_ID")
    private Integer groupPhoneId;

    @Column(name = "GROUP_ID")
    private Integer groupId;

    @Column(name = "PHONE_ID")
    private Integer phoneId;

    @Column(name = "STATE")
    private Integer state;

    @Column(name = "USER_ID")
    private Integer userId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "INSERT_DATE")
    private Date insertDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "UPDATE_DATE")
    private Date updateDate;

    public Integer getGroupPhoneId() {
        return groupPhoneId;
    }

    public void setGroupPhoneId(Integer groupPhoneId) {
        this.groupPhoneId = groupPhoneId;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public Integer getPhoneId() {
        return phoneId;
    }

    public void setPhoneId(Integer phoneId) {
        this.phoneId = phoneId;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Date getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
}