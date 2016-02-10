package sample.test.com.service.task;

import android.app.Service;

import sample.test.com.service.BgService;
import sample.test.com.service.util.Log;

/**
 * Created by 22709629 on 2/4/16.
 */
public class FinalizeTask implements IRequest {
    private static final String TAG = "RequestFinalize";
    private final Service mService;
    private final Channel mChannel;

    public FinalizeTask(Service service, Channel channel) {
        mService = service;
        mChannel = channel;
    }

    public void execute() {
        Log.d(BgService.TAG, "[" + TAG + "] " + "Execute");
        // Service Stop
        mService.stopSelf();
        mChannel.stopWorker();
    }
}
