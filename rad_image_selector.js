(function($){

  // takes a 'maxSelected' setting, which is used on multiselects
  $.fn.radImageSelector = function(settings) {
    var originalSelector = $(this),
        originalOptions = originalSelector.find('option'),
        isMulti = originalSelector.attr('multiple') == 'multiple';

    var imageSelector = $('<div>').addClass('image-selector');

    var imageOptions = $.map(originalOptions, function(option) {
      var self = $(option),
          imageId = self.attr('value'),
          imageUrl = self.html(),
          isSelected = self.attr('selected') == 'selected',
          tag;

      if (imageUrl == '') {
        tag = $('<div>').addClass('image-selector-option none').html('None');
      } else {
        tag = $('<img>').addClass('image-selector-option').attr('src', imageUrl).attr('data-image-id', imageId);
      }

      if (isSelected) {
        tag.toggleClass('selected');
      }

      return tag[0]
    });

    $(imageOptions).appendTo(imageSelector);

    $(imageOptions).click(function() {
      var self = $(this)
          isSelected = self.hasClass('selected'),
          associatedOption = self.hasClass('none') ? originalSelector.find('option:first') : originalSelector.find('option[value=' + self.attr('data-image-id') + ']');

      if (isMulti) {
        if (isSelected) {
          self.removeClass('selected');
          associatedOption.removeAttr('selected');
        } else {
          var numSelected = imageSelector.find('.selected').size();

          if (numSelected == settings.maxSelected) {
            alert("Can't select more than " + settings.maxSelected + " images.");
            return false;
          }

          self.addClass('selected');
          associatedOption.attr('selected', 'selected');
        }
      } else {
        $(imageOptions).removeClass('selected');
        self.addClass('selected');

        originalOptions.removeAttr('selected');
        associatedOption.attr('selected', 'selected');
      }
    });
    
    imageSelector.insertAfter(originalSelector);

    // for simpleform TODO: remove this dependency
    $('<div>').attr('style', 'clear:both;').insertBefore(originalSelector.parent().find('.help-block'));

    originalSelector.hide();

    return self;
  };

})(jQuery);
