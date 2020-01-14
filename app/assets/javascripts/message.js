$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="area-message__2-box">
           <div class="area-message__2-box__user-name">
             ${message.user_name}
           </div>
           <div class="area-message__2-box__time">
             ${message.created_at}
           </div>
         </div>
         <div class="area-message__text">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="area-message__2-box">
           <div class="area-message__2-box__user-name">
             ${message.user_name}
           </div>
           <div class="area-message__2-box__time">
             ${message.created_at}
           </div>
         </div>
         <div class="area-message__text">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
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
    });
    .always(function(){
      $('form').find(':submit').removeAttr("disabled");
    })
  });
  
});