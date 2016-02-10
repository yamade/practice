package sample.test.com.service.task;


import sample.test.com.service.BgService;
import sample.test.com.service.util.Log;

/**
 * Created by 22709629 on 2/4/16.
 */
public class Channel {
    private static final String TAG = "Channel";
    private static final int MAX_REQUEST = 50;
    private IRequest[] mRequestQueue;
    private int mTail;
    private int mHead;
    private int mCount;
    private final WorkerThread mWorkerThread;

    public Channel() {
        this.mHead = 0;
        this.mTail = 0;
        this.mCount = 0;

        this.mRequestQueue = new IRequest[MAX_REQUEST];
        this.mWorkerThread = new WorkerThread(this.getClass().toString(), this);
    }

    public void startWorker() {
        mWorkerThread.start();
        Log.d(BgService.TAG, "[" + TAG + "] " + "WorkerThread Start");
    }

    public synchronized void stopWorker() {
        mWorkerThread.end();
        Log.d(BgService.TAG, "[" + TAG + "] " + "WorkerThread Stop");
    }

    public synchronized void putRequest(IRequest request) {

        while (mCount >= mRequestQueue.length) {
            try {
                wait();
            } catch (InterruptedException e) {
                //TODO : need to handle exception
            }
        }
        mRequestQueue[mTail] = request;
        mTail = (mTail + 1) % mRequestQueue.length;
        mCount++;
        notifyAll();
    }

    public synchronized IRequest takeRequest() {

        while (mCount <= 0) {
            try {
                wait();
            } catch (InterruptedException e) {
                //TODO : need to handle exception
            }
        }

        IRequest request = mRequestQueue[mHead];
        mHead = (mHead + 1) % mRequestQueue.length;
        mCount--;
        notifyAll();

        return request;
    }

    public synchronized void removeAllRequest() {
        mCount = 0;
        mHead = 0;
        mTail = 0;
    }

}

