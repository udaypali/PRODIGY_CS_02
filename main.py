# import eel
# import webview
# import threading
# import base64
# import os

# eel.init('gui')

# def start_eel():
#     eel.start('index.html', mode=None, block=False)

# @eel.expose
# def quit_app():
#     os._exit(0)  # Forcefully close the Python process

# @eel.expose
# def receive_encrypted_image(image_data_url):
#     # Remove the base64 prefix from the data URL
#     base64_data = image_data_url.split(",")[1]

#     # Decode the base64 string into bytes
#     image_bytes = base64.b64decode(base64_data)

#     # Write the bytes to an image file
#     with open("encrypted_img_from_js.png", "wb") as f:
#         f.write(image_bytes)

#     print("Image saved as encrypted_img_from_js.png")


# eel_thread = threading.Thread(target=start_eel)

# if __name__ == "__main__":
#     eel_thread.start()
#     webview.create_window('Image Steganogrphy by udaypali', 'gui/index.html', width=1100, height=700, frameless=True)
#     webview.start()
#     eel_thread.join()

import eel
import os
import base64

# Initialize Eel with the folder containing the GUI
eel.init('gui')

# Expose a Python function to quit the application

@eel.expose
def quit_app():
    os._exit(0)  # Forcefully close the Python process

@eel.expose
def receive_encrypted_image(image_data_url):
    # Remove the base64 prefix from the data URL
    base64_data = image_data_url.split(",")[1]

    # Decode the base64 string into bytes
    image_bytes = base64.b64decode(base64_data)

    # Write the bytes to an image file
    with open("encrypted_img_from_js.png", "wb") as f:
        f.write(image_bytes)

    print("Image saved as encrypted_img_from_js.png")


# Start the Eel application and open the HTML in the default browser
if __name__ == '__main__':
    # Adjust the size of the browser window
    eel.start('index.html', size=(1100, 700))
