// JavaScript source code
import * as joint from "jointjs";
import BBU_Board from "./BBU_Board";
import GlobalScope from "./GlobalScope";

class BBU_Magazine {
    constructor(x, y, w, h, data) {
        this.typename = "BBU_Magazine";
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;
        this.nodebname = data.name;
        this.cabinet = data.cn;
        this.subrack = data.srn;
        this.BBU_Boards = [];
        this.drawing;
        this.Build(data);
    }
    Build(data)
    {
        this.BuildBBU_Magazine();
        this.BuildBBU_Boards(data.boards);
    }
    BuildBBU_Magazine() {
        this.drawing = new joint.shapes.standard.Rectangle();
        this.drawing.position(this.posX, this.posY);
        this.drawing.resize(this.width, this.height, 40);

        this.drawing.attr({
            body: {
                fill: '#eeeeee',
                strokeWidth: 1,
                cursor: 'pointer'
            },
            label: {
                text: this.nodebname + "  CN:" + this.cabinet + "  SRN:" + this.subrack,
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                refX: '50%',
                refY: '112%',
                fontSize: 12,
                fontWeight: 'bold',
                cursor: 'pointer'
            }
        });
        this.drawing.addTo(GlobalScope.ebpGraph);
        var element2 = new joint.dia.Link({
            source: { x: this.posX + this.width * 0.125, y: this.posY + this.height * 0.25 },
            target: { x: this.posX + this.width * 0.875, y: this.posY + this.height * 0.25 }
        });
        element2.attr('./pointer-events', 'none');
        //this.drawing.embed(element2);
        GlobalScope.ebpGraph.addCell(element2)

        var element2 = new joint.dia.Link({
            source: { x: this.posX + this.width * 0.125, y: this.posY + this.height * 0.5 },
            target: { x: this.posX + this.width, y: this.posY + this.height * 0.5 }
        })
        element2.attr('./pointer-events', 'none');
        //this.drawing.embed(element2);
        GlobalScope.ebpGraph.addCell(element2)

        var element2 = new joint.dia.Link({
            source: { x: this.posX + this.width * 0.125, y: this.posY + this.height * 0.75 },
            target: { x: this.posX + this.width * 0.875, y: this.posY + this.height * 0.75 }
        });
        element2.attr('./pointer-events', 'none');
        //this.drawing.embed(element2);
        GlobalScope.ebpGraph.addCell(element2)

        var element2 = new joint.dia.Link({
            source: { x: this.posX + this.width * 0.125, y: this.posY },
            target: { x: this.posX + this.width * 0.125, y: this.posY + this.height }
        })
        element2.attr('./pointer-events', 'none');
        //this.drawing.embed(element2);
        GlobalScope.ebpGraph.addCell(element2)

        var element2 = new joint.dia.Link({
            source: { x: this.posX + this.width * 0.5, y: this.posY },
            target: { x: this.posX + this.width * 0.5, y: this.posY + this.height }
        })
        element2.attr('./pointer-events', 'none');
        //this.drawing.embed(element2);
        GlobalScope.ebpGraph.addCell(element2);

        var element2 = new joint.dia.Link({
            source: { x: this.posX + this.width * 0.875, y: this.posY },
            target: { x: this.posX + this.width * 0.875, y: this.posY + this.height }
        })
        element2.attr('./pointer-events', 'none');
        //this.drawing.embed(element2);
        GlobalScope.ebpGraph.addCell(element2);
        this.drawing.userclass = this;
    }
    BuildBBU_Boards(data) {
        for (var i = 0; i < data.length; i++) {
            this.CreateBbuBoard(data[i]);
        }
    }
    CreateBbuBoard(data)
    {
        var pos = this.GetSlotPosition(data.sn);
        var bbuboard = new BBU_Board(this.posX + pos[0], this.posY + pos[1], pos[2], pos[3], this.nodebname, this.cabinet, this.subrack, data);
        //this.drawing.embed(bbuboard.drawing);
        this.BBU_Boards.push(bbuboard);
    }
    GetSlotPosition(sn)
    {
        if (sn == 0) return [this.width * 0.125, 0, this.width * 0.375, this.height * 0.25];
        else if (sn == 1) return [this.width * 0.125, this.height * 0.25, this.width * 0.375, this.height * 0.25];
        else if (sn == 2) return [this.width * 0.125, this.height * 0.5, this.width * 0.375, this.height * 0.25];
        else if (sn == 3) return [this.width * 0.125, this.height * 0.75, this.width * 0.375, this.height * 0.25];
        else if (sn == 4) return [this.width * 0.5, 0, this.width * 0.375, this.height * 0.25];
        else if (sn == 5) return [this.width * 0.5, this.height * 0.25, this.width * 0.375, this.height * 0.25];
        else if (sn == 6) return [this.width * 0.5, this.height * 0.5, this.width * 0.375, this.height * 0.25];
        else if (sn == 7) return [this.width * 0.5, this.height * 0.75, this.width * 0.375, this.height * 0.25];
        else if (sn == 16) return [0, 0, this.width * 0.125, this.height];
        else if (sn == 18) return [this.width * 0.875, 0, this.width * 0.125, this.height * 0.5];
        else  return [this.width * 0.875, this.height * 0.5, this.width * 0.125, this.height * 0.5];
    }
}

export const BuildBbuMagazines = function (data)
{
    var stepx = 300, posy = 600, width = 280, height = 80;
    for (var i = 0; i < data.length; i++)
    {
        GlobalScope.BBU_Magazines.push(new BBU_Magazine(i * stepx, posy, width, height, data[i]));
    }
}


export default BBU_Magazine;