package com.blinkapp;

import android.app.Activity;
import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Gravity;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

public class ShareActivity extends Activity {

    private EditText sharedContentEditText;
    private LinearLayout foldersLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        handleSendIntent();
    }

    private void handleSendIntent() {
        Intent intent = getIntent();
        String action = intent.getAction();
        String type = intent.getType();

        if (Intent.ACTION_SEND.equals(action) && type != null) {
            if ("text/plain".equals(type)) {
                handleSendText(intent);
            }
        } else if (Intent.ACTION_SEND_MULTIPLE.equals(action) && type != null) {
            if ("text/plain".equals(type)) {
                handleSendMultipleTexts(intent);
            }
        } else {
            finish();
        }
    }

    private void handleSendText(Intent intent) {
        String sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
        if (sharedText != null) {
            showCustomDialog(sharedText);
        } else {
            finish();
        }
    }

    private void handleSendMultipleTexts(Intent intent) {
        ArrayList<String> sharedTexts = intent.getStringArrayListExtra(Intent.EXTRA_TEXT);
        if (sharedTexts != null && !sharedTexts.isEmpty()) {
            StringBuilder texts = new StringBuilder();
            for (String text : sharedTexts) {
                texts.append(text).append("\n");
            }
            showCustomDialog(texts.toString());
        } else {
            finish();
        }
    }

    private void showCustomDialog(String content) {
        Dialog dialog = new Dialog(this);
        dialog.setContentView(R.layout.dialog_share);

        // Set dialog width to match parent
        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        dialog.getWindow().setGravity(Gravity.BOTTOM);

        // Window window = dialog.getWindow();
        // WindowManager.LayoutParams wlp = window.getAttributes();
        // wlp.gravity = Gravity.BOTTOM;
        // window.setAttributes(wlp);

        sharedContentEditText = dialog.findViewById(R.id.shared_content);
        sharedContentEditText.setText(content);
        foldersLayout = dialog.findViewById(R.id.folders_layout);

        Button createFolderButton = dialog.findViewById(R.id.create_folder_button);
        Button submitButton = dialog.findViewById(R.id.submit_button);

        createFolderButton.setOnClickListener(v -> {
            // Handle folder creation
        });

        submitButton.setOnClickListener(v -> {
            String contentToSend = sharedContentEditText.getText().toString();
            callYourApi(contentToSend);
            dialog.dismiss(); // Dismiss dialog after API call
        });

        dialog.setCancelable(false);
        dialog.show();

        fetchFolders();
    }

    private void fetchFolders() {
        // Mock data fetching
        List<String> folders = List.of("기본 폴더", "JavaScript", "TypeScript");
        populateFolders(folders);
    }

    private void populateFolders(List<String> folders) {
        for (String folder : folders) {
            Button folderButton = (Button) getLayoutInflater().inflate(R.layout.folder_button, null);
            folderButton.setText(folder);

            folderButton.setOnClickListener(v -> {
                folderButton.setSelected(!folderButton.isSelected()); // Toggle selection state

                if (folderButton.isSelected()) {
                    folderButton.setBackgroundResource(R.drawable.selected_button);
                } else {
                    folderButton.setBackgroundResource(R.drawable.default_button);
                }

                // Handle folder selection
            });

            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            params.setMargins(0, 8, 0, 8); // Set margins here

            folderButton.setLayoutParams(params);

            foldersLayout.addView(folderButton);
        }
    }

    private void callYourApi(String content) {
        // Implement your API call here
        Log.d("ShareActivity", "API called with content: " + content);
        Toast.makeText(this, "저장되었습니다. " + content, Toast.LENGTH_LONG).show();
        finish(); // Close the activity after the API call
    }
}
