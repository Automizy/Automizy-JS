define([
    'automizy/core',
    'automizy/modules/button',
    'automizy/modules/i18n',
    'automizy/addons/jqueryAddOns',
    'automizy/addons/objectAddOns',
    'automizy/functions/setWindowScroll',
    'automizy/functions/getUniqueString',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/functions/runFunctions',
    'automizy/images/icons'
], function () {
    var Table = function (obj) {
        var t = this;
        var d = $A.default.table;
        t.d = {
            $widget: $('<div class="automizy-table-box"></div>'),
            $tableContainerBox: $('<div class="automizy-table-container-box"></div>'),
            $tableContainer: $('<div class="automizy-table-container"></div>'),
            $table: $('<table cellpadding="0" cellspacing="0" border="0" class="automizy-table collapsed"></table>'),
            $tbody: $('<tbody></tbody>'),
            $header: $('<tr class="automizy-table-header"></tr>'),
            $title: $('<div class="automizy-table-title"></div>'),
            $headBox: $('<div class="automizy-table-head-box"></div>'),
            $bodyBox: $('<div class="automizy-table-body-box"></div>'),
            $actions: $('<div class="automizy-table-actions"></div>'),
            $buttons: $('<div class="automizy-table-buttons"></div>'),
            $otherActions: $('<div class="automizy-table-other-actions"></div>'),
            $perPageBox: $('<div class="automizy-table-perpage-box"></div>'),
            perPageSelect: $A.newInput(),
            $entriesBox: $('<div class="automizy-table-entries-box"></div>'),
            $stepPageBox: $('<div class="automizy-table-steppage-box"></div>'),
            $stepPageBoxWrapper: $('<div class="automizy-table-steppage-box-wrapper"></div>'),
            $stepFirst: $('<div class="automizy-table-stepfirst automizy-noselect automizy-table-step-element"></div>'),
            $stepBack: $('<div class="automizy-table-stepback automizy-noselect automizy-table-step-element"></div>'),
            $stepNext: $('<div class="automizy-table-stepnext automizy-noselect automizy-table-step-element"></div>'),
            $stepLast: $('<div class="automizy-table-steplast automizy-noselect automizy-table-step-element"></div>'),
            $pageBox: $('<div class="automizy-table-pagenumber-box  automizy-table-step-element automizy-table-step-active"></div>'),
            $page: $('<input type="number" placeholder="..." required="false" min="1" class="automizy-table-pagenumber">'),
            $pageMax: $('<span class="automizy-table-pagenumber-max">1</span>'),
            $panel: $('<div class="automizy-table-panel automizy-noselect"></div>'),
            $settingsIcon: $('<div class="automizy-table-settings-icon automizy-noselect automizy-table-panel-icon"></div>'),
            $settingsBox: $('<div class="automizy-table-settings-box"></div>'),
            $settingsBoxTitle: $('<div class="automizy-table-settings-box-title"></div>'),
            $settingsBoxContent: $('<form class="automizy-table-settings-box-content"></form>'),
            $searchBoxContent: $('<div class="automizy-table-search-box-content"></div>'),
            $searchInput: $A.newInput(),
            $exportIcon: $('<div class="automizy-table-export-icon automizy-noselect automizy-table-panel-icon"></div>'),
            $inlineButtons: $('<div class="automizy-table-inline-buttons"></div>'),
            $inlineButtonsPlaceholderCell: $('<td class="automizy-table-inline-buttons-placeholder-cell automizy-table-inline-buttons-cell"></td>'),
            $inlineButtonsCell: $('<td class="automizy-table-inline-buttons-cell"></td>'),
            $inlineButtonsRow: $('<tr class="automizy-table-inline-buttons-row"></tr>'),
            $checkboxCheckAll: $('<input type="checkbox" onclick="$A.d.tableRowCheckBoxClick = true;" class="automizy-table-checkall automizy-table-rowcheck" />'),
            $automizyTableBorderCss: $('<style></style>'),
            $loadingCellContent: $('<div class="automizy-table-loading-cell-content"></div>'),
            loadingCellContent: $A.translate('<b>Loading...</b>'),
            openedRow: false,
            buttons: [],
            inlineButtons: [],
            title: '',
            border: 'none',
            perPage: 10,
            perPageList: [5, 10, 50, 100, 1000],
            perPageLabel: $A.translate('results per page'),
            page: 1,
            pageMax: 1,
            searchValue: '',
            borderCollapse: true,
            settings: {
                cols: []
            },
            totalEntries: 0,
            settingsCheckboxes: {},
            orderBy: false,
            orderDir: 'asc',
            hasObject: false,
            selectable: false,
            exportable: true,
            openableInlineBox: false,
            clickableRow: false,
            storeData: false,
            id: 'automizy-table-' + $A.getUniqueString(),
            onPerPage: function () {
            },
            onPageFirst: function () {
            },
            onPagePrev: function () {
            },
            onPageNext: function () {
            },
            onPageLast: function () {
            },
            onSetPage: function () {
            },
            onSearch: function () {
            },
            onHideCol: function () {
            },
            onShowCol: function () {
            },
            onSort: function () {
            },
            onExport: function () {
            },
            beforeOpenInlineBox: function () {
            },
            stepFunction: function () {
                if (t.d.page <= 1) {
                    t.d.$stepFirst.add(t.d.$stepBack).addClass("automizy-table-step-disabled");
                } else {
                    t.d.$stepFirst.add(t.d.$stepBack).removeClass("automizy-table-step-disabled");
                }
                if (t.d.page >= t.d.pageMax) {
                    t.d.$stepNext.add(t.d.$stepLast).addClass("automizy-table-step-disabled");
                } else {
                    t.d.$stepNext.add(t.d.$stepLast).removeClass("automizy-table-step-disabled");
                }
                t.d.$page.val(t.d.page);
                t.writeEntries();
            }
        };
        t.init();

        t.d.$stepFirst.append('<span class="automizy-table-step-arrow">&#10094;&#10094;</span> '+$A.translate('First')).click(function () {
            if (t.d.page <= 1)return false;
            t.page(1);
            t.d.stepFunction();
            t.d.onPageFirst.apply(t, [t, t.d.$widget]);
        });
        t.d.$stepFirst.appendTo(t.d.$stepPageBoxWrapper);

        t.d.$stepBack.append('<span class="automizy-table-step-arrow">&#10094;</span> '+$A.translate('Previous')).click(function () {
            if (t.d.page <= 1)return false;
            t.page(Math.max(t.d.page - 1, 1));
            t.d.stepFunction();
            t.d.onPagePrev.apply(t, [t, t.d.$widget]);
        });
        t.d.$stepBack.appendTo(t.d.$stepPageBoxWrapper);

        t.d.$page.appendTo(t.d.$pageBox);

        t.d.$page.keydown(function (e) {
            var $t = $(this);
            // Allow: backspace, delete, tab, escape and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
                (e.keyCode == 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
                (e.keyCode == 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
            // Enter
            if (e.keyCode === 13) {
                $(this).blur();
            }
        }).keyup(function () {

        }).focus(function () {
            var $t = $(this);
            $t.data('old-val', $t.val());
        }).focusout(function () {
            var $t = $(this);
            var val = parseInt($t.val());
            var max = parseInt($t.attr('max'));
            var min = parseInt($t.attr('min'));
            if (isNaN(val)) {
                $t.val($t.data('old-val'));
            }
            if (val > max) {
                $t.val(max);
            } else if (val < min) {
                $t.val(min);
            }
            t.d.page = parseInt($t.val());
            if ($t.data('old-val') != $t.val()) {
                t.d.stepFunction();
                t.d.onSetPage.apply(t, [t, t.d.$widget]);
            }
        }).on('mousewheel', function (e) {
            e.preventDefault();
        });

        t.d.$pageBox.appendTo(t.d.$stepPageBoxWrapper);

        t.d.$stepNext.append($A.translate('Next') + ' <span class="automizy-table-step-arrow">&#10095;</span>').click(function () {
            if (t.d.page >= t.d.pageMax)return false;
            t.page(Math.min(t.d.page + 1, t.d.pageMax));
            t.d.stepFunction();
            t.d.onPageNext.apply(t, [t, t.d.$widget]);
        });
        t.d.$stepNext.appendTo(t.d.$stepPageBoxWrapper);

        t.d.$stepLast.append($A.translate('Last') + ' <span class="automizy-table-step-arrow">&#10095;&#10095;</span>').click(function () {
            if (t.d.page >= t.d.pageMax)return false;
            t.page(t.d.pageMax);
            t.d.stepFunction();
            t.d.onPageLast.apply(t, [t, t.d.$widget]);
        });
        t.d.$stepLast.appendTo(t.d.$stepPageBoxWrapper);


        t.d.$searchBoxContent.appendTo(t.d.$otherActions);
        t.d.$searchInput.placeholder($A.translate('Search in this list...')).enter(function () {
            t.d.searchValue = this.val();
            t.d.onSearch.apply(this, [t, t.d.$widget]);
        }).drawTo(t.d.$searchBoxContent);


        t.d.$perPageBox.appendTo(t.d.$otherActions);
        t.d.perPageSelect.type('select').options(t.d.perPageList).val(t.d.perPage).labelAfter(t.d.perPageLabel).change(function () {
            t.d.perPage = this.val();
            if (t.d.storeData) {
                $A.store.set(t.id() + '-per-page', t.d.perPage);
            }
            t.d.onPerPage.apply(this, [t, t.d.$widget]);
        }).drawTo(t.d.$perPageBox);
        t.d.$widget.attr('id', t.id());
        t.d.$tbody.appendTo(t.d.$table);
        t.d.$header.appendTo(t.d.$tbody);
        t.d.$title.html(t.d.title).appendTo(t.d.$headBox);
        t.d.$panel.appendTo(t.d.$headBox);
        t.d.$headBox.appendTo(t.d.$widget);
        t.d.$bodyBox.appendTo(t.d.$widget);
        t.d.$actions.appendTo(t.d.$bodyBox);
        t.d.$buttons.appendTo(t.d.$actions);
        t.d.$otherActions.appendTo(t.d.$actions);
        t.d.$tableContainerBox.appendTo(t.d.$bodyBox);
        t.d.$tableContainer.appendTo(t.d.$tableContainerBox);
        t.d.$table.appendTo(t.d.$tableContainer);
        t.d.$entriesBox.appendTo(t.d.$bodyBox);
        t.d.$stepPageBoxWrapper.appendTo(t.d.$stepPageBox);
        t.d.$stepPageBox.appendTo(t.d.$bodyBox);


        t.d.$settingsBox.appendTo(t.d.$panel).click(function () {
            t.d.settingsBoxCanClose = false;
        });
        t.d.$settingsBoxContent.appendTo(t.d.$settingsBox);
        t.d.$settingsBoxTitle.text($A.translate('Displayed columns')).appendTo(t.d.$settingsBoxContent);

        setTimeout(function () {
            t.d.$settingsIcon.append('<img src="' + $A.images.settingsIcon + '" />').insertAfter(t.d.$settingsBox).click(function () {
                t.d.$settingsBoxContent.stop().slideToggle();
                t.d.settingsBoxCanClose = false;
            });
            t.d.$exportIcon.append('<img src="' + $A.images.exportIcon + '" />').appendTo(t.d.$panel).click(function () {
                t.d.onExport.apply(t, [t, t.d.$widget]);
            });
        }, 1);


        $(window).click(function () {
            if (t.d.settingsBoxCanClose) {
                t.d.$settingsBoxContent.stop().slideUp(250);
            }
            t.d.settingsBoxCanClose = true;
            t.d.searchBoxCanClose = true;
        });

        t.d.$inlineButtonsPlaceholderCell.appendTo(t.d.$inlineButtonsRow);
        t.d.$inlineButtonsCell.appendTo(t.d.$inlineButtonsRow);
        t.d.$inlineButtons.appendTo(t.d.$inlineButtonsCell);
        t.d.$automizyTableBorderCss.appendTo('head:first');
        t.d.$checkboxCheckAll.change(function () {
            var checked = this.checked;
            var cells = t.getColByIndex(0).$cells().find('input:enabled').prop('checked', checked);
        });
        t.border(t.d.border);
        t.borderCollapse(t.d.borderCollapse);
        var oSelectable = false;
        if (t.d.selectable) {
            t.d.selectable = false;
            oSelectable = true;
        }

        t.d.$loadingCellContent.html(t.d.loadingCellContent);

        $A.d.inlineEditClick = false;


        if (typeof obj !== 'undefined') {
            if (obj instanceof HTMLElement) {
                obj = $(obj);
            }
            if (obj instanceof jQuery) {
                t.d.$widget = obj;
                if (obj.find('.automizy-table-title').length === 1)t.title(obj.find('.automizy-table-title').html());
                if (obj.find('.automizy-table th:first input').length === 1)t.d.selectable = true;
            } else {
                if (typeof obj.id !== 'undefined')
                    t.id(obj.id);
                if (typeof obj.storeData !== 'undefined')
                    t.storeData(obj.storeData);
                if (typeof obj.title !== 'undefined')
                    t.title(obj.title);
                if (typeof obj.border !== 'undefined')
                    t.border(obj.border || t.d.border);
                if (typeof obj.borderCollapse !== 'undefined')
                    t.borderCollapse(obj.borderCollapse);
                if (typeof obj.cols !== 'undefined')
                    t.cols(obj.cols);
                if (typeof obj.rows !== 'undefined')
                    t.rows(obj.rows);
                if (typeof obj.exportable !== 'undefined')
                    t.exportable(obj.exportable);
                if (typeof obj.selectable !== 'undefined')
                    setTimeout(function () {
                        t.selectable(obj.selectable)
                    }, 10);
                if (typeof obj.perPageList !== 'undefined')
                    t.perPageList(obj.perPageList);
                if (typeof obj.perPage !== 'undefined')
                    t.perPage(obj.perPage);
                if (typeof obj.perPageLabel !== 'undefined')
                    t.perPageLabel(obj.perPageLabel);
                if (typeof obj.page !== 'undefined')
                    t.page(obj.page);
                if (typeof obj.pageMax !== 'undefined')
                    t.pageMax(obj.pageMax);
                if (typeof obj.searchValue !== 'undefined')
                    t.searchValue(obj.searchValue);
                if (typeof obj.onPageFirst === 'function')
                    t.onPageFirst(obj.onPageFirst);
                if (typeof obj.onPagePrev === 'function')
                    t.onPagePrev(obj.onPagePrev);
                if (typeof obj.onPageNext === 'function')
                    t.onPageNext(obj.onPageNext);
                if (typeof obj.onPageLast === 'function')
                    t.onPageLast(obj.onPageLast);
                if (typeof obj.onSetPage === 'function')
                    t.onSetPage(obj.onSetPage);
                if (typeof obj.onSort === 'function')
                    t.onSort(obj.onSort);
                if (typeof obj.onPerPage === 'function')
                    t.onPerPage(obj.onPerPage);
                if (typeof obj.onShowCol === 'function')
                    t.onShowCol(obj.onShowCol);
                if (typeof obj.onSearch === 'function')
                    t.onSearch(obj.onSearch);
                if (typeof obj.onExport === 'function')
                    t.onExport(obj.onExport);
                if (typeof obj.buttons !== 'undefined')
                    t.tableButtons(obj.buttons);
                if (typeof obj.inlineButtons !== 'undefined')
                    t.inlineButtons(obj.inlineButtons);
                if (typeof obj.openableInlineBox !== 'undefined')
                    t.openableInlineBox(obj.openableInlineBox);
                if (typeof obj.clickableRow !== 'undefined')
                    t.clickableRow(obj.clickableRow);
                if (typeof obj.beforeOpenInlineBox === 'function')
                    t.beforeOpenInlineBox(obj.beforeOpenInlineBox);
                if (typeof obj.loadingCellContent !== 'undefined')
                    t.loadingCellContent(obj.loadingCellContent);
                if (typeof obj.totalEntries !== 'undefined')
                    t.totalEntries(obj.totalEntries);
                t.initParameter(obj);

            }
        }

        if (oSelectable) {
            t.selectable(true);
        }
        t.setButtonsStatus();
        t.d.stepFunction();
    };

    var p = Table.prototype;

    p.table = function () {
        return this.d.$table;
    };
    p.tbody = function () {
        return this.d.$tbody;
    };

    p.storeData = function (storeData) {
        var t = this;
        if (typeof storeData !== 'undefined') {
            t.d.storeData = $A.parseBoolean(storeData);
            return t
        }
        return t.d.storeData;
    };

    p.totalEntries = function (num) {
        var t = this;
        if (typeof num !== 'undefined') {
            t.d.totalEntries = parseInt(num);
            return t;
        }
        return t.d.totalEntries;
    };

    p.writeEntries = function () {
        var t = this;
        var total = t.totalEntries();
        t.d.$entriesBox.html('');

        if(total > 0){
            var actualPage = t.page();
            var perPage = t.perPage();

            var showFirst = (actualPage - 1) * perPage + 1;
            //var $showFrom = $('<span>' + $A.translate("Showing ") + showFirst + ' </span>');

            var showLast = showFirst + perPage - 1;
            if (showLast > total) {
                showLast = total;
            }
            //var $showTo = $('<span>' + $A.translate('to ') + showLast + ' </span>');

            //var $showTotal = $('<span>' + $A.translate("of ") + total + ' entries</span>');



            //t.d.$entriesBox.append($showFrom).append($showTo).append($showTotal);

            t.d.$entriesBox.append('<span>' + $A.translate('Showing %s to %s of %s entries', showFirst, showLast, total) + '</span>');
        }
        else{
            t.d.$entriesBox.append('<span>'+$A.translate('There are no entries to show.')+'</span>');
        }
    };

    p.onPageFirst = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.onPageFirst = func;
        } else {
            t.d.stepFunction();
            if (t.d.hasObject)t.d.onPageFirst.apply(t, [t, t.d.$widget]);
        }
        return t;
    };
    p.onPagePrev = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.onPagePrev = func;
        } else {
            t.d.stepFunction();
            if (t.d.hasObject)t.d.onPagePrev.apply(t, [t, t.d.$widget]);
        }
        return t;
    };
    p.onPageNext = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.onPageNext = func;
        } else {
            t.d.stepFunction();
            if (t.d.hasObject)t.d.onPageNext.apply(t, [t, t.d.$widget]);
        }
        return t;
    };
    p.onPageLast = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.onPageLast = func;
        } else {
            t.d.stepFunction();
            if (t.d.hasObject)t.d.onPageLast.apply(t, [t, t.d.$widget]);
        }
        return t;
    };
    p.onSetPage = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.onSetPage = func;
        } else {
            t.d.stepFunction();
            if (t.d.hasObject)t.d.onSetPage.apply(t, [t, t.d.$widget]);
        }
        return t;
    };
    p.onPerPage = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.onPerPage = func;
        } else {
            return t.d.onPerPage.apply(t, [t, t.d.$widget]);
        }
        return this;
    };
    p.onSearch = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.onSearch = func;
        } else {
            return t.d.onSearch.apply(t, [t, t.d.$widget]);
        }
        return this;
    };
    p.onHideCol = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.onHideCol = func;
        } else {
            return t.d.onHideCol.apply(t, [t, t.d.$widget]);
        }
        return this;
    };
    p.onShowCol = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.onShowCol = func;
        } else {
            return t.d.onShowCol.apply(t, [t, t.d.$widget]);
        }
        return this;
    };
    p.onSort = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.onSort = func;
        } else {
            if (t.d.hasObject)t.d.onSort.apply(t, [t, t.d.$widget]);
        }
        return t;
    };
    p.onExport = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.onExport = func;
        } else {
            if (t.d.hasObject)t.d.onExport.apply(t, [t, t.d.$widget]);
        }
        return t;
    };

    p.border = function (border) {
        var t = this;
        if (typeof border !== 'undefined') {
            t.d.border = border;
            t.d.$automizyTableBorderCss.text('#' + t.id() + ' .automizy-table, #' + t.id() + ' .automizy-table td, #' + t.id() + ' .automizy-table th{border: ' + border + '}');
            return t;
        }
        return t.d.border;
    };
    //nem megy, mindig collapsed
    p.borderCollapse = function (borderCollapse) {
        var t = this;
        if (typeof borderCollapse !== 'undefined') {
            t.d.borderCollapse = $A.parseBoolean(borderCollapse);
            t.table().removeClass('collapsed');
            if (t.d.borderCollapse) {
                t.table().addClass('collapsed');
            }
            return t;
        }
        return t.d.borderCollapse;
    };
    p.title = function (title) {
        var t = this;
        if (typeof title !== 'undefined') {
            t.d.title = title;
            t.d.$title.html(title);
            return t;
        }
        return t.d.title;
    };
    p.searchValue = function (searchValue) {
        var t = this;
        if (typeof searchValue !== 'undefined') {
            t.d.searchValue = searchValue;
            t.d.$searchInput.value(t.d.searchValue);
            return t;
        }
        return t.d.searchValue;
    };
    p.perPageList = function (perPageList) {
        var t = this;
        if (typeof perPageList !== 'undefined') {
            t.d.perPageList = perPageList;
            t.d.perPageSelect.options(perPageList);
            t.perPage(t.perPage());
            return t;
        }
        return t.d.perPageList;
    };
    p.perPage = function (perPage) {
        var t = this;
        if (typeof perPage !== 'undefined') {
            perPage = parseInt(perPage);
            if ($.inArray(perPage, t.d.perPageList) < 0) {
                perPage = t.d.perPageList[0] || 0;
            }
            t.d.perPage = perPage;
            t.d.perPageSelect.val(perPage);
            if (t.d.storeData) {
                $A.store.set(t.id() + '-per-page', t.d.perPage);
            }
            if (t.d.hasObject)t.d.onPerPage.apply(t.d.perPageSelect, [t, t.d.$widget]);
            return t;
        }
        return t.d.perPage;
    };
    p.perPageLabel = function (perPageLabel) {
        var t = this;
        if (typeof perPageLabel !== 'undefined') {
            t.d.perPageLabel = perPageLabel;
            t.d.perPageSelect.label(perPageLabel);
            return t;
        }
        return t.d.perPageLabel;
    };
    p.page = function (page) {
        var t = this;
        if (typeof page !== 'undefined') {
            t.d.page = parseInt(page);
            t.d.$page.val(t.d.page);
            return t;
        }
        return t.d.page;
    };
    p.pageMax = function (pageMax) {
        var t = this;
        if (typeof pageMax !== 'undefined') {
            t.d.pageMax = parseInt(pageMax);
            t.d.$pageMax.text($A.numberFormat(t.d.pageMax));
            t.d.$page.attr('max', t.d.pageMax);
            return t;
        }
        return t.d.pageMax;
    };
    p.selectable = function (selectable) {
        var t = this;
        if (typeof selectable !== 'undefined') {
            var oSelectable = t.d.selectable;
            t.d.selectable = $A.parseBoolean(selectable);
            if (t.d.selectable && !oSelectable) {
                t.table().addClass('checkboxed');
                $A.d.tableRowCheckBoxClick = false;
                var cbcagac = t.addCol({name: 'checkbox-column', html: t.d.$checkboxCheckAll, index: 0});
                cbcagac.$cells().eq(0).click(function () {
                    if (!$A.d.tableRowCheckBoxClick) {
                        $(this).find('input:first').each(function () {
                            this.checked = !this.checked;
                            $(this).trigger('change');
                        });
                    }
                    $A.d.tableRowCheckBoxClick = false;
                });
                var $cbcagac = cbcagac.$cells().slice(1);
                $cbcagac.html(function () {
                    var id = $(this).closest('tr').data('recordId') || 0;
                    return $('<input type="checkbox" class="automizy-table-rowcheck" onClick="console.log(2)" value="' + id + '" />');
                }).click(function () {
                });
            } else if (!t.d.selectable && oSelectable) {
                t.table().removeClass('checkboxed');
                t.deleteCol(0);
            }
            return t;
        }
        return t.d.selectable;
    };
    p.exportable = function (exportable) {
        var t = this;
        if (typeof exportable !== 'undefined') {
            t.d.exportable = $A.parseBoolean(exportable);
            if (exportable === false)
                t.d.$exportIcon.hide();
            return t;
        }
        return t.d.exportable;
    };
    p.openableInlineBox = function (openableInlineBox) {
        var t = this;
        if (typeof openableInlineBox !== 'undefined') {
            t.d.openableInlineBox = $A.parseBoolean(openableInlineBox);
            if (openableInlineBox === false){
                t.table().removeClass('automizy-table-with-openable-inline-box');
                t.d.$inlineButtonsRow.hide();
            }
            else{
                t.table().addClass('automizy-table-with-openable-inline-box');
            }
            t.clickableRow(t.d.openableInlineBox);
            return t;
        }
        return t.d.openableInlineBox;
    };
    p.clickableRow = function (clickableRow) {
        var t = this;
        if (typeof clickableRow !== 'undefined') {
            t.d.clickableRow = $A.parseBoolean(clickableRow);
            if (clickableRow === false) {
                t.d.$table.removeClass('automizy-table-clickable');
            } else {
                t.d.$table.addClass('automizy-table-clickable');
            }
            return t;
        }
        return t.d.clickableRow;
    };
    p.beforeOpenInlineBox = function (func) {
        var t = this;
        if (typeof func === 'function') {
            t.d.beforeOpenInlineBox = func;
            return this;
        }
        return this;
    };
    p.selectedRows = function () {
        var t = this;
        var rows = [];
        var ids = t.selectedIds();
        for (var i = 0; i < ids.length; i++) {
            rows.push(t.getRowByRecordId(ids[i]));
        }
        return rows;
    };
    p.selectedRow = function () {
        var t = this;
        if (typeof t.selectedId() === 'undefined')
            return false;
        return t.getRowByRecordId(t.selectedId());
    };
    p.selectedIds = function () {
        var t = this;
        var col = t.getColByIndex(0);
        if (typeof col.$cells === 'function') {
            return col.$cells().find('input[type="checkbox"][value]:checked').map(function () {
                return this.value
            }).get();
        }
        return [];
    };
    p.selectedId = function () {
        var t = this;

        var col = t.getColByIndex(0);
        if (typeof col.$cells === 'function') {
            return col.$cells().find('input[type="checkbox"][value]:checked:first').val();
        }
        return [];
    };
    p.openedRow = function (openedRow) {
        var t = this;
        if (typeof openedRow !== 'undefined') {
            t.d.openedRow = openedRow;
            return t;
        }
        return t.d.openedRow;
    };

    p.openedId = function () {
        var t = this;
        if (t.d.openedRow !== false)
            return t.d.openedRow.recordId();
        return false;
    };

    p.getCell = function (colIndex, rowIndex) {
        var t = this;
        var $cell = t.table().find('tr:first').siblings().addBack().eq(rowIndex).find('td, th').eq(colIndex);
        return $A.tableCell($cell);
    };


    p.getCells = function (type) {
        var t = this;
        var tableId = t.id();

        var type = type || 'Automizy';
        if (type === 'jQuery') {
            return t.table().find('th, td');
        } else {
            var tableDom = t.table()[0];
            var cells = [];
            for (var i = 0; i < tableDom.rows.length; i++) {
                for (var j = 0; j < tableDom.rows[i].cells.length; j++) {
                    var cell = tableDom.rows[i].cells[j];
                    if (type === 'DOM') {
                        cells.push(cell);
                    } else {
                        cells.push($A.tableCell(cell));
                    }
                }
            }
            return cells;
        }
    };
    p.$getCells = function () {
        return this.getCells('jQuery');
    };
    p.getDomCells = function () {
        return this.getCells('DOM');
    };


    p.getRowByIndex = function (index) {
        var $row = this.table().find('tr:first').siblings().addBack().eq(index);
        if ($row.length === 0) {
            return false;
        }
        return $A.tableRow($row);
    };
    p.getRowByRecordId = function (recordId) {
        var t = this;
        var $row = t.table().find('tr:first').siblings().addBack().filter(function () {
            return $(this).data('recordId') == recordId;
        });
        if ($row.length === 0) {
            return false;
        }
        return $A.tableRow($row);
    };
    p.getColByIndex = function (index) {
        var $col = this.table().find('th:first').siblings().addBack().eq(index);
        if ($col.length === 0) {
            return false;
        }
        return $A.tableCol($col);
    };
    p.getColByName = function (name) {
        var t = this;
        var $col = t.table().find('th:first').siblings().addBack().filter(function () {
            return $(this).data('name') == name;
        });
        if ($col.length === 0) {
            return false;
        }
        return $A.tableCol($col);
    };

    p.addCols = function (arr) {
        var t = this;
        if (!$.isArray(arr))
            return t.addCols([arr]);

        var table = t.table()[0];
        t.d.settings.cols = [];
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            var index = -1;
            if (typeof obj.index !== 'undefined') {
                index = parseInt(obj.index);
            }
            for (var j = 0; j < table.rows.length; j++) {
                var cell = table.rows[j].insertCell(index);

                var visibility = (obj.visibility === false) ? false : true;
                if (t.d.storeData && typeof $A.store.get(t.id() + "ActiveCols") !== 'undefined') {
                    var activeCols = $A.store.get(t.id() + "ActiveCols");
                    if (typeof activeCols[obj.name] !== 'undefined') {
                        visibility = $A.parseBoolean(activeCols[obj.name]);
                    }
                }

                if (visibility === false) {
                    cell.style.display = 'none';
                }
                if (j === 0) {
                    var $cell = $(cell);
                    if (t.d.selectable && $cell.siblings().length <= 0) {
                        $(table.rows[0].insertCell(0)).replaceWith(function () {
                            var $th = $("<th />");
                            t.d.$checkboxCheckAll.appendTo($th);
                            /*var th = $th[0];
                             th.automizyData = th.automizyData || {};
                             th.automizyData.name = 'automizyCheckboxCheckAll';*/
                            return $th;
                        });
                    }

                    if (typeof obj.name === 'undefined') {
                        obj.name = $A.getUniqueString();
                    }
                    if (obj.hideable !== false) {
                        t.addSettingsCheckbox({
                            name: obj.name,
                            label: obj.text,
                            checked: visibility
                        });
                    }

                    $cell.replaceWith(function () {
                        var $th = $("<th />").append($(this).contents());
                        if (visibility === false) {
                            $th.hide();
                        }
                        $th.data('name', obj.name);
                        $th.data('editable', obj.editable || false);
                        $th.data('setInlineInputObject', obj.setInlineInputObject);
                        $th.data('onInlineEditComplete', obj.onInlineEditComplete);
                        $th.data('data', obj.data);
                        var th = $th[0];
                        th.automizyData = th.automizyData || {};
                        th.automizyData.name = obj.name;

                        if (typeof obj.order !== 'undefined') {
                            t.d.orderBy = obj.name;
                            t.d.orderDir = obj.order;
                        }
                        if (typeof obj.text !== 'undefined') {
                            $th.append(obj.text);
                        }
                        if (typeof obj.html !== 'undefined') {
                            if (obj.html instanceof jQuery) {
                                obj.html.appendTo($th);
                            } else {
                                $th.append(obj.html);
                            }
                        }
                        if (obj.sortable !== false) {
                            var $sort = $('<span class="automizy-table-sort-arrow automizy-noselect"></span>');

                            $th.click(function () {
                                var $thth = $(this);
                                $thth.siblings().find('.automizy-table-sort-arrow').removeClass('asc desc');
                                var thObj = t.d.settings.cols.filter(function (elem) {
                                    return elem.name === $thth.data('name');
                                })[0];
                                if (thObj.order === 'asc') {
                                    thObj.order = 'desc';
                                    $sort.switchClass("asc", "desc", 250, "linear");
                                } else {
                                    thObj.order = 'asc';
                                    $sort.switchClass("desc", "asc", 250, "linear");
                                }
                                t.d.orderBy = thObj.name;
                                t.d.orderDir = thObj.order;
                                t.d.onSort.apply(thObj, [t, t.d.$widget]);
                            });

                            if (typeof obj.order !== 'undefined') {
                                $sort.addClass(obj.order);
                            }
                            $sort.appendTo($th);
                        }

                        obj.col = $A.tableCol($th);
                        t.d.settings.cols.push(obj);
                        return $th;
                    });
                }
            }
        }
        return t;
    };
    p.addSettingsCheckbox = function (obj) {
        var t = this;
        var name = obj.name || $A.getUniqueString();
        var label = obj.label || name;
        var checked = obj.checked || false;
        t.d.settingsCheckboxes[name] = $A.input({
            type: 'checkbox',
            label: label,
            name: name,
            labelPosition: 'right',
            checked: checked,
            target: t.d.$settingsBoxContent,
            change: function () {
                var name = this.name();
                var col = t.getColByName(name);
                if (!this.checked()) {
                    col.hide();
                    t.d.onHideCol.apply(col, [t, t.widget()]);
                } else {
                    col.show();
                    t.d.onShowCol.apply(col, [t, t.widget()]);
                }
                if (t.d.storeData) {
                    $A.store.set(t.id() + 'ActiveCols', t.d.$settingsBoxContent.serializeObject(true));
                }
            }
        });
        return t;
    };
    p.getSettingsCheckbox = function (name) {
        return this.d.settingsCheckboxes[name];
    };
    p.removeSettingsCheckbox = function (name) {
        var t = this;
        var settingCheckbox = t.d.settingsCheckboxes[name];
        if (typeof settingCheckbox !== 'undefined' && typeof settingCheckbox.remove === 'function') {
            settingCheckbox.remove();
        }
        return t;
    };
    p.addCol = function (obj) {
        var t = this;
        if (typeof obj === 'undefined') {
            return $A.newTableCol();
        }
        obj.table = obj.table || t;
        obj.newCol = true;
        return $A.tableCol(obj);
    };
    p.cols = function (arr) {
        var t = this;
        if (typeof arr === 'undefined') {
            var cols = [];
            this.table().find('th:first').siblings().addBack().each(function () {
                cols.push($A.tableCol($(this)));
            });
            return cols;
        }
        t.deleteCols();
        return t.addCols(arr);
    };
    p.deleteCols = function (arr) {
        var t = this;
        var table = t.table()[0];
        if (typeof arr !== 'undefined') {
            var sortArr = arr.sort();
            for (var i = 0; i < table.rows.length; i++) {
                for (var j = sortArr.length - 1; j >= 0; j--) {
                    if (i === 0) {
                        t.removeSettingsCheckbox($(table.rows[i].cells[j]).attr('name'));
                    }
                    table.rows[i].deleteCell(sortArr[j]);
                }
            }
            return t;
        }

        var cols = t.cols();
        for (var i = 0; i < cols.length; i++) {
            t.removeSettingsCheckbox(cols[i].name());
        }
        t.removeSettingsCheckbox($(table.rows[i].cells[j]).attr('name'));

        var lastCol = table.rows[0].cells.length - 1;
        for (var i = 0; i < table.rows.length; i++) {
            for (var j = lastCol; j > 0; j--) {
                table.rows[i].deleteCell(j);
            }
        }
        return t;
    };
    p.deleteCol = function (index) {
        var t = this;
        return t.deleteCols([index]);
    };

    p.addRows = function (arr) {
        var t = this;
        if (!$.isArray(arr)) {
            return t.addRows([arr]);
        }

        $A.runFunctions($A.events.table.functions.beforeAddRows, t, [t, arr]);

        var table = t.table()[0];
        for (var i = 0; i < arr.length; i++) {
            var recordId = 0;
            var rowArr = arr[i];
            var rowIndex = table.rows.length;
            if (!$.isArray(arr[i])) {
                if (typeof rowArr.index !== 'undefined') {
                    rowIndex = parseInt(rowArr.index);
                    if (rowIndex < 1)rowIndex = 1;
                }
                recordId = rowArr.recordId || recordId;
                rowArr = rowArr.values || [];
            }
            var row = table.insertRow(rowIndex);
            $(row).data('recordId', recordId).click(function (event) {
                var $t = $(this);
                setTimeout(function () {
                    if ($A.d.tableRowCheckBoxClick === false) {
                        if ($(event.target).is('td')) {
                            t.openedRow($A.tableRow($t));
                            t.d.beforeOpenInlineBox.apply($t, [t.openedRow(), t.d.openedRow.recordId()]);
                            if (t.d.openableInlineBox) {
                                var oldInlineIndex = t.d.$inlineButtonsRow.index();
                                t.d.$inlineButtonsCell.attr('colspan', t.table()[0].rows[0].cells.length - t.table().find('tr:first th:not(:visible)').length);
                                t.d.$inlineButtonsRow.insertAfter($t);
                                t.d.$inlineButtonsCell.show();
                                t.d.$inlineButtonsPlaceholderCell.show();
                                if (oldInlineIndex === t.openedRow().index() + 1) {
                                    t.d.$inlineButtons.slideToggle(function () {
                                        if (t.d.$inlineButtons.is(':visible') === false) {
                                            t.d.$inlineButtonsCell.hide();
                                            $t.removeClass('automizy-inline-buttons-opened');
                                            t.d.$inlineButtonsPlaceholderCell.hide();
                                        }
                                    });
                                }
                                else {
                                    t.d.$inlineButtons.slideDown();
                                    $t.siblings().each(function(){
                                        $(this).removeClass('automizy-inline-buttons-opened');
                                    });
                                    $t.addClass('automizy-inline-buttons-opened');
                                }

                            }
                        }
                        $A.d.inlineEditClick = false;
                    }
                    $A.d.tableRowCheckBoxClick = false;
                }, 10);
            });

            if (!$.isArray(rowArr)) {
                var newArr = [];
                for (var j = t.d.selectable ? 1 : 0; j < table.rows[0].cells.length; j++) {
                    var ad = table.rows[0].cells[j].automizyData;
                    if (typeof ad === 'undefined') {
                        ad = {};
                    }
                    var a = rowArr[ad.name];
                    newArr.push((typeof a !== 'undefined') ? a : '');
                }
                rowArr = newArr;
            }

            if (t.d.selectable) {
                rowArr.unshift({
                    html: '<input type="checkbox" class="automizy-table-rowcheck" onClick="$A.d.tableRowCheckBoxClick = true;" value="' + recordId + '" />',
                    click: function () {
                        if (!$A.d.tableRowCheckBoxClick) {
                            $(this).find('input:first').each(function () {
                                this.checked = !this.checked;
                                $(this).trigger('change');
                            });
                        }
                        $A.d.tableRowCheckBoxClick = true;
                    }
                });
            }
            for (var j = 0; j < table.rows[0].cells.length; j++) {
                var isEditable = $(table).find('th:eq(' + (j) + ')').data('editable');

                var cell = row.insertCell(j);
                if (j === 0 && t.d.selectable === false) {
                    cell.className = 'automizy-main-cell';
                }

                var value = rowArr[j];
                if (typeof value === 'undefined' || !value) {
                    value = '';
                }
                if (typeof value.drawTo === 'function') {
                    if (isEditable) {
                        value.drawTo($('<span class="automizy-table-cell-editable-content"></span>').appendTo($(cell)));
                    } else {
                        value.drawTo($(cell));
                    }
                } else if (value instanceof jQuery) {
                    if (isEditable) {
                        value.appendTo($('<span class="automizy-table-cell-editable-content"></span>').appendTo($(cell)));
                    } else {
                        value.appendTo($(cell));
                    }
                } else if (value !== null && typeof value === 'object') {
                    if (typeof value.html !== 'undefined') {
                        if (isEditable) {
                            cell.innerHTML = '<span class="automizy-table-cell-editable-content">' + value.html + '</span>'
                        }
                        else {
                            cell.innerHTML = value.html;
                        }
                    }
                    if (typeof value.text !== 'undefined') {
                        cell.textContent = value.text;
                        cell.title = value.text;
                    }
                    cell.onclick = value.click || function () {
                        };

                } else {
                    if (isEditable) {
                        cell.innerHTML = '<span class="automizy-table-cell-editable-content">' + value + '</span>'

                    }
                    else {
                        cell.textContent = value;
                        cell.title = value;
                    }
                }
                var jMod = t.d.selectable ? j - 1 : j;
                if (typeof t.d.settings.cols[jMod] !== 'undefined') {
                    if (typeof t.d.settings.cols[jMod].cellFunction === 'function') {
                        if (typeof t.d.settings.cols[jMod].cellData !== 'undefined') {
                            cell.automizyData = t.d.settings.cols[jMod].cellData;
                        }
                        t.d.settings.cols[jMod].cellFunction.apply(cell, [cell, value, i, j]);
                    }
                    if (typeof t.d.settings.cols[jMod].mainCell !== 'undefined') {
                        if ($A.parseBoolean(t.d.settings.cols[jMod].mainCell)) {
                            cell.className = 'automizy-main-cell';
                        }
                    }
                }

                if (table.rows[0].cells[j].style.display === 'none') {
                    cell.style.display = 'none'
                }
            }
        }
        $A.runFunctions($A.events.table.functions.addRows, t, [t, table.rows]);
        return t;
    };
    p.addRow = function (arr) {
        var t = this;
        if (typeof arr === 'undefined') {
            return $A.newTableRow();
        } else if (typeof arr === 'object' || typeof arr === 'array') {
            return t.addRows(arr);
        }
        return t;
    };
    p.rows = function (arr) {
        var t = this;
        if (typeof arr === 'undefined') {
            var rows = [];
            this.table().find('tr:first').siblings().addBack().each(function () {
                rows.push($A.tableRow($(this)));
            });
            return rows;
        }
        t.deleteRows();
        return t.addRows(arr);
    };
    p.rowCount = function () {
        return this.rows().length - 1;
    };
    p.deleteRows = function (arr) {
        var t = this;
        var table = t.table()[0];
        if (typeof arr !== 'undefined') {
            var sortArr = arr.sort();
            for (var i = (sortArr.length - 1); i >= 0; i--) {
                table.deleteRow(sortArr[i]);
            }
            return t;
        }

        var lastRow = table.rows.length - 1;
        for (var i = lastRow; i > 0; i--) {
            table.deleteRow(i);
        }
        return t;
    };
    p.deleteRow = function (index) {
        var t = this;
        return t.deleteRows([index]);
    };

    p.setButtonsStatus = function () {
        var t = this;
        var buttons = t.buttons();
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            if (button.data('condition') !== 'undefined') {
                var condition = button.data('condition');
                var autoHide = button.data('autoHide') || false;
                if (condition === 'select-one') {
                    if (t.selectedIds().length === 1) {
                        button.show();
                        button.enable();
                    } else {
                        if (autoHide) {
                            button.hide();
                        }
                        button.disable();
                    }
                } else if (condition === 'select-more-than-zero') {
                    if (t.selectedIds().length >= 1) {
                        button.show();
                        button.enable();
                    } else {
                        if (autoHide) {
                            button.hide();
                        }
                        button.disable();
                    }
                } else if (condition === 'select-between-two-and-four') {
                    if (t.selectedIds().length >= 2 && t.selectedIds().length <= 4) {
                        button.show();
                        button.enable();
                    } else {
                        if (autoHide) {
                            button.hide();
                        }
                        button.disable();
                    }
                }
            }
        }
        return t;
    };

    p.tableButtons = function (arr) {
        var t = this;
        if (typeof arr === 'undefined')
            return t.d.buttons;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].condition !== 'undefined') {
                arr[i].data = arr[i].data || {};
                arr[i].data.condition = arr[i].condition;
            }
            if (arr[i].autoHide !== 'undefined') {
                arr[i].data = arr[i].data || {};
                arr[i].data.autoHide = arr[i].autoHide;
            }
        }
        t.buttons(arr);
        t.table().on('change', 'input.automizy-table-rowcheck, input.automizy-table-checkall', function () {
            t.setButtonsStatus();
        });
        return t;
    };
    p.inlineButtons = function (inlineButtons) {
        var t = this;
        if (typeof inlineButtons !== 'undefined') {
            t.d.inlineButtons = inlineButtons;
            t.openableInlineBox(true)
            for (var i = 0; i < inlineButtons.length; i++) {
                var inlineButton = inlineButtons[i];
                var title = inlineButton.title || '';
                var content = inlineButton.text || inlineButton.html;
                var $button = $('<a title="' + title + '">' + content + '</a>').data('click', inlineButton.click || function () {
                    }).click(function () {
                    var $t = $(this);
                    var $row = $t.closest('tr').prev();
                    var row = $A.tableRow($row);
                    t.openedRow(row);
                    $t.data('click').apply(row, [t, t.d.$widget]);
                }).appendTo(t.d.$inlineButtons);
                if (!inlineButton.permission) {
                    $button.wrap('<span class="automizy-permission-trap"></span>');
                }
            }
            return t;
        }
        return t.d.inlineButtons;
    };
    p.loading = function () {
        var t = this;
        if (t.table().find('tr.automizy-table-loading-row').length > 0) {
            return t;
        }
        //setTimeout(function(){
        t.deleteRows();
        t.setButtonsStatus();
        var $tr = $('<tr class="automizy-table-loading-row"></tr>');
        var $td = $('<td colspan="' + t.getRowByIndex(0).$cells().length + '"></td>').appendTo($tr);
        t.d.$loadingCellContent.appendTo($td);
        $tr.appendTo(t.table());
        $A.runFunctions($A.events.table.functions.loading, t, [t]);
        //}, 10);
        return t;
    };
    p.loadingCellContent = function (loadingCellContent) {
        var t = this;
        if (typeof loadingCellContent !== 'undefined') {
            if (loadingCellContent instanceof jQuery) {
                loadingCellContent = loadingCellContent.clone();
            }
            t.d.loadingCellContent = loadingCellContent;
            t.d.$loadingCellContent.html(loadingCellContent);
            return t;
        }
        return t.d.loadingCellContent;
    };
    p.addButton = p.addButton || function (obj) {
            var t = this;
            if (typeof t.d.buttons === 'undefined') {
                return t;
            }
            if (typeof obj !== 'undefined') {
                if (obj instanceof $A.m.Button || obj instanceof $A.m.Input) {
                    obj.drawTo(t.d.$buttons || t.d.$widget);
                    obj.thin(false);
                } else {
                    obj.thin = false;
                    obj.target = obj.target || t.d.$buttons || t.d.$widget;
                    var button = $A.newButton(obj);
                    t.d.buttons.push(button);
                }
                t.d.$widget.addClass('has-button');
                return t;
            }
            var button = $A.newButton();
            t.d.buttons.push(button);
            button.drawTo(t.d.$buttons || t.d.$widget);
            return button;
        };

    /*Opening inline editor*/
    $(function () {
        $('body').on('click', '.automizy-table-cell-editable-content', function (e) {

            /*If true, opening inlineButtonsBox will be prevented*/
            $A.d.inlineEditClick = true;

            var $editableContent = $(e.target);

            var $cell = $editableContent.closest('td');
            var $row = $cell.closest('tr');
            var table = $A.getTable($cell.closest('.automizy-table-box').attr('id'));
            var cell = table.getCell($cell.index(), $row.index());


            cell.inlineEdit()
        });

    });

    $A.initBasicFunctions(Table, "Table", ['addRows', 'beforeAddRows', 'beforeOpenInlineBox', 'loading']);

});