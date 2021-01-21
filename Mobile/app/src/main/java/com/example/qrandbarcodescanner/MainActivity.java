package com.example.qrandbarcodescanner;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;



public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    Button scanBtn;
    String serverInfo = null;
    String serialNumber;
    String id;
    String specification;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        scanBtn = findViewById(R.id.scanBtn);
        scanBtn.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        scanCode();
    }

    private void scanCode(){

        IntentIntegrator integrator = new IntentIntegrator(this);
        integrator.setCaptureActivity(CaptureAct.class);
        integrator.setOrientationLocked(false);
        integrator.setDesiredBarcodeFormats(IntentIntegrator.ALL_CODE_TYPES);
        integrator.setPrompt("Scanning...");
        integrator.setBeepEnabled(false);
        integrator.initiateScan();
    }

    @Override
    protected  void  onActivityResult(int requestCode, int resultCode, Intent data){
        scanBtn.setVisibility(View.INVISIBLE);
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode,resultCode, data);
        String requestID = "http://api.seev.pro:5000/resources/qrdata/" + result.getContents();

        Handler handler = new Handler();

            GetObjectFromServer showInfo = new GetObjectFromServer();
            showInfo.execute(requestID);
            handler.postDelayed(new Runnable() {
                @Override
                public void run() {

                    serverInfo = showInfo.getServerInfo();

                }
            }, 1000);


        if (result != null){
            if (requestID != null){
                AlertDialog.Builder builder = new AlertDialog.Builder(this);
                builder.setTitle("Object info:");
                builder.setPositiveButton("Scan again", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        scanCode();
                    }
                }).setNegativeButton("Exit", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) { finish(); }
                });

                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {

                        if(serverInfo != null) {
                            JsonObject jsonObject = new JsonParser().parse(serverInfo.toString()).getAsJsonObject();
                            serialNumber = jsonObject.get("seriesNumber").getAsString();
                            id = jsonObject.get("id").getAsString();
                            specification = jsonObject.get("specification").getAsString();
                            System.out.println(serialNumber);
                            System.out.println(id);
                            System.out.println(specification);

                            //serverInfo.toString()
                        builder.setMessage("Serial Number: "+ serialNumber+  "\n" + "Id: "  +id+ "\n" + "Specification:" + specification+"\n");
                        AlertDialog dialog = builder.create();
                        dialog.show();
                        serverInfo = null;
                            handler.postDelayed(new Runnable() {
                                @Override
                                public void run() {
                                    scanBtn.setVisibility(View.VISIBLE);
                                }
                            }, 300);
                        }
                        else{
                            builder.setMessage("There was an error with trying to get data from server. Make sure that scanned object is used in laboratory or check connection and try again.");
                            AlertDialog dialog = builder.create();
                            dialog.show();

                            handler.postDelayed(new Runnable() {
                                @Override
                                public void run() {
                                    scanBtn.setVisibility(View.VISIBLE);
                                }
                            }, 300);
                        }
                    }
                }, 1500);
            }
            else{
                Toast.makeText(this, "No Result", Toast.LENGTH_LONG).show();
            }
        }else{
            super.onActivityResult(requestCode,requestCode,data);
        }
    }

}

