//update var length with the number of your photos
var length = 15;

$(document).ready(function(){
    var actual = 1;

    //set the first image thumb to active
    $('#1').addClass('thumb-active');

    //on click load the next image
    $('.next').click(function(){
        var next = actual + 1;
        if(next != length + 1){
            $('#main-pic').attr('src','./static/images/' + next +'.jpg');
            setImageOrientation($('#main-pic'));
            
            $('#' + next).addClass('thumb-active');
            updateSliderPosition($('#' + next));
            
            $('#' + actual).removeClass('thumb-active');
            actual = next;
        }else{
            return 0;
        }
    });
    
    //load previous image
    $('.back').click(function(){
        var prev = actual - 1;
        if(prev != 0 ){
            $('#main-pic').attr('src','./static/images/' + prev +'.jpg');
            setImageOrientation($('#main-pic'));
            
            $('#' + prev).addClass('thumb-active');
            updateSliderPosition($('#' + prev));
            
            $('#' + actual).removeClass('thumb-active');
            actual = prev;
        }else{
            return 0;
        }
    });

    //set the main pic base on the thumb that is clicked
    $('.thumb').click(function(){
        updateSliderPosition($(this));
        var id = parseInt(this.id);
        
        $('#main-pic').attr('src','./static/images/' + id +'.jpg');
        setImageOrientation($('#main-pic'));
        
        $('#' + actual).removeClass('thumb-active');
        $('#' + id).addClass('thumb-active');
        actual = id;
    });

    
    //show the slideshow only when its image are fully loaded
    $('.slideshow').toggle();
    $('.phototumbnails').toggle();
    $('.loading').show();

    var images_number = $('.slideshow-container img').length;
    // console.log("numero di immagini: " + images_number); 
    var load_counter = 0;
    
    $('.slideshow-container img').on('load', function(){
        load_counter++;
        if(images_number == load_counter){
            $('.loading').hide();
            $('.slideshow').fadeIn('slow');
            $('.phototumbnails').fadeIn('slow');
            
        }
    }).each(function(){
        if(('.slideshow').complete && ('phototumbnails').complete){
            $('.slideshow').trigger('load');
            $('.phototumbnails').trigger('load');
            
        }
    });

    //move the thumbnails slider base on the photo selected
    function updateSliderPosition(thumb){
        var objectWidth = thumb.width();
        var objectId = thumb.attr("id");
        $('.dx').animate({
            scrollLeft: (objectId-1)*180
            }, 800);
    };

    var isChanged = false;
    function setImageOrientation(image){
        var img = new Image();
        img.src = image.attr('src');
        appendImage(img);
        var imageHeight = img.height;
        var imageWidth = img.width;
        console.log("image: " + imageHeight + " " + imageWidth);
        if(imageWidth > imageHeight){
            if(isChanged){
                image.css("transform", "rotate(0)");
                isChanged = false;
            }
        }else{
            //changeOrientation(image);
            return;
        }
    };

    function changeOrientation(image){
        console.log("cambio orientamento");
        image.css("transform", "rotate(-90deg)");
        isChanged = true;
    }
    
    function appendImage(img){
        console.log("img src: " + img.src);
        $('.prove-foto').css('background-image', img.src);
    }
});