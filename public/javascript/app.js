$('#categs').on('change',function(evt){
  
  document.getElementById('movies').innerHTML = '';
      $.ajax({
        url: '/search/?category='+$('#categs').val(),
        method: 'GET'
      }).done(function(res){
        console.log(res);
        $('.page').hide() ;
        $('#movies').show() ;
        res.forEach(function(movie) {
          $('#movies').append('<div><div class="title">'+movie.title+'</div></div>')
        })
      });
      
      
});
