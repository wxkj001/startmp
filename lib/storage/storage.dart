import 'package:hive_flutter/hive_flutter.dart';

class Storage {
  static late final Box mpList;
  static bool _initialized = false;
  static Future<void> ensureInitialized() async {
    if (!_initialized) {
      await Hive.initFlutter("hive");
      mpList = await Hive.openBox("mpList");
      _initialized = true;
    }
  }
}
