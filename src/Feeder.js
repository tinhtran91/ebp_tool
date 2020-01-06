import * as joint from "jointjs";
import RF_Port from "./RF_Port";

class Feeder {
    constructor(x, y, w, h, data) {
        this.typename = "Feeder";
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;
        this.tooltiptext = "";
        this.model = "Unknown";
        this.diversity = data.diversity;
        this.sector = data.sector;
        this.used = data.used;
        this.frequency = data.frequencies;
        this.feederlength = data.feederLength;
        this.color = "#dddddd";
        this.drawing;
        this.towerconnector;
        this.hutconnector;
        this.Build();
    }
    Build() {
        this.BuildFeeder();
        this.BuildFeederConnectors();
        this.BuildToolTip();
        this.drawing.attr('body/title', this.tooltiptext);
        this.drawing.attr('label/title', this.tooltiptext);
    }
    BuildToolTip() {
        this.tooltiptext = "Feeder: " + this.diversity + "\n"
            + this.sector + "\n"
            + "Model: " + this.model + "\n"
            + "Length: " + this.feederlength + "\n"
            + "Frequency: " + this.frequency + "\n";
    }
    BuildFeeder() {
        this.drawing = new joint.shapes.standard.Rectangle();
        this.drawing.position(this.posX, this.posY);
        this.drawing.resize(this.width, this.height, 40);
        this.drawing.attr({
            body: {
                fill: '#dddddd',
                strokeWidth: 1,
                cursor: 'pointer'
            }
        });
        this.drawing.addTo(window.ebpGraph);
        this.drawing.userclass = this;
    }
    BuildFeederConnectors() {
        var tma = "";
        var usage = "";
        var cell = " ";
        var sect = this.sector.replace("Sector ", "");
        this.towerconnector = new RF_Port(this.posX, this.posY - this.width/2, this.width, this.width, "", "", "", "", "", "0", sect, "", tma, usage, this.frequency);
        this.hutconnector = new RF_Port(this.posX, this.posY + this.height - this.width / 2, this.width, this.width, "", "", "", "", "", "0", sect, cell, tma, usage, this.frequency);
    }
}

export const BuildFeeders = function (data) {
   // alert(data.length);
    var width = 10, height = 25, posy = 300, posx = 0;
    //var data = feederdata.split("~");
   // for (var i = 0; i < data.length; i++) {
   //     alert(data[i].sector);

        //var d = data[i].split(",");
       // var sector = d[0], frequency = d[3];
        //var px = GetCombinerOutPortPosXGreaterThanPosX(sector, frequency, posx);
        //if (px == null) px =GetTmaInPortPosXGreaterThanPosX(sector, frequency, posx);
        //if (px == null) px = GetAntennaOutPortPosXGreaterThanPosX(sector, frequency, posx);
        //if (posx == null) {
       //     alert("Position Error: No X Position Found For Feeder");
       // }
        //else {
       //     posx = px;
      //      var obj = new Feeder(posx, posy, width, height, data[i]);
      //      Feeders.push(obj);
   //     }
  //  }
    for (var i = 0; i < data.length; i++) {
        var obj = new Feeder(20 + posx + 25*i, posy, width, height, data[i]);
    }
 }

 export default Feeder;