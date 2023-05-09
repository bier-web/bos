// BOS - BierOnStack - File Reserved
grid-footer.grid-footer.full-width
    tr
        th(colspan='{ opts.gridOptions.properties.dataColumns.length } ')
            div.ui.right.floated.pagination.menu
                a.icon.item(onclick = '{ firstPage }' class='{ "disabled": isFirstPage() }' )
                    i.icon.angle.double.left                    
                a.icon.item(onclick = '{ previousPage }' class='{ "disabled": isFirstPage() }' )
                    i.left.chevron.icon
                a.item() { String.format('Página {0} de {1}', currentPage, totalPages) }
                a.icon.item(onclick = '{ nextPage }' class='{ "disabled": isLastPage() }' )
                    i.right.chevron.icon
                a.icon.item(onclick = '{ lastPage }' class='{ "disabled": isLastPage() }' )
                    i.icon.angle.double.right                    
    script gridFooterTag.call(this, this.opts)
