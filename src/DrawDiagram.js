import * as jointJS from "jointjs";

// init grap
const graph = new  joint.dia.Graph;

import { BuildBbuMagazines } from "./BBU_Magazine";
import { BuildRfuMagazines } from "./RFU_Magazine";

export const Draw = function (siteDetail, container) {
    // init paper
    var paper = new joint.dia.Paper({
        el: document.getElementById(container), // container of diagram
        model: graph,
        gridSize: 1,
            interactive: function (cellView, method) {
                    return cellView instanceof joint.dia.LinkView; // Only allow interaction with joint.dia.LinkView instances.
            }
    });

    graph.clear();
    paper.on('cell:mouseover',
        function (cellView, evt, x, y) {
            var cell = cellView.model;
            if (cell.userclass.typename != "BBU_Magazine" && cell.userclass.typename != "RFU_Magazine" && cell.userclass.typename != "Antenna") {
                if (cell.isLink()) {
                    cell.attr('line/stroke', 'red');
                    cell.attr('line/strokeWidth', 3);
                }
                else {
                    cell.attr('body/fill', 'yellow');
                }
            }
        }
    );
    paper.on('cell:mouseout',
        function (cellView, evt, x, y) {
            var cell = cellView.model;
            if (cell.userclass.typename != "BBU_Magazine" && cell.userclass.typename != "RFU_Magazine" && cell.userclass.typename != "Antenna") {
                if (cell.isLink()) {
                    cell.attr('line/stroke', 'black');
                    cell.attr('line/strokeWidth', 1);
                }
                else {
                    cell.attr('body/fill', cell.userclass.color);
                }
            }
        }
    );

    BuildBbuMagazines(siteDetail.bbuDataMagazines);
    BuildRfuMagazines(siteDetail.rfuDataMagazines);
}