var ads_count = 0;
var idnet_appid;
var afg_channel_id = 7503025976; // default channel
var ad_timing = 180; // seconds
var ads_enabled = false;
var lastAdTime = 0;
var allowGamePause = true;
var requestAndPlayAd = false;
var clientOptionsLoadedEnum = 'loading';
var clientOptionsCheckCount = 0;

function InitExternEval(appid) {

    // do not initialise ads for version below Unity5.6
    var adContainer = document.getElementById("gameContainer") || document.getElementById('unityContainer');
    if (!adContainer) {
        clientOptionsLoadedEnum = 'failed';
        return;
    }

    if (typeof appid === 'undefined' || appid === null) {
        console.log('app-id is null');
        clientOptionsLoadedEnum = 'failed';
        return;
    }

    idnet_appid = appid;

    if (idnet_appid) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                try {
                    data = JSON.parse(xhttp.responseText);
                    if (!data.success) {
                        console.log('failed to get client options for appid - ' + idnet_appid);
                        return;
                    }
                    if(data.options.afg_channel_id)
                    {
                        afg_channel_id = data.options.afg_channel_id;
                    }
                    ads_enabled = data.options.ads_enabled;
                    ad_timing = data.options.ad_timing;
                    clientOptionsLoadedEnum = 'loaded';
                    // only init afg if ads are enabled.
                    if (ads_enabled) {
                        initaliseAfg();
                    }
                } catch (e) {
                    console.log(e);
                    clientOptionsLoadedEnum = 'failed';
                }
            }
        };

        xhttp.open("GET", 'https://account.y8.com/api/v1/json/client_options/' + idnet_appid, true);
        xhttp.send();
    } else {
        console.log('appid is null');
        clientOptionsLoadedEnum = 'failed';
    }
}


window.Y8ExternEval = function(_allowGamePause) {
    if (typeof allowGamePause !== 'undefined') {
        allowGamePause = (_allowGamePause === 'true');
    }

    if (clientOptionsLoadedEnum != 'loaded')
        return;

    // console.log('window.Y8ExternEval - allowGamePause :'+ allowGamePause);

    if (!canShowAds()) {
        return;
    }

    if (ads_enabled) {
       showAFG();
    }else{
       setTimeScale('1');
    }
}

function initaliseAfg() {
    if (clientOptionsLoadedEnum == 'loaded') {
        // initialise AFG just for the first time.
        initAdDiv();
        initAfg();
    }
}

function canShowAds() {
    var date = new Date();
    if (lastAdTime + (ad_timing * 1000) > date.getTime()) {
        return false;
    }
    return true;
}

//returns the referrer domain
function getTopDomain() {
    var url;
    try {
        url = window.top.location.href;
    } catch (error) {
        url = document.referrer;
    }
    if (!url) {
        url = window.location.href;
    }
    return url;
}


function showAFG() {
    if ((screen.availHeight || screen.height - 30) <= window.innerHeight) {
        console.log('blocking ad in fullscreen');
        return;
    }

    // lastAdTime is 0 when ad is not shown yet
    if (lastAdTime == 0) {
        // requestAndPlayAd = false;
        // playAds();

        requestAndPlayAd = true;
        requestAds();
    } else {
        requestAndPlayAd = true;
        requestAds();
    }
};

function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
        //IE
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        //Others
        script.onload = function() {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function afgLoaded() {
    init();
}

function jqueryLoaded() {}

function initAfg() {
    var afg_url = 'js/null.js?//imasdk.googleapis.com/js/sdkloader/ima3.js';
    loadScript(afg_url, afgLoaded);
}

function initAdDiv() {

    /*

    if (!window.jQuery) {
        var jqueryUrl = '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
        loadScript(jqueryUrl, jqueryLoaded);
    }

    */

    var webglcontent = document.getElementsByClassName("webgl-content")[0];

    var adv_mainContainer = document.createElement("div");
    adv_mainContainer.id = 'adv_mainContainer';


    webglcontent.appendChild(adv_mainContainer);

    var adv_content = document.createElement("div");
    adv_content.id = 'adv_content';


    adv_mainContainer.appendChild(adv_content);

    var adv_contentElement = document.createElement("video");
    adv_contentElement.id = 'adv_contentElement';

    adv_content.appendChild(adv_contentElement);

    var adv_adContainer = document.createElement("div");
    adv_adContainer.id = 'adv_adContainer';

    adv_content.appendChild(adv_adContainer);

    // loadjscssfile('gamebreak/gamebreak.css', 'css');
}

function loadjscssfile(filename, filetype) {
    if (filetype == "js") {
        //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
        alert('called');
    } else if (filetype == "css") {
        //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

var domain = getTopDomain();

function setTimeScale(value) {
    gameInstance.SendMessage('IDNET(Idnet.cs)', 'SetAudio', value);
    if (allowGamePause) {
        gameInstance.SendMessage('IDNET(Idnet.cs)', 'SetTimeScale', value);
    }
}


var adsManager;
var adsLoader;
var adDisplayContainer;
var intervalTimer;
var videoContent;

function init() {
    videoContent = document.getElementById('adv_contentElement');

    var element = document.getElementById('gameContainer') || document.getElementById('unityContainer');

    var eltWidth = element.offsetWidth;
    var eltHeight = element.offsetHeight;

    document.getElementById('adv_mainContainer').style.width = eltWidth + 'px';
    document.getElementById('adv_mainContainer').style.height = eltHeight + 'px';

    createAdLoader();
}

function createAdLoader() {
    // Create the ad display container.
    createAdDisplayContainer();
    // Create ads loader.
    adsLoader = new google.ima.AdsLoader(adDisplayContainer);
    // Listen and respond to ads loaded and error events.
    adsLoader.addEventListener(
        google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        onAdsManagerLoaded,
        false);
    adsLoader.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError,
        false);

    // An event listener to tell the SDK that our content video
    // is completed so the SDK can play any post-roll ads.
    var contentEndedListener = function() {
        adsLoader.contentComplete();
    };
    videoContent.onended = contentEndedListener;

    // requestAds();
}

function requestAds() {
    if (!canShowAds()) {
        return;
    }

    // Request video ads.
    var adsRequest = new google.ima.AdsRequest();

    var description_url = encodeURIComponent(domain);

    adsRequest.adTagUrl = 'js/null.js?https://googleads.g.doubleclick.net/pagead/ads?' +
        'ad_type=video_text_image' +
        '&videoad_start_delay=0' +
        '&max_ad_duration=30000' +
        '&hl=en' +
        '&description_url=' + description_url +
        '&client=ca-games-pub-6129580795478709' +
        '&channel=' + afg_channel_id;

    // Specify the linear and nonlinear slot sizes. This helps the SDK to
    // select the correct creative if multiple are returned.

    var adContainer = document.getElementById("gameContainer") || document.getElementById('unityContainer');
    var adW = adContainer.offsetWidth;
    var adH = adContainer.offsetHeight;

    adsRequest.linearAdSlotWidth = adW;
    adsRequest.linearAdSlotHeight = adH;

    adsRequest.nonLinearAdSlotWidth = adW;
    adsRequest.nonLinearAdSlotHeight = adH;

    adsRequest.forceNonLinearFullSlot = true;
    adsLoader.requestAds(adsRequest);
}

function createAdDisplayContainer() {
    return false;
    // We assume the adContainer is the DOM id of the element that will house
    // the ads.
    adDisplayContainer = new google.ima.AdDisplayContainer(
        document.getElementById('adv_adContainer'), videoContent);
}

function playAds() {
    if (!canShowAds()) {
        return;
    }

    // Initialize the container. Must be done via a user action on mobile devices.
    videoContent.load();
    adDisplayContainer.initialize();

    try {

        // Initialize the ads manager. Ad rules playlist will start at this time.
        var adContainer = document.getElementById("gameContainer") || document.getElementById('unityContainer');
        var adW = adContainer.offsetWidth;
        var adH = adContainer.offsetHeight;

        adsManager.init(adW, adH, google.ima.ViewMode.NORMAL);
        // Call play to start showing the ad. Single video and overlay ads will
        // start at this time; the call will be ignored for ad rules.
        adsManager.start();
    } catch (adError) {
        // An error may be thrown if there was a problem with the VAST response.
        videoContent.play();
    }
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
    // Get the ads manager.
    var adsRenderingSettings = new google.ima.AdsRenderingSettings();
    adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
    // videoContent should be set to the content video element.
    adsManager = adsManagerLoadedEvent.getAdsManager(
        videoContent, adsRenderingSettings);

    // Add listeners to the required events.
    adsManager.addEventListener(
        google.ima.AdErrorEvent.Type.AD_ERROR,
        onAdError);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
        onContentPauseRequested);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
        onContentResumeRequested);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
        onAdEvent);

    // Listen to any additional events, if necessary.
    adsManager.addEventListener(
        google.ima.AdEvent.Type.LOADED,
        onAdEvent);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.STARTED,
        onAdEvent);
    adsManager.addEventListener(
        google.ima.AdEvent.Type.COMPLETE,
        onAdEvent);

    if (requestAndPlayAd) {
        requestAndPlayAd = false;
        playAds();
    }
}

function onAdEvent(adEvent) {
    // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
    // don't have ad object associated.
    var ad = adEvent.getAd();
    switch (adEvent.type) {
        case google.ima.AdEvent.Type.LOADED:
            // This is the first event sent for an ad - it is possible to
            // determine whether the ad is a video ad or an overlay.
            if (!ad.isLinear()) {
                // Position AdDisplayContainer correctly for overlay.
                // Use ad.width and ad.height.
                videoContent.play();
            }
            break;
        case google.ima.AdEvent.Type.STARTED:
            // This event indicates the ad has started - the video player
            // can adjust the UI, for example display a pause button and
            // remaining time.
            if (ad.isLinear()) {
                // For a linear ad, a timer can be started to poll for
                // the remaining time.
                intervalTimer = setInterval(
                    function() {
                        var remainingTime = adsManager.getRemainingTime();
                    },
                    300); // every 300ms
            }
            break;
        case google.ima.AdEvent.Type.COMPLETE:
            // This event indicates the ad has finished - the video player
            // can perform appropriate UI actions, such as removing the timer for
            // remaining time detection.
            if (ad.isLinear()) {
                clearInterval(intervalTimer);
            }
            break;
    }
}

function onAdError(adErrorEvent) {
    // Handle the error logging.
    console.log(adErrorEvent.getError());
    if(adsManager)
    {
        adsManager.destroy();
    }

    document.getElementById("adv_mainContainer").style.display = "none";
    setTimeScale('1');
}

function onContentPauseRequested() {
    videoContent.pause();
    // This function is where you should setup UI for showing ads (e.g.
    // display ad timer countdown, disable seeking etc.)
    // setupUIForAds();


    var date = new Date();
    lastAdTime = date.getTime();

    setTimeScale('0');
    document.getElementById("adv_mainContainer").style.display = "block";
    document.getElementById("adv_adContainer").style.display = "block";
    updateAdPosition();
}

function onContentResumeRequested() {
    videoContent.play();
    // This function is where you should ensure that your UI is ready
    // to play content. It is the responsibility of the Publisher to
    // implement this function when necessary.
    // setupUIForContent();
    document.getElementById("adv_mainContainer").style.display = "none";
    setTimeScale('1');
    // requestAds();
}

function updateAdPosition() {
    var element = document.getElementById('gameContainer') || document.getElementById('unityContainer');
    var overlay = document.getElementById('adv_mainContainer');

    var eltWidth = element.offsetWidth;
    var eltHeight = element.offsetHeight;

    overlay.style.width = eltWidth + 'px';
    overlay.style.height = eltHeight + 'px';


    overlay.style.top = 0 + 'px';
    overlay.style.left = 0 + 'px';
}