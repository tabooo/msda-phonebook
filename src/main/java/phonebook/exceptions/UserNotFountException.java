package phonebook.exceptions;

public class UserNotFountException extends Exception {

    private static final long serialVersionUID = 1L;

    public UserNotFountException() {
	super();
    }

    public UserNotFountException(String message) {
	super(message);
    }
}
