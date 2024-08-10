package com.blinkapplication

import android.app.Activity
import android.app.Dialog
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.util.Log
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.Toast

class ShareActivity : Activity() {

    private lateinit var sharedContentEditText: EditText
    private lateinit var foldersLayout: LinearLayout
    private val folders = mutableListOf("기본 폴더", "JavaScript")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        handleSendIntent()
    }

    private fun handleSendIntent() {
        intent?.let {
            when {
                it.action == Intent.ACTION_SEND && it.type == "text/plain" -> handleSendText(it)
                it.action == Intent.ACTION_SEND_MULTIPLE && it.type == "text/plain" -> handleSendMultipleTexts(it)
                else -> finish()
            }
        }
    }

    private fun handleSendText(intent: Intent) {
        intent.getStringExtra(Intent.EXTRA_TEXT)?.let {
            showCustomDialog(it)
        } ?: finish()
    }

    private fun handleSendMultipleTexts(intent: Intent) {
        intent.getStringArrayListExtra(Intent.EXTRA_TEXT)?.let { sharedTexts ->
            if (sharedTexts.isNotEmpty()) {
                val texts = sharedTexts.joinToString("\n")
                showCustomDialog(texts)
            } else {
                finish()
            }
        }
    }

    private fun showCustomDialog(content: String) {
        Dialog(this).apply {
            setContentView(R.layout.dialog_share)
            window?.setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)

            sharedContentEditText = findViewById(R.id.shared_content)
            sharedContentEditText.text = Editable.Factory.getInstance().newEditable(content)
            foldersLayout = findViewById(R.id.folders_layout)

            findViewById<Button>(R.id.create_folder_button).setOnClickListener {
                showAddFolderModal(this)
            }

            findViewById<Button>(R.id.submit_button).setOnClickListener {
                callYourApi(sharedContentEditText.text.toString())
                dismiss()
            }

            setCancelable(false)
            show()
            populateFolders()
        }
    }

    private fun showAddFolderModal(parentDialog: Dialog) {
        Dialog(this).apply {
            setContentView(R.layout.add_folder)
            window?.setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)

            findViewById<Button>(R.id.add_folder_button).setOnClickListener {
                val newFolderName = findViewById<EditText>(R.id.new_folder_name).text.toString()
                folders.add(newFolderName)
                populateFolders()
                dismiss()
                parentDialog.show()
            }

            setCancelable(true)
            show()
        }
    }

    private fun populateFolders() {
        foldersLayout.removeAllViews()

        folders.forEach { folder ->
            val folderButton = layoutInflater.inflate(R.layout.folder_button, null) as Button
            folderButton.apply {
                text = folder
                setOnClickListener {
                    isSelected = !isSelected
                    setBackgroundResource(if (isSelected) R.drawable.selected_button else R.drawable.default_button)
                }

                val params = LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
                ).apply {
                    setMargins(0, 8, 0, 8)
                }

                layoutParams = params
                foldersLayout.addView(this)
            }
        }
    }

    private fun callYourApi(content: String) {
        Log.d("ShareActivity", "API called with content: $content")
        Toast.makeText(this, "저장되었습니다: $content", Toast.LENGTH_LONG).show()
        finish() // Close the activity after the API call
    }
}
