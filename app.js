const writeButton = document.querySelector(".button1 button");
const readButton = document.querySelector(".button2 button");
const interactive = document.querySelector(".interactive");
let logArray = [{
    "name": "Research Log #45: remarkable progress on SP-004 strain",
    "date": "2144-04-12",
    "content": "----- Level A1 clearance! -----\n\nSmb: Yuun I.\n\n----------\n\nWhile exposing samples of SP-004 plants to intermittent radiation bursts, a particular strain (catalogued as \"SP-004/07\") has shown an incredible capacity of adapting to different particles, particularly of the γ (gamma) variety. Analyzing the affected sample's stalk afterwards showed no signs of damage, apart from dark spots that we suspect are how the plant cleanses itself of undesirable contaminants.\n\nFurther examination of the plant's leaves show the same ability, with added flexibility and strength to boot. Nowhere had we seen such qualities on any biological organism, only in man-made ones such as carbon fiber and flexible (fiber) glass. If planting these samples en masse turns out to be possible, we could have a cheaper alternative to both of these for many different applications.\n\nI shall bring this up to my fellows at the meeting tomorrow, along with a request for additional staff members to start research on how these samples reproduce while in nature.\n\n----------",
    "hrmin": "21:21",
    "id": 100001
}]; //array meant to store the log objects. starts with a fancy log

const cathub = document.querySelector(".cathub");

/* 

form name reference

form - submit-log (class)
log name - logname
date submitted - dateinput
log content - logcontent
submit button - submit-button (class), submitlog (name)

*/

cathub.addEventListener("click", function(evt) {
    console.log("github link");
});

writeButton.addEventListener("click", function(evt) {
    interactive.classList.remove("center-object");
    interactive.innerHTML = ``;
    if(interactive.childNodes.length === 0) {
        interactive.innerHTML += `
                <div class="submit-tab-wrapper">
                    <form action="" class="submit-log">
                        <p class="marg-tp-bt-10">LOG NAME</p>
                        <input class="log-name-input" type="text" name="logname" id="" maxlength="65" placeholder="Enter log name here..." required>
                        <p class="marg-tp-bt-10">DATE SUBMITTED</p>
                        <input type="date" name="dateinput" id="" required>
                        <p class="marg-tp-bt-10">LOG CONTENT</p>
                        <textarea name="logcontent" id="" cols="100" rows="25" placeholder="Enter log text here..." required></textarea>
                        <button class="submit-button" type="submit" name="submitlog">SUBMIT</button>
                    </form>
                </div>
        `;
    }
});

readButton.addEventListener("click", addLogList); //refer to named function for log adding, updating, etc

interactive.addEventListener("submit", function(evt) { //detect submit and send data to array/object/etc | no need to create the vars but hey it looks nice!!
    evt.preventDefault();
    let formResult = document.querySelector(".submit-log");
    let lognameValue = formResult.logname.value;
    let dateinputValue = formResult.dateinput.value;
    let logcontentValue = formResult.logcontent.value;
    console.log("detecting submit click seems to work");
    let formObject = new CreateLogObject(lognameValue, dateinputValue, logcontentValue, returnHourMin());
    logArray.push(formObject);
    formResult.reset();
});

interactive.addEventListener("click", function(evt) { //display the clicked log's content
    if(evt.target.classList.contains("lgn-h3")) {
        let dataStringId = evt.target.parentElement.parentElement.lastElementChild.lastElementChild.innerHTML; // gets the date-tag thing with the ID that is used to identify the right log object
        let retrievedLog = logArray.filter(function(element) {
            return element.id == dataStringId;
        }); // this returns an array btw, hence the [0] below vvv
        let fixedContent = retrievedLog[0].content.replace(/\n/g, "<br>");
        interactive.innerHTML = ``;
        interactive.innerHTML += `
        <div class="demo-list">
            <div class="demo-item-no-bottom">
                <div class="demo-item-content-left">
                    <div class="dicl-title">
                        <h3 class="lgn-h3">${retrievedLog[0].name}</h3>
                    </div>
                    <div class="dicl-date-tag">
                        <p class="datetag">${retrievedLog[0].date} | SUBMITTED @ ${retrievedLog[0].hrmin} | ID </p><p class="theLegendaryId">${retrievedLog[0].id}</p>
                    </div>
                </div>
                <div class="demo-item-content-right">
                    <p>-</p>
                </div>
            </div>
            <div class="demo-item-bottom"><br><p>${fixedContent}</p></div>
            <button class="generic-button go-back-button" type="button" name="backbutton">BACK</button>
        </div>
        `;

    }
    if(evt.target.classList.contains("go-back-button")) { //when user clicks back button it renders the log list
        addLogList();
    }
    if(evt.target.classList.contains("delete-log-on-click")) { //deletes the log display AND the array item on click
        let removeId = evt.target.parentElement.parentElement.firstElementChild.lastElementChild.lastElementChild.innerHTML;
        let removeLog = evt.target.parentElement.parentElement.parentElement;
        let deletionIndex = logArray.findIndex(function(element) {
            return element.id == removeId;
        });
        logArray.splice(deletionIndex, 1);
        removeLog.remove();
        addCCLogs();
    }
});

// etc functions

function CreateLogObject(logname, logdate, logcontent, curtime) {
    this.name = logname;
    this.date = logdate;
    this.content = logcontent;
    this.hrmin = curtime;
    this.id = idRandomizer();
}

function returnHourMin() {
    let now = new Date();
    let currenttime = `${now.getHours()}:${now.getMinutes()}`; // now variable is related to a date object located at line 6
    return currenttime;
}

function idRandomizer() {
    let randomId = Math.floor(Math.random() * 10000);
    return randomId;
}

function addLogList() {
    interactive.classList.remove("center-object");
    interactive.innerHTML = ``;
    if(interactive.childNodes.length === 0 && logArray.length > 0) {
        logArray.forEach(function(log) {
            interactive.innerHTML += `
            <div class="demo-list">
                <div class="demo-item">
                    <div class="demo-item-content-left">
                        <div class="dicl-title">
                            <h3 class="lgn-h3 lgnhover">${log.name}</h3>
                        </div>
                        <div class="dicl-date-tag">
                            <p class="datetag">${log.date} | SUBMITTED @ ${log.hrmin} | ID </p><p class="theLegendaryId">${log.id}</p>
                        </div>
                    </div>
                    <div class="demo-item-content-right">
                        <p class="delete-log-on-click">(delete)</p>
                    </div>
                </div>
            </div>
            `;
        })
    } else {
        interactive.classList.add("center-object");
        interactive.innerHTML += `
        <div class="will-be-deleted"><p><span class="b">No logs available for display.</span></p></div>
        `;
    }
}

function addCCLogs() { //add center object & no logs content
    if(interactive.children.length === 0) {
        interactive.classList.add("center-object");
        interactive.innerHTML += `
        <div class="will-be-deleted"><p><span class="b">No logs available for display.</span></p></div>
        `;
    }
}

/* Sure, Larry Connaught saved my life--but it was how he did it that forced me to murder him!

I am sitting on the edge of what passes for a bed. It is made of loosely woven strips of steel, and there is no mattress, only an extra blanket of thin olive-drab. It isn't comfortable; but of course they expect to make me still more uncomfortable.

They expect to take me out of this precinct jail to the District prison and eventually to the death house.

Sure, there will be a trial first, but that is only a formality. Not only did they catch me with the smoking gun in my hand and Connaught bubbling to death through the hole in his throat, but I admitted it.

I--knowing what I was doing, with, as they say, malice aforethought--deliberately shot to death Laurence Connaught. */