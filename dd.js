auto.waitFor();  // home(); click('钉钉');

console.show();

waitForPackage("com.alibaba.android.rimet");
sleep(1000);


let loopCount = 0;
let checkWarningNumberCount = 0;

(function main() {
    console.log("程序运行次数:", loopCount++, "loopCount:", new Date().toLocaleString());
    checkWarningNumberCount = 0;
    // loop
    setTimeout(() => {
        checkFunc().then(() => main()).catch((e) => main());
    }, 1000 * 1);
})();

function checkFunc() {
    return new Promise((resolve, reject) => {

        checkWarningRoboot().then(() => {
            sleep(2000);
            checkWarningNumber().then((result) => {
                handlerSearchResult(result).then(() => {
                    sleep(2000);
                    sendText("正常");
                    sleep(2000);
                    back();
                    resolve();
                }).catch((e) => {
                    console.log(e);
                    handlerError(reject);
                })
            }).catch((e) => {
                console.log(e);
                handlerError(reject);
            })

        }).catch((e) => {
            console.log("未检测到机器人", e);
        })

    })
}

function checkWarningRoboot() {
    return new Promise((resolve, reject) => {
        try {
            const name = descContains("告警机器人").depth(12);
            name.waitFor();
            const name_w = name.findOne();
            click(name_w.bounds().left, name_w.bounds().top, name_w.bounds().right, name_w.bounds().bottom);

            resolve();
        } catch (e) {
            reject(e);
        }

    })
}

function callPhone() {
    return new Promise((resolve, reject) => {
        try {
            // 点击指定用户
            const callPhoneName = descContains("高啊啊啊").depth(12);
            callPhoneName.waitFor();
            const callPhoneName_w = callPhoneName.findOne();
            click(callPhoneName_w.bounds().left, callPhoneName_w.bounds().top, callPhoneName_w.bounds().right, callPhoneName_w.bounds().bottom);

            sleep(1000);

            sendText("异常");

            sleep(1000);

            // 点击右上角语音电话 icon
            const callPhonteIcon = descContains("发起钉钉电话").depth(15);
            callPhonteIcon.waitFor();
            const callPhonteIcon_w = callPhonteIcon.findOne();
            click(callPhonteIcon_w.bounds().left, callPhonteIcon_w.bounds().top, callPhonteIcon_w.bounds().right, callPhonteIcon_w.bounds().bottom);

            sleep(1000);

            // 点击语音通话
            const textCall = textContains("语音通话").depth(10);
            textCall.waitFor();
            const textCall_w = textCall.findOne();
            click(textCall_w.bounds().left, textCall_w.bounds().top, textCall_w.bounds().right, textCall_w.bounds().bottom);

            console.log('拨出电话');
            resolve();
        } catch (e) {
            console.log('callPhone', e)
            reject(e);
        }
    })
}

function checkWarningNumber() {
    let searchText = "活跃用户";

    return new Promise((resolve, reject) => {
        const searchResult = descContains(searchText).depth(15).find();
        if (searchResult.length > 0) {
            console.log("检测到告警机器人发送当前:", searchResult.map((item) => item.contentDescription).join(','));
           return resolve(searchResult);
        }
        if (checkWarningNumberCount >= 5){
            console.log("未检测到告警机器人发送当前:", searchText, 'count:', checkWarningNumberCount, '超过5次');
            return reject('未检测到告警机器人发送');
        }
        if (checkWarningNumberCount < 5) {
            checkWarningNumberCount++;
            console.log("未检测到告警机器人发送当前:", searchText, 'count:', checkWarningNumberCount);
            setTimeout(() => {
                checkWarningNumber().then((result) => resolve(result)).catch((e) => reject(e));
            }, 1000);
        }

    })
}

function handlerSearchResult(searchResult){
    const text = searchResult.map((item) => item.contentDescription).join(',');
    console.log('handlerSearchResult', text);
    return new Promise((resolve, reject) => {
        if (/(-)?(20(\.0{1,2})?|[2-9]\d|\d{3,})(\.)(\d{1,})?%/.test(text)) {
            return reject('检测到百分比超过20%');
        } else {
            resolve();
        }
    })
}

function handlerError(reject) {
    // 遇到异常
    back();
    sleep(2000);
    callPhone().then(() => {}).catch((e) => {
       return reject(e);
    })
    reject();
}

function sendText(text) {
    className("EditText").setText(text);
    sleep(2000);
    textContains("发送").depth(14).click();
}


