import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:flutter/services.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:startmp/storage/storage.dart';

class TbasPage extends StatefulWidget {
  final String title;

  const TbasPage({super.key, required this.title});

  @override
  State<TbasPage> createState() => TbasPageState();
}

class TbasPageState extends State<TbasPage> {
  final dio = Dio();
  static const platform = MethodChannel('samples.flutter.dev/mp');
  Future<void> _startMP(String path, appid, String? password) async {
    try {
      await platform.invokeMethod(
          'startMP', {"path": path, "appid": appid, "password": password});
    } on PlatformException catch (e) {
      print("Failed to get battery level: '${e.message}'.");
    }
  }

  Future<void> openBox() async {}

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    openBox();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Container(
        child: GridView.builder(
            shrinkWrap: true,
            itemCount: Storage.mpList.length,
            physics: NeverScrollableScrollPhysics(),
            padding: EdgeInsets.symmetric(horizontal: 16),
            gridDelegate:
                SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
            itemBuilder: (context, index) {
              var d = Storage.mpList.getAt(index);
              if (d == null) {
                return TextButton(
                    onPressed: () {
                      setState(() {
                        Storage.mpList.deleteAt(index);
                      });
                      print(Storage.mpList.length);
                    },
                    child: Text("ERROR"));
              }
              Uint8List bytes = Base64Decoder().convert(d["icon"]);
              return GestureDetector(
                child: Column(
                  children: [
                    Image.memory(bytes, fit: BoxFit.contain),
                    Text(d["name"])
                  ],
                ),
                onTap: () {
                  print("object");
                  opMp(d["link"], d["passwd"], d["isGitHub"]);
                },
                onLongPress: () {
                  setState(() {
                    Storage.mpList.deleteAt(index);
                  });
                },
              );
            }),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          showDialog(
              context: context,
              builder: (context) {
                bool _checkboxSelected = false;
                final TextEditingController _nameController = TextEditingController(
                    text:
                        "https://github.com/wxkj001/testmp/raw/main/__UNI__123.wgt");
                final TextEditingController _passwdController =
                    TextEditingController();
                return StatefulBuilder(builder: (context, state) {
                  return AlertDialog(
                    title: Text('温馨提示'),
                    content: Container(
                      height: 190,
                      child: Column(
                        children: <Widget>[
                          Column(
                            children: [
                              TextField(
                                decoration: InputDecoration(
                                    labelText: '请输入地址', hintText: "地址"),
                                controller: _nameController,
                              ),
                            ],
                          ),
                          Column(
                            children: [
                              TextField(
                                decoration: InputDecoration(
                                    labelText: '请输入密码', hintText: "无密码可留空"),
                                controller: _passwdController,
                              ),
                            ],
                          ),
                          Column(
                            children: [
                              CheckboxListTile(
                                title: Text("github加速"),
                                value: _checkboxSelected,
                                onChanged: (value) {
                                  print(value);
                                  state(() {
                                    _checkboxSelected = value ?? false;
                                  });
                                },
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    actions: <Widget>[
                      TextButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: Text('取消'),
                      ),
                      TextButton(
                        onPressed: () async {
                          // 获取外部存储的根目录

                          print(_nameController.text);
                          try {
                            opMp(_nameController.text, _passwdController.text,
                                _checkboxSelected);
                            final directoryApp =
                                await getApplicationDocumentsDirectory();
                            print("APPL" + directoryApp.path);
                            var fileName = urlTofileName(_nameController.text);
                            var manifest = File(
                                '${directoryApp?.path}/../files/apps/__UNI__${fileName}/www/manifest.json');
                            var logo = File(
                                '${directoryApp?.path}/../files/apps/__UNI__${fileName}/www/static/logo.png');
                            var mj = await manifest.readAsString();
                            var logoB = await logo.readAsBytes();
                            print(jsonDecode(mj)["name"]);
                            print(base64Encode(logoB));
                            setState(() {
                              Storage.mpList.add({
                                "name": jsonDecode(mj)["name"],
                                "passwd": _passwdController.text,
                                "icon": base64Encode(logoB),
                                "link": _nameController.text,
                                "isGitHub": _checkboxSelected,
                              });
                            });
                          } catch (e) {
                            print(e);
                          }

                          /* if (await Permission.storage.request().isGranted) {
                          //判断是否授权,没有授权会发起授权
                          print("获得了授权");
                        } else {
                          print("没有获得授权");

                          openAppSettings();
                        } */
                          Navigator.pop(context);
                        },
                        child: Text('确定'),
                      ),
                    ],
                  );
                });
              });
        },
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }

  urlTofileName(url) {
    final regex = RegExp(r'__UNI__([a-zA-Z0-9]+)\.wgt$');

    final match1 = regex.firstMatch(url);
    final fileName = match1?.group(1);
    return fileName;
  }

  opMp(String url, passwd, bool _checkboxSelected) async {
    var fileName = urlTofileName(url);
    final directory = await getExternalStorageDirectory();
    print(directory);
    if (directory == null) {
      return;
    }
    if (_checkboxSelected == true) {
      url = "https://ghproxy.com/" + url;
    }
    await dio.download(url, directory.path + "/__UNI__${fileName}.wgt",
        onReceiveProgress: (count, total) {
      print(count / total);
    });
    await _startMP("${directory.path}/__UNI__${fileName}.wgt",
        "__UNI__${fileName}", passwd);
  }
}
