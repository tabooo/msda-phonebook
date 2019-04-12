package phonebook.work.phonebook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import phonebook.util.QueryResult;
import phonebook.util.Transaction;
import phonebook.work.phonebook.entities.Phone;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping(value = "/phonebook", method = {RequestMethod.POST, RequestMethod.GET})
public class PhonebookController {

    @Autowired
    private PhonebookService phonebookService;

    @Autowired
    private HttpSession session;

    public PhonebookController() {
    }

    public PhonebookController(PhonebookService phonebookService) {
        this.phonebookService = phonebookService;
    }

    @RequestMapping("/searchPhones")
    public QueryResult<List<Phone>, Long, Double> searchPhones(@RequestBody PhoneSearchObject searchObject) {
        return phonebookService.searchPhones(searchObject);
    }

    @RequestMapping("/addPhone")
    public Transaction<Phone, ?> addPhone(@RequestBody Phone phone) {
        return phonebookService.addPhone(phone, session);
    }
}
