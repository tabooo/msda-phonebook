package phonebook.work.phonebook;

import org.springframework.stereotype.Component;
import phonebook.util.QueryResult;
import phonebook.util.Transaction;
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

    public QueryResult<List<Phone>, Long, Double> searchPhones(PhoneSearchObject searchObject) {


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
}
