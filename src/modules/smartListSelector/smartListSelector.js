define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/images/icons'
], function () {
    var SmartListSelector = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-smart-list-selector"></div>'),
            $noListContent: $('<div style="text-align:center;color:#cacaca;font-weight:bold;font-size:14px;"></div>'),

            noListButton: $A.newButton({
                skin: 'simple-blue',
                text: $A.translate('Create List'),
                margin: '22px 0 12px 0',
                width: '150px',
                click: function () {
                    t.d.popoverCreateListButton.click();
                }
            }),
            searchInput:$A.newInput2({
                placeholder: $A.translate('Click to choose list(s)'),
                iconRight: 'fa-search',
                automizyChange: function () {
                    t.d.popoverSmartListList.search(this.val());
                },
                focus: function () {
                    var activeElements = t.d.addedSmartListList.activeElements();
                    var elements = [];
                    t.d.smartLists.forEach(function (smartList) {

                        var selected = false;
                        for (var i = 0; i < activeElements.length; i++) {
                            if (activeElements[i].data('id') == smartList.id) {
                                selected = true;
                                break;
                            }
                        }

                        elements.push({
                            text: smartList.name + ' (' + smartList.contactsCount + ')',
                            search: smartList.name,
                            //icon: 'fa-filter',
                            padding: '6px 0 6px 24px',
                            //iconPosition: 'right',
                            //iconClick: function () {
                            //    console.log('Icon click: ' + this.data('id'));
                            //},
                            selected: selected,
                            activateIfClick: false,
                            data: {
                                id: smartList.id
                            }
                        });

                    });
                    t.d.popoverSmartListList.elements(elements);
                    t.d.searchInput.automizyChange();
                    t.d.popover.open();
                }
            }),

            listNameInput: $A.newInput2({
                labelTop: $A.translate('Add a name to your list'),
                placeholder: $A.translate('Enter the name of your new list...'),
                validator: 'notEmpty',
                enter: function () {
                    t.d.popoverSaveListButton.click();
                }
            }),
            popoverCancelButton: $A.newButton({
                text: $A.translate('Cancel'),
                skin: 'nobox-black',
                thick: true,
                float: 'left',
                click: function () {
                    t.d.popover.open();
                }
            }),
            popoverCreateListButton: $A.newButton({
                text: $A.translate('Create list'),
                skin: 'nobox-blue',
                thick: true,
                click: function () {
                    t.d.popover.title($A.translate('Name Your List')).content(t.d.listNameInput);
                    t.d.popoverCreateListButton.hide();
                    t.d.popoverCancelButton.show();
                    t.d.popoverSaveListButton.show();
                    t.d.listNameInput.val('').select();
                }
            }),
            popoverSaveListButton: $A.newButton({
                text: $A.translate('Save list'),
                skin: 'nobox-blue',
                thick: true,
                click: function () {
                    if (t.d.listNameInput.validate()) {
                        t.d.popover.loadingStart();
                        //AJAX
                        $A.delay(function () {
                            var smartList = {
                                id: 123,
                                name: 'ALMA',
                                contactsCount: 0
                            };
                            t.d.smartLists.unshift(smartList);
                            t.d.addedSmartListList.addElement({
                                content: smartList.name,
                                disabled: true,
                                removable: true,
                                data: {
                                    id: smartList.id
                                }
                            });
                            t.d.popover.close();
                        }, 1000);
                    }
                }
            }),
            popoverSmartListList: $A.newList({
                type: 'simple',
                maxVisibleElement: 3,
                moreText: $A.translate('more lists (%s)'),
                emptySearchContent: $A.translate('No match found.'),
                maxHeight: '130px',
                minHeight: '130px',
                elementClick: function () {
                    var listElement = this;
                    var id = listElement.data('id');
                    if (listElement.selected()) {
                        listElement.unselect();
                        var activeElements = t.d.addedSmartListList.activeElements();
                        for (var i = 0; i < activeElements.length; i++) {
                            if (activeElements[i].data('id') == id) {
                                activeElements[i].remove();
                                break;
                            }
                        }
                    } else {
                        listElement.select();
                        t.d.addedSmartListList.addElement({
                            content: listElement.text(),
                            disabled: true,
                            removable: true,
                            data: {
                                id: id
                            }
                        });
                    }
                }
            }),
            
            addedSmartListList: $A.newList({
                type: 'row'
            }),
            
            id: 'automizy-smart-list-selector-' + $A.getUniqueString(),

            smartLists:[
                {
                    id: 5,
                    name: 'Smart list 5',
                    contactsCount: 253
                },
                {
                    id: 4,
                    name: 'Smart list 4',
                    contactsCount: 0
                },
                {
                    id: 3,
                    name: 'Smart list 3',
                    contactsCount: 167
                },
                {
                    id: 2,
                    name: 'Smart list 2',
                    contactsCount: 34
                },
                {
                    id: 1,
                    name: 'Smart list 1',
                    contactsCount: 4
                }
            ]
        };


        t.d.popover = $A.newPopover({
            target:t.d.searchInput.widget(),
            width: '400px',
            position: 'bottom',
            gravity: 'right',
            offsetLeft: -2,
            open: function () {
                if (t.d.smartLists.length <= 0) {
                    this.title($A.translate('Create your first list')).content(t.d.$noListContent);
                    t.d.popoverCreateListButton.hide();
                    t.d.popoverCancelButton.hide();
                    t.d.popoverSaveListButton.hide();
                } else {
                    this.title($A.translate('Contact Lists')).content(t.d.popoverSmartListList);
                    t.d.popoverCreateListButton.show();
                    t.d.popoverCancelButton.hide();
                    t.d.popoverSaveListButton.hide();
                }
            },
            buttons: [
                t.d.popoverCancelButton,
                t.d.popoverCreateListButton,
                t.d.popoverSaveListButton
            ]
        }).close();


        t.d.$noListContent.text($A.translate("You don't have any lists yet. Create one firstly!"));
        t.d.noListButton.drawTo(t.d.$noListContent);
        
        t.d.searchInput.drawTo(t.d.$widget);
        t.d.addedSmartListList.drawTo(t.d.$widget);


        t.f = {};
        t.init();

        if (typeof obj !== 'undefined') {
            if (typeof obj.smartLists !== 'undefined') {
                t.smartLists(obj.smartLists);
            }
            t.initParameter(obj);
        }
    };

    var p = SmartListSelector.prototype;
    
    p.smartLists = function (smartLists) {
        var t = this;
        if (typeof smartLists !== 'undefined') {
            t.d.smartLists = smartLists;
            return t;
        }
        return t.d.smartLists;
    };
    p.val = p.value = function (value) {
        var t = this;
        if(typeof value !== 'undefined'){
            var ids = value;
            var smartLists = t.smartLists();
            t.d.addedSmartListList.removeAllElement();
            smartLists.forEach(function(smartList){
                if(ids.indexOf(smartList.id) >= 0){
                    t.d.addedSmartListList.addElement({
                        content: smartList.name,
                        disabled: true,
                        removable: true,
                        data: {
                            id: smartList.id
                        }
                    });
                }
            });
            return t;
        }
        value = [];
        var activeElements = t.d.addedSmartListList.activeElements();
        activeElements.forEach(function(element){
            value.push(element.data('id'));
        });
        return value;
    };

    p.drawTo = p.draw = p.appendTo = function ($target) {
        var t = this;
        $target = $target || $('body');
        t.d.$widget.appendTo($target);
        return t;
    };
    p.show = function () {
        var t = this;
        this.d.$widget.ashow();
        return t;
    };
    p.hide = function () {
        var t = this;
        this.d.$widget.ahide();
        return t;
    };


    $A.initBasicFunctions(SmartListSelector, "SmartListSelector", []);


});
