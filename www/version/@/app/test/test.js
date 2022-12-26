import { BottomSheet } from "../../browser_modules/@frontle/bottomsheet/index.js";
import { getDirEntry, getFileEntry, read, write, remove, removeDir } from "../../browser_modules/@frontle/cordova-fileutil/index.js";
import { GetPlatformID } from "../../browser_modules/@frontle/cordova-getplatformid/index.js";
import { CordovaKeyValueStorage } from "../../browser_modules/@frontle/cordova-keyvaluestorage/index.js";
import { frontle } from "../../browser_modules/@frontle/frontle-core/index.js";
import { jquery } from "../../browser_modules/jquery/module.js"; // "frontle install jquery"
const $ = jquery;

const css = /* css */ `
`;

const html = () => {
  return /* html */ `
    <style>${css}</style>
    <button id="pageMove">pageMove</button>
    <button id="pageMove_visibleParams">pageMove_visibleParams</button>
    <p></p>

    <button id="pageReplace">pageReplace</button>
    <button id="pageReplace_visibleParams">pageReplace_visibleParams</button>
    <p></p>

    <button id="FRONTLE_ENV">FRONTLE_ENV</button>
    <p></p>

    <button id="back_get">back_get</button>
    <button id="back_add">back_add</button>
    <button id="back_remove">back_remove</button>
    <p></p>

    <button id="forward_get">forward_get</button>
    <button id="forward_add">forward_add</button>
    <button id="forward_remove">forward_remove</button>
    <p></p>

    <button id="bottomSheet">bottomSheet</button>

    <button id="getPlatformID">getPlatformID</button>

    <button id="fileUtil">fileUtil</button>

    <button id="keyValueStorage">keyValueStorage</button>
  `;
};

const test = (params) => {
  console.log(params);
  document.getElementById("app").innerHTML = html();

  // pageMove
  $("#pageMove").click(() => {
    frontle.util.pageMove(params.f_p, { test: 123 }, false);
  });
  $("#pageMove_visibleParams").click(() => {
    frontle.util.pageMove(params.f_p, { test: 123 });
  });

  // pageReplace
  $("#pageReplace").click(() => {
    frontle.util.pageReplace(params.f_p, { test: 123 }, false);
  });
  $("#pageReplace_visibleParams").click(() => {
    frontle.util.pageReplace(params.f_p, { test: 123 });
  });

  // FRONTLE_ENV
  $("#FRONTLE_ENV").click(() => {
    console.log(frontle.env.FRONTLE_ENV);
  });

  // event.back
  $("#back_get").click(() => {
    console.log(frontle.event.back.getListener());
  });
  $("#back_add").click(() => {
    frontle.event.back.addListener(() => {
      console.log("back button pressed");

      // Execute history.back if listener returns true
      // return true;
    });
  });
  $("#back_remove").click(() => {
    frontle.event.back.removeListener();
  });

  // event.forward
  $("#forward_get").click(() => {
    console.log(frontle.event.forward.getListener());
  });
  $("#forward_add").click(() => {
    frontle.event.forward.addListener(() => {
      console.log("forward button pressed");

      // Execute history.forward if listener returns true
      // return true;
    });
  });
  $("#forward_remove").click(() => {
    frontle.event.forward.removeListener();
  });

  // bottomSheet
  $("#bottomSheet").click(async () => {
    const bottomSheet = new BottomSheet("#app", '<button id="closeButton">close</button>');
    bottomSheet.sheetClass = "cssClassName";
    bottomSheet.contentsClass = "cssClassName1 cssClassName2";
    bottomSheet.backgroundClass = "";
    bottomSheet.height = 100;
    bottomSheet.startY = -50;
    bottomSheet.backgroundClickExit = true;
    bottomSheet.beforeOpen = (sheetID) => {
      console.log("beforeOpen", sheetID);
      document.querySelector("#closeButton").onclick = async () => {
        await bottomSheet.close(sheetID);
      };
    };
    bottomSheet.afterOpen = (sheetID) => {
      console.log("after opened", sheetID);
    };
    bottomSheet.beforeEnd = (sheetID) => {
      console.log("before closed", sheetID);
    };
    bottomSheet.afterEnd = (sheetID) => {
      console.log("after closed", sheetID);
    };
    const sheetID = await bottomSheet.open();
    console.log(sheetID);
  });

  $("#getPlatformID").click(() => {
    console.log(GetPlatformID());
  });

  $("#fileUtil").click(async () => {
    // get directory entry
    const dirEntry = await getDirEntry(cordova.file.dataDirectory, "testFolder");

    // get file entry
    const fileEntry = await getFileEntry("test.text", dirEntry);

    // read file
    const readData = await read(fileEntry);

    // write file
    await write(fileEntry, "test text");

    // remove file
    await remove("test.text", dirEntry);

    // remove directory
    await removeDir(dirEntry);
  });

  $("#keyValueStorage").click(async () => {
    // get instance
    const cordovaKeyValueStorage = new CordovaKeyValueStorage();

    // load storage
    await cordovaKeyValueStorage.load();

    // get storage directory entry
    console.log(cordovaKeyValueStorage.getStorageDirEntry());

    // save data
    await cordovaKeyValueStorage.setItem("test", "123");

    // get data
    console.log(await cordovaKeyValueStorage.getItem("test"));
  });
};

export default test;
