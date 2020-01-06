import * as joint from "jointjs";
import RF_Port from "./RF_Port";
import CPRI_Port from "./CPRI_Port";
import GlobalScope from "./GlobalScope";

class RRU {
    constructor(x, y, w, h, data) {
        this.typename = "RRU";
        this.posX = x;
        this.posY = y;
        this.widthperport = w;
        this.height = h;
        this.sector = data.sector;
        this.nodebname = data.nodeB;
        this.cabinet = data.cn;
        this.subrack = data.srn;
        this.slot = data.sn;
        this.type = data.name;
        this.serialnumber = data.serialNumber;
        this.model = data.model;
        this.txrx = "?";
        this.numrfports = data.rfPorts.length;
        this.width = this.numrfports * this.widthperport;
        this.frequency = data.frequencies;
        this.color = "#dddddd";
        this.tooltiptext = "";
        this.CPRI_Ports = [];
        this.RF_Ports = [];
        this.drawing;
        this.Build(data);
    }
    Build(data) {
        this.BuildRRU_Board();
        this.BuildCpriPorts();
        this.BuildRfPorts(data.rfPorts);
        this.BuildToolTip();
    }
    BuildToolTip() {
        this.tooltiptext = this.type + "\n"
            + "Model: " + this.model + "\n"
            + "Serial Number: " + this.serialnumber + "\n"
            + "Position: CN: " + this.cabinet + " SRN: " + this.subrack + " SN: " + this.slot + "\n"
            + "NodeB: " + this.nodebname + "\n"
            + "Frequency: " + this.frequency + "\n";
        this.drawing.attr('body/title', this.tooltiptext);
        this.drawing.attr('label/title', this.tooltiptext);
    }
    BuildRRU_Board() {
        this.drawing = new joint.shapes.standard.Rectangle();
        this.drawing.position(this.posX, this.posY);
        this.drawing.resize(this.width, this.height, 40);
        this.drawing.attr({
            body: {
                fill: '#dddddd',
                strokeWidth: 1,
                cursor: 'pointer'
            },
            label: {
                text: this.type,
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                refX: '50%',
                refY: '50%',
                fontSize: 9,
                cursor: 'pointer'
            }
        });
        this.drawing.addTo(GlobalScope.ebpGraph);
        this.drawing.userclass = this;
    }
    BuildCpriPorts() {
        for (var i = 0; i < 2; i++) {
            var p = this.GetCpriPortPosition(i);
            var cp = new CPRI_Port(this.posX + p[0], this.posY + p[1], p[2], p[3], this.nodebname, this.cabinet, this.subrack, this.slot, i, "", "");
            //this.drawing.embed(cp.drawing);
            this.CPRI_Ports.push(cp);
        }
    }
    BuildRfPorts(rfports) {
        for (var i = 0; i < rfports.length; i++) {
            var p = this.GetRfPortPosition(i);
            var tma = rfports[i].tmaPower;
            var usage = rfports[i].tmaPower.usage;
            var sector = rfports[i].sectors;
            var cell = rfports[i].cells;
            var cp = new RF_Port(this.posX + p[0], this.posY + p[1], p[2], p[3], "", this.nodebname, this.cabinet, this.subrack, this.slot, i, sector, cell, tma, usage, this.frequency);
            this.RF_Ports.push(cp);
        }
    }
    GetCpriPortPosition(pn, boardtype) {
        var w = 10;
        var h = 6;
        var gap = (this.width - w * 2) / 3;
        return ([(gap * (pn + 1)) + (w * pn), this.height-h, w, h]);
    }
    GetRfPortPosition(pn) {
        var d = 10, gap = (this.width - d * 2) / 3;
        return ([(gap * (pn + 1)) + (d * pn), 0, d, d]);
    }
}

export const BuildRRUs = function (data) {
    var widthperport = 15, gap = 10, height = 35, posx = GlobalScope.margin, posy = 160;
    for (var i = 0; i < data.length; i++) {
        var obj = new RRU(posx, posy, widthperport, height, data[i]);
        GlobalScope.RRUs.push(obj);
        posx += obj.width + gap;
    }
}

export default RRU;

//BuildRRUsAndTMAs = function () {
//    var widthperport = 15, gap = 10, height = 35, posY = 150, posx = 0, lastsector = "";

//    var data = rrutmadata.split("~");
    //alert(data);
//    for (var i = 0; i < data.length; i++) {
 //       var sector = data[i].split(",")[0];
//        if (sector != lastsector) {
//            lastsector = sector;
//            posx = GetAntennaPosition(sector)[0];
           //alert(posx);
//        }
//        if (data[i].indexOf("RRU") != -1) {
//            var obj = new RRU(posx, posY, widthperport, height, data[i]);
//            RRUs.push(obj);
//            posx += obj.width + gap;
//        }
//        else {
//            var obj = new TMA(posx, posY, widthperport, height, data[i]);
//            TMAs.push(obj);
//            posx += obj.width + gap;
//        }
       // RRUs[i] = new RRU(posx, posY, widthperport, height, data[i]);
       // posx += RRUs[i].width + gap;
        //alert(data[i]);
//    }
//}