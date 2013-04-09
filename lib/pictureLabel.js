(function( $ ){

  $.fn.pictureLabel = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'inputSelector'         : 'input[type=file]'
    }, options);

    return this.each(function() {        
$(document).on('change', '#files', function(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
        
        
        // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
            var img = new Image();
            img.src = e.target.result;
            img.onload = function(){
            var width = img.width;
            var height = img.height;
            var cvs = document.createElement('canvas');
            cvs.width = width;
            cvs.height = height;
            var ctx = cvs.getContext('2d');
            ctx.drawImage(img,0,0,width,height);  
            
                  
            var normHeight = Math.floor(height/20);     
            //ctx.fillStyle = "#fff";
            //ctx.fillRect(0, Math.floor(height-normHeight), 130, 130);     
            ctx.font      = "normal "+normHeight+"px Verdana";
            ctx.fillStyle = "#999";
            var d=new Date();
            var txt=d.toLocaleDateString()+' '+d.toLocaleTimeString();
            var textWidth = ctx.measureText(txt).width;
            ctx.fillRect(5, Math.floor(height-2*normHeight), textWidth, normHeight+5);
                
            ctx.fillStyle = "#eee";   
            ctx.fillText(txt, 5, Math.floor(height-normHeight), 300 );
                    
            document.getElementById('list').insertBefore(cvs, null);
            }
            /*
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
          */
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
    });
      
		console.log('TEST');
    });

  };
})( jQuery );