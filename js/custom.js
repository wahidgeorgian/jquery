
$(document).ready(function () {
    var itemsArr = [];
    var getItems = JSON.parse(localStorage.getItem('FormArray'));
    console.log(getItems);
    
    
    $(getItems).each(function(index,value){
       console.log(index,value.heading);
        $("main").append('<section>' + (index +1) + ':'+ value.heading +'</section>');
    });
    
    


    $(".headingform").submit(function (e) {
        e.preventDefault();

        var inputheading = $(".inputheading").val();
        if (inputheading == "") {
            alert("Field must be filled")
            return false;
        } else {

            $("main").append('<section><h1>' + inputheading + '</h1></section>');
            console.log(inputheading);
            $('.listhead option').remove();
            $('.listhead').append('<option>Select Heading</option>');


            $('.listheadform option').remove();
            $('.listheadform').append('<option>Select Heading</option>');

            $('main section h1').each(function (index, value) {

                $('.listhead').append('<option value=' + (index + 1) + '>' + $(this).text() + '</option>');
                $('.listheadform').append('<option value=' + (index + 1) + '>' + $(this).text() + '</option>');

            });
        }

        itemsArr.push({ 'heading': inputheading, 'subheading': [] });
        localStorage.setItem("FormArray", JSON.stringify(itemsArr));
        console.log(itemsArr);

        $('.headingform').trigger("reset");
        $('.Heading').modal('toggle');
    });

    $(".subheadingform").submit(function (e) {
        e.preventDefault();

        var inputsubheading = $(".inputsubheading").val();
        if (inputsubheading == "") {
            alert("Field is required")
            return false;
        } else {
            var hid = $(".listhead option:selected").val();
            $("main section:nth-child(" + hid + ")").append('<div><h2>' + inputsubheading + '</h2></div>');
            console.log(inputsubheading);

            console.log(hid, typeof (hid));
            let head = parseInt(hid) - 1;
            // console.log(head, 'hindeadfsdfsfsfd');
            itemsArr[head].subheading.push({ "subheading": inputsubheading, "input": [] });
        }
        $('.subheadingform').trigger("reset");
        $('.SubHeading').modal('toggle');

        $(".listheadform").change(function () {
            var shid = $(".listheadform option:selected").val();
            $('.listsubhead option').remove();
            $('.listsubhead').append('<option>Select Sub-Heading</option>');
            $('main section:nth-child(' + shid + ') div h2').each(function (index, value) {
                $('.listsubhead').append('<option value=' + (index + 1) + '>' + $(this).text() + '</option>')
            });

        });

        localStorage.setItem("FormArray", JSON.stringify(itemsArr));




        console.log(itemsArr);

    })

    $(".finalform").submit(function (e) {
        e.preventDefault();

        var headingVal = $(".listheadform option:selected").val();
        console.log(headingVal)
        var headingid = parseInt(headingVal)

        console.log(headingVal);
        var subheadingVal = $(".listsubhead option:selected").val();
        var subheadingid = parseInt(subheadingVal);


        var subheadingid = (subheadingid + 1);
        console.log(subheadingid);

        var typ = $('.inputtype option:selected').val();
        console.log(typ);
        var inlable = $('.inputlable').val();
        var inlable = inlable.toUpperCase();
        console.log(inlable);
        var inclass = $('.inputclass').val();
        var inclass = inlable.toLowerCase();
        console.log(inclass);
        var invalue = $('.inputvalue').val();
        console.log(invalue);
        var inplaceholder = $('.inputplaceholder').val();
        console.log(inplaceholder)
        var inoption = $('.inputoption').val().split(",");
        console.log(inoption);


        var head = headingid - 1;
        var subhead = subheadingid - 2;
        // console.log(subhead, "444444444444444444444444444");
        // console.log(head, "3333333333333333333333");
        // $(".inputtype").each(function () {
        itemsArr[head].subheading[subhead].input.push({ "input": typ, "lebel": inlable, "class": inclass, "value": invalue, "placeholder": inplaceholder, "inoption":inoption});
        // itemsArr[head].subheading[subhead].input.push({ "input" : typ });
        localStorage.setItem("FormArray", JSON.stringify(itemsArr));
    
        

        // })


        if (typ == 'select') {
            var opt = '<option>select</option>'
            $(inoption).each(function (i, v) {
                // console.log(i,v,'222222');
                opt += '<option value=( ' + i + ' )>' + v + '</option>'

            });
            $('main section:nth-child(' + headingid + ') div:nth-child(' + subheadingid + ')').append('<br><lable>' + inlable + '</lable><br><select class=' + inclass + '>' + opt + '</select>');
        } else if (typ == 'radio') {
            var radi = '';
            $(inoption).each(function (i, v) {
                console.log(i, v);
                radi += '<input type=' + typ + ' value= ' + i + ' name= ' + invalue + ' >' + v + '</input><br>'


            })
            $('main section:nth-child(' + headingid + ') div:nth-child(' + subheadingid + ')').append(radi);

        } else if (typ == 'checkbox') {

            $('main section:nth-child(' + headingid + ') div:nth-child(' + subheadingid + ')').append('<br><input type=' + typ + ' class=' + inclass + ' value=' + invalue + ' ><lable>' + inlable + '</lable>');

        } else if (typ == 'textarea') {
            $('main section:nth-child(' + headingid + ') div:nth-child(' + subheadingid + ')').append('<br><lable>' + inlable + ': </lable> <br><input type=' + typ + ' placeholder=' + inplaceholder + '>');

        } else if (typ == 'number') {
            var opt = $('.inputoption').val().split(",")
            $('main section:nth-child(' + headingid + ') div:nth-child(' + subheadingid + ')').append('<br><lable>' + inlable + ': </lable> <br><input type=' + typ + ' class=' + inclass + ' min=' + inoption[0] + ' max=' + inoption[1] + ' >');

        } else if (typ == 'range') {
            var opt = $('.inputoption').val().split(",");
            $('main section:nth-child(' + headingid + ') div:nth-child(' + subheadingid + ')').append('<br><lable>' + inlable + ': </lable> <br><input type=' + typ + ' class=' + inclass + ' min=' + inoption[0] + ' max=' + inoption[1] + ' >');

        } else {
            $('main section:nth-child(' + headingid + ') div:nth-child(' + subheadingid + ')').append('<br><lable>' + inlable + ': </lable> <br><input type=' + typ + ' class=' + inclass + ' placeholder= ' + inplaceholder + '>');
        }

        $(function () {
            enable_cb();
            $("#inputreadonly").click(enable_cb);
        });

        function enable_cb() {
            if (this.checked) {
                $("input.group1").removeAttr("disabled");
            } else {
                $("input.group1").attr("disabled", true);
            }
        }
        



        $('.finalform').trigger("reset");

       



    })
    
})

