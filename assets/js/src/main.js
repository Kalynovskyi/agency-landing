(function ($) {
    'use strict';

    
    const slider = () => {
        let slider = $('.slider');

        const moveStage = (props) => {
            let stagePosition = props.slider.data('stagePosition') - ((props.itemWidth + parseInt($(props.sliderItems[0]).css('margin-right')) * 2) * props.direction) ;
            props.slider.data('stagePosition', stagePosition)
            props.sliderStage.css('transform', 'translateX(' + stagePosition + 'px)');
        }

        const getTransformValues = (element) => {
            var matrix = element.css('transform').replace(/[^0-9\-.,]/g, '').split(',');
            var x = matrix[12] || matrix[4];
            return x ? x : 0;
        }

        const isSliderInFrame = (props) => {
            let firstItemPosition = $(props.sliderItems[0]).offset().left;
            let lastItemPosition = $(props.sliderItems[props.sliderItems.length - 1]).offset().left + $(props.sliderItems[props.sliderItems.length - 1]).width(); 
            
            if ($(props.event.currentTarget).hasClass('next')) {

                if (firstItemPosition < props.sliderPosition.left && lastItemPosition >= props.sliderPosition.right) {
                    console.log(1);
                    return true;
                } else if (firstItemPosition >= props.sliderPosition.left && lastItemPosition >= props.sliderPosition.right) {
                    console.log(2);
                    return true;
                } else {
                    console.log(3);
                    return false;
                }
            } else {
                if (firstItemPosition < props.sliderPosition.left && lastItemPosition >= props.sliderPosition.right) {
                    console.log(1);
                    return true;
                } else if (firstItemPosition <= props.sliderPosition.left && lastItemPosition <= props.sliderPosition.right) {
                    console.log(2);
                    return true;
                } else {
                    console.log(3);
                    return false;
                }
            }
        }

        //Main loop
        slider.each(function(){
            let $this = $(this);
            let navPrev = $this.find('.slider-nav-button.prev');
            let navNext = $this.find('.slider-nav-button.next');
            let sliderStage = $this.find('.slider-stage'); 
            let sliderItems = sliderStage.find('.slider-item');
            let itemWidth = sliderItems.outerWidth();
            let sliderPosition = {left: $this.offset().left, right: $this.offset().left + $this.width()}
            $this.data('stagePosition', getTransformValues(sliderStage));

            navPrev.on('click', function(event){
                let props = {
                    slider: $this,
                    sliderStage: sliderStage,
                    sliderItems: sliderItems,
                    sliderPosition: sliderPosition,
                    direction: -1,
                    itemWidth: itemWidth,
                    event: event,
                };

                let inFrame = isSliderInFrame(props);

                if (inFrame) {
                    moveStage(props);
                }
            });

            navNext.on('click', function(event){
                
                let props = {
                    slider: $this,
                    sliderStage: sliderStage,
                    sliderItems: sliderItems,
                    sliderPosition: sliderPosition,
                    direction: 1,
                    itemWidth: itemWidth,
                    event: event,
                };

                let inFrame = isSliderInFrame(props);
                
                if (inFrame) {
                    moveStage(props);
                }
            });

        });
    }

    const navigationScroll = () => {
        const menuLink = $('.menu-item > a');

        menuLink.on('click', function(e){
            e.preventDefault();

            let destination =$(''+$(this).attr('href')+'') 

            $('html,body').animate({scrollTop: destination.offset().top},'slow');

            console.log(destination);
        });
    }

    const mobileMenu = () => {
        const menuHolder = $('.menu-holder');

        $('.menu-hamburger, .mobile-menu-overlay').on('click', function(){
            menuHolder.toggleClass('active');
        });
    }

    const map = () => {

        (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
            key: 'Your_API_key',
            v: "weekly",

        });

        let map;

        async function initMap() {

            const position = { lat: 32.426408, lng: -95.834312 };

            const { Map } = await google.maps.importLibrary("maps");

            map = new Map(document.getElementById("map"), {
                zoom: 8,
                center: position,
                mapId: "DEMO_MAP_ID",
            });
        }

        initMap();
    }

    $(window).on("load", function() {
        slider();
        navigationScroll();
        mobileMenu();
        map();
    });

    $(window).on("resize", function() {
        slider();
        mobileMenu();
    });

})(jQuery);

// const Slider = () => {
//     let slider = document.getElementsByClassName('slider');

//     for (var i = 0; i < slider.length; i++) {
//         console.log(slider[i]);

//     }

// }

// Slider();