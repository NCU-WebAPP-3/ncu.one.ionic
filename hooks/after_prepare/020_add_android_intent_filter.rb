#!/usr/bin/env ruby

TARGET = "
        </activity>
"
INTENT_FILTER = %(
            <intent-filter>
                <action android:name="android.intent.action.SEND" />
                <category android:name="android.intent.category.DEFAULT" />
                <data android:mimeType="text/plain" />
            </intent-filter>
        </activity>
)
FILENAME = "platforms/android/AndroidManifest.xml"

data = File.read(FILENAME)
if not data.include? INTENT_FILTER
  data[TARGET] = INTENT_FILTER
end

File.open(FILENAME, 'w') do |f|
	f << data
end
