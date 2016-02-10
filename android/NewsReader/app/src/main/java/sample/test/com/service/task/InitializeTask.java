package sample.test.com.service.task;

import sample.test.com.service.BgService;
import sample.test.com.service.util.Log;

/**
 * Created by 22709629 on 2/4/16.
 */
public class InitializeTask implements IRequest {
    private static final String TAG = "RequestInitialize";
    private final BgService.InitialCallback mCallback;

    public InitializeTask(BgService.InitialCallback callback) {
        this.mCallback = callback;
    }

    public void execute() {
        Log.d(BgService.TAG, "[" + TAG + "] " + "Execute");
        mCallback.onInitialized();
    }
}
