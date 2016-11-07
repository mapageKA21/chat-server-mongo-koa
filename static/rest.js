// let lastMsgTime;

function postMsg (text) {
  $.post('/messages', {content: text}, function (data) {
    appendMsgs([data]);
  });
}

// add a new user to db
function signUp (name, password) {
  $.post('/users', {name: name, password: password});
}

//  function receives array to add messages to index.html
function appendMsgs (msgsArr) {
  if (msgsArr.length) {
    let last = msgsArr.length - 1;
    lastMsgTime = msgsArr[last].timestamp;
    for (let i = last; i >= 0; i--) {
      let msg = msgsArr[i];
      let timeStr = new Date(+msg.timestamp).toLocaleTimeString();
      let $div = $('<div class="message">');
      $('#messages').append(`
        <div class="message">
          <div class="time">Time: ${timeStr}</div>
          <p>${msg.content}</p>
        </div>
      `);
      keepScrolled('#messages');
    }
  }
}

function getLatestMessages () {
  let url = '/messages';
  $.get(url, appendMsgs);
  keepScrolled('#messages')
}

// keep the scroll at the bottom of the element
function keepScrolled(elementId) {
  $(elementId).animate({ scrollTop: $(elementId)[0].scrollHeight}, 100);
}

$(function () {
  $('#messages').val();  //  clear before adding messages from memory
  //  retrieve the last ten messages
  getLatestMessages();

  //  add a new message
  $('#send').click(function () {
    let text = $('#writemessage').val();
    text && postMsg(text);
    $('#writemessage').val('');
  });

  //user sign up
  $('#signup').click(function () {
    let name = $('#username').val();
    let pass = $('#password').val();
    signUp(name, pass);
    $('#username').val('');
    $('#password').val('');
  });

});
