// elastictext.js, ver. 0.1.1
//
// Copyright (c) 2016 Kazuaki Miyatani
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

jQuery.each(popovers, function(id, val) {
    var title = "";
    var placement = "bottom";
    if ( 'title' in val ) {
        title = val['title'];
    }
    if ( 'placement' in val) {
        placement = val['placement'];
    }
    $("a[data-et=popover-" + id + "]").popover( {
        container: "body",
        title: title,
        content: val['content'],
        placement: placement,
        trigger: "hover"
    } );
});

$("div.container").append(
     '<div class="modal fade" id="modal_recall" tabindex="-1" role="dialog" arialabelledby="modal_recall_label">'
    + '<div class="modal-dialog" role="document">'
    + '<div class="modal-content">'
    + '<div class="modal-header">'
    + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
    + '<h4 class="modal-title" id="modal_recall_label"></h4>'
    + '</div>'
    + '<div class="modal-body"></div> </div> </div> </div>' );

$("#modal_recall").on('show.bs.modal', function (event) {
    var link = $(event.relatedTarget);
    var id = link.data("et").slice(link.data("et").indexOf("-") + 1);
    var modal = $(this);
    modal.css("border-color", $("#" + id).find('.panel-heading').css("background-color"));
    modal.find('.modal-header').css("background-color", $("#" + id).find('.panel-heading').css("background-color"));
    modal.find('.modal-header').css("color", $("#" + id).find('.panel-heading').css("color"));
    var title_str = $("#" + id).find('.panel-heading').html();
    modal.find('.modal-title').html(title_str);
    var body_str = $("#" + id).find('.panel-body').html();
    modal.find('.modal-body').html(body_str);
    modal.find('.modal-body').children('a[role="button"]').each( function(i) {
        $(this).replaceWith(this.childNodes);
    });
});

$("a[data-et]").each(function() {
    var etdata = $(this).data("et");
    var firstSeparator = etdata.indexOf("-");
    var kind = etdata.slice(0, firstSeparator);
    var target = etdata.slice(firstSeparator + 1);
    if ( kind == "collapse" ){
        $(this).click( function() {
            $(".collapse#" + target).collapse('toggle');
        });
        $(this).attr( "role", "button" );
    }
    else if ( kind == "popover" ) {
        $(this).attr( "role", "button" );
        $(this).attr( "tabindex", "-1" );
    }
    else if ( kind == "modal" ) {
        $(this).attr( "role", "button" );
        $(this).attr( "data-toggle", "modal" );
        $(this).attr( "data-target", "#modal_recall" );
        $(this).attr( "data-id", target );
    }
});

var already_clicked = false;

$("a[role='button']").click(function() {
    already_clicked = true;
});
$("div.collapse").click(function() {
    if (already_clicked == false) {
        $(this).collapse('hide');
        already_clicked = true;
    } 
});
$("body").click( function() {
    already_clicked = false;
});
