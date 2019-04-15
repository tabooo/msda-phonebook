package phonebook.work.phonebook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import phonebook.util.QueryResult;
import phonebook.util.Transaction;
import phonebook.work.phonebook.entities.Group;
import phonebook.work.phonebook.entities.GroupPhone;
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
        return phonebookService.searchPhones(searchObject, session);
    }

    @RequestMapping("/addPhone")
    public Transaction<Phone, ?> addPhone(@RequestBody Phone phone) {
        return phonebookService.addPhone(phone, session);
    }

    @RequestMapping("/removePhone")
    public Transaction<Phone, ?> removePhone(@RequestParam Integer phoneId) {
        return phonebookService.removePhone(phoneId, session);
    }

    @RequestMapping("/getGroups")
    public List<Group> getGroups() {
        return phonebookService.getGroups(session);
    }

    @RequestMapping("/getGroup")
    public Group getGroup(@RequestParam Integer groupId) {
        return phonebookService.getGroup(groupId, session);
    }

    @RequestMapping("/addGroup")
    public Transaction<Group, ?> addGroup(@RequestBody Group group) {
        return phonebookService.addGroup(group, session);
    }

    @RequestMapping("/removeGroup")
    public Transaction<Group, ?> removeGroup(@RequestParam Integer groupId) {
        return phonebookService.removeGroup(groupId, session);
    }

    @RequestMapping("/addGroupPhone")
    public Transaction<GroupPhone, ?> addGroupPhone(@RequestBody GroupPhone groupPhone) {
        return phonebookService.addGroupPhone(groupPhone, session);
    }

    @RequestMapping("/removeGroupPhone")
    public Transaction<GroupPhone, ?> removeGroupPhone(@RequestParam Integer phoneId, @RequestParam Integer groupId) {
        return phonebookService.removeGroupPhone(phoneId, groupId, session);
    }
}
