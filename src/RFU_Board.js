import * as joint from "jointjs";

import CPRI_Port from "./CPRI_Port";
import RF_Port from "./RF_Port";
import GlobalScope from "./GlobalScope";

class RFU_Board {
    constructor(x, y, w, h, nodeb, cn, srn, sn, data) {
        this.typename = "RFU_Board";
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;
        this.nodebname = nodeb;
        this.cabinet = cn;
        this.subrack = srn;
        this.slot = sn;
        this.type = data.name;
        this.serialnumber = data.serialNumber;
        this.model = data.model;
        this.txrx = "?";
        this.frequency = data.frequencies;
        this.color = "#dddddd";
        this.tooltiptext = "";
        this.CPRI_Ports = [];
        this.RF_Ports = [];
        this.drawing;
        this.Build(data);
    }
    Build(data) {
        this.BuildRFU_Board();
        this.BuildCpriPorts();
        this.BuildRfPorts(data.port);
        this.BuildToolTip();
        this.drawing.attr('body/title', this.tooltiptext);
        this.drawing.attr('label/title', this.tooltiptext);
    }
    BuildToolTip() {
        this.tooltiptext = "Type: " + this.type + "\n"
            + "Position: Cabinet: " + this.cabinet + " Subrack: " + this.subrack + " Slot: " + this.slot + "\n"
            + "Model: " + this.model + "\n"
            + "Serial Number: " + this.serialnumber + "\n"
            + "Frequency: " + this.frequency + "\n"
            + "NodeB: " + this.nodebname + "\n";
    }
    BuildRFU_Board() {
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
        for (var i=0; i<2; i++)
        {
            var p = this.GetCpriPortPosition(i);
            var cp = new CPRI_Port(this.posX + p[0], this.posY + p[1], p[2], p[3], this.nodebname, this.cabinet, this.subrack, this.slot, i, "");
            //this.drawing.embed(cp.drawing);
            this.CPRI_Ports.push(cp);
        }
    }
    BuildRfPorts(ports) {
        for (var i = 0; i < ports.length; i++) {
            var pn = ports[i].pn;
            var p = this.GetRfPortPosition(pn);
            var cp = new RF_Port(this.posX + p[0], this.posY + p[1], p[2], p[3], "", this.nodebname, this.cabinet, this.subrack, this.slot, pn, ports[i].sector, ports[i].cell, ports[i].tmapower, ports[i].usage, this.frequency);
            this.RF_Ports.push(cp);
        }
    }
    GetRfPortPosition(pn) {
        pn = parseInt(pn);
        var d = 10, gap = (this.width - d * 2) / 3;
   //     Rectangle r = new Rectangle((gap * (pn + 1)) + (d * pn), 1, d, d);
      return ([(gap * (pn + 1)) + (d * pn), 1, d, d]);

    }
    GetCpriPortPosition(pn) {
        var w = 10, h = 7, gap = (this.width - w * 2) / 3;
  //      Rectangle r = new Rectangle((gap * (pn + 1)) + (w * pn), this.height - h, w, h);
        return ([(gap * (pn + 1)) + (w * pn), this.height - h, w, h]);
    }
}

export default RFU_Board;