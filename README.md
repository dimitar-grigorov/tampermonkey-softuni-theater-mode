# SoftUni Theater Mode

This Tampermonkey script enhances the SoftUni.bg video streams by introducing a customizable theater mode. The script adds a floating button that allows users to expand the video stream for an immersive viewing experience. With a simple click, it toggles between hiding and revealing course information, providing flexibility based on user preferences.

## Features

1. **Initialization:** Identifies the main container element with the class "stream-container" on the SoftUni.bg video streams page.

2. **Floating Button:** Creates a floating button with a glyph icon, seamlessly integrated into the stream container.

3. **Theater Mode Toggle:** Clicking the button toggles a theater mode, adjusting the visibility of the "aside" element and toggling the width of the "stream-section" element.

4. **Button Styles:** The button is initially positioned with a default right offset and opacity, featuring smooth CSS transitions.

5. **Mouse Interaction:** The button's visibility and position dynamically respond to mouse movements, optimizing the user experience.

## Usage

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension if you haven't already.

2. Open Tampermonkey and go to the "Utilities" tab.

3. In the "URL" section, paste the following URL:

   ```url
   https://raw.githubusercontent.com/dimitar-grigorov/tampermonkey-softuni-theater-mode/main/softuni-theater-mode.js
   ```

4. Click the "Import" button.

5. Click "Install" when prompted.

6. Refresh or open a new SoftUni.bg video stream page to see the floating button in action.

## Author

Dimitar Grigorov

Feel free to contribute or report issues!
