from html2image import Html2Image

hti = Html2Image()
hti = Html2Image(output_path='my_screenshot_folder')

hti.screenshot(url='http://127.0.0.1:5000/sport/tennis-padel/36635cc8-1427-40c0-b250-f66856d90c2b/show', save_as='python_org.png')


# ffmpeg -i rtmp://192.168.1.100:1935/live/trans -i logo.png -filter_complex "[0:v][1:v]overlay=W-w-10:H-h-10" -c:a copy -c:v libx264 -f flv rtmp://192.168.1.7:5000/live