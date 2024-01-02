// "ui";
console.show();
let loopCount = 0;
let phone = '';

setInterval(() => {
}, 1000);

const g_window = floaty.window(
    <frame gravity="center" bg="#44ffcc00">
        <vertical padding="16" bg="#ffffff">
            <text textSize="16sp" textColor="black" text="提示"/>
            <button id="input" text="输入"/>
            <button id="start" text="开始"/>
            <button id="stop" text="停止"/>
        </vertical>
    </frame>
);
g_window.setAdjustEnabled(true);
g_window.exitOnClose();
g_window.setPosition(500, 500);

g_window.start.click(function () {
    console.log("点击悬浮窗开始");
    // phone = g_window.phone.text();
    console.log("您输入的是：", phone);
    const phoneArr = phone.split("");
    console.log("phoneArr：", phoneArr);
});
g_window.stop.click(function () {
    console.log("点击悬浮窗停止");
    g_window.close();
});
g_window.input.click(function () {
    rawInput("请输入拨打手机号码", phone).then(age => {
        if (age) {
            phone = String(age);
        } else {
            phone = '';
        }
        toastLog(age);
    }).catch(e => {
        console.log(e);
    })
});


function main() {
    console.log(new Date().toLocaleString(), "程序运行次数：", loopCount++);
    setTimeout(() => {
        checkFunc().then(() => main()).catch((e) => main());
    }, 1000);
}

function checkFunc() {
    return new Promise((resolve, reject) => {
        const phoneArr = phone.split("");
        console.log("phoneArr：", phoneArr);
        for (let i = 0; i < phoneArr.length; i++) {
            // tapPhoneNumber(phoneArr[i]).catch((e) => {
            //     console.log(e);
            // })
            console.log(`phoneArr[${i}]：`, phoneArr[i]);
            sleep(500);
        }
    })
}

function tapPhoneNumber(number) {
    return new Promise((resolve, reject) => {
        try {
            const num = textContains(number)
            //.depth(12);
            // num.waitFor();
            const w = num.findOne();
            click(w.bounds().left, w.bounds().top, w.bounds().right, w.bounds().bottom);

            resolve();
        } catch (e) {
            reject(e);
        }

    })
}