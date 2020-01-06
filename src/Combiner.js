import * as joint from "jointjs";
import RF_Port from "./RF_Port";
import GlobalScope from "./GlobalScope";

class Combiner {
    constructor(x, y, w, h, data) {
        this.typename = "Combiner";
        this.posX = x;
        this.posY = y;
        this.widthperport = w;
        this.height = h;
        this.sector = data.sector;
        this.nodebname = "";
        this.location = data.placement;
        this.model = data.model;
        this.cabinet = "";
        this.subrack = "";
        this.slot = "";
        this.type = "";
        this.serialnumber = data.serialNumber;
        this.numinputs = data.numberInputs;
        this.numoutputs = data.numberOutputs;
        this.width = Math.max(this.numinputs, this.numoutputs) * this.widthperport;
        this.inputfrequencies = data.frequencies;
        this.outputfrequencies = "";
        for (var i = 0; i < this.inputfrequencies.length; i++) {
            if (this.inputfrequencies[i] != "0") {
                if (this.outputfrequencies == "") this.outputfrequencies += this.inputfrequencies[i];
                else this.outputfrequencies += "|" + this.inputfrequencies[i];
            }
        }
        this.color = "#dddddd";
        this.tooltiptext = "";
        this.RF_InPorts = [];
        this.RF_OutPorts = [];
        this.drawing;
        this.Build();
    }
    Build() {
        this.BuildCombiner();
        this.BuildInRfPorts();
        this.BuildOutRfPorts();
        this.BuildToolTip();
    }
    BuildToolTip() {
        this.tooltiptext = "Combiner\n"
            + this.sector + "\n"
            + "Model: " + this.model + "\n"
            + "Serial Number: " + this.serialnumber + "\n"
            + "NodeB: " + this.nodebname + "\n";
        for (var i = 0; i < this.numinputs / 2; i++) {
            this.tooltiptext += "Input Frequency " + (i + 1) + ": " + this.inputfrequencies[i] + "\n";
        }
        this.tooltiptext += "Output Frequency " + ": " + this.outputfrequencies + "\n";
        this.drawing.attr('body/title', this.tooltiptext);
        this.drawing.attr('label/title', this.tooltiptext);
    }
    BuildCombiner() {
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
                text: "Combiner",
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

    BuildInRfPorts() {
        for (var i = 0; i < this.numinputs; i++) {
            var p = this.GetRfPortPosition(i, this.numinputs, 10);

            var tma = "";
            var usage = "";
            var sector = "";
            var cell = " ";

            var cp = new RF_Port(this.posX + p[0], this.posY + p[1] + this.height - 10, p[2], p[3], "", this.nodebname, this.cabinet, this.subrack, this.slot, i, sector, cell, tma, usage, this.inputfrequencies[Math.floor(i / 2)]);
            this.RF_InPorts.push(cp);
        }
    }
    BuildOutRfPorts() {
        for (var i = 0; i < this.numoutputs; i++) {
            var p = this.GetRfPortPosition(i, this.numoutputs, 10);

            var tma = "";
            var usage = "";
            var sector = "";
            var cell = "";
            var cp = new RF_Port(this.posX + p[0], this.posY + p[1], p[2], p[3], "", this.nodebname, this.cabinet, this.subrack, this.slot, i, sector, cell, tma, usage, this.outputfrequencies);
            this.RF_OutPorts.push(cp);
        }
    }
    GetRfPortPosition(pn, portcount, diameter) {
        portcount = parseInt(portcount)
        var gap = (this.width - (diameter * portcount)) / (portcount + 1);
        return ([(gap * (pn + 1)) + (diameter * pn), 0, diameter, diameter]);
    }
}

export const BuildCombiners = function (data) {
    var width = 10, gap = 10, height = 30, posx = GlobalScope.margin, lastsector = "";
    var outdoorPosY = 90, outdoorUposY = 275, indoor1posY = 420, indoor2posY = 350, indoor3posY = 300;

    for (var i = 0; i < data.length; i++) {
        if (data[i].placement != "Indoor1") continue;
        var sector = data[i].sector;
        if (sector != lastsector) {
            lastsector = sector;
         //   posx = GetAntennaPosition(sector)[0];
        }
        var obj = new Combiner(posx, indoor1posY, width, height, data[i]);
        GlobalScope.Combiners.push(obj);
        posx += obj.width + gap;
    }
    posx = GlobalScope.margin;
    for (var i = 0; i < data.length; i++) {
        if (data[i].placement != "Indoor2") continue;
        var sector = data[i].sector;
        if (sector != lastsector) {
            lastsector = data[i].sector;
        //    posx = GetAntennaPosition(sector)[0];
        }
        var obj = new Combiner(posx, indoor2posY, width, height, data[i]);
        GlobalScope.Combiners.push(obj);
        posx += obj.width + gap;
    }
    posx = GlobalScope.margin;
    for (var i = 0; i < data.length; i++) {
        if (data[i].placement != "Indoor3") continue;
        var sector = data[i].sector;
        if (sector != lastsector) {
            lastsector = data[i].sector;
        //    posx = GetAntennaPosition(sector)[0];
        }
        var obj = new Combiner(posx, indoor3posY, width, height, data[i]);
        GlobalScope.Combiners.push(obj);
        posx += obj.width + gap;
    }
    posx = GlobalScope.margin;
    for (var i = 0; i < data.length; i++) {
        if (data[i].placement != "Outdoor") continue;
        var sector = data[i].sector;
        if (sector != lastsector) {
            lastsector = sector;
         //   if (data[i].indexOf(",700,") != -1 || data[i].indexOf(",850,") != -1 || data[i].indexOf(",900,") != -1) posx = GetAntennaPosition(sector)[0];
         //   else posx = GetAntennaHighBandPosition(sector)[0];
        }
        var obj = new Combiner(posx, outdoorPosY, width, height, data[i]);
        GlobalScope.Combiners.push(obj);
        posx += obj.width + gap;
    }
    posx = GlobalScope.margin;
    for (var i = 0; i < data.length; i++) {
        if (data[i].placement != "OutdoorU") continue;
        var sector = data[i].sector;
        if (sector != lastsector) {
            lastsector = sector;
         //   posx = GetAntennaPosition(sector)[0];
        }
        var obj = new Combiner(posx, outdoorUposY, width, height, data[i]);
        GlobalScope.Combiners.push(obj);
        posx += obj.width + gap;
    }
};

export const GetCombinerOutPortPosXGreaterThanPosX = function (sector, frequency, greaterthanX) {
    for (var i = 0; i < GlobalScope.Combiners.length; i++) {
        if (GlobalScope.Combiners[i].sector == sector) {
            for (var i2 = 0; i2 < GlobalScope.Combiners[i].RF_OutPorts.length; i2++) {
                var port = GlobalScope.Combiners[i].RF_OutPorts[i2];
                if (CheckFrequency(frequency, port.frequency)) {
                    if (port.posX > greaterthanX) return (port.posX);
                }
            }
        }
    }
    return (null);
};

export default Combiner;