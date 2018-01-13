define([
    'automizy/core',
    'automizy/addons/jqueryAddOns',
    'automizy/functions/initBasicFunctions',
    'automizy/functions/registerLocalEvents',
    'automizy/modules/popover',
    'automizy/images/icons'
], function () {
    var Button = function (obj) {
        var t = this;
        t.d = {
            $widget: $('<span class="automizy-button automizy-button-uppercase"></span>'),
            $buttonBox: $('<span class="automizy-button-box"></span>'),
            $widgetButton: $('<a href="javascript:;" class="automizy-button-a"></a>'),
            $text: $('<span class="automizy-button-text"></span>'),
            $icon: $('<span class="automizy-button-icon"></span>'),
            $badge: $('<span class="automizy-button-badge"></span>'),
            $dropDownButton:$('<a href="javascript:;" class="automizy-button-dropdown-button"></a>'),
            $dropDownButtonIcon:$('<span class="fa fa-caret-down"></span>'),
            $dropDownMenu:$('<span class="automizy-button-dropdown-menu"></span>'),
            iconPosition: 'left',
            text: 'My Button',
            title: '',
            skin: 'simple-white',
            float: 'none',
            width: '',
            active: false,
            hasObject: false,
            newRow: false,
            disabled: false,
            filePicker: false,
            uppercase:true,
            badge: {
                active: false
            },
            triggers: {
                click: 0
            },
            dropDownMenuOpened:false,
            dropDownMenuList:[],
            create: function () {},
            openDropDownMenuFunction: function () {},
            id: 'automizy-button-' + $A.getUniqueString()
        };
        t.f = {};
        t.init();

        t.d.$buttonBox.appendTo(t.d.$widget);
        t.d.$widgetButton.appendTo(t.d.$buttonBox);
        t.d.$dropDownMenu.appendTo('body');
        t.d.$badge.appendTo(t.d.$widgetButton).hide();
        t.d.$icon.appendTo(t.d.$widgetButton);
        t.d.$text.appendTo(t.d.$widgetButton);
        t.d.$text.text(t.d.text);
        t.d.$dropDownButton.click(function(event){
            if(t.d.dropDownMenuOpened){
                $A.closeAllButtonMenu();
            }else {
                t.openDropDownMenu();
            }
        });
        t.d.$dropDownButtonIcon.appendTo(t.d.$dropDownButton);
        t.d.$widget.addClass('automizy-skin-' + t.d.skin).attr('id', t.id());
        t.d.$widgetButton.click(function () {
            if (t.click().returnValue() === false) {
                return false;
            }
        });
        if (typeof obj !== 'undefined') {
            if (typeof obj.disabled !== 'undefined') {
                t.disabled(obj.disabled);
            }
            if (typeof obj.text !== 'undefined') {
                t.text(obj.text);
            }
            if (typeof obj.html !== 'undefined') {
                t.html(obj.html);
            }
            if (typeof obj.title !== 'undefined') {
                t.title(obj.title);
            }
            if (typeof obj.float !== 'undefined') {
                t.float(obj.float);
            }
            if (typeof obj.margin !== 'undefined') {
                t.margin(obj.margin);
            }
            if (typeof obj.padding !== 'undefined') {
                t.padding(obj.padding);
            }
            if (typeof obj.fontSize !== 'undefined') {
                t.fontSize(obj.fontSize);
            }
            if (typeof obj.background !== 'undefined') {
                t.background(obj.background);
            }
            if (typeof obj.href !== 'undefined') {
                t.href(obj.href);
            }
            if (typeof obj.width !== 'undefined') {
                t.width(obj.width);
            }
            if (typeof obj.click !== 'undefined') {
                t.click(obj.click);
            }
            if (typeof obj.newRow !== 'undefined') {
                t.newRow(obj.newRow);
            }
            if (typeof obj.semiThin !== 'undefined') {
                t.semiThin(obj.semiThin);
            }
            if (typeof obj.thin !== 'undefined') {
                t.thin(obj.thin);
            }
            if (typeof obj.thinner !== 'undefined') {
                t.thinner(obj.thinner);
            }
            if (typeof obj.thick !== 'undefined') {
                t.thick(obj.thick);
            }
            if (typeof obj.semiThick !== 'undefined') {
                t.semiThick(obj.semiThick);
            }
            if (typeof obj.uppercase !== 'undefined') {
                t.uppercase(obj.uppercase);
            }
            if (typeof obj.icon !== 'undefined') {
                t.icon(obj.icon);
            }
            if (typeof obj.iconPosition !== 'undefined') {
                t.iconPosition(obj.iconPosition);
            }
            if (typeof obj.align !== 'undefined') {
                t.align(obj.align);
            }
            if (typeof obj.active === 'boolean') {
                t.active(obj.active);
            }
            if (typeof obj.badge !== 'undefined') {
                t.badge(obj.badge);
            }
            if (typeof obj.filePicker !== 'undefined') {
                t.filePicker(obj.filePicker);
            }
            if (typeof obj.filePickerChange !== 'undefined') {
                t.filePickerChange(obj.filePickerChange);
            }
            if (typeof obj.dropdown !== 'undefined') {
                t.dropdown(obj.dropdown);
            }
            if (typeof obj.openDropDownMenu !== 'undefined') {
                t.openDropDownMenu(obj.openDropDownMenu);
            }
            t.initParameter(obj);
        }


        if (typeof $().tooltipster === 'function') {
            t.d.$widget.tooltipster({
                delay: 1
            });
        }

    };

    var p = Button.prototype;
    p.text = p.val = p.value = function (text) {
        var t = this;
        if (typeof text !== 'undefined') {
            t.d.text = text;
            t.d.$text.text(text);
            t.widget().addClass('automizy-has-text');
            return t;
        }
        return t.d.text;
    };
    p.html = function (html) {
        var t = this;
        if (typeof html !== 'undefined') {
            t.d.html = html;
            t.d.$text.html(html);
            t.widget().addClass('automizy-has-text');
            return t;
        }
        return t.d.html;
    };
    p.align = function (align) {
        var t = this;
        if (typeof align !== 'undefined') {
            t.d.$widgetButton.css({
                textAlign: align
            });
            return t;
        }
        return t.d.$widgetButton.css('text-align');
    };
    p.title = function (title) {
        var t = this;
        if (typeof title !== 'undefined') {
            t.d.title = title;
            t.d.$widget.attr('title', title);
            return t;
        }
        return t.d.title;
    };
    p.width = function (width) {
        var t = this;
        if (typeof width !== 'undefined') {
            t.d.width = width;
            t.d.$widget.width(width);
            t.widget().addClass('automizy-custom-width');
            return t;
        }
        return t.d.width;
    };
    p.margin = function (margin) {
        var t = this;
        if (typeof margin !== 'undefined') {
            t.d.margin = margin;
            t.widget().css('margin', t.d.margin);
            return t;
        }
        return t.d.margin;
    };
    p.padding = function (padding) {
        var t = this;
        if (typeof padding !== 'undefined') {
            t.d.padding = padding;
            t.d.$widgetButton.css('padding', t.d.padding);
            return t;
        }
        return t.d.padding;
    };
    p.fontSize = function (fontSize) {
        var t = this;
        if (typeof fontSize !== 'undefined') {
            t.d.fontSize = fontSize;
            t.d.$widgetButton.css('fontSize', t.d.fontSize);
            return t;
        }
        return t.d.fontSize;
    };
    p.background = function (background) {
        var t = this;
        if (typeof background !== 'undefined') {
            t.d.background = background;
            t.d.$widgetButton.css('background', t.d.background);
            return t;
        }
        return t.d.background;
    };
    p.href = function (href) {
        var t = this;
        if (typeof href !== 'undefined') {
            t.d.href = href;
            if (t.d.href === false) {
                t.d.$widgetButton.removeAttr('href');
            } else {
                t.d.$widgetButton.attr('href', href);
            }
            return t;
        }
        return t.d.href;
    };
    p.disabled = function (disabled) {
        var t = this;
        if (typeof disabled !== 'undefined') {
            t.d.disabled = $A.parseBoolean(disabled);
            t.d.$widgetButton.prop('disabled', t.d.disabled);
            t.d.$widget.toggleClass('disabled', t.d.disabled);
            return t;
        }
        return t.d.disabled;
    };
    p.disable = function () {
        return this.disabled(true);
    };
    p.enable = function () {
        return this.disabled(false);
    };
    p.float = function (float) {
        var t = this;
        if (typeof float !== 'undefined') {
            t.d.float = float;
            t.d.$widget.css('float', float);
            return t;
        }
        return t.d.float;
    };
    p.newRow = function (newRow) {
        var t = this;
        if (typeof newRow !== 'undefined') {
            newRow = $A.parseBoolean(newRow);
            t.d.newRow = newRow;
            if (newRow) {
                t.d.$widget.addClass('automizy-newrow');
            } else {
                t.d.$widget.removeClass('automizy-newrow');
            }
            return t;
        }
        return t.d.newRow;
    };
    p.button = function () {
        var t = this;
        return t.d.$widgetButton;
    };

    p.active = function (active) {
        var t = this;
        if (typeof active !== "undefined") {
            active = $A.parseBoolean(active);
            t.d.active = active;

            if (t.d.active === true) {
                t.d.$widget.addClass("automizy-active");
            } else {
                t.d.$widget.removeClass("automizy-active");
            }

            return t;
        }
        return t.d.active;
    };

    p.click = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('click', func, name, life);
        } else {
            if (t.disabled()) {
                return t;
            }
            var a = t.runFunctions('click');
            t.returnValue(!(a[0] === false || a[1] === false));
        }
        return t;
    };
    p.semiThin = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            value = $A.parseBoolean(value);
            if (!value) {
                t.widget().removeClass('automizy-button-semithin');
                return t;
            }
        }
        t.widget().addClass('automizy-button-semithin');
        return t;
    };
    p.thin = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            value = $A.parseBoolean(value);
            if (!value) {
                t.widget().removeClass('automizy-button-thin');
                return t;
            }
        }
        t.widget().addClass('automizy-button-thin');
        return t;
    };
    p.thinner = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            value = $A.parseBoolean(value);
            if (!value) {
                t.widget().removeClass('automizy-button-thinner');
                return t;
            }
        }
        t.widget().addClass('automizy-button-thinner');
        return t;
    };
    p.thick = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            value = $A.parseBoolean(value);
            if (!value) {
                t.widget().removeClass('automizy-button-thick');
                return t;
            }
        }
        t.widget().addClass('automizy-button-thick');
        return t;
    };
    p.semiThick = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            value = $A.parseBoolean(value);
            if (!value) {
                t.widget().removeClass('automizy-button-semithick');
                return t;
            }
        }
        t.widget().addClass('automizy-button-semithick');
        return t;
    };
    p.uppercase = function (value) {
        var t = this;
        if (typeof value !== 'undefined') {
            value = $A.parseBoolean(value);
            if (!value) {
                t.widget().removeClass('automizy-button-uppercase');
                return t;
            }
        }
        t.widget().addClass('automizy-button-uppercase');
        return t;
    };

    p.badge = function (badge) {
        var t = this;

        if (typeof badge !== 'undefined') {
            if (typeof badge === 'array' || typeof badge === 'object') {
                t.d.badge.active = true;
                if (typeof badge.content !== 'undefined') {
                    t.d.badge.content = badge.content;
                    t.d.$badge.html(t.d.badge.content);
                }
                if (typeof badge.color !== 'undefined') {
                    t.d.badge.color = badge.color;
                }
                if (typeof badge.position !== 'undefined') {
                    t.d.badge.position = badge.position;
                    if (typeof t.d.badge.position === 'array' || typeof t.d.badge.position === 'object') {
                        if (typeof t.d.badge.position.top !== 'undefined') {
                            if (typeof t.d.badge.position.top === 'number') {
                                t.d.badge.position.top = t.d.badge.position.top + 'px';
                            }
                            t.d.$badge.css('top', t.d.badge.position.top);
                        }
                        if (typeof t.d.badge.position.left !== 'undefined') {
                            if (typeof t.d.badge.position.left === 'number') {
                                t.d.badge.position.left = t.d.badge.position.left + 'px';
                            }
                            t.d.$badge.css('left', t.d.badge.position.left);
                        }
                        if (typeof t.d.badge.position.right !== 'undefined') {
                            if (typeof t.d.badge.position.right === 'number') {
                                t.d.badge.position.right = t.d.badge.position.right + 'px';
                            }
                            t.d.$badge.css('right', t.d.badge.position.right);
                        }
                        if (typeof t.d.badge.position.bottom !== 'undefined') {
                            if (typeof t.d.badge.position.bottom === 'number') {
                                t.d.badge.position.bottom = t.d.badge.position.bottom + 'px';
                            }
                            t.d.$badge.css('bottom', t.d.badge.position.bottom);
                        }
                    }
                }
                if (typeof badge.active !== 'undefined') {
                    t.d.badge.active = $A.parseBoolean(badge.active);
                }
            } else {
                t.d.badge.active = $A.parseBoolean(badge);
            }
            if (t.d.badge.active) {
                t.d.$badge.show();
            } else {
                t.d.$badge.hide();
            }
            return t;
        }
        return t.d.badge;
    };

    p.icon = function (icon, iconType) {
        var t = this;
        if (typeof icon !== 'undefined') {
            t.d.icon = icon;
            if (t.d.icon === false) {
                t.widget().removeClass('automizy-has-icon');
            } else if (t.d.icon === true) {
                t.widget().addClass('automizy-has-icon');
            } else {
                t.widget().addClass('automizy-has-icon');
                var iconType = iconType || 'fa';
                if (iconType === 'fa') {
                    t.d.$icon.removeClass(function (index, css) {
                        return (css.match(/(^|\s)fa-\S+/g) || []).join(' ');
                    }).addClass('fa').addClass(icon);
                }
            }
            return t;
        }
        return t.d.icon || false;
    };
    p.iconPosition = function (position) {
        var t = this;
        if (typeof position !== 'undefined') {
            if (position === 'left' || position === 'top') {
                t.d.$icon.insertBefore(t.d.$text);
            } else if (position === 'right' || position === 'bottom') {
                t.d.$icon.insertAfter(t.d.$text);
            }
            if (position === 'top' || position === 'bottom') {
                t.d.$icon.addClass('automizy-newrow');
            } else {
                t.d.$icon.removeClass('automizy-newrow');
            }

            if (position === 'top') {
                t.d.$icon.addClass('automizy-button-icon-position-top');
            } else if (position === 'bottom') {
                t.d.$icon.addClass('automizy-button-icon-position-bottom');
            } else {
                t.d.$icon.removeClass('automizy-button-icon-position-top automizy-button-icon-position-bottom');
            }
        }
        return t.d.iconPosition;
    };

    p.filePicker = function (filePicker) {
        var t = this;
        if (typeof filePicker !== "undefined") {
            filePicker = $A.parseBoolean(filePicker);

            if (filePicker !== t.d.filePicker) {
                t.d.filePicker = filePicker;

                if(filePicker){
                    var $input = $('<input class="automizy-button-fileupload-input" type="file">');
                    $input.appendTo(t.d.$widgetButton).change(function () {
                        if (t.filePickerChange().returnValue() === false) {
                            return false;
                        }
                    });
                    t.data('input',$input);
                }
                else {
                    if(typeof t.data('input') !== "undefined"){
                        t.data('input').remove();
                        delete t.d.data.input;
                    }
                }

                return t;
            }
        }
        return t.d.filePicker;
    };
    p.filePickerChange = function (func, name, life) {
        var t = this;
        if (typeof func === 'function') {
            t.addFunction('filePickerChange', func, name, life);
        } else {
            if (t.disabled()) {
                return t;
            }
            var $input;
            if(typeof t.data('input') !== "undefined"){
                $input = t.data('input');
            }else{
                $input = $();
            }
            var a = t.runFunctions('filePickerChange', t, [t, $input]);
            t.returnValue(!(a[0] === false || a[1] === false));
        }
        return t;
    };

    p.dropdown = function (dropdownList) {
        var t = this;
        if (typeof dropdownList !== "undefined") {
            t.widget().addClass('automizy-has-dropdown');
            t.d.$dropDownButton.appendTo(t.d.$buttonBox);
            for(var i = 0; i < dropdownList.length; i++){
                if(dropdownList[i] === 'divider'){
                    t.d.$dropDownMenu.append('<div class="automizy-button-dropdown-menu-divider"></div>');
                }else {
                    dropdownList[i].bold = dropdownList[i].bold || false;
                    dropdownList[i].click = dropdownList[i].click || function () {};
                    dropdownList[i].$item = $('<div class="automizy-button-dropdown-menu-item"></div>').html(dropdownList[i].text).appendTo(t.d.$dropDownMenu).data('automizy-dropdown-list-element', dropdownList[i]).click(function(){
                        var $item = $(this);
                        var listElement = $item.data('automizy-dropdown-list-element');
                        $A.closeAllButtonMenu();
                        listElement.click.apply(t, [listElement]);
                    });
                    if (dropdownList[i].bold) {
                        dropdownList[i].$item.css('font-weight', 'bold');
                    }
                }
            }
            t.d.dropdown = dropdownList;
            return t;
        }
        return t.d.dropdown;
    };
    p.openDropDownMenu = function(func){
        var t = this;
        if(typeof func === 'function'){
            t.d.openDropDownMenuFunction = func;
            return t;
        }
        $A.closeAllButtonMenu();
        t.d.dropDownMenuOpened = true;
        var $target = t.widget();
        var targetOffset = $target.offset();
        var targetOffsetTop = targetOffset.top;
        var targetOffsetLeft = targetOffset.left;
        var targetHeight = $target.height();
        var targetWidth = $target.outerWidth();
        t.d.$dropDownMenu.css({
            bottom: 'auto',
            left: targetOffsetLeft + 'px',
            top: (targetOffsetTop + targetHeight) + 'px',
            width: targetWidth + 'px',
            display: 'block'
        });
        t.d.openDropDownMenuFunction.apply(t, []);
        return t;
    };


    $A.initBasicFunctions(Button, "Button", ['click', 'filePickerChange']);



    $A.closeAllButtonMenu = function(){
        var buttons = $A.getAllButton();
        for(var i in buttons){
            buttons[i].d.$dropDownMenu.css('display', 'none');
            buttons[i].d.dropDownMenuOpened = false;
        }
    };

    $A.globalButtonPopoverModule = $A.newPopover();
    $A.globalButtonPopoverModule.close();

    $(window).on('resize', function(){
        $A.closeAllButtonMenu();
    });
    $(document).on('click', function(event) {
        if(!$(event.target).closest('.automizy-button-dropdown-menu, .automizy-button-dropdown-button').length) {
            $A.closeAllButtonMenu();
        }
    });
    $(document).on('mousewheel DOMMouseScroll', function(event) {
        if(!$(event.target).closest('.automizy-button-dropdown-menu').length) {
            $A.closeAllButtonMenu();
        }
    });

});
