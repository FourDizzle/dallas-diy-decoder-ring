#Dallas DIY Decoder Ring Chrome Extension

A Chrome Extensions for disguising the address of events in the pixel data of
the event header

##Running the Extension Live for Dev

1. Clone the repository.
2. Install [yarn](https://yarnpkg.com): `npm install -g yarn`.
3. Run `yarn`.
4. Run `npm run start`
5. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.
6. Have fun.

##Packing
To build the production ready package run the command

```
$ NODE_ENV=production npm run build
```
Now, the content of `build` folder will be the extension ready to be submitted
to the Chrome Web Store. Just take a look at the
[official guide](https://developer.chrome.com/webstore/publish) to more infos
about publishing.

##Secrets
You might need to stash some secret keys that you only want to use locally.

To do this import the file `./secrets.<THE-NODE_ENV>.js` on your modules through
the module named as `secrets`, so you can do things like this:

_./secrets.development.js_

```js
export default { key: "123" };
```

_./src/popup.js_

```js
import secrets from "secrets";
ApiCall({ key: secrets.key });
```
:point_right: The files with name `secrets.*.js` already are ignored on the
repository.

-------------
Nick 4d
