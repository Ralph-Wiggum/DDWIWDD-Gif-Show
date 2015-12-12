/* Joe Stout 
 * November 2015
 * Utility Javascript Classes 
 * Developed on jquery-1.11.3.js */

centerLoneRows();

/** Minimize all artist videos: */
//$('.artist .toggle-size').toggleClass('hidden');

/* Any row with a single col will be centered. */
function centerLoneRows() {
  $(".artist").each(function() {
    var id = $(this).attr('id');
    var $lastRowCols = $("#" + id + " .row:last-child .col-md-6");
    if ($lastRowCols.length == 1) {
      $lastRowCols.addClass("col-centered");
    }
  });
}

/** Hides the videos of an artist: */
$(".close-artist").click(function() {
  var artistId = $(this).parents().eq(1).attr("id");
  $('#' + artistId + " .toggle-size").toggle();
});

/* TODO: Currently listens to ALL button clicks. 
 * Toggles the artist's videos between half and full mode. */
$("button").click(function() {
  var aritstId = $(this).parents('h1').id;
  $('#' + aritstId).find(toggleCol("toggle-size"));
  $(this).parent()[0].scrollIntoView(true);
});

/** Target is any html element. */
function toggleCol(targetClass) {
  var $target = $('.' + targetClass);
  var half = "col-md-6";
  var full = "col-md-12";
  if ($target.hasClass(half)) {
    $($target).removeClass(half);
    $($target).addClass(full);
  } else if ($target.hasClass(full)) {
    $($target).removeClass(full);
    $($target).addClass(half);
  }
}


/* * * * Embed different sources on page with a thumbnail * * * */

/** Every xvideos div has an id that corresponds with the video id,
  * the div text is a link to the thumbnail. */
$(".xvideos").each(function() {
  $(this).css('background-image', 'url(' + $(this).text() + ')'); 	// Set thumbnail
  $(document).on('click', '#' + this.id, function() {
    var iframe = $('<iframe/>', {
      'allowfullscreen': 'allowfullscreen',
      'frameborder': '0',
      'scrolling': 'no',
      'src': 'http://flashservice.xvideos.com/embedframe/' + this.id
    });
    $(this).append(iframe);
    $(this).removeAttr('style');  // Remove backgound-image
  });
});

/** Xhamster divs have a unique id pointing to the videos thumbnail.
  * The thumbnail displays via CSS and clicking replaces the image with the video iframe.
  * Thanks to http://schoberg.net/2015/08/fast-agile-youtube-embed-responsive-iframe-load-delay-with-jquery/ */
$(".xhamster").each(function() {
  $(this).css('background-image', 'url(http://' + this.id + '.jpg)'); 	// Set thumbnail
  var escapedId = 'div[id="' + this.id + '"]';
  var videoId = this.id.substring(this.id.lastIndexOf("_") + 1);
  $(document).on('click', escapedId, function() {
    var iframe = $('<iframe/>', {
      'allowfullscreen': 'allowfullscreen',
      'frameborder': '0',
      'scrolling': 'no',
      'src': 'http://xhamster.com/xembed.php?video=' + videoId
    });
    $(this).append(iframe);
    $(this).removeAttr('style');  // Remove backgound-image
  });
});


/** Every xxxbunker div has an id that corresponds with the video id.
  * Option to change thumbail: add the class 'thumb-#' where # is 1-4 */
$(".xxxbunker").each(function() {
  var thumbId = ""
  var classes = $(this).attr('class').split(' ');
  for (var i=0; i < classes.length; i++) {
    if (classes[i].indexOf("thumb") >= 0) {
      thumbId = classes[i].substring(5);   // Includes leading '-'.
      break;
    }
  }
  $(this).css('background-image', 'url(http://xxxbunker.com/' + this.id + thumbId + '.jpg)');
  $(document).on('click', '#' + this.id, function() {
    $(this).html('<object width="550" height="400"> <param name="movie" value="http://xxxbunker.com/flash/player.swf"></param> <param name="wmode" value="transparent"></param> <param name="allowfullscreen" value="true"></param> <param name="allowscriptaccess" value="always"></param> <param name="flashvars" value="config=http%3A%2F%2Fxxxbunker.com%2FplayerConfig.php%3Fvideoid%3D' + this.id + '%26autoplay%3Dfalse"></param> <embed src="http://xxxbunker.com/flash/player.swf" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="transparent" width="550" height="400" flashvars="config=http%3A%2F%2Fxxxbunker.com%2FplayerConfig.php%3Fvideoid%3D' + this.id  + '%26autoplay%3Dfalse"></embed> </object>');
    $(this).removeAttr('style');  // Remove backgound-image
  });
});


/* * * * Functions for imges.htm * * * */

/* From: http://stackoverflow.com/a/15667651/1208507 */
(function($) {
  jQuery.fn.shuffle = function () {
    var j;
    for (var i = 0; i < this.length; i++) {
      j = Math.floor(Math.random() * this.length);
      $(this[i]).before($(this[j]));
    }
    return this;
  };
}(jQuery));


/* * * * NOT CURRENTLY IN USE * * * */

/* Expects names to be split ", " */
function centerCols(nameList) {
  var names = nameList.split(", ");
  for (var i=0; i < names.length; i++) {
    $("#" + names[i]+ " .row:last-child .col-md-6").addClass("col-centered");
  }
}
