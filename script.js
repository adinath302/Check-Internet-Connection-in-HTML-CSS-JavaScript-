const popup = document.querySelector(".popup");
const wifiicon = document.querySelector(".icon img");
const popuptitle = document.querySelector(".popup .title");
const popupdesc = document.querySelector(".desc");

let isonline = true, intervalid, timer = 10;

const checkconnection = async () => {
    try {
        // try to fetch random data from the api. if the status code is between
        // 200 and 300 , the network connection is considered online .
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isonline = response.status >= 200 && response.status < 300;
    } catch (error) {
        isonline = false; // if there is an error, the connection is considered offline .
    }
    timer = 10;
    clearInterval(intervalid);
    handlePopup(isonline);
}

const handlePopup = (status) => {
    if (status) { // if the status is true
        wifiicon.src = "wifi-solid.svg"
        popuptitle.innerHTML = "Restored Connection";
        popupdesc.innerHTML = "Your device is now successfully connected to the internet .";
        return setTimeout(()=> popup.classList.remove("show"),2000);
    }
    // if the status is false (offline)
    wifiicon.src = "wifi-solid.svg"
    popuptitle.innerHTML = "Lost Connection";
    popupdesc.innerHTML = "Your network is unavailable . We will attempt to reconnect you in  <b>10</b> seconds.";
    popup.classList.add("show");

    intervalid = setInterval(() => { // set an interval to decrease the timer by 1 every second
        timer--;
        if (timer === 0) checkconnection(); // if the timer reaches 0 , check the connection again 
        popup.querySelector(".desc b").innerHTML = timer;
    }, 1000)
}

// only if isonline is true , check the connection status every 3 seconds
setInterval(() => isonline && checkconnection(), 3000);