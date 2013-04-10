(function( $ ){

  $.fn.pictureLabel = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'inputSelector'         : 'input[type=file]'
    }, options);

    return this.each(function() {        
$(document).on('change', 'input[type=file]', function(evt) {
    if (window.File && window.FileReader && window.FileList) {
    } else {
      return false;
    }
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    $('#selImages').text(Number($('#selImages').text())+files.length);
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
        
        
        // Only process image files.
      if (!f.type.match('image.*')) {
        $('#selImages').text(Number($('#selImages').text())-1);  
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
            
            
            cvs.style.width='426px'; 
            
            var cvs2 = document.createElement('canvas');   
            var ctx2 = cvs2.getContext('2d');
            var nWidth = 426;
            var ratio = 426/img.width;    
            var nHeight = Math.floor(img.height*ratio);
            cvs2.width = nWidth;
            cvs2.height = nHeight;
            //ctx2.drawImage(cvs,0,0,cvs.style.width,cvs.style.height); 
            ctx2.drawImage(cvs,0,0,nWidth,nHeight);  
                 
            ctx2.font      = "normal 10px Arial";
            ctx2.fillStyle = "rgba(100,100,100,.7)";
            var d=new Date();
            var txt=d.toLocaleDateString()+' '+d.toLocaleTimeString();
            var pat = '00';    
                txt = (pat+String(d.getDate())).slice(-pat.length) + '.' + (pat+String(d.getMonth())).slice(-pat.length) + '.' + String(d.getFullYear()).slice(-2) + ' ' + (pat+String(d.getHours())).slice(-pat.length) +':'+ (pat+String(d.getMinutes())).slice(-pat.length);    
            var textWidth = ctx2.measureText(txt).width;
            ctx2.fillRect(5, nHeight-30, textWidth+10, 15);
                
            ctx2.fillStyle = "rgba(255,255,255,.7)";   
            ctx2.fillText(txt, 10, nHeight-18, 300 );    
                
            var dataURI = cvs2.toDataURL("image/jpeg");    
            var nImage = new Image();
            nImage.src = dataURI;
            nImage.onload = function(){
                document.getElementById('list').insertBefore(nImage, null);
            	cvs="";
            	ctx="";
            	cvs2="";  
            	ctx2="";
            	img="";
            	nImage="";
            }    
            
            $('#selImages').text(Number($('#selImages').text())-1);        
            //document.getElementById('list').insertBefore(cvs, null);
            
            }
            
           
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
    });

    });

  };
})( jQuery );  