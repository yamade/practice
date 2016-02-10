package sample.test.com.service.task;

import sample.test.com.service.BgService;
import sample.test.com.service.util.Log;

/**
 * Created by 22709629 on 2/4/16.
 */
public class WorkerThread extends Thread {
    private static final String TAG = "WorkerThread";
    private volatile boolean mRunFlag;
    private final Channel mChannel;

    public WorkerThread(String name, Channel channel) {
        super(name);
        this.mChannel = channel;
        this.mRunFlag = true;
    }

    public void run() {
        Log.d(BgService.TAG, "[" + TAG + "] " + "Start");
        while (mRunFlag) {
            IRequest request = mChannel.takeRequest();
            request.execute();
        }
        Log.d(BgService.TAG, "[" + TAG + "] " + "End");
    }

    public void end() {
        mRunFlag = false;
        interrupt();
    }
}
