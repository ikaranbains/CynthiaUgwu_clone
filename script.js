const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function firstPageAnim() {
    const tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: '0',
            duration: 2,
            delay: -1,
            ease: Expo.easeInOut,
            stagger: .2
        })
        .from("#footer", {
            y: '-10',
            opacity: 0,
            duration: 1.5,
            ease: Expo.easeInOut,
            delay: -1
        })
}

// to store the setTimeout function
var timeout;

function circleSkewer() {
    //define default values of scale
    var xscale = 1;
    var yscale = 1;

    //define initial values for previous position of mouse
    var xprev = 0;
    var yprev = 0;

    // add an Event Listener on window
    window.addEventListener("mousemove", function (dets) {
        // this will clear the previous timeouts if the mouse moves again before even the execution of setTieouot()
        clearTimeout(timeout);

        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientX - yprev;

        //store the previous position of mouse in xprev and yprev
        xprev = dets.clientX;
        yprev = dets.clientY;

        //clamping the diff and storing it in xscale and yscale
        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, ydiff);

        //connecting the scaled values to our mouse follower
        //sending the scaled values to circleMouseFollower() function
        circleMouseFollower(xscale, yscale);

        // setTimeout function to scale the mouse following circle back to normal
        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}




function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    });
}
circleMouseFollower();
firstPageAnim();
circleSkewer();


// to display image when mouse is moved(hover) over the div(elem)
document.querySelectorAll(".elem").forEach(function (elem) {

    // initializing the variables which will store the rotation values.
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        // now to remove img on mouseleave
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5
        });

    });

    elem.addEventListener("mousemove", function (dets) {

        // difference of mouse position from window top - top position of div(elem
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        // now to add img in place of clientX and clientY
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
        });

    });

});