$(document).ready(function(){

    /* Scroll hire me button to contact page */
	$('.contact').click(function(){
		    $('html, body').animate({
        		scrollTop: $( $(this).attr('href') ).offset().top
    		}, 750,'easeInOutCubic');
    	return false;
	});

	$('.scroll-up').click(function(){
		    $('html, body').animate({
        		scrollTop: $( $(this).attr('href') ).offset().top
    		}, 750,'easeInOutCubic');
    	return false;
	});

    /*************************************/

    /* For Bootstrap current state on portfolio sorting */
    $('ul.nav-pills li a').click(function (e) {
        $('ul.nav-pills li.active').removeClass('active')
        $(this).parent('li').addClass('active')
    })

    /*************************************/

    /* Closes Nav dropdown menu when a link is pressed */
    function CloseNav() {
        $(".navbar-collapse").stop().css({ 'height': '1px' }).removeClass('in').addClass("collapse");
        $(".navbar-toggle").stop().removeClass('collapsed');
    }

    $('html').click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("navbar-collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            CloseNav();
        }

    });

    /*************************************/

    /* Initialize individual pie charts as they come into view */
    $('.chart').waypoint(function() {
        $(this).easyPieChart({
            barColor: '#3498db',
            size: '150',
            easing: 'swing',
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
			}
        });
    }, {
      triggerOnce: true,
      offset: 'bottom-in-view'
    });

    /*************************************/

    /* Changes Portfolio filter list elements into dropdown menu */
    var changeClass = function (r,className1,className2) {
        var regex = new RegExp("(?:^|\\s+)" + className1 + "(?:\\s+|$)");
        if( regex.test(r.className) ) {
            r.className = r.className.replace(regex,' '+className2+' ');
        }
        else{
            r.className = r.className.replace(new RegExp("(?:^|\\s+)" + className2 + "(?:\\s+|$)"),' '+className1+' ');
        }
        return r.className;
    };

    /* Creating our button for smaller screens */
    var menuElements = document.getElementById('grid-controls-wrapper');
    menuElements.insertAdjacentHTML('afterBegin','<button type="button" id="menutoggle" class="navtoogle btn btn-toggle" aria-hidden="true"><i class="fa fa-bars"></i> Projects</button>');

    /* Toggle the class on click to show / hide the menu */
    document.getElementById('menutoggle').onclick = function() {
        changeClass(this, 'navtoogle active', 'navtoogle');
    }

    /* document click to hide the menu */
    document.onclick = function(e) {
        var mobileButton = document.getElementById('menutoggle'),
            buttonStyle =  mobileButton.currentStyle ? mobileButton.currentStyle.display : getComputedStyle(mobileButton, null).display;

        if(buttonStyle === 'block' && e.target !== mobileButton && new RegExp(' ' + 'active' + ' ').test(' ' + mobileButton.className + ' ')) {
            changeClass(mobileButton, 'navtoogle active', 'navtoogle');
        }
    }

    /*************************************/

    /* Portfolio MixItUp Initialization */
	$( '.grid-wrapper' ).mixitup( {
		targetSelector: '.mix',	// Class required on each portfolio item
		filterSelector: '.filter', // Class required on each filter link
		easing: 'snap'
	} );

    /*************************************/

    /* Magnific Popup */
    $('.grid-wrapper').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true,
            navigateByImgClick: true
        },
        enableEscapeKey: true,
        image: {
            verticalFit: true
        },
        retina: {
            ratio: 2, // Increase this number to enable retina image support.
            // Image in popup will be scaled down by this number.
            // Option can also be a function which should return a number (in case you support multiple ratios). For example:
            // ratio: function() { return window.devicePixelRatio === 1.5 ? 1.5 : 2  }

            replaceSrc: function(item, ratio) {
                return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
            } // function that changes image source
        },
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
            beforeOpen: function() {
                // a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        }
    });

    /*************************************/

    /* Generate hi-res thumbs for any device with a pixel density ratio greater than 1 */
	if (window.devicePixelRatio > 1) {

          var images = $("img.hires");

          // loop through the images and make them hi-res
          for(var i = 0; i < images.length; i++) {

            // create new image name
            var imageType = images[i].src.substr(-4);
            var imageName = images[i].src.substr(0, images[i].src.length - 4);
            imageName += "@2x" + imageType;

            //rename image
            images[i].src = imageName;
          }
     }

    /*************************************/

    /* Sticky menu */
    $(".navbar").sticky({topSpacing: 0});

    /*************************************/

    /* Scroll spy and scroll filter */
    $('#main-menu').onePageNav({
        currentClass: "active",
        changeHash: false,
        scrollThreshold: 0.3,
        scrollSpeed: 750,
        filter: "",
        easing: "easeInOutCubic"
     });

    /*************************************/

    /* Vegas Home Slider */
    $.vegas('slideshow', {
            backgrounds:[
                { src:'img/slider/01.jpg', fade:1000 },
                { src:'img/slider/02.jpg', fade:1000 },
                { src:'img/slider/03.jpg', fade:1000 },
                { src:'img/slider/04.jpg', fade:1000 }
            ],
            loading: false
        })('overlay', {
            src:'img/overlays/16.png'
        });
        $( "#vegas-next" ).click(function() {
            $.vegas('next');
        });
        $( "#vegas-prev" ).click(function() {
            $.vegas('previous');
    });
});