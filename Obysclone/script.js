gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();



function loaderanimation(){
    var tl=gsap.timeline();
    var count=0;
    tl.from('#loader #text .tx h1, #loader #bottom h5',{
        y:100,
        opacity:0.2,
        duration:0.6,
        stagger:0.3,
        delay:0.5,
        onStart:function(){
            var ab=setInterval(function(){
                count++;
                document.querySelector('#loader #text #counter #number').textContent=count;
                if(count==100) clearInterval(ab);
            },20)
        },
    })
    gsap.from('#loader #text #counter',{
        opacity:0,
        delay:0.5,
    }) 

    tl.to("#loader #text, #loader #bottom",{
        delay:2,
        duration:0.36,
        opacity:0
    })
    tl.to("#loader",{
        display:"none",
    })
    tl.from('#page1',{
        y:800,
        duration:0.5,
        onStart:function(){
            gsap.from("#main #page1 h1",{
                y:100,
                duration:0.3,
                stagger:0.3,
                onStart:function(){
                    gsap.from("#main #page1 h2",{
                        delay:0.6,
                        y:100,
                        duration:0.3,
                    })
                },
            })
        },
    })
   
   
}

function curseranimation(){
const main = document.getElementById('main');
const cursor = document.getElementById('cursor');

main.addEventListener('mousemove', (event) => {
            const x = event.clientX;
            const y = event.clientY;
            cursor.style.transform = `translate(${x}px, ${y}px)`;
        });

}


function playmove() {
    const videoContainer = document.getElementById('video-container');
    const videoCursor = document.getElementById('video-cursor');

    videoContainer.addEventListener('mousemove', function (ev) {
        const rect = videoContainer.getBoundingClientRect();
        const x = ev.clientX - 3*rect.left;
        const y = ev.clientY - rect.top;
        
        gsap.to(videoCursor, { x: x, y: y, duration: 0.2, ease: "power2.out" });
    });
}

function headanime(){
    gsap.from("#main #part2 .brand__svg,#main #part2 .menu-opener__square",{
        delay:4.8,
        duratiom:0.6,
        opacity:0,
    })
}

function headingp4(){
    gsap.from("#page4 #heading h1,#page4 #number h3",{
        y:140,
        duration:0.5,
        delay:0.2,
        scrollTrigger:{
            scroller:"#main",
            trigger:"#page4 #heading",
            scrub:true,
            start:"top 97%",
            end:"top 80%"
        },
        onStart:function(){
            gsap.from("#page4 #line",{
                width:"40vw",
                duration:0.6,
                delay:0.2
            })
        }
    });
}

function headingp3(){
    gsap.from("#page3 #heading h1 ,#page3 #number h3",{
        y:100,
        scrollTrigger:{
            scroller:"#main",
            trigger:"#page3",
            scrub:true,
            start:"top 100%",
            end:"top 90%"
        },
        onStart:function(){
            gsap.from("#page3 #line",{
                width:"40vw",
                duration:0.6,
                
                delay:0.2
            })
        }
    });
}


function sheryAnimation(){
    Shery.imageEffect(".box #img",{
        style:5,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8291721555308258},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.4,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        gooey:true,
    })
}

function videoplayer(){
    var playing=false;
document.querySelector("#page2 #video-container").addEventListener('click',function(){
   if(playing){
        // document.querySelector("#page2 #video-container video").muted=true;
        document.querySelector("#page2 #video-container video").pause();
        document.querySelector("#page2 #video-container img").style.display="initial";
        playing=false;
        document.querySelector("#page2 #video-cursor").style.scale=1;
        document.querySelector("#page2 #video-cursor").style.display="flex";
        document.querySelector("#page2 #video-cursor #play").style.display="initial";
        document.querySelector("#page2 #video-cursor #pause").style.display="none";
    }
    else if(!playing){
        document.querySelector("#page2 #video-container video").muted=false;
        document.querySelector("#page2 #video-container video").play();
        document.querySelector("#page2 #video-container video").loop=true;
        document.querySelector("#page2 #video-container img").style.display="none";
        playing=true;
        document.querySelector("#page2 #video-cursor").style.scale=0.6;
        document.querySelector("#page2 #video-cursor #play").style.display="none";
        document.querySelector("#page2 #video-cursor #pause").style.display="initial";
    }
})


document.querySelector("#page2 #video-container").addEventListener("mouseenter",function(){
    document.querySelector("#cursor").style.display="none";
})
document.querySelector("#page2 #video-container").addEventListener("mouseleave",function(){
    document.querySelector("#cursor").style.display="initial";

})

}
curseranimation();
loaderanimation();
headanime();
playmove();
videoplayer();
headingp3();
headingp4();
sheryAnimation();


