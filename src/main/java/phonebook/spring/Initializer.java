package phonebook.spring;

import javax.servlet.Filter;

import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class Initializer extends
		AbstractAnnotationConfigDispatcherServletInitializer {

	private static final String UTF_8 = "UTF-8";

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return new Class[] { Config.class };
	}

	@Override
	protected Filter[] getServletFilters() {
		CharacterEncodingFilter encoder = new CharacterEncodingFilter();
		encoder.setEncoding(UTF_8);
		encoder.setForceEncoding(Boolean.TRUE);
		return new Filter[] { encoder };
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] { "/restapi/*" };
	}

	@Override
	protected Class<?>[] getRootConfigClasses() {
		return null;
	}
}