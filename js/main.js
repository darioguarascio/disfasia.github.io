
$('time').prettyDate();
$(document).ready(function() {
    $('.lang-selection li a').click(function(e){
        e.preventDefault();
        var lang = $(this).attr('href').split('#')[1].substring(1)
        var sel = "*[data-lang-"+lang+"=1]";
        $(this).toggleClass('active').blur();
        if ($(this).hasClass('active')) {
            $(sel).fadeIn();
        } else {
            $(sel).fadeOut();
        }
    })
    /*
    $('.multiselect').multiselect({
        buttonClass: 'btn btn-default',
        onChange: function(element, checked){

            if (checked) {
                $(sel).fadeIn();
            } else {
                $(sel).fadeOut();
            }
        }
    });
    */
});
