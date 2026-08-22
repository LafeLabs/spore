class GVM {       //Geometron Virtual Machine
  constructor() {

    this.action = 0o177;
    this.address = 0o220;
    this.glyph = [];
    this.svgString = "";
    this.cursorStack = [];
    
    this.hypercube = [];
    for(let index = 0; index < 1024; index++){
        this.hypercube.push([0o177]);
    }


    this.canvas = {
        "width": 200,
        "height": 200,
        "unit": 100,
        "x0": 100,
        "y0": 100,
        "theta0": -Math.PI/2,
        "viewStep":50
    };
    this.cursor = {
        "x": 100,
        "y": 100,
        "r": 100,
        "word":"",
        "theta": -Math.PI/2,
        "thetaStep": Math.PI/2,
        "scaleFactor": 2,
        "font":"Arial",
        "bezier":{
            "cpx1":0,
            "cpy1":0,
            "cpx2":0,
            "cpy2":0,
            "x2":0,
            "y2":0
        }
    };
    this.style = {
        "color0": "black",
        "color1": "black",
        "color2": "red",
        "color3": "orange",
        "color4": "yellow",
        "color5": "green",
        "color6": "blue",
        "color7": "purple",
        "fill0": "black",
        "fill1": "black",
        "fill2": "red",
        "fill3": "orange",
        "fill4": "yellow",
        "fill5": "green",
        "fill6": "blue",
        "fill7": "purple",
        "line0": 2,
        "line1": 6,
        "line2": 2,
        "line3": 2,
        "line4": 2,
        "line5": 2,
        "line6": 2,
        "line7": 2
    };
    this.robot = {};
    this.vr = {};
    this.quantum = {};
    this.synth = {};
    this.keyboard = {
        "mode":0
    };
    this.mouse = {
        "x":0,
        "y":0,
        "z":0
    }
  }
}

function saveHypercube(gvm){
    data = encodeURIComponent(JSON.stringify(gvm.hypercube,null,"    "));
    fetch('save-file.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        body: 'data=' + data + '&filename=hypercube.json'
    });
}

function importShapeStack(gvm,shapeStack){
    for(let shapeIndex = 0;shapeIndex < shapeStack.length;shapeIndex++){
        if(shapeStack[shapeIndex].length > 1){
            let glyphAddress = parseInt(shapeStack[shapeIndex].split(":")[0],8);
            let glyph = [];
            let glyphStringArray = shapeStack[shapeIndex].split(":")[1].split(",");
            for(let actionIndex = 0;actionIndex < glyphStringArray.length;actionIndex++){
                if(glyphStringArray[actionIndex].length > 1){
                    glyph.push(parseInt(glyphStringArray[actionIndex],8));
                }
            }
            gvm.hypercube[glyphAddress] = glyph;
        }
    }
}

function loadHyperCube(gvm,hypercube){
    for(let index = 0;index < hypercube.length;index++){
        gvm.hypercube[index] = hypercube[index];
    }
    return gvm;
}

function drawGlyph(canvas, gvm){

    gvm.cursor.x = gvm.canvas.x0;
    gvm.cursor.y = gvm.canvas.y0;
    gvm.cursor.r = gvm.canvas.unit;
    gvm.cursor.theta = gvm.canvas.theta0;
    gvm.cursor.scaleFactor = 2;
    gvm.cursor.thetaStep = Math.PI/2;
    gvm.svgString = "";
    gvm.cursor.word = "";
    gvm.cursorStack = [];
    
    gvm.svgString = "<svg width=\"" + gvm.canvas.width.toString() + "\" height=\"" + gvm.canvas.height.toString() + "\" viewbox = \"0 0 " + gvm.canvas.width.toString() + " " + gvm.canvas.height.toString() + "\"  xmlns=\"http://www.w3.org/2000/svg\">\n";
    gvm.svgString += "<!--<json></json>-->";
    ctx = canvas.getContext("2d");
    canvas.width = gvm.canvas.width;
    canvas.height = gvm.canvas.height;

    ctx.clearRect(0, 0, gvm.canvas.width, gvm.canvas.height);
    ctx.fillStyle = gvm.style.fill0 || "black";
    ctx.strokeStyle = gvm.style.color0 || "black";
    ctx.lineWidth = gvm.style.line0 || 2;     
    
    for(let index = 0; index < gvm.glyph.length; index++){
        geometronAction(ctx, gvm,gvm.glyph[index]);
    }
    
    gvm.svgString += "</svg>";    
}


function spellGlyph(canvas, gvm){
    gvm.canvas.x0 = 30;
    gvm.canvas.y0 = 50 + gvm.canvas.unit;
    gvm.style.line0 = 2;
    gvm.cursor.x = gvm.canvas.x0;
    gvm.cursor.y = gvm.canvas.y0;
    gvm.cursor.r = gvm.canvas.unit;
    gvm.cursor.theta = gvm.canvas.theta0;
    gvm.cursor.scaleFactor = 2;
    gvm.cursor.thetaStep = Math.PI/2;
    gvm.svgString = "";
    gvm.cursor.word = "";
    gvm.cursorStack = [];
    
    gvm.svgString = "<svg width=\"" + gvm.canvas.width.toString() + "\" height=\"" + gvm.canvas.height.toString() + "\" viewbox = \"0 0 " + gvm.canvas.width.toString() + " " + gvm.canvas.height.toString() + "\"  xmlns=\"http://www.w3.org/2000/svg\">\n";
    ctx = canvas.getContext("2d");
    canvas.width = gvm.canvas.width;
    canvas.height = gvm.canvas.height;

    ctx.clearRect(0, 0, gvm.canvas.width, gvm.canvas.height);
    ctx.fillStyle = gvm.style.fill0 || "black";
    ctx.strokeStyle = gvm.style.color0 || "black";
    ctx.lineWidth = gvm.style.line0 || 2;     
    
    for(let index = 0; index < gvm.glyph.length; index++){
        if(gvm.glyph[index] < 0o1000){
            geometronAction(ctx, gvm,gvm.glyph[index] + 0o1000);
        } else{
            geometronAction(ctx, gvm,gvm.glyph[index]);
        }
        if(gvm.cursor.x > gvm.canvas.width - gvm.canvas.unit - 10){
            gvm.cursor.x = 10;
            gvm.cursor.y += gvm.canvas.unit + 10;
        }
    }
    
    gvm.svgString += "</svg>";    
}


function rootMagic(gvm,action){
    switch (action){
        case 0o10:
            let oldGlyph = gvm.glyph;
            gvm.glyph = [];
            for(let glyphIndex = 0;glyphIndex < oldGlyph.length;glyphIndex++){
                if(oldGlyph[glyphIndex] != 0o207){
                    gvm.glyph.push(oldGlyph[glyphIndex]);
                } else{
                    gvm.glyph.pop();
                    gvm.glyph.push(0o207);
                }
            }
            break;
        case 0o11:
            gvm.glyph = [0o207];
            gvm.cursor.word = "";
            break;
        case 0o12:
            mainGVM.keyboard.mode++;
            if(mainGVM.keyboard.mode > 2){
                mainGVM.keyboard.mode = 0;
            }
            break;
        case 0o20:
            //0o20 left arrow, cursor back
            if(gvm.glyph[0] == 0o207){
                gvm.glyph = gvm.glyph.filter(cursorCode => cursorCode !== 0o207);
                gvm.glyph.push(0o207);
            } else{
                let oldGlyph = gvm.glyph;
                gvm.glyph = [];
                for(let glyphIndex = 0;glyphIndex < oldGlyph.length;glyphIndex++){
                    if(oldGlyph[glyphIndex] != 0o207){
                        gvm.glyph.push(oldGlyph[glyphIndex]);
                    } else{
                        let prevElement = gvm.glyph.pop();
                        gvm.glyph.push(0o207);
                        gvm.glyph.push(prevElement);
                    }
                }            
            }
            break;
        case 0o21:
            if(gvm.glyph.at(-1) == 0o207){
                gvm.glyph = gvm.glyph.filter(cursorCode => cursorCode !== 0o207);
                gvm.glyph.unshift(0o207);
            } else{
                let oldGlyph = gvm.glyph;
                gvm.glyph = [];
                for(let glyphIndex = 0;glyphIndex < oldGlyph.length;glyphIndex++){
                    if(oldGlyph[glyphIndex] != 0o207){
                        gvm.glyph.push(oldGlyph[glyphIndex]);
                    } else{
                        let prevElement = gvm.glyph.pop();
                        gvm.glyph.push(prevElement);
                        gvm.glyph.push(oldGlyph[glyphIndex + 1]);
                        gvm.glyph.push(0o207);
                        glyphIndex++;
                    }
                }
            }
            break;
        case 0o22:
            //move up in hypercube address
            if(gvm.address === 0o277){
               gvm.address = 0o220; 
            } else{
                gvm.address++;
            }
    
            gvm.glyph = gvm.hypercube[gvm.address];
            gvm.glyph = gvm.glyph.filter(cursorCode => cursorCode !== 0o207);
            gvm.glyph.push(0o207);
            break;
        case 0o23:
            // move down in hypercube address
            if(gvm.address === 0o220){
               for(let index = 0o277;index >= 0o220; index--){
                   if(gvm.hypercube[index].length > 0){
                        gvm.address = index;
                        break;
                   }
               }
            } else{
                gvm.address--;
            }
            gvm.glyph = gvm.hypercube[gvm.address];
            gvm.glyph = gvm.glyph.filter(cursorCode => cursorCode !== 0o207);
            gvm.glyph.push(0o207);
            break;
        case 0o24:
            if(gvm.address < 0o1000){
               gvm.address += 0o1000; 
            } else{
               gvm.address -= 0o1000; 
            }
            gvm.glyph = gvm.hypercube[gvm.address];
            gvm.glyph = gvm.glyph.filter(cursorCode => cursorCode !== 0o207);
            gvm.glyph.push(0o207);
            break;
        case 0o30:
            gvm.canvas.y0 -= gvm.canvas.viewStep;
            break;
        case 0o31:
            gvm.canvas.y0 += gvm.canvas.viewStep;
            break;
        case 0o32:
            gvm.canvas.x0 -= gvm.canvas.viewStep;
            break;
        case 0o33:
            gvm.canvas.x0 += gvm.canvas.viewStep;
            break;
        case 0o34:
            gvm.canvas.theta0 -= Math.PI/10;
            break;
        case 0o35:
            gvm.canvas.theta0 += Math.PI/10;
            break;
        case 0o36:
            gvm.canvas.unit /= 1.1; 
            gvm.canvas.x0 = 0.5*gvm.canvas.width + (gvm.canvas.x0 - 0.5*gvm.canvas.width)/1.1;
            gvm.canvas.y0 = 0.5*gvm.canvas.height + (gvm.canvas.y0 - 0.5*gvm.canvas.height)/1.1;
            break;
        case 0o37:
            gvm.canvas.unit *= 1.1; 
            gvm.canvas.x0 = 0.5*gvm.canvas.width + (gvm.canvas.x0 - 0.5*gvm.canvas.width)/1.1;
            gvm.canvas.y0 = 0.5*gvm.canvas.height + (gvm.canvas.y0 - 0.5*gvm.canvas.height)/1.1;            
            break;
            
    }
}

function geometronAction(ctx, gvm,action){
    let x2, y2, localString, localInt, pathX2, pathY2; 
    if((action >= 0o200 && action <= 0o277) || (action >= 0o1000 && action <= 0o1777) || (action >= 0o500 && action <= 0o677)){
        for(let index = 0;index < gvm.hypercube[action].length;index++){
            geometronAction(ctx, gvm,gvm.hypercube[action][index]);
        }
    }
    if(action >= 0o40 && action < 0o177){
        gvm.cursor.word += String.fromCodePoint(action);
    }
    switch (action) {
        case 0o300:
            gvm.cursor.x = gvm.canvas.x0;
            gvm.cursor.y = gvm.canvas.y0;
            gvm.cursor.r = gvm.canvas.unit;
            gvm.cursor.thetaStep = Math.PI/2;
            gvm.cursor.theta = gvm.canvas.theta0;
            gvm.cursor.scaleFactor = 2;      
            gvm.cursor.word = "";
            ctx.strokeStyle = gvm.style.color0;
            ctx.fillStyle = gvm.style.fill0;
            ctx.lineWidth = gvm.style.line0;                
            break;
        case 0o304:
            gvm.cursor.thetaStep = Math.PI/2;
            break;
        case 0o305:
            gvm.cursor.thetaStep = 2*Math.PI/5;
            break;
        case 0o306:
            gvm.cursor.thetaStep = 2*Math.PI/6;
            break;
        case 0o310:
            gvm.cursor.scaleFactor = Math.sqrt(2);
            break;
        case 0o311:
            gvm.cursor.scaleFactor = (Math.sqrt(5) + 1)/2;
            break;
        case 0o312:
            gvm.cursor.scaleFactor = Math.sqrt(3);
            break;
        case 0o313:
            gvm.cursor.scaleFactor = 2;
            break;
        case 0o314:
            gvm.cursor.scaleFactor = 3;
            break;
        case 0o315:
            gvm.cursor.scaleFactor = 1.1755705;
            break;
        case 0o316:
            gvm.cursor.scaleFactor = 5;
            break;
        case 0o320:
            ctx.strokeStyle = gvm.style.color0;
            ctx.fillStyle = gvm.style.fill0;
            ctx.lineWidth = gvm.style.line0;    
            break;
        case 0o321:
            ctx.strokeStyle = gvm.style.color1;
            ctx.fillStyle = gvm.style.fill1;
            ctx.lineWidth = gvm.style.line1;    
            break;
        case 0o322:
            ctx.strokeStyle = gvm.style.color2;
            ctx.fillStyle = gvm.style.fill2;
            ctx.lineWidth = gvm.style.line2;    
            break;
        case 0o323:
            ctx.strokeStyle = gvm.style.color3;
            ctx.fillStyle = gvm.style.fill3;
            ctx.lineWidth = gvm.style.line3;    
            break;
        case 0o324:
            ctx.strokeStyle = gvm.style.color4;
            ctx.fillStyle = gvm.style.fill4;
            ctx.lineWidth = gvm.style.line4;    
            break;
        case 0o325:
            ctx.strokeStyle = gvm.style.color5;
            ctx.fillStyle = gvm.style.fill5;
            ctx.lineWidth = gvm.style.line5;    
            break;
        case 0o326:
            ctx.strokeStyle = gvm.style.color6;
            ctx.fillStyle = gvm.style.fill6;
            ctx.lineWidth = gvm.style.line6;    
            break;
        case 0o327:
            ctx.strokeStyle = gvm.style.color7;
            ctx.fillStyle = gvm.style.fill7;
            ctx.lineWidth = gvm.style.line7;    
            break;
        case 0o330:
            gvm.cursor.x += gvm.cursor.r*Math.cos(gvm.cursor.theta);
            gvm.cursor.y += gvm.cursor.r*Math.sin(gvm.cursor.theta);    
            break;
        case 0o331:
            gvm.cursor.x -= gvm.cursor.r*Math.cos(gvm.cursor.theta);
            gvm.cursor.y -= gvm.cursor.r*Math.sin(gvm.cursor.theta);    
            break;
        case 0o332:
            gvm.cursor.x += gvm.cursor.r*Math.cos(gvm.cursor.theta - gvm.cursor.thetaStep);
            gvm.cursor.y += gvm.cursor.r*Math.sin(gvm.cursor.theta - gvm.cursor.thetaStep);    
            break;
        case 0o333:
            gvm.cursor.x += gvm.cursor.r*Math.cos(gvm.cursor.theta + gvm.cursor.thetaStep);
            gvm.cursor.y += gvm.cursor.r*Math.sin(gvm.cursor.theta + gvm.cursor.thetaStep);    
            break;
        case 0o334:
            gvm.cursor.theta -= gvm.cursor.thetaStep; // CCW
            break;
        case 0o335:
            gvm.cursor.theta += gvm.cursor.thetaStep; // CCW
            break;
        case 0o336:
            gvm.cursor.r /= gvm.cursor.scaleFactor; // -
            break;           
        case 0o337:
            gvm.cursor.r *= gvm.cursor.scaleFactor; // +
            break;
        case 0o340:
            ctx.beginPath();
            ctx.arc(gvm.cursor.x, gvm.cursor.y, ctx.lineWidth, 0, 2 * Math.PI);
            ctx.fill();	
            ctx.closePath();
            gvm.svgString += "<circle cx=\"";
            gvm.svgString += Math.round(gvm.cursor.x).toString();
            gvm.svgString += "\" cy = \"";
            gvm.svgString += Math.round(gvm.cursor.y).toString();
            gvm.svgString += "\" r = \"" + ctx.lineWidth.toString() + "\" stroke = \"" + ctx.strokeStyle + "\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" ";
            gvm.svgString += "fill = \"" + ctx.strokeStyle + "\" />\n";	    
            break;
        case 0o341:
            ctx.beginPath();
            ctx.arc(gvm.cursor.x, gvm.cursor.y, gvm.cursor.r, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();   
            gvm.svgString += "<circle cx=\"";
            gvm.svgString += Math.round(gvm.cursor.x).toString();
            gvm.svgString += "\" cy = \"";
            gvm.svgString += Math.round(gvm.cursor.y).toString();
            gvm.svgString += "\" r = \"" + gvm.cursor.r.toString() + "\" stroke = \"" + ctx.strokeStyle + "\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" ";
            gvm.svgString += "fill = \"none\" />\n";		
            break;
        case 0o342:
            ctx.beginPath();
            ctx.moveTo(gvm.cursor.x,gvm.cursor.y);
            ctx.lineTo(gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta),gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta));
            ctx.stroke();		
            ctx.closePath();    
            x2 = Math.round(gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta));
            y2 = Math.round(gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta));
            gvm.svgString += "    <line x1=\""+Math.round(gvm.cursor.x).toString()+"\" y1=\""+Math.round(gvm.cursor.y).toString()+"\" x2=\"" + x2.toString()+"\" y2=\"" + y2.toString()+"\" style=\"stroke:" + ctx.strokeStyle + ";stroke-width:" + (ctx.lineWidth).toString() + "\" />\n";
            break;
        case 0o343:
            ctx.beginPath();
            ctx.arc(gvm.cursor.x, gvm.cursor.y, gvm.cursor.r, gvm.cursor.theta - gvm.cursor.thetaStep,gvm.cursor.theta + gvm.cursor.thetaStep);
            ctx.stroke();
            ctx.closePath();
            localString = "";
            localString += "  <path d=\"";	
            localString += "M";
            localInt = gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta - gvm.cursor.thetaStep);
            localString += localInt.toString();
            localString += " ";
            localInt = gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta - gvm.cursor.thetaStep);
            localString += localInt.toString();
            gvm.svgString += localString;
            localString = "           A" + gvm.cursor.r.toString() + " " + gvm.cursor.r.toString() + " 0 0 1 ";
            localInt = gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta + gvm.cursor.thetaStep);
            localString += localInt.toString() + " ";
            localInt = gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta + gvm.cursor.thetaStep);
            localString += localInt.toString() + "\" fill = \"none\" stroke = \"" + ctx.strokeStyle + "\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" />\n";
            gvm.svgString += localString;
            break;
        case 0o344:
            // Line segment as part of path
            ctx.lineTo(gvm.cursor.x + gvm.cursor.r * Math.cos(gvm.cursor.theta), gvm.cursor.y + gvm.cursor.r * Math.sin(gvm.cursor.theta));
            ctx.stroke();		
        
            pathX2 = Math.round(gvm.cursor.x + gvm.cursor.r * Math.cos(gvm.cursor.theta));
            pathY2 = Math.round(gvm.cursor.y + gvm.cursor.r * Math.sin(gvm.cursor.theta));
            
            gvm.svgString += "L" + pathX2 + " " + pathY2 + " ";            
            break;

        case 0o345:
            //arc as part of path, to the right (CW)
            break;
        case 0o346:
            //arc as part of path, reverse direction (CCW)
            break;
        case 0o347:
            //filled circle
            ctx.beginPath();
            ctx.arc(gvm.cursor.x, gvm.cursor.y, gvm.cursor.r, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            gvm.svgString += "    <circle cx=\"";
            gvm.svgString += Math.round(gvm.cursor.x).toString();
            gvm.svgString += "\" cy = \"";
            gvm.svgString += Math.round(gvm.cursor.y).toString();
            gvm.svgString += "\" r = \"" + gvm.cursor.r.toString() + "\" stroke = \"" + ctx.strokeStyle + "\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" ";
            gvm.svgString += "fill = \"" + ctx.fillStyle + "\" />\n";
            break;
        case 0o350:
            gvm.cursor.thetaStep /= 2;  //angle/2
            break;
        case 0o351:
            gvm.cursor.thetaStep *= 2;  //angle/2
            break;
        case 0o352:
            gvm.cursor.thetaStep /= 3;  //angle/2
            break;
        case 0o353:
            gvm.cursor.thetaStep *= 3;  //angle/2
            break;
        case 0o354:
            //end a closed but not filled path
            ctx.closePath();
            ctx.stroke();		
            gvm.svgString += "Z\""+ " stroke = \"" + ctx.strokeStyle + "\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" fill = \"" + "none" + "\" "+"/>";
            break;

        case 0o360:
            //first part of bezier in middle of a path
            break;
        case 0o361:
            //end bezier path in a close path
            break;
        case 0o362:
             //start a path
            ctx.beginPath();
            ctx.moveTo(gvm.cursor.x,gvm.cursor.y);
            gvm.svgString += "	<path d = \"M";
            gvm.svgString += Math.round(gvm.cursor.x).toString() + " ";
            gvm.svgString += Math.round(gvm.cursor.y).toString() + " ";
            break;
        case 0o363:
             //terminate a closed path with fill
            ctx.closePath();
            ctx.stroke();		
            ctx.fill();		            
            gvm.svgString += "Z\""+ " stroke = \"" + ctx.strokeStyle + "\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" fill = \"" + ctx.fillStyle + "\" "+"/>";
            break;
        case 0o364:
            //terminate unfilled path
            ctx.closePath();
            gvm.svgString += "\""+ " stroke = \"" + ctx.strokeStyle + "\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" fill = \"" + "none" + "\" "+"/>";
            break;
        case 0o365:
            ctx.translate(gvm.cursor.x, gvm.cursor.y);
            ctx.rotate(-gvm.canvas.theta0 + gvm.cursor.theta);
            ctx.translate(-gvm.cursor.x, -gvm.cursor.y);
            ctx.font = gvm.cursor.r.toString(8) + "px " + gvm.cursor.font;
            ctx.fillText(gvm.cursor.word,gvm.cursor.x,gvm.cursor.y);    
            ctx.translate(gvm.cursor.x, gvm.cursor.y);
            ctx.rotate(+gvm.canvas.theta0 - gvm.cursor.theta);
            ctx.translate(-gvm.cursor.x, -gvm.cursor.y);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            gvm.svgString += "    <text x=\"";
            gvm.svgString += Math.round(gvm.cursor.x).toString();
            gvm.svgString += "\" y = \"";
            gvm.svgString += Math.round(gvm.cursor.y).toString();
            gvm.svgString += "\" fill = \"" + ctx.strokeStyle + "\""; 
            gvm.svgString += " font-size = \"";
            gvm.svgString += gvm.cursor.r + "px\"";
            gvm.svgString += " font-family = \"" + gvm.cursor.font + "\"";
            gvm.svgString += ">";
            if(gvm.cursor.word == "&"){
                gvm.cursor.word = "&amp;";
            }
            if(gvm.cursor.word == "<"){
                gvm.cursor.word = "&lt;";
            }
            if(gvm.cursor.word == ">"){
                gvm.cursor.word = "&gt;";
            }
            gvm.svgString += gvm.cursor.word;
            gvm.svgString += "</text>\n";
            gvm.cursor.word = "";
            break;
        case 0o366:
            // start a self-contained cubic Bezier path            
            ctx.beginPath();
            ctx.moveTo(Math.round(gvm.cursor.x),Math.round(gvm.cursor.y));
            gvm.cursor.bezier.cpx1 = Math.round(gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta));
            gvm.cursor.bezier.cpy1 = Math.round(gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta)); 
            gvm.svgString += "<path    d = \"M";
            gvm.svgString += (Math.round(gvm.cursor.x)).toString() + ",";
            gvm.svgString += (Math.round(gvm.cursor.y)).toString() + " C";
            gvm.svgString += gvm.cursor.bezier.cpx1.toString() + "," + gvm.cursor.bezier.cpy1.toString() + " ";
            break;
        case 0o367:
            // finish a self-contained cubic Bezier path
            gvm.cursor.bezier.x2 = Math.round(gvm.cursor.x);
            gvm.cursor.bezier.y2 = Math.round(gvm.cursor.y);
            gvm.cursor.bezier.cpx2 = Math.round(gvm.cursor.x + gvm.cursor.r*Math.cos(gvm.cursor.theta));
            gvm.cursor.bezier.cpy2 = Math.round(gvm.cursor.y + gvm.cursor.r*Math.sin(gvm.cursor.theta));
            ctx.bezierCurveTo(gvm.cursor.bezier.cpx1,gvm.cursor.bezier.cpy1,gvm.cursor.bezier.cpx2,gvm.cursor.bezier.cpy2,gvm.cursor.bezier.x2,gvm.cursor.bezier.y2);
            ctx.stroke();
            gvm.svgString += gvm.cursor.bezier.cpx2.toString() + "," + gvm.cursor.bezier.cpy2.toString() + " ";
            gvm.svgString += gvm.cursor.bezier.x2.toString() + "," + gvm.cursor.bezier.y2.toString() + "\" fill = \"none\" stroke-width = \"" + (ctx.lineWidth).toString() + "\" stroke = \"" + ctx.strokeStyle + "\" />";	
            break;
        case 0o370:
            gvm.cursorStack.push({...gvm.cursor});
            break;
        case 0o371:
            gvm.cursor = gvm.cursorStack.pop();
            break;
            
    }
}


function convertOldFormat(oldFormat){
    let inputArray = oldFormat.split(",");//take in string in old format
    let outputArray = [];
    for(let index = 0;index < inputArray.length;index++){
        if(inputArray[index].length > 1){
            outputArray.push(parseInt(inputArray[index],8));
        }
    }
    return outputArray;//return array of integers
}

