import * as joint from "jointjs";

import { BuildBbuMagazines } from "./BBU_Magazine";
import { BuildRfuMagazines } from "./RFU_Magazine";

export const Draw = function (siteDetail, container) {
    // init grap
    window.ebpGraph = new joint.dia.Graph;
    window.ebpGraph.clear();

    let paper = new joint.dia.Paper({
        el: document.getElementById(container), // container of diagram
        model: window.ebpGraph,
        gridSize: 1,
        interactive: function (cellView, method) {
            return cellView instanceof joint.dia.LinkView; // Only allow interaction with joint.dia.LinkView instances.
        }
    });

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