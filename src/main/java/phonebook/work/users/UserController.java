package phonebook.work.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import phonebook.security.filter.Secured;
import phonebook.util.Transaction;
import phonebook.work.users.entities.User;
import phonebook.work.users.entities.UserRight;

import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping(value = "/user", method = {RequestMethod.POST, RequestMethod.GET})
public class UserController {

    @Autowired
    private UserService repository;

    @Autowired
    private HttpSession session;

    public UserController() {
    }

    public UserController(UserService repository) {
        this.repository = repository;
    }

    @RequestMapping("/authenticate")
    public Transaction<User, ?> authenticate(@RequestBody Map<String, Object> body, HttpSession session) {

        if (body.get("username") == null || body.get("password") == null) {
            return new Transaction.Builder<User, Object>(false).description("მომხმარებელი და პაროლი")
                    .build();
        }

        Transaction<User, ?> authenticate = repository.authenticate(body.get("username").toString(),
                body.get("password").toString());
        User user = null;

        if (authenticate.isValid()) {
            user = authenticate.getAdded();
            user.setPassword(null);
            session.setAttribute("user", user);
            session.setAttribute("userId", user.getUserId());
            session.setAttribute("ipAddress", ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                    .getRequest().getRemoteAddr());
            user.setRights(repository.getUserRightMap(user.getUserId()));
        }
        return authenticate;
    }


    @RequestMapping("/isLogin")
    public Transaction<User, ?> isLogin(HttpSession session) {

        if (session.getAttribute("user") != null) {
            User user = (User) session.getAttribute("user");
            return new Transaction.Builder<User, Object>(true).added(user).build();
        }
        return new Transaction.Builder<User, Object>(false).description("გაიარეთ ავტორიზაცია").build();
    }


    @RequestMapping("/getUserInfo")
    public UserInfo getUserInfo(HttpSession session) {

        User user = repository.getUser((Integer) session.getAttribute("userId"));

        UserInfo userInfo = new UserInfo();

        userInfo.setEmail(user.getEmail());
        userInfo.setFullName(user.getFirstName());
        userInfo.setPersonalNo(user.getLastName());
        userInfo.setPhone(user.getPhone());
        userInfo.setUserName(user.getUserName());
        userInfo.setSectionId((Integer) session.getAttribute("sectionId"));
        return userInfo;
    }

    @RequestMapping("/logOut")
    public Boolean logOut(HttpSession session) {
        try {
            session.invalidate();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @RequestMapping("/getUserRightObject")
    public UserRightObject getUserRightObject(@RequestParam Integer userId) {
        return repository.getUserRightObject(userId);
    }

    @Secured({"USER_ADD_EDIT"})
    @RequestMapping("/addUserRight")
    public Transaction<UserRight, ?> addUserRight(@RequestParam Integer userId, @RequestParam Integer rightId) {
        return repository.addUserRight(userId, rightId);
    }

    @Secured({"USER_ADD_EDIT"})
    @RequestMapping("/removeUserRight")
    public Transaction<UserRight, ?> removeUserRight(@RequestParam Integer userId, @RequestParam Integer rightId) {
        return repository.removeUserRight(userId, rightId);
    }
}
