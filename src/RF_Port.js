class RF_Port {
    constructor(x, y, w, h, text, nodebname, cn, srn, sn, pn, sector, cell, tmaon, usage, freq = "") {
        this.typename = "RF_Port";
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;
        this.nodebname = nodebname;
        this.cabinet = cn;
        this.subrack = srn;
        this.slot = sn;
        this.port = pn;
        this.sectorusing = sector;
        this.cellsusing = cell;
        this.color = "#dddddd";
        this.TMA_On = tmaon;
        this.rfusage = usage;
        this.strokewidth = 1;
        this.strokecolor = "#000000";
        this.frequency = freq;
        this.tooltiptext = "";
        this.text = text;
        //this.type = data[4];
        this.RF_Ports = [];
        this.drawing;
        this.Build();
    }
    Build() {
        this.BuildRF_Port();
        this.BuildToolTip();
    }
    BuildToolTip() {
        this.tooltiptext = "RF Port: " + this.port + "\n";
        if (this.cabinet != "" || this.subrack != "" || this.slot != "") this.tooltiptext += "Position: CN: " + this.cabinet + " SRN: " + this.subrack + " SN: " + this.slot + "\n";
        this.tooltiptext += "Frequency: " + this.frequency + "\n"
            + "NodeB: " + this.nodebname + "\n"
            + "Sectors: " + this.sectorusing + "\n"
            + "Cells: " + this.cellsusing;
        this.drawing.attr('body/title', this.tooltiptext);
        this.drawing.attr('label/title', this.tooltiptext);
    }
    BuildRF_Port() {
       // if (this.cellsusing != "") {
       //     this.fillcolor = "#00ff00";
      //  }
        if (this.TMA_On != "") {
            this.strokewidth = 2;
            this.strokecolor = "#0000ff";
        }
        if (this.rfusage == "RX") {
            this.color = "#00ff00";
        }
        else if (this.rfusage == "RX And TX") {
            this.color = "#ff00ff";
        }
        else if (this.cellsusing != ""){
            var band = "";
            if (this.frequency.indexOf("700") != -1 || this.frequency.indexOf("850") != -1 || this.frequency.indexOf("900") != -1) {
                band += "LB";
            }
            if (this.frequency.indexOf("1800") != -1 || this.frequency.indexOf("2100") != -1 || this.frequency.indexOf("2300") != -1) {
                band += "HB";
            }
            if (band == "LB") {
                this.color = "#ff0000";
            }
            else if (band == "HB") {
                this.color = "#0000ff";
            }
            else if (band == "LBHB") {
                this.color = "#00ffff";
            }
        }
        this.drawing = new joint.shapes.standard.Circle();
        this.drawing.position(this.posX, this.posY);
        this.drawing.resize(this.width, this.height, 40);
        this.drawing.attr({
            //draggable: false,
            body: {
                fill: this.color,
                strokeWidth: this.strokewidth,
                stroke: this.strokecolor,
                cursor: 'pointer',
                title: this.tooltiptext
            },
            label: {
                text: this.text,
                // fill: 'white'
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                refX: '50%',
                refY: '50%',
                fontSize: 9,
                cursor: 'pointer'
                //fontWeight: 'bold'
            }
        });

        this.drawing.addTo(graph);
        //this.drawing.typename = this.typename;
        this.drawing.userclass = this;
    }
}

export default RF_Port;