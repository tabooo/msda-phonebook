package phonebook.work.users;

import org.springframework.stereotype.Component;
import phonebook.security.filter.Securiry;
import phonebook.util.Transaction;
import phonebook.work.users.entities.Right;
import phonebook.work.users.entities.User;
import phonebook.work.users.entities.UserRight;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static phonebook.util.ObjectUtils.checkForNull;

@Component
public class UserService {

    @PersistenceContext()
    private EntityManager em;

    public Transaction<User, ?> authenticate(String userName, String password) {

        try {
            checkForNull(userName);
            checkForNull(password);

            new Securiry();
            password = Securiry.hashPassword(password);
            User user = getUserByUsername(userName);

            if (user == null || !user.getPassword().equals(password)) {
                return new Transaction.Builder<User, Object>(false).description("მომხმარებელი ან პაროლი არასწორია")
                        .build();
            }

            user.setPassword(null);

            return new Transaction.Builder<User, Object>(true).added(user).build();
        } catch (Exception e) {
            e.printStackTrace();
            return new Transaction.Builder<User, Object>(false).description("დაფიქსირდა შეცდომა").build();
        }
    }

    public User getUserByUsername(String userName) {

        User user;
        List<User> users = em.createNamedQuery("User.authenticate", User.class).setParameter("username", userName)
                .getResultList();

        if (users == null || users.isEmpty() || users.size() > 1) {
            return null;
        }
        user = users.get(0);
        return user;
    }

    public User getUser(Integer userId) {

        return em.find(User.class, userId);

    }

    private List<Right> getUserRights(Integer userId) {

        return em.createQuery(
                "select r from Right r where r.rightId in (select ur.rightId from UserRight ur where ur.userId =:userId)",
                Right.class).setParameter("userId", userId).getResultList();
    }

    public List<String> getUserRightMap(Integer userId) {
        List<String> rigtsMap = new ArrayList<String>();
        List<Right> rights = getUserRights(userId);
        for (Right right : rights) {
            rigtsMap.add(right.getRightKey());
        }
        return rigtsMap;
    }

    private List<Right> getRights() {
        return em.createQuery("select t from Right t", Right.class).getResultList();
    }

    public UserRightObject getUserRightObject(Integer userId) {

        List<Right> allRights = getRights();
        List<Right> userRights = getUserRights(userId);

        List<Right> otherRigths = new ArrayList<>();

        for (Right rights : allRights) {

            if (!userRights.contains(rights)) {
                otherRigths.add(rights);
            }
        }

        UserRightObject object = new UserRightObject();
        object.setUserRights(userRights);
        object.setOtherRights(otherRigths);

        return object;
    }

    @Transactional
    public Transaction<UserRight, ?> addUserRight(Integer userId, Integer rightId) {
        try {

            Long count = em
                    .createQuery(
                            "select count(t.userRightId) from UserRight t where t.userId =:userId and t.rightId =:rightId",
                            Long.class)
                    .setParameter("userId", userId).setParameter("rightId", rightId).getSingleResult();

            if (count > 0) {
                return new Transaction.Builder<UserRight, Object>(false)
                        .description("ასეთი უფლება უკვე დამატებული აქვს.").build();
            }

            UserRight userRight = new UserRight();
            userRight.setUserId(userId);
            userRight.setRightId(rightId);
            em.persist(userRight);
            return new Transaction.Builder<UserRight, Object>(true).build();

        } catch (Exception e) {
            return new Transaction.Builder<UserRight, Object>(false).description("დაფიქსირდა შეცდომა.").build();
        }
    }

    @Transactional
    public Transaction<UserRight, ?> removeUserRight(Integer userId, Integer rightId) {
        try {

            List<UserRight> rights = em
                    .createQuery("select t from UserRight t where t.userId =:userId and t.rightId =:rightId",
                            UserRight.class)
                    .setParameter("userId", userId).setParameter("rightId", rightId).getResultList();

            for (UserRight userRights : rights) {
                em.remove(userRights);
            }

            return new Transaction.Builder<UserRight, Object>(true).build();

        } catch (Exception e) {
            return new Transaction.Builder<UserRight, Object>(false).description("დაფიქსირდა შეცდომა.").build();
        }
    }
}
