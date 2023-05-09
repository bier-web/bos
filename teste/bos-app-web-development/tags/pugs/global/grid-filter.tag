// BOS - BierOnStack - File Reserved
grid-filter.grid-filter
    div.ui.segment
        form.grid-filter-form(data-id='{ this.opts.gridObject.gridId }').ui.mini.form
            h5.ui.header Opções de Filtro { opts.properties.name }
            div.ui.grid.wide.middle.aligned.grid-filter-body
                div.row.four.columns(each='{ row in rows  }')
                    div.column(each='{ column in row.cols }' class='{ column.isFieldCheckbox ? "field-checkbox-column two" : "field-column six" } wide column ')
                        div.field.field-filter(if='{ !column.isFieldCheckbox }')
                            label { column.title }
                            input(if='{ column.gridColumn.type == "date" && typeof(column.gridColumn.searchType)==="undefined" }' disabled=true type="date" name='filter-{ column.gridColumn.name + column.indexSearchInput }' id='filter-{ column.gridColumn.name + column.indexSearchInput }' placeholder='Pesquisar no campo { column.gridColumn.title.content }')
                            input(if='{ column.gridColumn.type == "datetime" && typeof(column.gridColumn.searchType)==="undefined" }' disabled=true type="datetime-local" name='filter-{ column.gridColumn.name + column.indexSearchInput }' id='filter-{ column.gridColumn.name + column.indexSearchInput }' placeholder='Pesquisar no campo { column.gridColumn.title.content }')
                            input(if='{ column.gridColumn.type == "text" && typeof(column.gridColumn.searchType)==="undefined" }' disabled=true type="text" name='filter-{ column.gridColumn.name + column.indexSearchInput }' id='filter-{ column.gridColumn.name + column.indexSearchInput }' placeholder='Pesquisar no campo { column.gridColumn.title.content }')
                            input(if='{ column.gridColumn.type == "number" && typeof(column.gridColumn.searchType)==="undefined" }' disabled=true type="text" name='filter-{ column.gridColumn.name + column.indexSearchInput }' id='filter-{ column.gridColumn.name + column.indexSearchInput }' placeholder='Pesquisar no campo { column.gridColumn.title.content }')
                            div(if='{ (column.gridColumn.type == "text" || column.gridColumn.type == "icon" || column.gridColumn.type == "checkbox" || column.gridColumn.type == "number") && typeof(column.gridColumn.searchType)!=="undefined" && column.gridColumn.searchType === "lookup" }' name='filter-{ column.gridColumn.name + column.indexSearchInput }' id='filter-{ column.gridColumn.name + column.indexSearchInput }')
                                div.lookup-combobox
                        div.field.field-filter-check(if='{ column.isFieldCheckbox }')
                            div.ui.toggle.checkbox
                                input.hidden(name=' { String.format("{0}-{1}-{2}", "filter", column.name + column.indexSearchInput, "checkbox") }' data-field='filter-{ column.name + column.indexSearchInput }' id='{ String.format("{0}-{1}-{2}", "filter", column.name + column.indexSearchInput, "checkbox") }' type='checkbox' tabindex=0)
    script gridFilterTag.call(this, this.opts)
