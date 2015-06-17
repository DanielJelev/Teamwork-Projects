/**
 * Created by rmn on 18.2.2015 г..
 */
(function($) {
    //initiate Skrollr
    var s = skrollr.init( {
        render: function(data) {
        }
    });

    $(document).ready(function () {

        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#scrollerToTop').fadeIn();
                $('#down-arrow').fadeOut();
            } else {
                $('#scrollerToTop').fadeOut();
                $('#down-arrow').fadeIn();
            }
        });

        $('#scrollerToTop').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1000);
            return false;
        });
        //Mobile menu open
        $('.site-nav-toggle').click(function() {
            $('#navigation-mobile').slideToggle();
            $(this).find('div:hidden').show().siblings().hide();
        });

        // Hide mobile-menu > 768
        $(window).resize(function() {
            if ($(window).width() > 768) {
                //$("#navigation-mobile").hide();
                $("#cssmenu").show();
                $(".site-nav-toggle").hide();
                $("#navigation-mobile").hide();
            }
            if ($(window).width() < 768) {
                //$("#navigation-mobile").show();
                //$(".inner").hide();
                $("#cssmenu").hide();
                $(".site-nav-toggle").show();
            }

        });

    });

       $( document ).ready(function() {
        $('#cssmenu').prepend('<div id="bg-one"></div><div id="bg-two"></div><div id="bg-three"></div><div id="bg-four"></div>');

    });
    //$("li").click(function(){
    //    // If this isn't already active
    //    if (!$(this).hasClass("active")) {
    //        // Remove the class from anything that is active
    //        $("li.active").removeClass("active");
    //        // And make this active
    //        $(this).addClass("active");
    //    }
    //});

})(jQuery);

