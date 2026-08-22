
mainGVM = new GVM();
spellGVM = new GVM(); 

audioOn = false;

function setup() {
    
    newCanvas = createCanvas(innerWidth,innerHeight);
    
    if(audioOn){
        mic = new p5.AudioIn();
        mic.start();
        fft = new p5.FFT();
        fft.setInput(mic);
        
    }

    stroke(0);
    strokeWeight(20);
    geometronGlyphCanvas = document.getElementById("geometron-glyph-canvas");
    geometronSpellCanvas = document.getElementById("geometron-spell-canvas");

    fetch('load-file.php?filename=hypercube.json')
        .then(xhr => xhr.text())
        .then(rawJSON => {
            mainGVM.canvas.width = 0.48 * innerWidth; 
            mainGVM.canvas.height = mainGVM.canvas.width;
            mainGVM.canvas.x0 = 0.5 * mainGVM.canvas.width; 
            mainGVM.canvas.y0 = 0.5 * mainGVM.canvas.height;
            mainGVM.canvas.unit = 0.1 * mainGVM.canvas.width; 
            mainGVM.style.line0 = 3;
            mainGVM.hypercube = JSON.parse(rawJSON);
            
            for(let index = 0o277;index >= 0o220; index--){
                if(mainGVM.hypercube[index].length > 0){
                    mainGVM.address = index;
                    break;
                }
            }

            spellGVM.hypercube = mainGVM.hypercube; 
            spellGVM.canvas.width = 0.48 * innerWidth; 
            spellGVM.canvas.height = 0.97 * innerHeight;
            spellGVM.canvas.unit = 30;
            spellGVM.glyph = mainGVM.glyph; 
            mainGVM.glyph = mainGVM.hypercube[mainGVM.address];
            spellGVM.glyph = mainGVM.glyph;
            mainGVM.glyph =  mainGVM.glyph.filter(item => item !== 0o207);
            spellGVM.glyph =  spellGVM.glyph.filter(item => item !== 0o207);
            mainGVM.glyph.push(0o207);
            spellGVM.glyph.push(0o207);
            drawGlyph(geometronGlyphCanvas, mainGVM);
            spellGlyph(geometronSpellCanvas, spellGVM);
            let glyphString = "";
            for(let index = 0;index < mainGVM.glyph.length;index++){
                if(mainGVM.glyph[index] != 0o207){
                    glyphString += "0" + mainGVM.glyph[index].toString(8) + ",";
                }
            }
            document.getElementById("geometron-glyph-input").value = glyphString;
            setText();
  
    });

}


inLine = false;
function draw(){

    if(audioOn){
        audio_spectrum = fft.analyze();
        nyquistFreq = sampleRate() / 2;
        spectrum_bin_frequency = nyquistFreq / (audio_spectrum.length);
        stroke(0);
        strokeWeight(1);
        noFill();
        beginShape();
        vertex(0,height);
        for (let index = 0; index < audio_spectrum.length; index++) {
            vertex(index*4, map(audio_spectrum[index], 0, 255, height, 0));
        }
        vertex(width,height);
        endShape(); 
        stroke(0);
        strokeWeight(30);        
    }
   
    fill(255);
    noStroke();     
    rect(0, 0, width, height); 

    let cellSize = 0.5*innerWidth/8;
    
    if(mouseX > 0 && mouseX < 0.5*width && mouseY > height - 2*cellSize && mouseY < height){
       if(mouseX != pmouseX || mouseY != pmouseY){
            for(let index = 0;index < 8; index++){
                strokeWeight(5);
                rect(index*cellSize,height-cellSize,cellSize,cellSize);
                rect(index*cellSize,height-2*cellSize,cellSize,cellSize);
                strokeWeight(0);
                textSize(20);
                fill(0);
                //text here
                
                noFill();
            }
            fill("#00000080");
            rect(cellSize*Math.floor(mouseX/cellSize),height - cellSize - cellSize*Math.floor((height-mouseY)/cellSize),cellSize,cellSize);
        }
    }
    
    
}

function mouseWheel(event) {
    if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height){
        if(event.delta > 0){ 
        }
        else{
        }
    }
}

function keyPressed() {
    if(document.activeElement != document.getElementById("geometron-glyph-input")){

    if ((keyIsDown(CONTROL) || keyIsDown(91)) && key === 's') {
                
        fileNameBase = "geometron-glyph-" + Math.floor(Date.now() / 1000);
        fileNameSVG = fileNameBase + ".svg";
        mainGVM.glyph = mainGVM.glyph.filter(cursorCode => cursorCode !== 0o207);
        drawGlyph(geometronGlyphCanvas, mainGVM);
        geometronJSON = {};
        geometronJSON.canvas = mainGVM.canvas;
        geometronJSON.style = mainGVM.style;
        geometronJSON.cursor = mainGVM.cursor;
        geometronJSON.glyph = mainGVM.glyph;
    
        geometronJSON.shapeStack = [];
        for(let shapeIndex = 0o220; shapeIndex < 0o240; shapeIndex++){
            if(mainGVM.hypercube[shapeIndex] && mainGVM.hypercube[shapeIndex].length > 0){
                let glyphString = "";
                glyphString += "0" + shapeIndex.toString(8) + ":";
                for(let actionIndex = 0; actionIndex < mainGVM.hypercube[shapeIndex].length; actionIndex++){
                    let actionValue = mainGVM.hypercube[shapeIndex][actionIndex];
                    if (actionValue !== undefined && actionValue !== null) {
                        glyphString += "0" + actionValue.toString(8) + ",";
                    }
                }
                geometronJSON.shapeStack.push(glyphString);
            }
        }
        for(let shapeIndex = 0o1220; shapeIndex < 0o1240; shapeIndex++){
            if(mainGVM.hypercube[shapeIndex] && mainGVM.hypercube[shapeIndex].length > 0){
                let glyphString = "";
                glyphString += "0" + shapeIndex.toString(8) + ":";
                for(let actionIndex = 0; actionIndex < mainGVM.hypercube[shapeIndex].length; actionIndex++){
                    let actionValue = mainGVM.hypercube[shapeIndex][actionIndex];
                    if (actionValue !== undefined && actionValue !== null) {
                        glyphString += "0" + actionValue.toString(8) + ",";
                    }
                }
                geometronJSON.shapeStack.push(glyphString);
            }
        }    
        mainGVM.svgString = mainGVM.svgString.split("<json>")[0] + "<json>" + JSON.stringify(geometronJSON,null,"  ") + "</json>" + mainGVM.svgString.split("</json>")[1];
    
        data = encodeURIComponent(mainGVM.svgString);
        fetch('save-file.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            body: 'data=' + data + '&filename=' + fileNameSVG
        });
        
        data = encodeURIComponent(JSON.stringify(geometronJSON,null,"    "));
        fetch('save-file.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            body: 'data=' + data + '&filename=geometron.json'
        });
    
        mainGVM.glyph.push(0o207);
        return false; 
    }

        if (key === 'Escape') {
            console.log("Escape key was pressed!");
        }
        let actionKey = null;
        if (key.length === 1) {
            actionKey = key.charCodeAt(0);
        } else {
            // Map special keys to unique integers below 32
            if (keyCode === BACKSPACE) actionKey = 0o10;  
            if (keyCode === ENTER)     actionKey = 0o12; 
            if (keyCode === LEFT_ARROW)  actionKey = 0o20;  
            if (keyCode === RIGHT_ARROW) actionKey = 0o21;  
            if (keyCode === UP_ARROW)    actionKey = 0o22;  
            if (keyCode === DOWN_ARROW)  actionKey = 0o23;
        }
        
        if(actionKey >= 0o40 && actionKey < 0o177){
            
            if(mainGVM.keyboard.mode === 0){
                if(mainGVM.hypercube[actionKey][0] < 0o40){
                    rootMagic(mainGVM,mainGVM.hypercube[actionKey][0]);
                } else{
                    let oldGlyph = mainGVM.glyph;
                    mainGVM.glyph = [];
                    for(let glyphIndex = 0;glyphIndex < oldGlyph.length;glyphIndex++){
                        if(oldGlyph[glyphIndex] != 0o207){
                            mainGVM.glyph.push(oldGlyph[glyphIndex]);
                        } else{
                                mainGVM.glyph.push(mainGVM.hypercube[actionKey][0]);
                                mainGVM.glyph.push(0o207);
                        }
                    }
                }            
            }
            if(mainGVM.keyboard.mode === 1){
                let oldGlyph = mainGVM.glyph;
                mainGVM.glyph = [];
                for(let glyphIndex = 0;glyphIndex < oldGlyph.length;glyphIndex++){
                    if(oldGlyph[glyphIndex] != 0o207){
                        mainGVM.glyph.push(oldGlyph[glyphIndex]);
                    } else{
                        mainGVM.glyph.push(actionKey + 0o1000);
                        mainGVM.glyph.push(0o207);
                    }
                }
            }
            if(mainGVM.keyboard.mode === 2){
                let oldGlyph = mainGVM.glyph;
                mainGVM.glyph = [];
                for(let glyphIndex = 0;glyphIndex < oldGlyph.length;glyphIndex++){
                    if(oldGlyph[glyphIndex] != 0o207){
                        mainGVM.glyph.push(oldGlyph[glyphIndex]);
                    } else{
                        mainGVM.glyph.push(actionKey);
                        mainGVM.glyph.push(0o207);
                    }
                }
            }
        }
        if (actionKey === 0o10) {
            //delete character before the cursor
            rootMagic(mainGVM,0o10);
        }
        if (actionKey === 0o12) {
            rootMagic(mainGVM,0o12);
    
            //ENTER key
            //mode switch from shape to font to word        
        }
        if (actionKey === 0o20) {
            //0o20 left arrow, cursor back
            rootMagic(mainGVM,0o20);
        }
        if (actionKey === 0o21) {
            //right arrow, cursor forward
            rootMagic(mainGVM,0o21);
        }
        if (actionKey === 0o22) {
            //up arrow, move up in hypercube
            rootMagic(mainGVM,0o22);
        }
        if (actionKey === 0o23) {
            //down arrow,move down in hypercube
            rootMagic(mainGVM,0o23);
        }
        

        mainGVM.glyph = mainGVM.glyph.filter(item => item !== null);

        spellGVM.glyph = mainGVM.glyph; 
        
        drawGlyph(geometronGlyphCanvas, mainGVM);
        spellGlyph(geometronSpellCanvas, spellGVM);
        
        setText();
        saveHypercube(mainGVM);
        mainGVM.hypercube[mainGVM.address] = mainGVM.glyph.filter(cursorCode => cursorCode !== 0o207);
        let glyphString = "";
        for(let index = 0;index < mainGVM.glyph.length;index++){
            if(mainGVM.glyph[index] != 0o207 && mainGVM.glyph[index] != null){
                glyphString += "0" + mainGVM.glyph[index].toString(8) + ",";
            }
        }
        document.getElementById("geometron-glyph-input").value = glyphString;
    }
}


window.addEventListener('DOMContentLoaded', () => {
    // This code waits until the HTML is fully ready
    document.getElementById("geometron-glyph-input").onchange = function(){

        let importGlyph = [];
        let commaSplit = this.value.split(",");
        for(let index = 0;index < commaSplit.length;index++){
            if(commaSplit[index].length > 1){
                importGlyph.push(parseInt(commaSplit[index] ,8));
            }
        }
        mainGVM.hypercube[mainGVM.address] = importGlyph;
        importGlyph.push(0o207);
        mainGVM.glyph = importGlyph;
        spellGVM.glyph = mainGVM.glyph; 
        drawGlyph(geometronGlyphCanvas, mainGVM);
        spellGlyph(geometronSpellCanvas, spellGVM);

    };
});


function mouseClicked() {

    
}

function setText(){
    ctx = document.getElementById("geometron-spell-canvas").getContext("2d");
    ctx.font = '30px Arial';

    if(mainGVM.keyboard.mode === 0){
        ctx.fillText("geometry mode",0.5*ctx.canvas.width,30);
    }
    if(mainGVM.keyboard.mode === 1){
        ctx.fillText("font mode",0.5*ctx.canvas.width,30);
    }
    if(mainGVM.keyboard.mode === 2){
        ctx.fillText("word mode",0.5*ctx.canvas.width,30);
    }

    let spellStatusX = 10;
    let spellStatusY = 38;
    ctx.font = '40px Arial';
    ctx.fillText("0" + mainGVM.address.toString(8),0.25*ctx.canvas.width - 40,40);

    switch (mainGVM.address){
        case 0o220:
            ctx.fillText("Q:",spellStatusX,spellStatusY);
            break;
        case 0o221:
            ctx.fillText("W:",spellStatusX,spellStatusY);
            break;
        case 0o222:
            ctx.fillText("E:",spellStatusX,spellStatusY);
            break;
        case 0o223:
            ctx.fillText("R:",spellStatusX,spellStatusY);
            break;
        case 0o224:
            ctx.fillText("T:",spellStatusX,spellStatusY);
            break;
        case 0o225:
            ctx.fillText("Y:",spellStatusX,spellStatusY);
            break;
        case 0o226:
            ctx.fillText("U:",spellStatusX,spellStatusY);
            break;
        case 0o227:
            ctx.fillText("I:",spellStatusX,spellStatusY);
            break;
        case 0o230:
            ctx.fillText("A:",spellStatusX,spellStatusY);
            break;
        case 0o231:
            ctx.fillText("S:",spellStatusX,spellStatusY);
            break;
        case 0o232:
            ctx.fillText("D:",spellStatusX,spellStatusY);
            break;
        case 0o233:
            ctx.fillText("F:",spellStatusX,spellStatusY);
            break;
        case 0o234:
            ctx.fillText("G:",spellStatusX,spellStatusY);
            break;
        case 0o235:
            ctx.fillText("H:",spellStatusX,spellStatusY);
            break;
        case 0o236:
            ctx.fillText("J:",spellStatusX,spellStatusY);
            break;
        case 0o237:
            ctx.fillText("K:",spellStatusX,spellStatusY);
            break;
    
    }       
}
