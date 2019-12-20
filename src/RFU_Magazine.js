import * as joint from "jointjs";
import RFU_Board from "./RFU_Board";

const RFU_Magazines = [];

class RFU_Magazine {
    constructor(x, y, w, h, cn, srn, data) {
        this.typename = "RFU_Magazine";
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;
        this.nodebname = data.nodeBNames;
        this.cabinet = cn;
        this.subrack = srn;
        this.RFU_Boards = [];
        this.drawing;
        this.Build(data);
    }
    Build(data) {
        this.BuildRFU_Magazine();
        this.BuildRfuBoards(data.boards);
    }

    BuildRFU_Magazine() {
        this.drawing = new joint.shapes.standard.Rectangle();
        this.drawing.position(this.posX, this.posY);
        this.drawing.resize(this.width, this.height, 40);

        this.drawing.attr({
            body: {
                strokeWidth: 1,
                cursor: 'pointer'
            }
        });
        this.drawing.addTo(window.ebpGraph);
        this.drawing.userclass = this;
    }
    BuildRfuBoards(data) {
       // var d = data.split(",");
        for (var i=0; i<data.length; i++) {
            //if (data[i] == this.cn && data[i] == this.srn) {
                //var d2 = d[3+i].split("*");
                this.CreateRfuBoard(data[i].sn, data[i]);
           // }
        }
    }
    CreateRfuBoard(sn, rfudata) {
        var x = this.posX + this.width / 6 * sn;
        var y = this.posY;
        var w = this.width / 6;
        var h = this.height;
        var rfuboard = new RFU_Board(x, y, w, h, this.nodebname, this.cabinet, this.subrack, sn, rfudata);
        this.RFU_Boards.push(rfuboard);

    }
}

export const BuildRfuMagazines = function (data) {
    var width = 180, gap = 19, height = 60, posy = 500, count = 0;
   // var store = "", ;
   // var data = rfumagazinedata.split("~");
    for (var i = 0; i < data.length; i++) {
       // if (store.indexOf(""+data[i].cn + data[i].srn + ",") == -1) {
       //     store += ""+data[i].cn + data[i].srn + ",";
            //RFU_Magazines[i] = new RFU_Magazine(i * (width + gap), posy, width, height, data);
                        RFU_Magazines[i] = new RFU_Magazine(count++ * (width + gap), posy, width, height, data[i].cn, data[i].srn, data[i]);
       // }

        //RFU_Magazines[i].BuildRfuBoards();
    }
}

export default RFU_Magazine;