define([
    'automizy/core',
    'automizy/modules/i18n'
], function () {
    $A.skin = function (module) {
        var skin = module.skin();
        var success = false;

        if (module instanceof $A.m.Input) {
            var input = module;
            var $input = input.input();
            var tagName = $input.prop('tagName').toLowerCase();
            var type = input.type();
            var se = input.d.specialElements;
            if (tagName === 'input') {
                if (type === 'file') {
                    if (skin === 'simple-automizy') {
                        //se.file
                        var $fileBox = se.$fileBox = $('<span class="simple-automizy-file-box"></span>');
                        var $table = $('<table cellpadding="0" cellspacing="0" border="0" style="display:inline-table"></table>').width(input.width()).appendTo($fileBox);
                        var $tr = $('<tr></tr>').appendTo($table);
                        var $td1 = $('<td></td>').appendTo($tr);
                        var $td2 = $td1.clone().width(1).appendTo($tr);
                        var fileText = se.fileText = $A.newInput().readonly(true).newRow(false).width('100%').drawTo($td1);
                        fileText.widget().width('100%');
                        var fileButton = se.fileButton = $A.newButton().text($A.translate('Upload')).drawTo($td2);
                        input.data({
                            automizyInput:fileText,
                            automizyButton:fileButton,
                            $automizyTable:$table,
                            $automizyFileBox:$fileBox,
                            $automizyTr:$tr,
                            $automizyTd1:$td1,
                            $automizyTd2:$td2
                        });
                        input.data('automizyButton', fileButton);
                        input.off('change', 'automizy-change').on('change', function () {
                            var filename = input.val().split('\\').pop();
                            fileText.val(filename);
                        }, 'automizy-change');
                        $fileBox.insertAfter($input);
                        $input.data('table', $table).css({
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1,
                            opacity:0,
                            height: '33px',
                            width: '100%'
                        });
                        success = true;
                    }
                } else if (type === 'slider') {
                    if (skin === 'simple-automizy') {
                        var $slider = se.$slider = $('<span class="simple-automizy-slider"></span>');
                        var $sliderValue = se.$sliderValue = $('<span class="simple-automizy-slider-value"></span>');
                        $slider.insertAfter($input);
                        $sliderValue.insertAfter($slider);
                        $slider.slider({
                            range: "min",
                            value: 10,
                            min: 5,
                            max: 100,
                            step: 5,
                            slide: function (event, ui) {
                                input.val(ui.value);
                                input.change();
                                $sliderValue.text(ui.value + '%');
                            }
                        });
                        $sliderValue.text($slider.slider("value") + "%");
                        $input.ahide();
                        success = true;
                    }
                }
            }
        }

        return success;
    };
});