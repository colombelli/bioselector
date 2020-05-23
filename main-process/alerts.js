const { ipcMain, BrowserWindow } = require('electron');
const { dialog } = require('electron');
const Alert = require("electron-alert");


ipcMain.on('ASK_AGGREGATOR_INFO', (event, type) => {

    let alert = new Alert();
    let alert2 = new Alert();

    let swalOptions1 = {
        title: "Are you sure you want to delete?",
        text: "You won't be able to revert this!",
        type: "input",
        showCancelButton: true,
        inputPlaceholder: "User"
    };

    let swalOpt = {
    title: 'Multiple inputs',
    html:
        '<input id="swal-input1" class="swal2-input">' +
        '<input id="swal-input2" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
        return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value
        ]}
    }

    let promise = alert.fireWithFrame(swalOpt, null, true, true);
    promise.then((result) => {
        console.log(result.value);
    });

    /*
    let swalOptions2 = {
        title: "blablablab",
        text: "ah asj dajndkçao ddkd",
        type: "input",
        showCancelButton: true,
        inputPlaceholder: "Two"
    };

    
    let promise = alert.fireFrameless(swalOptions1, null, true, true);
    promise.then((result) => {
        if (result.value) {
            
            let promise2 = alert2.fireFrameless(swalOptions2, null, true, true);
            promise2.then((result2) => {
                if (result2.value) {

                    console.log(result.value)
                    console.log(result.value)

                }
                else if(result.dismiss === Alert.DismissReason.cancel) {
                    event.returnValue = null
                }
            });

        } else if (result.dismiss === Alert.DismissReason.cancel) {
            event.returnValue = null
        }
    })
*/
    
});