package sample.test.com.newsreader;

import android.app.ProgressDialog;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.IBinder;
import android.provider.ContactsContract;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.view.ViewCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.SimpleAdapter;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import sample.test.com.service.BgService;
import sample.test.com.service.util.Log;

public class Main extends AppCompatActivity {
    private static final String TAG = AppCompatActivity.class.getSimpleName();
    private BgService mBgService;
    private static ProgressDialog waitDialog;

    private class ActivityCallback implements BgService.IBgServiceCallback {

        @Override
        public void onDownloadedFeed(JSONArray jsonArray) {

//                runOnUiThread(new Runnable() {
//                    @Override
//                    public void run() {
//                        Toast.makeText(getApplicationContext(), "Downloaded", Toast.LENGTH_SHORT).show();
//                    }
//
//                });
            dismissDialog();

            List<Map<String, String>> list = new ArrayList<Map<String, String>>();
            try {
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject jsonObject = jsonArray.getJSONObject(i);
                    String title = jsonObject.getString("title");
                    String url = jsonObject.getString("url");
                    Map<String, String> map = new HashMap<String, String>();
                    map.put("main", title);
                    map.put("sub", url);

                    Log.d(TAG, title);
                    Log.d(TAG, url);
                    list.add(i, map);

                }
            } catch (JSONException e) {

            }

            final SimpleAdapter adapter = new SimpleAdapter(
                    getApplicationContext(),
                    list,
                    android.R.layout.simple_list_item_2,
                    new String[] {"main", "sub"},
                    new int[] {android.R.id.text1, android.R.id.text2}
            );

            runOnUiThread(new Runnable() {
                @Override
                public void run() {

                    ListView listView = (ListView) findViewById(R.id.listView1);
                    listView.setAdapter(adapter);
                    int h = 0;
                    for (int i=0; i < adapter.getCount(); i++){
                        View item = adapter.getView(i, null, listView);
                        item.measure(0, 0);
                        h += item.getMeasuredHeight();
                    }
                    ViewGroup.LayoutParams param = listView.getLayoutParams();
                    param.height = h + (listView.getDividerHeight() * (adapter.getCount() - 1));
                    listView.setLayoutParams(param);
                }
            });
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

    }

    @Override
    protected void onResume() {
        Log.d(TAG, "onResume");
        super.onResume();
        bindService(new Intent(getApplicationContext(), BgService.class), mConnection, Context.BIND_AUTO_CREATE);
        showWaitDialog();
    }

    @Override
    protected void onPause() {
        Log.d(TAG, "onPause");
        super.onPause();
        unbindService(mConnection);
    }

    private ServiceConnection mConnection = new ServiceConnection() {

        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            mBgService = ((BgService.BgServiceBinder)service).getService();
            // get feed
            mBgService.getFeed(new ActivityCallback());
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            mBgService = null;
        }
    };


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void showWaitDialog() {
        waitDialog = new ProgressDialog(this);
        waitDialog.setMessage("Downloading...");
        waitDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
        waitDialog.show();
    }

    private void dismissDialog() {
        if (waitDialog != null) {
            waitDialog.dismiss();
            waitDialog = null;
        }
    }
}
