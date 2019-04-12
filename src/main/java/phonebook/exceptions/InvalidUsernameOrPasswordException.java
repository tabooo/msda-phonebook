package phonebook.exceptions;

/**
 * This exception will be used when user authentication fails
 * 
 * @author davit
 */
public class InvalidUsernameOrPasswordException extends Exception {
	private static final long serialVersionUID = 1L;

	public InvalidUsernameOrPasswordException() {
		super();
	}

	public InvalidUsernameOrPasswordException(String message) {
		super(message);
	}
}
