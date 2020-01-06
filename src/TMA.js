import * as joint from "jointjs";
import RF_Port from "./RF_Port";

class TMA {
    constructor(x, y, w, h, data) {
        this.typename = "TMA";
        this.posX = x;
        this.posY = y;
        this.widthperport = w;
        this.height = h;
        this.sector = data.sector
        this.nodebname = "";
        this.cabinet = "";
        this.subrack = "";
        this.slot = "";
        this.type = "";
        this.serialnumber = data.serialNumber;
        this.whopowering = "?";
        this.numinputs = data.numberInputs;
        this.numoutputs = data.numberOutputs;
        this.width = Math.max(this.numinputs, this.numoutputs) * this.widthperport;
        this.model = data.model;
        this.inputfrequencies = data.frequencyIn;
        this.outputfrequencies = data.frequencyOut;
        this.color = "#dddddd";
        this.tooltiptext = "";
        this.RF_InPorts = [];
        this.RF_OutPorts = [];
        this.drawing;
        this.Build();
    }
    Build() {
        this.BuildTMA();
        this.BuildInRfPorts();
        this.BuildOutRfPorts();
        this.BuildToolTip();

    }
    BuildToolTip() {
        this.tooltiptext = "Type: TMA\n"
            + this.sector +"\n"
            + "Model: " + this.model + "\n"
            + "Serial Number: " + this.serialnumber + "\n"
            + "NodeB: " + this.nodebname + "\n"
            + "Powering: " + this.whopowering + "\n";
        for (var i = 0; i < this.numinputs/2; i++) {
            this.tooltiptext += "Input Frequency " + (i + 1) + ": " + this.inputfrequencies[i] + "\n";
        }
        for (var i = 0; i < this.numoutputs / 2; i++) {
            this.tooltiptext += "Output Frequency " + (i + 1) + ": " + this.outputfrequencies[i] + "\n";
        }
        this.drawing.attr('body/title', this.tooltiptext);
        this.drawing.attr('label/title', this.tooltiptext);
    }
    BuildTMA() {
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
                text: "TMA",
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                refX: '50%',
                refY: '50%',
                fontSize: 9,
                cursor: 'pointer'
            }
        });

        this.drawing.addTo(window.ebpGraph);
        this.drawing.userclass = this;
    }

    BuildInRfPorts() {
        for (var i = 0; i < this.numinputs; i++) {
            var p = this.GetRfPortPosition(i, this.numinputs, 10);

            var tma = "";
            var usage = "";
            var sector = "";
            var cell = " ";

            var cp = new RF_Port(this.posX + p[0], this.posY + p[1] + this.height - 10, p[2], p[3], "", this.nodebname, this.cabinet, this.subrack, this.slot, i, sector, cell, tma, usage, this.inputfrequencies[Math.floor(i/2)]);
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
            var cp = new RF_Port(this.posX + p[0], this.posY + p[1], p[2], p[3], "", this.nodebname, this.cabinet, this.subrack, this.slot, i, sector, cell, tma, usage, this.outputfrequencies[Math.floor(i / 2)]);
            this.RF_OutPorts.push(cp);
        }
    }

    GetRfPortPosition(pn, portcount, diameter) {
        portcount = parseInt(portcount)
        var gap = (this.width - (diameter * portcount)) / (portcount+1);
        return ([(gap * (pn + 1)) + (diameter * pn), 0, diameter, diameter]);
    }
}

export const BuildTMAs = function (data) {
    var widthperport = 15, gap = 10, height = 35, posx = window.margin, posy = 230;
    for (var i = 0; i < data.length; i++) {
        var obj  = new TMA(posx, posy, widthperport, height, data[i]);
        window.TMAs.push(obj);
        posx += obj.width + gap;
   }
}

export const GetTmaInPortPosXGreaterThanPosX = function (sector, frequency, greaterthanX) {
    for (var i = 0; i < window.TMAs.length; i++) {
        if (window.TMAs[i].sector == sector) {
            for (var i2 = 0; i2 < window.TMAs[i].RF_InPorts.length; i2++) {
                var port = window.TMAs[i].RF_InPorts[i2];
                if (CheckFrequency(frequency, port.frequency)) {
                    if (port.posX > greaterthanX) return (port.posX);
                }
            }
        }
    }
    return (null);
}

export default TMA;