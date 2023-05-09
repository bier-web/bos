// BOS - BierOnStack - File Reserved
grid.grid-tag
    div.grid-content
        div.grid-loading.ui.dimmer.inverted
            div.content
                div.ui.text.medium.loader Processando, aguarde
        h4(if='{ opts.properties.showHeader }').ui.horizontal.divider.header
            label {opts.properties.name}
        table(class='{ opts.properties.class || "compact striped" } { opts.properties.size } { sortable: opts.properties.sortable }' id="{ opts.gridId }" ).ui.table.unstackable 
            thead
                tr(if='{ opts.properties.actionRow }')
                    th.center.aligned(colspan='{ (opts.properties.gridType == helpersWebApp.gridType.crud) ? opts.properties.dataColumns.length : opts.properties.chartColumnsTitle.length }')
                        a(if='{ typeof(opts.properties.label)!="undefined" }').ui.basic.orange.label { opts.properties.label }
                        div.grid-screen-content
                            div.screen-crud(data-id='{this.gridId}')
                        div.grid-filter-content
                            div.grid-filter(data-id="{ this.gridId }")
                        grid-command-button
                tr
                    th(each='{ col in (opts.properties.gridType == helpersWebApp.gridType.crud) ? opts.properties.dataColumns : opts.properties.chartColumnsTitle }' class='wide { (col.weight) ? col.weight : "two" } { (typeof col.title.class == "string") ? col.title.class : "" }')
                        label(if='{ col.title.type == "text" || typeof col.title != "object" }' class=' { (typeof col.title == "object") ? col.title.class : "" }') { (typeof col.title == "object") ? col.title.content : col.title }
                        label(if='{ col.title.type == "html" }'  class='{ (typeof col.title == "object") ? col.title.class : "" }') { col.title.content }
                        label(if='{ col.title.type == "icon" }' class='{ (typeof col.title == "object") ? col.title.class : "" } ')
                            i(class='icon { (typeof col.title == "object") ? col.title.class : "" }')
                tbody(class='{ _gridId }')
                    //render body-content here, by jquery selector
                tfoot(if='{ opts.properties.gridType == helpersWebApp.gridType.crud && opts.properties.showPagination }' class='{_gridId}')
                    //render pagination on footer here, by jquery selector
    script gridTag.call(this, this.opts)
