package phonebook.util;

import java.io.Closeable;
import java.io.IOException;
import java.util.Collection;
import java.util.Map;

public class ObjectUtils {

    public static final int FIRST_INDEX = 0;
    public static final int EMPTY_ARRAY_LENGTH = 0;


    public static boolean notEquals(Object thisObject, Object thatObject) {
        return notTrue(thisObject.equals(thatObject));
    }

    public static boolean notTrue(boolean expression) {

        return !expression;
    }

    public static boolean notNull(Object data) {

        boolean check = data != null;

        return check;
    }

    public static boolean notNullAll(Object... datas) {

        boolean check = datas != null;
        if (check) {
            for (int i = FIRST_INDEX; i < datas.length && check; i++) {
                check = datas[i] != null;
            }
        }

        return check;
    }

    public static boolean isNullOne(Object... datas) {

        boolean check = datas == null;
        if (!check) {
            for (int i = FIRST_INDEX; i < datas.length
                    && !check; i++) {
                check = datas[i] == null;
            }
        }

        return check;
    }

    public static boolean valid(Collection<?> collection) {

        return collection != null && !collection.isEmpty();
    }

    public static boolean valid(Map<?, ?> map) {

        return map != null && !map.isEmpty();
    }

    public static boolean valid(CharSequence text) {

        return text != null
                && text.length() > EMPTY_ARRAY_LENGTH;
    }

    public static boolean valid(Object[] array) {

        return array != null
                && array.length > EMPTY_ARRAY_LENGTH;
    }

    public static void close(Closeable closeable) throws IOException {

        if (notNull(closeable)) {
            closeable.close();
        }
    }

    public static void closeAll(Closeable... closeables) throws IOException {

        if (valid(closeables)) {
            for (Closeable closeable : closeables) {
                close(closeable);
            }
        }
    }

    public static void checkForNull(Object object) {

        checkForNull(object, "Parrameter must not be null!");
    }

    public static void checkForNull(Object object, String message) {

        if (object == null) {
            throw new NullPointerException(message);
        }
    }
}
