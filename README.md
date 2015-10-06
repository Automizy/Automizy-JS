[Automizy JS](http://developers.automizy.com/automizyjs) — Automizy widget collection
==============================================================================================

What is AutomizyJs?
-------------------

AutomizyJS is a jQuery UI-like GUI and widget collection, with all the necessary features to create complete applications, by creating simple objects, or calling short methods. You only have to define the bases, AutomizyJs will make the rest of the work.

As reference we built [Automizy](https://www.automizy.com/), our professional marketing automation software using [Automizy JS](http://developers.automizy.com/automizyjs) and [AutomizyJs API](http://developers.automizy.com/automizyjsapi/).

Easy to code
------------

Creating AutomizyJs modules is easy, you can define them by writing only a couple of lines.
```
var dialog = $A.newDialog({
    title: 'Import contacts',
    buttons: [
        {skin: 'nobox-green',text: 'Cancel',float: 'left',click: function(){dialog.close();}},
        {skin: 'simple-orange',text: 'Next',float: 'right'}
    ],
    content: $A.newForm({
        inputs: [
            {label: 'Import file',type: 'file'},
            {label: 'Add to segment',type: 'select',multiselect: $A.d.defines.input.setupSelectObj,
                options:[[0, '--- Nothing ---'],[12, 'First Segment'],[15, 'Second Segment']]
            },
            {label: 'Email',validator: 'email'}
        ]
    })
}).draw();
```

Furthermore, nearly all methods are chainable, which makes coding even more simple:
```
var dialog = $A.newDialog().title('Import contacts').buttons([
        $A.newButton().skin('nobox-green').text('Cancel').float('left').click(function(){dialog.close();}),
        $A.newButton().skin('simple-orange').text('Next').float('right')
    ]).content($A.newForm().addInputs([
        $A.newInput().label('Import file').type('file'),
        $A.newInput().label('Add to segment').type('select').multiselect($A.d.defines.input.setupSelectObj).options([
            [0, '--- Nothing ---'],[12, 'First Segment'],[15, 'Second Segment']
        ]),
        $A.newInput().label('Email').validator('email')
    ])).draw();
```


Simple integration
------------------
AutomizyJs can use all jQuery methods, so you won't have any troubles with integrating.


Dev sites
------------------
You can check the full documentation of AutomizyJs here: [http://developers.automizy.com/automizyjs/](http://developers.automizy.com/automizyjs/)

In case you are interested in our other projects too, check [http://developers.automizy.com/](http://developers.automizy.com/) 

Questions?
----------
If you have any questions, please feel free to contact us at [help@automizy.com](mailto:help@automizy.com).
