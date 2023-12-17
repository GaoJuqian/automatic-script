console.show();
auto.waitFor()
waitForPackage("com.alibaba.android.rimet");
sleep(1000);

// 点击指定用户
const callPhoneName = descContains("高啊啊啊").depth(12);
callPhoneName.waitFor();
const callPhoneName_w = callPhoneName.findOne();
click(callPhoneName_w.bounds().left, callPhoneName_w.bounds().top, callPhoneName_w.bounds().right, callPhoneName_w.bounds().bottom);

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



/*const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    if (minutes >= 25 && minutes <= 55){
        searchText = `${hour}:00 ~ ${hour}:30`;
    }else {
        if (hour === 0){
            if (minutes >= 0 && minutes <= 25) {
                searchText = `${hour}:00 ~ ${hour}:30`;
            }
            if (minutes >= 55 && minutes <= 59) {
                searchText = `23:00 ~ 24:00`;
            }
        }else {
            if (minutes >= 0 && minutes <= 25) {
                searchText = `${hour}:00 ~ ${hour}:30`;
            }
            if (minutes >= 55 && minutes <= 59) {
                searchText = `${hour}:00 ~ ${hour + 1}:00`;
            }
        }
    }*/