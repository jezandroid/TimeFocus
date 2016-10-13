/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var chunkCount = 0;
var activeChunkId = 0;

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');

        // navigator.notification.beep(2);
        
        globalTick();

    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');


        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};




$(document).ready(function () {
    // globalTick(); // shouldn't this really be in onDeviceReady?
});

function globalTick() {
    var activeChunk = document.getElementById("chunk-" + activeChunkId);
    if (activeChunk) {
        oldElapsedSecs = parseInt($("#chunk-" + activeChunkId).attr("data-elapsed-secs"));
        newElapsedSecs = oldElapsedSecs + 1;
        $("#chunk-" + activeChunkId).attr("data-elapsed-secs",newElapsedSecs)
        $("#chunk-" + activeChunkId + " .chunk-elapsed-mins").text(parseInt(newElapsedSecs/60));
        $("#chunk-" + activeChunkId + " .chunk-elapsed-secs").text(newElapsedSecs - (parseInt(newElapsedSecs/60)*60));
    }
    setTimeout(globalTick, 1000);
}

function addChunk(chunkId, chunkName, chunkMins) {
    var htmlBlock = "<li data-elapsed-secs='0' id='chunk-" + chunkId + "' class='ui-li-static ui-body-inherit chunk'><h2 class='chunk-name'>" + chunkName + "</h2><p><span class='chunk-elapsed-mins'>0</span>:<span class='chunk-elapsed-secs'>00</span>/<span class='chunk-mins'>" + chunkMins + "</span> mins"
    htmlBlock += "<a href='#' class='ui-btn ui-btn-inline ui-mini waves-effect waves-button waves-effect waves-button' onclick='javascript:setActiveChunkId(" + chunkId + ");'><i class='zmdi zmdi-play zmd-2x'></i></a>"
    htmlBlock += "<a data-rel='popup' data-position-to='window' data-role='button' data-inline='true' data-transition='pop' href='#popupEditChunk' onclick='javascript:setEditChunkFormId(" + chunkId + ");' class='ui-btn ui-btn-inline ui-mini waves-effect waves-button waves-effect waves-button'><i class='zmdi zmdi-edit zmd-2x'></i></a>"
    htmlBlock += "</p></li><hr>"
    $("#listholder").append(htmlBlock);
    // $('<div/>', {
    //     "id": 'foo',
    //     "name": 'fooDiv',
    //     "class": 'myClass',
    //     "click": function () {
    //         jquery(this).hide();
    //     }
    // }).appendTo('#main-canvas');



    // new $.nd2Toast({ // The 'new' keyword is important, otherwise you would overwrite the current toast instance
    //     message: "Chunk added", // Required
    //     action: { // Optional (Defines the action button on the right)
    //         title: "Cancel", // Title of the action button
    //         link: "/any/link.html", // optional (either link or fn or both must be set to define an action)
    //         fn: function () { // function that will be triggered when action clicked
    //             console.log("Action Button clicked'");
    //         },
    //         color: "red" // optional color of the button (default: 'lime')
    //     },
    //     ttl: 2000 // optional, time-to-live in ms (default: 3000)
    // });
    chunkCount += 1;
}

function editChunk(chunkId, chunkName, chunkMins) {
    //get the chunk's li
    //set its name to chunkName
    //set its mins to chunkMins
    $("#chunk-" + chunkId).children("h2.chunk-name").text(chunkName);
    $("#chunk-" + chunkId + " .chunk-mins").text(chunkMins);
    // $("#chunk-" + chunkId).children("p").children("span.chunk-mins").text(chunkMins + " mins"); //NOT WORKING
    // $("#chunk-" + chunkId + " > .chunk-name").val(chunkName);
    // $("#chunk-" + chunkId + " > .chunk-mins").val(chunkMins);
}

$("#btn_add_chunk").on("tap", function () {
    addChunk(chunkCount + 1, $("#add-chunk-name").val(), $("#add-chunk-mins").val());
});
$("#btn_edit_chunk").on("tap", function () {
    var chunkId = $("#edit-chunk-id").val();
    if (chunkId > 0) {
        editChunk(chunkId, $("#edit-chunk-name").val(), $("#edit-chunk-mins").val());
    }
});

function resetAddChunkForm() {
    $("#add-chunk-name").val("");
    $("#add-chunk-mins").val(5);
}

function setEditChunkFormId(chunkId) {
    $("#edit-chunk-id").val(chunkId);
}

function setActiveChunkId(chunkId) {
    activeChunkId = chunkId;
}



// We do something every second and the thing is this:
// We increase the elapsed time of the active chunk by 1 second