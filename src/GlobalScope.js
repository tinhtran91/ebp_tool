class GlobalScope {
  constructor() {
    this.margin = 20;
    this.ebpGraph = null;
    this.BBU_Magazines = [];
    this.RFU_Magazines = [];
    this.Antennas = [];
    this.RRUs = [];
    this.TMAs = [];
    this.Combiners = [];
    this.Feeders = [];
    this.ExternalConnectionPoints = [];
  }
}

export default (new GlobalScope);