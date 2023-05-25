import 'package:flutter/material.dart';
import 'package:dio/dio.dart';

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
                        print(_nameController.text);
                        var response = await dio.get(
                            'https://raw.githubusercontent.com/wxkj001/testmp/main/shop.json');
                        print(response.data);
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
