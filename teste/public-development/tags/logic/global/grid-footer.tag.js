/* BOS - BierOnStack - File Reserved */
gridFooterTag = function (opts) {
	var _self = this;
	var _currentPage = 0;

	this.pages = [];
	this.totalPages = Math.ceil(opts.objectData.count / opts.gridOptions.properties.showPagination.pageSize);

	for (pageIndex = 1; pageIndex <= this.totalPages; pageIndex++) {
		_self.pages.push(pageIndex);
	}

	this.firstPage = function () {
		if (_currentPage > 0) {
			_currentPage = 0;
			opts.gridCommand.refreshGridData(undefined, false, _currentPage * opts.gridOptions.properties.showPagination.pageSize);
			_self.update();
		}
	};

	this.lastPage = function () {
		if (_currentPage < _self.totalPages - 1) {
			_currentPage = _self.totalPages - 1;
			opts.gridCommand.refreshGridData(undefined, false, _currentPage * opts.gridOptions.properties.showPagination.pageSize);
			_self.update();
		}
	};

	this.isLastPage = function () {
		return _currentPage == _self.totalPages - 1;
	};

	this.isFirstPage = function () {
		return _currentPage == 0;
	};

	this.pageClick = function (pageClicked) {
		_currentPage = pageClicked.item.index;
		opts.gridCommand.refreshGridData(undefined, _currentPage * opts.gridOptions.properties.showPagination.pageSize);
		_self.update();
	};

	this.nextPage = function () {
		if (_currentPage < _self.totalPages - 1) {
			_currentPage++;
			opts.gridCommand.refreshGridData(undefined, false, _currentPage * opts.gridOptions.properties.showPagination.pageSize);
			_self.update();
		}
	};

	this.previousPage = function () {
		if (_currentPage > 0) {
			_currentPage--;
			opts.gridCommand.refreshGridData(undefined, false, _currentPage * opts.gridOptions.properties.showPagination.pageSize);
			_self.update();
		}
	};

	this.currentPage = function () {
		return _currentPage + 1;
	};
};
