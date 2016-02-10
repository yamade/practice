package sample.test.com.service.util;

import android.util.Config;

/**
 * Created by 22709629 on 2/4/16.
 */
public final class Log {
    public static final boolean LOCAL_LOG_ENABLED = true;

    private static final boolean DEBUG_ENABLED = (Config.DEBUG | LOCAL_LOG_ENABLED);

    public static void e(String tag, String msg) {
        android.util.Log.e(tag, msg);
    }

    public static void w(String tag, String msg) {
        if (DEBUG_ENABLED == false) return;
        android.util.Log.w(tag, msg);
    }

    public static void i(final String tag, final String msg) {
        if (DEBUG_ENABLED == false) return;
        android.util.Log.i(tag, msg);
    }

    public static void d(final String tag, final String msg) {
        if (DEBUG_ENABLED == false) return;
        android.util.Log.d(tag, msg);
    }

    public static void v(final String tag, final String msg) {
        if (DEBUG_ENABLED == false) return;
        android.util.Log.v(tag, msg);
    }
}
