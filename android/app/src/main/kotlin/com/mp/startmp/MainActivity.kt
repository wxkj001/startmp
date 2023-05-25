package com.mp.startmp

import com.dcloud.android.annotation.NonNull
import io.dcloud.feature.sdk.DCSDKInitConfig
import io.dcloud.feature.sdk.DCUniMPSDK
import io.dcloud.feature.sdk.MenuActionSheetItem
import io.dcloud.feature.unimp.config.UniMPOpenConfiguration
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity: FlutterActivity() {
    private val CHANNEL = "samples.flutter.dev/mp"
    override fun configureFlutterEngine(@NonNull flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler {
            call, result ->
            if (call.method == "startMP") {
                val item = MenuActionSheetItem("关于", "gy")
                val sheetItems: MutableList<MenuActionSheetItem> = ArrayList()
                sheetItems.add(item)
                val config = DCSDKInitConfig.Builder()
                        .setCapsule(true)
                        .setMenuDefFontSize("16px")
                        .setMenuDefFontColor("#ff00ff")
                        .setMenuDefFontWeight("normal")
                        .setMenuActionSheetItems(sheetItems)
                        .build()
                DCUniMPSDK.getInstance().initialize(context, config)
                try {
                    val uniMPOpenConfiguration = UniMPOpenConfiguration()
                    uniMPOpenConfiguration.extraData.put("darkmode", "auto");
                    val unimp = DCUniMPSDK.getInstance().openUniMP(context, "__UNI__F743940",uniMPOpenConfiguration)
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }
}
