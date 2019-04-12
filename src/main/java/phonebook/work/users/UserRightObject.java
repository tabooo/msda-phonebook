package phonebook.work.users;

import phonebook.work.users.entities.Right;

import java.io.Serializable;
import java.util.List;

public class UserRightObject implements Serializable {
    private static final long serialVersionUID = 1L;

    private List<Right> userRights;

    private List<Right> otherRights;

    public List<Right> getUserRights() {
        return userRights;
    }

    public void setUserRights(List<Right> userRights) {
        this.userRights = userRights;
    }

    public List<Right> getOtherRights() {
        return otherRights;
    }

    public void setOtherRights(List<Right> otherRights) {
        this.otherRights = otherRights;
    }
}
