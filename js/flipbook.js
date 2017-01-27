// helpful terms
    // card: the container for your content, in this example it is the white rectangle
    // page: the container for your card(s) and the div that the animations/transitions are applied to. In this example it is the color background
       // each page is 100vh and 100vw, with overflow scrolling on. It can be populated with as many cards as needed
    // book: the entire interactive that contains all pages
        // the book disbales overflow scrolling and the js uses trasnlateY to move up and down to the appropriate page 
    // window: the actively seen page

// sets up the domain and defines the start page
$( ".page" ).first().addClass('active');
$( ".page" ).first().addClass('first');
$(".page").last().addClass('last');

function indexPages() {
    // adds index number to each instance of the page class
    $('.page').each(function (index, value) { 
        $(this).attr('data-item', index+1);
    });
}


function checkNavigation() {
    // hides / shows the next/back buttons depending if the page is the first or last page in the book
    if ($('.active').hasClass('first')) {
        $('#prev').hide();
        $('#next').show();
        $('#restart').hide();
    } else if ($('.active').hasClass('last')) {
        $('#next').hide();
        $('#prev').show();
        $('#restart').show();
    } else {
        $('#prev').show();
        $('#next').show();
        $('#restart').hide();

    }
}


var advance = function (activePage, nextPage){
    // transition to advance to next page 
    nextPage.addClass('active')
    activePage.removeClass('active')

    var pageIndex = parseInt(activePage.attr('data-item')),
    nextWindow = activePage.height() * pageIndex;
    $('#book').css('transform', 'translateY(-' +nextWindow +'px)').css('transition', '.6s ease-in-out');
    // alert(nextWindow)
}


var retreat = function (activePage, prevPage){
    // transitions to the previous page
    prevPage.addClass('active')
    activePage.removeClass('active')

    var pageIndex = parseInt(activePage.attr('data-item')),
    pageDepth = activePage.height() * pageIndex,
    prevWindow =  pageDepth - (2 * activePage.height() );
    // alert(depth)
    $('#book').css('transform', 'translateY(-' + prevWindow+'px)').css('transition', '.6s ease-in-out');   
}


var navigation = function () {
    // calls the advance/retreat functions based on button clicks
    // adds conditional alterations for transitions
    checkNavigation();

    $('#next').click(function () {
         // code for next button
        var activePage = $('.active'),
        nextPage = activePage.next('.page');

        // conditional events for certain slides.
        if (nextPage.hasClass('time_delay')){
            // this adds a delay stopping the next button from working for 2 seconds 
            advance(activePage, nextPage)
            $('.button_wrap').hide();
        
            // gives user back control after time delay
            setTimeout(function(){
                $('.button_wrap').show();
            }, 500)
            // more conditionals can go here as elifs
        } else if (nextPage.hasClass('exit_card')){
            $('#exit').show();
            advance(activePage, nextPage)

            // console.log('swoop');
        } else {
            // regular slide transition
            advance(activePage, nextPage)
            $('#exit').hide();
        }

        checkNavigation();
    });

    $('#prev').click(function () {
        //prev slide function
        var activePage = $('.active'),
        prevPage = activePage.prev('.page');

        retreat(activePage, prevPage)

        checkNavigation();
    });

    $('#restart').click(function () {
        $('#book').css('transform', 'translateY(0px)').css('transition', '.6s ease-in-out');   
        // firstPage = $('.page').first();
        $('.active').removeClass('active')
        $('.page').first().addClass('active')
        $('#restart').hide()
        checkNavigation();

    });
}


var resizeWindow = function () {
    // console.log('test')
    // would prefer something that didnt jump as much as this does during the scroll 
    // at least this keeps the viewr on ther right page
    currentWindow = $('.active').height() * parseInt($('.active').attr('data-item')-1);
    $('#book').css('transform', 'translateY(-' + currentWindow +'px)');
   
}


// loads the script duuuuuuuude
$(document).ready(function () {
    indexPages();
    navigation();
    
});

$(window).resize(function (){
    resizeWindow();
    
});






// works referenced 
// http://jsfiddle.net/794f4yvw/12/
// www.nytimes.com/interactive/2016/08/05/sports/olympics-gymnast-simone-biles.html?_r=0
