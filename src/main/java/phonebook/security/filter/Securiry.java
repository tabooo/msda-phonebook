package phonebook.security.filter;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

import org.apache.commons.codec.binary.Base64;

public class Securiry {

	public static String hashPassword(String password) {
		MessageDigest md;
		try {
			md = MessageDigest.getInstance("SHA-256");
		} catch (NoSuchAlgorithmException ex) {
			System.out.println(ex.getMessage());
			return null;
		}
		md.update(password.getBytes());
		byte[] shaDig = md.digest();
		return Base64.encodeBase64String(shaDig);
	}

	public String generateSessionId() {
		return UUID.randomUUID().toString();
	}
}
