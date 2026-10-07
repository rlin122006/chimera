# Chimera

A browser tool to auto complete and fill out forms on a set of specific webpages.

## Description

Chimera is a tool written in Javascript that identifies input forms and fills them out. The answer is found within the web page and is formatted by the application. It then enters the answer into the form and auto submits to confirm the answer and moves onto the next form on the webpage. It also supports multiple choice type inputs as well. Once all inputs have been completed on the page, the application will move onto the next page and exit. It will rerun on the next page assuming it meets the criterion. If a form or a multiple choice input fails, the application will exit and not move onto the next page until there are no more pages to complete.

Note, some pages have answer and input fields that do not contribute to the score and also are not visible. Some pages may appear to hang because of this even if the script is running as intended. This is the fault of a poorly designed webpage and not the application.

## Disclaimer

The functionality of Chimera may be illegal, unethical, and in violation of the terms of service of third parties. This software is intended for use only where legal. You confirm you are of legal age in your jurisdiction. You accept full responsibility for any consequences, legal or otherwise, that result from your use of this application.

I do not endorse, condone, or encourage any illegal, unethical, or terms-of-service-violating activity. This includes, but is not limited to, cheating, academic dishonesty, piracy, copyright infringement, unauthorized intrusions, cyberstalking, and child exploitation.

Under no circumstances will I or the project's contributor(s) be liable for any damages, losses, or legal claims arising from your use of this software. Use at your own risk. By using this software, you acknowledge you have read and understood this disclaimer.

## Getting Started

Using this script requires a userscript manager extension like Violentmonkey. The browser of choice must support a userscript manager. Violentmonkey is the recommended userscript manager and the script was designed for it. Download the script from the releases section of the repository and open the userscript manager and add the script.

On Violentmonkey, the plus symbol can be selected and "new from file" can be used to select the downloaded Javascript file. Make sure the script is enabled, and it will run automatically on specific web pages within the browser. You can disable it anytime by clicking on the extension and toggling.

## License

This project is licensed under the MIT License.
