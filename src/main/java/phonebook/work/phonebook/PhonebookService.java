package phonebook.work.phonebook;

import org.springframework.stereotype.Component;
import phonebook.util.QueryResult;
import phonebook.util.Transaction;
import phonebook.work.phonebook.entities.Group;
import phonebook.work.phonebook.entities.GroupPhone;
import phonebook.work.phonebook.entities.Phone;
import phonebook.work.users.entities.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class PhonebookService {

    @PersistenceContext()
    private EntityManager em;

    public QueryResult<List<Phone>, Long, Double> searchPhones(PhoneSearchObject searchObject, HttpSession session) {
        User user = (User) session.getAttribute("user");

        QueryResult<List<Phone>, Long, Double> result = new QueryResult<List<Phone>, Long, Double>();

        if (searchObject.getFirstResult() == null) {
            searchObject.setMaxResult(0);
        }
        if (searchObject.getMaxResult() == null) {
            searchObject.setMaxResult(100);
        }

        StringBuilder st = new StringBuilder();
        st.append("from Phone as p where p.state=1 ");

        Map<String, Object> queryParams = new HashMap<String, Object>();

        String firstName = searchObject.getFirstName();
        if (firstName != null) {
            st.append("and p.firstName like :firstName ");
            queryParams.put("firstName", "%" + firstName + "%");
        }

        String lastName = searchObject.getLastName();
        if (lastName != null) {
            st.append("and p.lastName like :lastName ");
            queryParams.put("lastName", "%" + lastName + "%");
        }

        String phone = searchObject.getPhone();
        if (phone != null) {
            st.append("and p.phone like :phone ");
            queryParams.put("phone", "%" + phone + "%");
        }

        st.append("and p.userId=:userId ");
        queryParams.put("userId", user.getUserId());

        st.append("order by p.insertDate desc");

        TypedQuery<Phone> resultQuery = em.createQuery("select p " + st.toString(), Phone.class);

        for (String param : queryParams.keySet()) {
            resultQuery.setParameter(param, queryParams.get(param));
        }

        resultQuery.setFirstResult(searchObject.getFirstResult());
        resultQuery.setMaxResults(searchObject.getMaxResult());
        List<Phone> phones = resultQuery.getResultList();

        result.setResult(phones);

        TypedQuery<Long> countQuery = em.createQuery("select count(phoneId) " + st.toString(), Long.class);
        for (String param : queryParams.keySet()) {
            countQuery.setParameter(param, queryParams.get(param));
        }
        Long totalCount = countQuery.getSingleResult();
        result.setCount(totalCount);

        return result;
    }

    @Transactional
    public Transaction<Phone, ?> addPhone(Phone phone, HttpSession session) {
        if (phone.getFirstName() == null || phone.getLastName() == null || phone.getPhone() == null) {
            return new Transaction.Builder<Phone, Object>(false).description("შეავსეთ აუცილებელი ველები").build();
        }

        User user = (User) session.getAttribute("user");
        if (phone.getPhoneId() != null) {
            Phone dbPhone = em.find(Phone.class, phone.getPhoneId());

            if (!user.getUserId().equals(dbPhone.getUserId())) {
                return new Transaction.Builder<Phone, Object>(false).description("თქვენ არ გაქვთ სხვისი ნომრის რედაქტირების უფლება").build();
            }

            dbPhone.setFirstName(phone.getFirstName());
            dbPhone.setLastName(phone.getLastName());
            dbPhone.setPhone(phone.getPhone());
            dbPhone.setUserId(user.getUserId());
            dbPhone.setInsertDate(new Date());

            em.merge(dbPhone);
        } else {
            phone.setUserId(user.getUserId());
            phone.setUpdateDate(new Date());
            phone.setState(1);

            em.persist(phone);
        }
        return new Transaction.Builder<Phone, Object>(true).build();
    }

    @Transactional
    public Transaction<Phone, ?> removePhone(Integer phoneId, HttpSession session) {
        if (phoneId == null) {
            return new Transaction.Builder<Phone, Object>(false).description("არასაკმარისი მონაცემები").build();
        }

        User user = (User) session.getAttribute("user");
        Phone dbPhone = em.find(Phone.class, phoneId);

        if (!user.getUserId().equals(dbPhone.getUserId())) {
            return new Transaction.Builder<Phone, Object>(false).description("თქვენ არ გაქვთ სხვისი ნომრის წაშლის უფლება").build();
        }

        dbPhone.setState(2);
        dbPhone.setUserId(user.getUserId());
        dbPhone.setUpdateDate(new Date());

        em.merge(dbPhone);
        return new Transaction.Builder<Phone, Object>(true).build();
    }

    public List<Group> getGroups(HttpSession session) {
        User user = (User) session.getAttribute("user");

        return em.createQuery("select p from Group as p where p.state=1 and userId=:userId", Group.class)
                .setParameter("userId", user.getUserId()).getResultList();
    }

    @Transactional
    public Transaction<Group, ?> addGroup(Group group, HttpSession session) {
        if (group.getName() == null) {
            return new Transaction.Builder<Group, Object>(false).description("შეავსეთ აუცილებელი ველები").build();
        }

        User user = (User) session.getAttribute("user");
        if (group.getGroupId() != null) {
            Group dbGroup = em.find(Group.class, group.getGroupId());

            if (!user.getUserId().equals(dbGroup.getUserId())) {
                return new Transaction.Builder<Group, Object>(false).description("თქვენ არ გაქვთ სხვისი ჯგუფის რედაქტირების უფლება").build();
            }

            dbGroup.setName(group.getName());
            dbGroup.setUserId(user.getUserId());
            dbGroup.setInsertDate(new Date());

            em.merge(dbGroup);
        } else {
            group.setUserId(user.getUserId());
            group.setUpdateDate(new Date());
            group.setState(1);

            em.persist(group);
        }
        return new Transaction.Builder<Group, Object>(true).build();
    }

    @Transactional
    public Transaction<Group, ?> removeGroup(Integer groupId, HttpSession session) {
        if (groupId == null) {
            return new Transaction.Builder<Group, Object>(false).description("არასაკმარისი მონაცემები").build();
        }

        User user = (User) session.getAttribute("user");
        Group dbGroup = em.find(Group.class, groupId);

        if (!user.getUserId().equals(dbGroup.getUserId())) {
            return new Transaction.Builder<Group, Object>(false).description("თქვენ არ გაქვთ სხვისი ნომრის წაშლის უფლება").build();
        }

        List<GroupPhone> groupPhones = em.createQuery("select p from GroupPhone p where state=1 and p.groupId=:groupId", GroupPhone.class)
                .setParameter("groupId", groupId).getResultList();

        for (GroupPhone groupPhone : groupPhones) {
            groupPhone.setState(2);
            groupPhone.setUserId(user.getUserId());
            groupPhone.setUpdateDate(new Date());

            em.merge(groupPhone);
        }

        dbGroup.setState(2);
        dbGroup.setUserId(user.getUserId());
        dbGroup.setUpdateDate(new Date());

        em.merge(dbGroup);
        return new Transaction.Builder<Group, Object>(true).build();
    }

    @Transactional
    public Transaction<GroupPhone, ?> addGroupPhone(GroupPhone groupPhone, HttpSession session) {
        if (groupPhone.getPhoneId() == null || groupPhone.getGroupId() == null) {
            return new Transaction.Builder<GroupPhone, Object>(false).description("არასაკმარისი მონაცემები").build();
        }

        List<GroupPhone> dbGroupPhone = em.createQuery("select gp from GroupPhone gp where gp.phoneId=:phoneId and gp.groupId=:groupId and gp.state=1", GroupPhone.class)
                .setParameter("phoneId", groupPhone.getPhoneId()).setParameter("groupId", groupPhone.getGroupId()).getResultList();

        if (!dbGroupPhone.isEmpty()) {
            return new Transaction.Builder<GroupPhone, Object>(false).description("ეს ნომერი უკვე დამატებულია").build();
        }

        User user = (User) session.getAttribute("user");

        groupPhone.setUserId(user.getUserId());
        groupPhone.setState(1);
        groupPhone.setInsertDate(new Date());

        em.persist(groupPhone);

        return new Transaction.Builder<GroupPhone, Object>(true).build();
    }

    public Group getGroup(Integer groupId, HttpSession session) {
        Group group = em.find(Group.class, groupId);

        User user = (User) session.getAttribute("user");

        if (!user.getUserId().equals(group.getUserId())) {
            return null;
        }

        List<Phone> phones = em.createQuery("select p from Phone p where p.state=1 and p.phoneId in (select gp.phoneId from GroupPhone gp where gp.groupId=:groupId and gp.state=1)", Phone.class)
                .setParameter("groupId", groupId).getResultList();

        group.setPhones(phones);

        return group;

    }

    @Transactional
    public Transaction<GroupPhone, ?> removeGroupPhone(Integer phoneId, Integer groupId, HttpSession session) {
        try {
            if (groupId == null || phoneId == null) {
                return new Transaction.Builder<GroupPhone, Object>(false).description("არასაკმარისი მონაცემები").build();
            }

            User user = (User) session.getAttribute("user");
            List<GroupPhone> groupPhones = em.createQuery("select gp from GroupPhone gp where gp.phoneId=:phoneId and gp.groupId=:groupId and state=1", GroupPhone.class)
                    .setParameter("phoneId", phoneId).setParameter("groupId", groupId).getResultList();

            for (GroupPhone groupPhone : groupPhones) {
                if (user.getUserId().equals(groupPhone.getUserId())) {

                    groupPhone.setState(2);
                    groupPhone.setUserId(user.getUserId());
                    groupPhone.setUpdateDate(new Date());

                    em.merge(groupPhone);
                }
            }

            return new Transaction.Builder<GroupPhone, Object>(true).build();
        } catch (Exception e) {
            e.printStackTrace();
            return new Transaction.Builder<GroupPhone, Object>(false).description("დაფიქსირდა შეცდომა").build();
        }
    }
}
