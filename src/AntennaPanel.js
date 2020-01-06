import * as joint from "jointjs";
import RF_Port from "./RF_Port";
import GlobalScope from "./GlobalScope";

class AntennaPanel {
    constructor(x, y, w, h, data) {
        this.typename = "AntennaPanel";
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;
        this.minfreq = data.rfPorts[0].minimumFrequency;
        this.maxfreq = data.rfPorts[0].maximumFrequency;
        this.minetilt = data.minimumTilt;
        this.maxetilt = data.maximumTilt;
        this.model = "?";
        this.serialnumber = "?";
        this.color = "#dddddd";
        this.tooltiptext = "";
        this.frequency = this.minfreq + "-" + this.maxfreq;
        this.RF_Ports = [];
        this.drawing;
        this.Build(data);
    }
    Build(data) {
        this.SetPanelColorByBand();
        this.BuildAntennaPanel();
        this.BuildRfPorts(data.rfPorts);
        this.BuildToolTip();
    }
    BuildToolTip() {
        this.tooltiptext = "Type: Antenna\n"
            + "Model: " + this.model + "\n"
            + "Serial Number: " + this.serialnumber + "\n"
            + "Frequency: " + this.minfreq + " - " + this.maxfreq + "\n"
            + "Cells: " + "?" + "\n";
        this.drawing.attr('body/title', this.tooltiptext);
        this.drawing.attr('label/title', this.tooltiptext);
    }
    BuildAntennaPanel() {
        this.drawing = new joint.shapes.standard.Rectangle();
        this.drawing.position(this.posX, this.posY);
        this.drawing.resize(this.width, this.height, 40);
        this.drawing.attr({
            body: {
                fill: this.color,
                strokeWidth: 1,
                cursor: 'pointer'
            },
            label: {
                text: this.minetilt + ":" + this.maxetilt,
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                refX: '50%',
                refY: '25%',
                fontSize: 9,
                cursor: 'pointer'
            }
        });

        this.drawing.addTo(GlobalScope.ebpGraph);
        this.drawing.userclass = this;
    }
    SetPanelColorByBand() {
        if (this.minfreq >= 380 && this.minfreq <= 1000) this.color = "#ff0000";
        else if (this.minfreq >= 1001 && this.minfreq <= 1700) this.color = "#00ff00";
        else if (this.minfreq >= 1701 && this.minfreq <= 2300) this.color = "#0000ff";
        else if (this.minfreq >= 2301 && this.minfreq <= 4000) this.color = "#ffff00";
    }

    BuildRfPorts(rfports) {
        for (var i = 0; i < rfports.length; i++) {
            var p = this.GetRfPortPosition(i);
            var sector = "";
            var cp = new RF_Port(this.posX + p[0], this.posY + p[1], p[2], p[3], rfports[i].polarity, "", "", "", "", rfports[i].port, sector, "", "", "", this.frequency);
            this.RF_Ports.push(cp);
        }
    }
    GetRfPortPosition(pn) {
        var d = 10, gap = (this.width - d * 2) / 3;
        return ([(gap * (pn + 1)) + (d * pn), this.height-d, d, d]);
    }
}

export default AntennaPanel;