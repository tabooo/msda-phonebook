package phonebook.security.filter;

import org.springframework.http.HttpMethod;
import phonebook.work.users.entities.User;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@WebFilter(urlPatterns = {"/restapi/*"})
public class SessionFilter implements Filter {

    private static final String RESPONSE_JSON = "{\"valid\":\"%s\",\"description\":\"%s\"}";
    private static final String AUTHENTICATION_PATH = "/user/authenticate";
    private static final List<String> IGNORE_LIST = Arrays.asList(new String[]{"/user/authenticate", "/user/isLogin",
            "/user/register", "/user/recoverPassword"});

    private static Set<String> ALLOWED_ORIGINS = new HashSet<>();

    static {
        ALLOWED_ORIGINS.add("http://localhost:4200");
    }

    public void destroy() {

    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {

        HttpServletRequest req = (HttpServletRequest) request;

        HttpServletResponse resp = (HttpServletResponse) response;

        String origin = req.getHeader("Origin");
        if (origin != null && ALLOWED_ORIGINS.contains(origin)) {
            resp.setHeader("Access-Control-Allow-Origin", origin);
            resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
            resp.setHeader("Access-Control-Max-Age", "3600");
            resp.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
            resp.setHeader("Access-Control-Allow-Credentials", Boolean.TRUE.toString());
        }

        if (req.getMethod().equals(HttpMethod.OPTIONS.name())) {
            resp.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        HttpSession session = req.getSession(Boolean.TRUE);
        User sessionData = (User) session.getAttribute("user");
        if (sessionData == null) {
            if (checkUrl(req.getPathInfo())) {
                chain.doFilter(request, response);
            } else {
                invalidAuthentication(response);
            }
        } else {

            if (!req.getPathInfo().equals(AUTHENTICATION_PATH)) {
                chain.doFilter(request, response);
            } else {
                invalidAuthentication(response);
            }

        }
    }

    private void invalidAuthentication(ServletResponse response) throws IOException {
        HttpServletResponse resp = (HttpServletResponse) response;
        resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        PrintWriter out = resp.getWriter();
        out.write(String.format(RESPONSE_JSON, "false", "Not Authenticate"));
        out.close();
    }

    @SuppressWarnings("unused")
    private void invalidAuthorization(ServletResponse response) throws IOException {
        HttpServletResponse resp = (HttpServletResponse) response;
        PrintWriter out = resp.getWriter();
        resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        out.write(String.format(RESPONSE_JSON, "false", "Not Authorized"));
        out.close();
    }

    @Override
    public void init(FilterConfig arg0) throws ServletException {

    }

    private Boolean checkUrl(String url) {

        if (IGNORE_LIST.contains(url)) {
            return true;
        }
        return false;
    }
}
