function confirmChooseStore() {
    var msg = "您真的確定要歸還？\n\n按確認後即歸還!";
    if (confirm(msg) == true) {
        return true;
    }
    else {
        return false;
    }
}