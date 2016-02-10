package sample.test.com.service;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.os.RemoteCallbackList;

import org.json.JSONArray;

import java.util.ArrayList;
import java.util.List;

import sample.test.com.service.task.Channel;
import sample.test.com.service.task.FinalizeTask;
import sample.test.com.service.task.GetFeedTask;
import sample.test.com.service.task.InitializeTask;
import sample.test.com.service.util.Log;

public class BgService extends Service {
    public final static String TAG = "BgService";
    private final Channel mChannel = new Channel();
    private final List<IBgServiceCallback> mCallbackList = new ArrayList<IBgServiceCallback>();


    public interface IBgServiceCallback{
        void onDownloadedFeed(JSONArray jsonArray);

    }

    private boolean mInitialized = false;

    public class InitialCallback {
        public void onInitialized() {
            mInitialized = true;
        };
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "onCreate");
        mChannel.startWorker();

    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(TAG, "onStartCommand");
        return super.onStartCommand(intent, flags, startId);
    }

    private final IBinder mBinder = new BgServiceBinder();

    public class BgServiceBinder extends Binder {
        public BgService getService() {
            return BgService.this;
        }
    }

    public void getFeed(IBgServiceCallback callback) {
        mChannel.putRequest(new GetFeedTask(callback));

    }

    public void registerCallback(IBgServiceCallback callback) {
        mCallbackList.add(callback);
    }

    public void unregisterCallback(IBgServiceCallback callback) {
        if(mCallbackList.contains(callback)){
            mCallbackList.remove(callback);
        }
    }



    @Override
    public IBinder onBind(Intent intent) {
        Log.d(TAG, "onBind");
        mChannel.putRequest(new InitializeTask(new InitialCallback()));
        return mBinder;
    }

    @Override
    public void onRebind(Intent intent) {
        Log.d(TAG, "onRebind");
    }

    @Override
    public boolean onUnbind(Intent intent) {
        Log.d(TAG, "onUnbind");

        mChannel.putRequest(new FinalizeTask(this, mChannel));
        mInitialized = false;
        return true;
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy");
    }
}
