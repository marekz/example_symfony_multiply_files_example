/**
 * Created by alex on 20.03.15.
 */

$(document).ready(function() {
    $('.js-skip-form').on('click', function(event) {
        $("form").trigger("reset");
        //event.preventDefault();
    });

    $('.js-authentication-keyup').keyup(function () {
        if ($(this).val()) {
            $(this).removeClass('empty').addClass('notempty');
            $('#js-search-btn').slideDown().removeClass('ic-hide');
        } else {
            $(this).removeClass('notempty').addClass('empty');
            $(this).closest('.form-group').find('.a-block').trigger('click');
            var empty = true;
            $(this).closest('form').find('.js-authentication-keyup').each(function(i, v){
                if($(this).val()) {
                    empty = false
                }
            });
            if(empty == true) {
                $('#js-search-btn').slideUp().addClass('ic-hide');
            }
        }
    });

// select
    $('.select2').select2({
        language: "pl"
    });

    initSelectTokenizer();


// checkbox
    $('.form-input-cover').on('click', function(event){
        var fieldBlock = $(this).closest('.js-field-block');
        $(this).slideUp(300, function() {
            $(this).removeClass('on');
        });
        fieldBlock.find('input').val('').addClass('required').focus();
    });
    $('.js-form-choice-writable').on('click', function(event) {
        var fieldBlock = $(this).closest('.js-field-block');
        fieldBlock.find('.validation-message').empty();
        fieldBlock.removeClass('has-error').find('.form-input-cover').slideDown(300, function(){
            $(this).addClass('on');
            fieldBlock.find('input').val('').removeClass('required');
        });
    });

// datepicker
    $.datepicker.setDefaults({
        dateFormat: 'dd.mm.yy',
        maxDate: '0'
    });
    $('.datepicker').datepicker();

// return way
    $('.field-checkbox-list [type="radio"]').change( function() {
        $('.js-value').slideUp(
            "fast",
            function(){
                $(this).remove();
            }
        );
        var block = $(this).closest('.radio');

        if(this.checked) {
            $.ajax({
                type: "GET",
                data: "way_id=" + $(this).val(),
                url: block.parent('form').attr('action'),
                success: function(data){
                    if (data){
                        block.append(data);
                        block.find('.js-value').slideDown(
                            "fast",
                            function() {
                                $(this).find('input').focus();
                            }
                        );
                    }
                },
                error: function() {
                    console.log('Error request');
                }
            });
        } else {
            block
                .parent()
                .removeClass('has-error')
                .find('.error')
                .slideUp(
                "fast",
                function(){
                    $(this).remove();
                }
            );
            block.find('.js-value').slideUp(
                "fast",
                function(){
                    $(this).remove();
                }
            );
        }
    });
// append hint
    $('.field-checkbox-list').on('click', '.js-append-hint', function(e) {
        e.preventDefault();
        var parent = $(this).parent();
        //parent.addClass('alert-info').siblings().removeClass('alert-info');
        var hintbody = parent.find('textarea').val();
        $('.js-append-hint-to').val($.trim(hintbody));
    });
});
function initSelectTokenizer() {
    $(".js-select2-tokenizer").select2({
        tags: true,
        tokenSeparators: [',']
    });
}