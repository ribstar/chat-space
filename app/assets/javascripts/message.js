$(function(){ 
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
      var img  = message.image ? `<img class="lower-message__image" src="${ message.image }">` : "";
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="area-message__2-box">
                      <p class="area-message__2-box__user-name">
                        ${message.user_name}
                      </p>
                      <p class="area-message__2-box__time">
                        ${message.created_at}
                      </p>
                    </div>
                      <div class="area-message__text">
                        <p class="lower-message__content">
                            ${content}
                        </p>
                            ${img}
                      </div>
                  </div>`
    return html;
    }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.area-message').append(html);
      $('form')[0].reset();
      $('.area-message').animate({ scrollTop: $('.area-message')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('form').find(':submit').removeAttr("disabled");
    })
  });
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.area-message').append(insertHTML);
        $('.area-message').animate({ scrollTop: $('.area-message')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});