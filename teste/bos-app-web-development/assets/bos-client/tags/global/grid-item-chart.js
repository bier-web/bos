

riot.tag2('grid-item-chart', '<td class="{typeof parent.opts.gridProperties.properties.item_tap == &quot;function&quot; ? &quot;cursor pointer&quot; : &quot;&quot;} {c.type} {(typeof c.class == &quot;string&quot;) ? c.class : &quot;&quot;}" each="{c, index in opts.data.chartColumns}" data-index=" {index} " onclick="{columnOnClick}"> <div id="{c.name}"></div> </td>', '', 'class="grid-item-chart-tag"', function(opts) {
gridItemChartTag.call(this, this.opts)
});