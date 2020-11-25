
//== Slider Card moduleCards-1
new Glider(document.querySelector('.cardGlider1'), {
    slidesToShow: 1.1,
    slidesToScroll: 1,
    dots: '#dots-cards',
    arrows: {
        prev: '.prev-cards1',
        next: '.next-cards1'
    },
    responsive: [{
        breakpoint: 750,
        settings: {
            slidesToShow: 2.5,
        }
    }]
});
//======================== /Slider Card moduleCards-1


//== Slider Card moduleCards-1
new Glider(document.querySelector('.cardGlider2'), {
    slidesToShow: 1.1,
    slidesToScroll: 1,
    dots: '#dots-cards',
    arrows: {
        prev: '.prev-cards2',
        next: '.next-cards2'
    },
    responsive: [{
        breakpoint: 750,
        settings: {
            slidesToShow: 2.5,
        }
    }]
});
//======================== /Slider Card moduleCards-2


//== Slider Card moduleCards-3
new Glider(document.querySelector('.cardGlider3'), {
    slidesToShow: 1.1,
    slidesToScroll: 1,
    dots: '#dots-cards',
    arrows: {
        prev: '.prev-cards3',
        next: '.next-cards3'
    },
    responsive: [{
        breakpoint: 750,
        settings: {
            slidesToShow: 2.5,
        }
    }]
});
//======================== /Slider Card moduleCards-1


//== Slider Card moduleReviews-2
new Glider(document.querySelector('.glider-reviews'), {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: '#dots-cards',
    arrows: {
        prev: '.prev-reviews',
        next: '.next-reviews'
    },
    responsive: [{
        breakpoint: 750,
        settings: {
            slidesToShow: 2,
        }
    }]
});
//======================== /Slider Card moduleReviews-2


//== /Accordion Module
let accTitle = document.getElementsByClassName("acc-heading");
let accContent = document.getElementsByClassName("acc-content");
let singleMode = true;

for( let j=0; j<accContent.length; j++ ){
    let realHeight = accContent[j].offsetHeight;
    accContent[j].setAttribute("data-height", realHeight + "px");
    accContent[j].style.height = 0;
}

for( let i=0; i<accTitle.length; i++ ){
    accTitle[i].onclick = function(){
        let openedAcc = this.getAttribute('href').replace('#', '');

        if( this.classList.contains("active") ){
            this.classList.remove("active");
            document.getElementById(openedAcc).style.height = 0;
            
            return false;
        }
        
        if( singleMode ){						
            for(let k=0; k<accTitle.length; k++) {
                accTitle[k].classList.remove("active");
            }			


            for(let j=0; j<accContent.length; j++) {
                accContent[j].style.height = 0;
            }		
        }
        
        this.classList.add("active");
        
        
        
        document.getElementById(openedAcc).style.height = accContent[i].getAttribute("data-height");
        
        return false;
    }
}
//======================== /Accordion Module


//== Modal Toggle
function modalSampleToggle() {
    document.getElementById('modalSample').classList.toggle('open');
    document.getElementById('inv-modal').classList.toggle('open');
    document.getElementById('body').classList.toggle('scrollhidden');
}
// Select all the elements with example class.
var modalSample = document.querySelectorAll('.modalcta');
// Loop through the elements.
for (var i = 0; i < modalSample.length; i++) {
// Add the class margin to the individual elements.
modalSample[i].addEventListener('click', modalSampleToggle);
}
//------------------------ Modal Header

new ClipboardJS('.btn-copy');

//== Anchor Scrollsmooth
// Vanilla JavaScript Scroll to Anchor @ https://perishablepress.com/vanilla-javascript-scroll-anchor/
(function() {
    
    function scrollTo() {
        const links = document.querySelectorAll('.cardslink');
        links.forEach(each => (each.onclick = scrollAnchors));
    }

    function scrollAnchors(e, respond = null) {
        const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
        e.preventDefault();
        var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
        const targetAnchor = document.querySelector(targetID);
        if (!targetAnchor) return;
        const originalTop = distanceToTop(targetAnchor);
        window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
        const checkIfDone = setInterval(function() {
            const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
            if (distanceToTop(targetAnchor) === 0 || atBottom) {
                targetAnchor.tabIndex = '-1';
                targetAnchor.focus();
                window.history.pushState('', '', targetID);
                clearInterval(checkIfDone);
            }
        }, 150);
    }

	scrollTo();
})();

//======================== /Anchor Scrollsmooth