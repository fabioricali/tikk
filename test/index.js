if (typeof process === 'object') {
    global.tikk = require('../src/tikk');
}

describe('tikk', function () {

    it('play with 1800 duration', function (done) {
        const anim = new tikk((offset, elapsed)=>{
            //console.log(offset, elapsed);
        }, 1800);

        anim.play();

        anim.on('stop', (elapsed)=>{
            console.log('stop', 'at', elapsed);
            done();
        });

    });

    it('play, stop after 1800', function (done) {
        const anim = new tikk((offset, elapsed)=>{
            console.log(offset, elapsed);
        });

        anim.play();

        anim.on('stop', (elapsed)=>{
            console.log('stop', 'at', elapsed);
            done();
        });

        setTimeout(() => {
            anim.stop();
        }, 1800);

    });

    it('play, pause, play duration 1800', function (done) {
        const anim = new tikk((offset, elapsed)=>{
            //console.log(offset, elapsed);
        }, 1800);

        anim.play();

        anim.on('stop', (elapsed)=>{
            console.log('stop', 'at', elapsed);
            done();
        });

        setTimeout(() => {
            anim.pause();
        }, 600);

        setTimeout(() => {
            anim.play();
        }, 1000);

    });

    it('play, stop, play duration 1800', function (done) {
        this.timeout(5000);
        const anim = new tikk((offset, elapsed)=>{
            //console.log(offset, elapsed);
        }, 1800);

        anim.on('play', ()=>{
            console.log('play');
        });

        anim.on('stop', (elapsed)=>{
            console.log('stop', 'at', elapsed);
            if(elapsed >= 1800)
                done();
        });

        anim.play();

        setTimeout(() => {
            anim.stop();
        }, 600);

        setTimeout(() => {
            console.log(anim.elapsed);
            anim.play();
        }, 1000);

    });
});