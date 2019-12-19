import CPRI_Port from "./CPRI_Port";

class BBU_Board
{
    constructor(x, y, w, h, nodeb, cn, srn, data)
    {
        this.typename = "BBU_Board";
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;
        this.nodebname = nodeb;
        this.cabinet = cn;
        this.subrack = srn;
        this.slot = data.sn;
        this.type = data.name;
        this.model = data.type;
        this.serialnumber = data.serialNumber;
        this.color = "#dddddd";
        this.tooltiptext = "";
        this.CPRI_Ports = [];
        this.drawing;
        this.Build(data);
    }
    Build(data)
    {
        this.BuildBBU_Board();
        if (this.type.indexOf("BBP") != -1) this.BuildCpriPorts(data.cpri);
        this.BuildToolTip();
        this.drawing.attr('body/title', this.tooltiptext);
        this.drawing.attr('label/title', this.tooltiptext);
    }
    BuildToolTip() {
        this.tooltiptext = this.type + "\n"
            + "Model: " + this.model + "\n"
            + "Serial Number: " + this.serialnumber + "\n"
            + "NodeB: " + this.nodebname + "\n"
            + "Position: Cabinet: " + this.cabinet + " Subrack: " + this.subrack + " Slot: " + this.slot + "\n";
        for (var i = 0; i<this.CPRI_Ports.length; i++) {
            if (this.CPRI_Ports[i].cellsusing != "") this.tooltiptext += "Port " + i + ": " + this.CPRI_Ports[i].cellsusing + "\n";
        }
    }
    BuildBBU_Board()
    {
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
                refY: '75%',
                fontSize: 9,
                cursor: 'pointer',
            }
        });
        this.drawing.addTo(graph);
        this.drawing.userclass = this;
    }
    BuildCpriPorts(data)
    {
        for(var i=0; i<data.length; i++){
            var p = this.GetCpriPortPosition(data[i].pn);
            var cp = new CPRI_Port(this.posX + p[0], this.posY + p[1], p[2], p[3], this.nodebname, 0, 0, this.slot, i, data[i]);
            //this.drawing.embed(cp.drawing);
            this.CPRI_Ports.push(cp);
        }
    }
    GetCpriPortPosition(pn)
    {
        var w = 12, h = 7, gap = (this.width - w * 6) / 7;
        return ([(gap * (pn + 1)) + (w * pn), 0, w, h]);
    }
}

export default BBU_Board;