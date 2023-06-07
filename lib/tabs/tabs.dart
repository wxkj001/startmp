import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:permission_handler/permission_handler.dart';

class TbasPage extends StatefulWidget {
  final String title;

  const TbasPage({super.key, required this.title});

  @override
  State<TbasPage> createState() => TbasPageState();
}

class TbasPageState extends State<TbasPage> {
  final TextEditingController _nameController = TextEditingController();
  final dio = Dio();
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
            itemCount: 10,
            physics: NeverScrollableScrollPhysics(),
            padding: EdgeInsets.symmetric(horizontal: 16),
            gridDelegate:
                SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
            itemBuilder: (context, index) {
              return TextButton(onPressed: () {}, child: Text("启动小程序"));
            }),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showDialog(
              context: context,
              builder: (context) {
                return AlertDialog(
                  title: Text('温馨提示'),
                  content: Container(
                    height: 80,
                    child: Column(
                      children: <Widget>[
                        Text('请输入正确的地址哦。'),
                        TextField(
                          controller: _nameController,
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
                        Map<Permission, PermissionStatus> statuses = await [
                          Permission.location,
                          Permission.storage,
                        ].request();
                        print(statuses[Permission.storage]);
                        if (await Permission.storage.request().isGranted) {
                          //判断是否授权,没有授权会发起授权
                          print("获得了授权");
                          print(_nameController.text);
                          try {
                            var response = await dio.get(
                                'https://ghproxy.com/https://raw.githubusercontent.com/wxkj001/testmp/main/shop.json');
                            print(
                                "DATA:" + jsonDecode(response.data)[0]["url"]);
                            await dio.download(
                                "https://ghproxy.com/" +
                                    jsonDecode(response.data)[0]["url"],
                                "/sdcard/1.wget",
                                onReceiveProgress: (count, total) {
                              print(count / total);
                            });
                          } catch (e) {
                            print(e);
                          }
                        } else {
                          print("没有获得授权");

                          openAppSettings();
                        }
                        Navigator.pop(context);
                      },
                      child: Text('确定'),
                    ),
                  ],
                );
              });
        },
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
