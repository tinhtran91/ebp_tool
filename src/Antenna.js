import * as joint from "jointjs";
import AntennaPanel from "./AntennaPanel";
import GlobalScope from "./GlobalScope";

 class Antenna {
    constructor(x, y, pw, ph, data) {
        //this.antennadata = data;
        this.typename = "Antenna";
        this.posX = x;
        this.posY = y;
        this.panelwidth = pw;
        this.panelheight = ph;
        this.sector = data.sector;
        this.nodebname = "?";
        this.model = data.model;
        this.serialnumber = data.serialNumber;
        this.numpanels = data.panels.length;
        this.width = pw * this.numpanels;
        this.height = ph;
        this.AntennaPanels = [];
        this.drawing;
        this.Build(data);
    }
    Build(data) {
        this.BuildAntenna();
        this.BuildAntennaPanels(data.panels);
    }

    BuildAntenna() {
        this.drawing = new joint.shapes.standard.Rectangle();
        this.drawing.position(this.posX, this.posY);
        this.drawing.resize(this.width, this.height, 40);

        this.drawing.attr({
            body: {
                strokeWidth: 1,
                cursor: 'pointer'
            },
            label: {
                text: this.sector,
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                refX: '50%',
                refY: '-18%',
                fontSize: 12,
                fontWeight: 'bold',
                cursor: 'pointer'
            }
        });
        this.drawing.addTo(GlobalScope.ebpGraph);
        this.drawing.userclass = this;
    }

    BuildAntennaPanels(panels) {
        //var d = this.antennadata.split(",");
        for (var i = 0; i < panels.length; i++) {
            this.AntennaPanels[i] = new AntennaPanel(this.posX + this.panelwidth * i, this.posY, this.panelwidth, this.panelheight, panels[i]);
        }
    }
}

export const BuildAntennas = function (data) {
    var lastsector = "", panelwidth = 30, gap = 19, panelheight = 40, posX = GlobalScope.margin, lastsector = "", count = 0, posY = 16;
    //, data = antennadata.split("~");
    for (var i = 0; i < data.length; i++) {
        var sector = data[i].sector;
        if (lastsector != sector){
            lastsector = sector;
            posX = 250 * count++ + GlobalScope.margin;
        }
        GlobalScope.Antennas[i] = new Antenna(posX, posY, panelwidth, panelheight, data[i]);
        posX = GlobalScope.Antennas[i].width + gap;
        lastsector = GlobalScope.Antennas[i].sector;
    }
};

export const GetAntennaPosition = function (sector) {
    for (var i = 0; i < GlobalScope.Antennas.length; i++) {
        if (GlobalScope.Antennas[i].sector == sector) {
            return ([GlobalScope.Antennas[i].posX, GlobalScope.Antennas[i].posY]);
        }
    }
};

export const GetAntennaHighBandPosition = function (sector) {
    for (var i = 0; i < GlobalScope.Antennas.length; i++) {
        if (GlobalScope.Antennas[i].sector == sector) {
            var ant = GlobalScope.Antennas[i];
            for (var i2 = 0; i2 < ant.AntennaPanels.length; i2++) {
                var panel = ant.AntennaPanels[i2];
                //for (var i3 = 0; i3 < ant.AntennaPanels[i2].RF_Ports.length; i3++) {
                    //var port = ant.AntennaPanels[i2].RF_Ports[i3];
                if (CheckFrequency("1800", panel.frequency) || CheckFrequency("2100", panel.frequency) || CheckFrequency("2300", panel.frequency)) {
                    return ([panel.posX, panel.posY]);
                    }
                //}
            }
        }
    }
    return ([0, 0]);
};

export const GetAntennaOutPortPosXGreaterThanPosX = function (sector, frequency, greaterthanX) {
    for (var i = 0; i < GlobalScope.Antennas.length; i++) {
        if (GlobalScope.Antennas[i].sector == sector) {
            var ant = GlobalScope.Antennas[i];
            for (var i2 = 0; i2 < ant.AntennaPanels.length; i2++) {
                for (var i3 = 0; i3 < ant.AntennaPanels[i2].RF_Ports.length; i3++) {
                    var port = ant.AntennaPanels[i2].RF_Ports[i3];
                    //alert(frequency + "-" +  port.frequency);
                    if (CheckFrequency(frequency, port.frequency)) {
                        if (port.posX > greaterthanX) return (port.posX);
                    }
                }
            }
        }
    }
    alert(sector + "-" + frequency + "-" + greaterthanX);
    return (null);
};

export default Antenna;