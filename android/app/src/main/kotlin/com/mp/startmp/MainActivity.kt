package com.mp.startmp

import android.util.Log
import com.dcloud.android.annotation.NonNull
import io.dcloud.feature.sdk.DCSDKInitConfig
import io.dcloud.feature.sdk.DCUniMPSDK
import io.dcloud.feature.sdk.MenuActionSheetItem
import io.dcloud.feature.unimp.config.UniMPOpenConfiguration
import io.dcloud.feature.unimp.config.UniMPReleaseConfiguration
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
                var WgetPath =""
                var appid =""
                var passwd =""
                call.argument<String>("path")?.let { WgetPath=it;Log.i("startMP arguments", it) }
                call.argument<String>("appid")?.let { appid=it;Log.i("startMP arguments", it) }
                call.argument<String>("password")?.let { passwd=it;Log.i("startMP arguments", it) }
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
                    Log.i("aa",WgetPath)
                    val uniMPOpenConfiguration = UniMPOpenConfiguration()
                    uniMPOpenConfiguration.extraData.put("darkmode", "auto");
                    if (WgetPath==""){
                        val unimp = DCUniMPSDK.getInstance().openUniMP(context, "__UNI__F743940",uniMPOpenConfiguration)
                        result.success(null)
                    }else{
                        val uniMPReleaseConfiguration = UniMPReleaseConfiguration()
                        uniMPReleaseConfiguration.wgtPath = WgetPath
                         uniMPReleaseConfiguration.password = passwd

                        DCUniMPSDK.getInstance().releaseWgtToRunPath(appid, uniMPReleaseConfiguration) { code, pArgs ->
                            if (code == 1) {
                                //释放wgt完成
                                Log.i("pArgs",pArgs.toString())
                                try {

                                    DCUniMPSDK.getInstance().openUniMP(context, appid,uniMPOpenConfiguration)
                                    Log.i("DCUniMPSDK","RUN")
                                    result.success(null)
                                } catch (e: Exception) {
                                    e.printStackTrace()
                                }
                            } else {
                                Log.i("释放wgt失败", code.toString())
                                Log.i("释放wgt失败", pArgs.toString())
                                //释放wgt失败
                            }
                        }
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }
}
