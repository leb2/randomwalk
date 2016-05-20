/*globals $:false */

(function() {
    'use strict';

    // Declares if mouse is down
    var down = false;
    $(document).mousedown(function() {
        down = true;
    }).mouseup(function() {
        down = false;
    });

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var x, y, mouseX, mouseY;

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    var color = $('.color.selected').css('background-color');

    $('.color').click(function() {
        $('.color').removeClass('selected');
        $(this).addClass('selected');
        color = $(this).css('background-color');
    });

    function onMouseUpdate(e) {
        mouseX = e.pageX - canvas.offsetLeft;
        mouseY = e.pageY - canvas.offsetTop;
    }

    function doMouseDown(e) {
        x = e.pageX - canvas.offsetLeft;
        y = e.pageY - canvas.offsetTop;
        var timer = setInterval(function() {
            if (!down) {
                clearInterval(timer);
            }
            for (var i = 0; i < 300; i++) {
                draw();
            }
        }, 1);
    }

    function draw() {
        var diffX = mouseX - x;
        var diffY = mouseY - y;

        var chanceX = Math.abs(2 / (1 + Math.pow(Math.E, -diffX / 1400)) - 1);
        var chanceY = Math.abs(2 / (1 + Math.pow(Math.E, -diffY / 1400)) - 1);

        if (Math.random() <= chanceX) {
            x += Math.sign(diffX);
            console.log(Math.sign(diffX));
        } else {
            x += Math.floor(Math.random() * 3) - 1;
        }
        if (Math.random() <= chanceY) {
            y += Math.sign(diffY);
        } else {
            y += Math.floor(Math.random() * 3) - 1;
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.05;

        ctx.fillRect(x, y, 1, 1);
    }

    canvas.addEventListener('mousedown', doMouseDown, false);
    canvas.addEventListener('mousemove', onMouseUpdate, false);
})();
