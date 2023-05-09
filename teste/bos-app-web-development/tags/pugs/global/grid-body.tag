// BOS - BierOnStack - File Reserved
grid-body.grid-body
    tr(if='{ opts.properties.gridType == helpersWebApp.gridType.crud && opts.data.length > 0 && opts.properties.dataColumns.length > 0 }' each='{ r in opts.data }' id='grid-item-{r.id}' data-is="grid-item" data="{ r }" grid-properties="{ parent.opts }")
    tr(if='{ opts.properties.gridType == helpersWebApp.gridType.crud && opts.data.length == 0 && opts.properties.dataColumns.length > 0 }')
        td.wide.three Não há {typeof opts.collection.reportLabel != 'undefined' ? opts.collection.reportLabel : "registros"} 
    tr(if='{ opts.properties.gridType == helpersWebApp.gridType.dashboard && opts.properties.chartRows.length > 0 }' each='{ gridItemChart in opts.properties.chartRows }' data-is="grid-item-chart" data="{ gridItemChart }" grid-properties="{ parent.opts }")
    tr(if='{ opts.properties.gridType == helpersWebApp.gridType.dashboard && opts.properties.chartRows.length == 0 }')
        td.wide.three Não há gráficos para mostrar
    script gridBodyTag.call(this, this.opts)        
