import RF_Port from "./RF_Port";

class ExternalConnectionPoint{
    constructor(x, y, w, h, who, data) {
        this.typename = "ExternalConnectionPoint";
        this.who = who;
        this.posX = x;
        this.posY = y;
        this.width = w;
        this.height = h;
        this.position = data.position;
        this.tooltiptext = "";
        this.sectors = data.sector;
        this.frequencies = data.frequency;
        this.connection;
        this.Build();
    }
    Build() {
        this.BuildExternalConnectionPoint();
        this.BuildToolTip();

    }
    BuildExternalConnectionPoint() {
        var tma = "";
        var usage = "";
        var cell = "";
        this.connection = new RF_Port(this.posX, this.posY + this.height - this.width / 2, this.width, this.width, "12345", "", "", "", "", "", this.sector, cell, tma, usage, this.frequency);
    }
    AddConnection(data) {
        if (this.sectors.indexOf(data.sector) == -1) this.sectors += ", " + data.sector;
        if (this.frequencies.indexOf(data.frequency) == -1) {
            this.frequencies += "," + data.frequency;
        }
        this.BuildToolTip();
    }
    BuildToolTip() {
        var uniqueNames = "";

        var d = this.frequencies.split(",");
        for (var i = 0; i < d.length; i++) {
            if (uniqueNames.indexOf(d[i]) == -1) {
                if (uniqueNames == "") uniqueNames = d[i];
                else uniqueNames += "," + d[i];
            }
        }
       // var unique = [new Set(d)];
        this.frequencies = uniqueNames;
        this.tooltiptext = "External Connection: " + this.who + "\n"
            + this.sectors + "\n"
            + "Frequency: " + this.frequencies + "\n";
        this.connection.drawing.attr('body/title', this.tooltiptext);
        this.connection.drawing.attr('label/title', this.tooltiptext);
        this.connection.drawing.attr('label/textAnchor', 'right');
        this.connection.drawing.attr('label/refX', '15');
        this.connection.drawing.attr('label/text', this.frequencies);
    }
}

export const BuildExternalConnectionPoints = function (data) {
    var width = 10, height = 25, posy = 200, posx = 500;

    for (var i = 0; i < data.length; i++) {
        var flag = -1;
        for (var i2 = 0; i2 < window.ExternalConnectionPoints.length; i2++) {

            if (window.ExternalConnectionPoints[i2].position == data[i].position) {
                flag = i2;
                break;
            }
        }
        if (flag != -1) {
            window.ExternalConnectionPoints[flag].AddConnection(data[i]);
        }
        else {
            if (data[i].position == "Outdoor1") posy = 100;
            else if (data[i].position == "Indoor1") posy = 500;
            else if (data[i].position == "Indoor2") posy = 300;
            //alert(data[i].position);
            window.ExternalConnectionPoints.push(new ExternalConnectionPoint(posx, posy, width, height, "Optus", data[i]));
        }
    }
}

export default ExternalConnectionPoint;
