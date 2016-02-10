package sample.test.com.service.task;


import org.json.JSONArray;
import org.json.JSONException;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


import sample.test.com.service.BgService;
import sample.test.com.service.BgService.IBgServiceCallback;
import sample.test.com.service.ServiceUrl;
import sample.test.com.service.util.Log;

/**
 * Created by 22709629 on 2/5/16.
 */
public class GetFeedTask implements IRequest {
    private final static String TAG = GetFeedTask.class.getSimpleName();
    private IBgServiceCallback mCallback;

    public GetFeedTask(IBgServiceCallback callback) {
        mCallback = callback;
    }

    @Override
    public void execute() {
        Log.d(BgService.TAG, "[" + TAG + "] " + "Execute");

        HttpURLConnection connection = null;

        try {
            URL url = new URL(ServiceUrl.QIITA_URL);
            connection = (HttpURLConnection)url.openConnection();
            connection.setRequestMethod("GET");
            connection.setInstanceFollowRedirects(false);
            connection.connect();

            if (connection.getResponseCode() != 200) {
                Log.d(BgService.TAG, "[" + TAG + "] " + "Connection failed : " + connection.getResponseCode());
            }

            BufferedInputStream inputStream = new BufferedInputStream(connection.getInputStream());
            ByteArrayOutputStream responseArray = new ByteArrayOutputStream();
            byte[] buff = new byte[1024];

            int length;
            while ((length = inputStream.read(buff)) != -1) {
                if (length > 0) {
                   responseArray.write(buff, 0, length);
                }
            }
            JSONArray jsonArray = new JSONArray(new String(responseArray.toByteArray()));

            mCallback.onDownloadedFeed(jsonArray);

            Log.d(TAG, jsonArray.toString());

            inputStream.close();
            responseArray.close();


        } catch (MalformedURLException e) {

        } catch (IOException e) {

        } catch (JSONException e){
            Log.e(TAG, e.getMessage());
            Log.e(TAG, e.toString());

        }

    }
}
