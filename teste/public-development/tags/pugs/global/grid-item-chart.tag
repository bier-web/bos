// BOS - BierOnStack - File Reserved
grid-item-chart.grid-item-chart-tag
    td(each='{ c, index in opts.data.chartColumns }' class='{typeof parent.opts.gridProperties.properties.item_tap == "function" ? "cursor pointer" : "" } { c.type } { (typeof c.class == "string") ? c.class : "" }' data-index=' { index } ' onClick='{ columnOnClick }')
        div(id='{ c.name }')
    script gridItemChartTag.call(this, this.opts)
