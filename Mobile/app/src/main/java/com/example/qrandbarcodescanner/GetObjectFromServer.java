package com.example.qrandbarcodescanner;

import org.jetbrains.annotations.NotNull;
import java.io.IOException;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import android.os.AsyncTask;

public class GetObjectFromServer extends AsyncTask<String, Void, Void> {

    private String serverInfo;

    public String getServerInfo() {
        return serverInfo;
    }


    @Override
    protected Void doInBackground(String... strings) {

        String url = strings[0];
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .build();

        Call call = client.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(@NotNull Call call, @NotNull IOException e) {
                e.printStackTrace();
                call.cancel();
            }

            @Override
            public void onResponse(@NotNull Call call, @NotNull Response response) throws IOException {
                if(response.isSuccessful()){
                    serverInfo = response.body().string();
                    call.cancel();
                }
            }
        });

        return null;
    }
}
