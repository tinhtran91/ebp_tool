import * as joint from "jointjs";

class CPRI_Port {
    constructor(x, y, w, h, nodebname, cn, srn, sn, pn, data) {
        this.typename = "CPRI_Port";
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;
        this.nodebname = nodebname;
        this.cabinet = cn;
        this.subrack = srn;
        this.slot = sn;
        this.port = pn;

        if (typeof data.sector === 'undefined') this.sectorusing = "";
        else this.sectorusing = data.sector.join('');
        if (typeof data.cell === 'undefined') this.cellsusing = "";
        else this.cellsusing = data.cell.join('');
        this.color = "#dddddd";
        this.tooltiptext = "";
        this.CPRI_Ports = [];
        this.drawing;
        this.Build();
    }
    Build(){
        this.BuildCPRI_Port();
        this.BuildToolTip();
    }
    BuildToolTip() {
        this.tooltiptext = "CPRI Port: " + this.port + "\n"
            + "Sector: " + this.sectorusing + "\n"
            + "Cell: " + this.cellsusing + "\n"
            + "SFP: ?\n";
        this.drawing.attr('body/title', this.tooltiptext);
    }
    BuildCPRI_Port()
    {
        if (this.cellsusing != "") {
            this.color = "#00ff00";
        }
        this.drawing = new joint.shapes.standard.Rectangle();
        this.drawing.position(this.posX, this.posY);
        this.drawing.resize(this.width, this.height, 40);
        this.drawing.attr({
            body: {
                fill: this.color,
                strokeWidth: 1,
                cursor: 'pointer',
            }
        });
        this.drawing.addTo(window.ebpGraph);
        this.drawing.userclass = this;
    }
}

export default CPRI_Port;