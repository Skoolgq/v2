[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)

# WebPrBoom

WebPrBoom is a fork of the excellent [WebDOOM](https://github.com/UstymUkhman/webDOOM) WebAssembly port of [PrBoom](http://prboom.sourceforge.net/) that was originally developed by [UstymUkhman](https://github.com/UstymUkhman).

The original goal of WebPrBoom was to provide a version of PrBoom that is compatible with the Xbox One (series X/S) browser. Currently, WebPrBoom works well for most devices (including Xbox One) that support WebAssembly and have a physical input mechanism (gamepad, mouse/keyboard, etc.).

## Play

To play WebPrBoom, visit one of the following URLs (GitHub is more reliable)

[http://webprboom.com](http://webprboom.com) 
or
[https://raz0red.github.io/webprboom](https://raz0red.github.io/webprboom) 


#### Gameplay Video (Xbox Series X Web Browser)

[![WebPrBoom](https://github.com/raz0red/webprboom/raw/master/webprboom.png)](http://www.youtube.com/watch?feature=player_embedded&v=FrfQZ2PJ33M)

Click the image above to view gameplay of WebPrBoom running on the Xbox Series X web browser.

## Features

* Menu to select game to play
* Includes Doom 1 (Shareware), [Freedoom 1](https://freedoom.github.io/), and [Freedoom 2](https://freedoom.github.io/)
* Other PrBoom compatible games can be added via custom builds (Doom 2, etc.)
* Gamepad support for menu and games
* Keyboard/mouse support for menu and games
* Save/load game support (persisted in browser storage)
* Configuration persistence (in browser storage)
* Pointer lock support (for mouse input)

## Gamepad Controls

The following controls are described using the Xbox One controller. 

Equivalent controls for other controller types (PS4, Switch, etc.) should also be compatible.

|Name|Controls|Description|
|-|-|-|
|Move|`D-Pad` or<br> `Left Thumbstick` &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Player moves |
|Run|`X Button`| Player runs | 
|Fire|`A Button`| Fire weapon | 
|Strafe|`B Button`| Strafe when moving left and right | 
|Use|`Y Button`| Opens doors, etc. | 
|Previous Weapon|`Left Shoulder`| Select the previous weapon |
|Next Weapon|`Right Shoulder`| Select the next weapon |
|Show Menu|`Start`<br>+<br>`Select`| Displays the menu |
|Show Menu (alternative)|`Left Trigger`<br>or<br>`Right Trigger`<br>+<br>`Click Left and Right Thumbsticks`|This button combo is required due to the Xbox One reserving the `Screen` and `Menu` buttons for browser-specific controls.<br><br>To enter the menu, hold down the `left trigger` or `right trigger` and `click` (press down) on the `left thumbstick` and `right thumbstick`.|
|Controls Menu|`Menu Button`<br>(Previously start button)|**Xbox One Only**<br><br>Displays a menu that allows for choosing between "browsing" and "game" controls.|

When presented with a Yes/No prompt, the `A button` corresponds to *Yes* and the `B button` to *No*.

> **Note: Screen and Menu Buttons**
> 
> There appears to be a bug in the Xbox One Edge Browser that periodically prevents the `Screen` (full screen toggle) and `Menu` (controls menu) button presses from being processed. If this occurs, click the `Xbox button` which will cause the left side menu to appear. Next, click the `Xbox button` again to make the left menu disappear. At this point, the `Screen` and `Menu` buttons should work correctly.

## Mouse Support (Pointer Lock)

In addition to gamepad support, keyboard and mouse controls are also compatible with WebPrBoom.

It is important to note that WebPrBoom supports **Pointer Lock** on compatible browsers. Pointer lock binds mouse input to the game window, preventing the game from losing mouse input when the mouse travels outside the window. This functionality is critical when playing a 3rd person shooter. To enable pointer lock, double click on the game window (you may have to repeat this a couple of times). Once the pointer is "locked", the pointer (arrow, etc.) will no longer be visible. To "unlock" from the window, press the escape key (you may have to repeat this a couple of times).
