 function PageScroll(el) {
            var prevTime = new Date().getTime(), maxCounter = el.getElementsByClassName('slides').length - 1, counter = 0, transitionTime = 300,
            startX, startY, scrollings = [], isMoving = false;

            var methods = {
                init: function () {

                },

                bindMousewheel: function () {
                    el.addEventListener("mousewheel", methods.MouseWheelHandler, false);
                    el.addEventListener("DOMMouseScroll", methods.MouseWheelHandler, false);
                    document.addEventListener('keydown', methods.keypush, false);
                },
                sliderMove: function (t, dir) {
                    if (dir < 0) {

                        if (counter < maxCounter) {
                            if (counter>0){

                            }
                            document.getElementById('slide-' + counter).classList.remove('active');       
                            counter++;
                            el.getElementsByClassName('slides')[counter].style.top = '0';
                            document.getElementById('slide-' + counter).classList.add('active');       
                        }

                        else {
                            document.getElementById('main').classList.add('move');
                        }
                    }
                    else {
                        if (counter > 0) {
                            document.getElementById('slide-' + counter).classList.remove('active');
                            document.getElementById('main').classList.remove('move');
                            el.getElementsByClassName('slides')[counter].style.top = '100%';  
                            counter--;
                            document.getElementById('slide-' + counter).classList.add('active'); 
                            
                        }

                    }

                },

                bindmenu: function (e) {


                },

                touchStart: function (e) {
                    var touchobj = e.changedTouches[0];
                    dist = 0;
                    startX = touchobj.pageX;
                    startY = touchobj.pageY;
                    startTime = new Date().getTime();
                },
                touchMove: function (e) {
                    e.preventDefault();
                },
                touchEnd: function (e) {
                    var touchobj = e.changedTouches[0];
                    elapsedTime = new Date().getTime() - startTime;
                    var dis = touchobj.pageY - startY;

                    if (Math.abs(dis) > 50) {
                        if (!isMoving) {
                            methods.movetosection(transitionTime, Math.max(-1, Math.min(1, touchobj.pageY - startY)));
                        }
                    }

                },
                addTouch: function (e) {
                    el.addEventListener('touchstart', methods.touchStart, false);
                    el.addEventListener('touchmove', methods.touchMove, false);
                    el.addEventListener('touchend', methods.touchEnd, false);
                },
                removeTouch: function (e) {
                    el.removeEventListener('touchstart', methods.touchStart, false);
                    el.removeEventListener('touchmove', methods.touchMove, false);
                    el.removeEventListener('touchend', methods.touchEnd, false);
                },
                getAverage: function (elements, number) {
                    var sum = 0;
                    var lastElements = elements.slice(Math.max(elements.length - number, 1));
                    for (var i = 0; i < lastElements.length; i++) {
                        sum = sum + lastElements[i];
                    }
                    return Math.ceil(sum / number);
                },
                MouseWheelHandler: function (e) {

                    if (window.scrollY == 0) {

                        var e = e || window.event,
                          value = e.wheelDelta || -e.deltaY || -e.detail,
                          delta = Math.max(-1, Math.min(1, value));
                        var curTime = new Date().getTime();
                        var timeDiff = curTime - prevTime;
                        prevTime = new Date().getTime();

                        if (timeDiff > 100) {
                            e.preventDefault ? e.preventDefault() : e.returnValue = false;
                            methods.sliderMove(transitionTime, delta)
                        }
                    
                    }
                },

            };

            methods.init();
            methods.bindMousewheel();
            methods.addTouch();
        }
$( document ).ready(function() {
    $( "#hamburger" ).hide();
    $( "#mobile_menu" ).click(function() {
        $( "#hamburger" ).slideToggle( "slow", function() {});
    });
});