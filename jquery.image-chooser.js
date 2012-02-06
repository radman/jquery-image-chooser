(function($){

  // takes a 'maxSelected' setting, which is used on multiselects
  $.fn.imageChooser = function(settings) {
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

        resetSize();

        originalOptions.removeAttr('selected');
        associatedOption.attr('selected', 'selected');

        imageSelector.hide();
        selectedImageContainer.show();
        selectedImage.attr('src', associatedOption.html());
      }
    });
    
    var selectedImageContainer = $('<div>').addClass('selected-image-container');
    var selectedImage = $('<img>').addClass('selected-image').attr( 'src', imageSelector.find('.image-selector-option.selected').attr('src') );
    selectedImage.appendTo(selectedImageContainer);

    imageSelector.insertAfter(originalSelector);
    selectedImageContainer.insertAfter(imageSelector);
    imageSelector.hide();

    selectedImageContainer.click(function() {
      selectedImageContainer.hide();
      imageSelector.show();
    });

    $(document).click(function(e) {
      var target = $(e.target);

      if (selectedImageContainer[0] != target[0] &&
          imageSelector[0] != target[0] &&
          $.inArray(selectedImageContainer[0], target.parents()) == -1  && 
          $.inArray(imageSelector[0], target.parents()) == -1 ) { 
        imageSelector.hide();
        selectedImageContainer.show();
      }
    });

    resetSize();

    function resetSize() {
      
      /* These should be options */
      var rows = 3, cols = 6,
          spacing = 2,
          padding = 2,
          imageWidth = 50,
          imageHeight = 50,
          imageBorderWidth = 1,
          imageSelectedBorderAccent = 1;

      var imagePadding = padding,
          imageMargin = spacing,
          imageSelectorPadding = 0;

      imageSelector.css({
        'line-height': 0, 
        'padding': imageSelectorPadding,
        'width': cols * (imageWidth + imageMargin + 2*(imagePadding + imageBorderWidth)),
        'height': rows * (imageHeight + imageMargin + 2*(imagePadding + imageBorderWidth))
      });

      /* ie fix */
      if ($.browser['msie'] == true) {
        imageSelector.css({
          'width': cols * (imageWidth + imageMargin + 2*(imagePadding + imageBorderWidth)) + 18
        });
      }

      imageSelector.find('.image-selector-option').css({
        'width': imageWidth,
        'height': imageHeight,
        'padding': imagePadding,
        'margin': imageMargin
      });

      selectedImageContainer.css({
        'width': imageWidth + 2*(imageMargin + imagePadding),
        'height': imageHeight + 2*(imageMargin + imagePadding)
      });

      selectedImage.css({
        'width': imageWidth,
        'height': imageHeight,
        'padding': imagePadding,
        'margin': imageMargin
      });

      /* fix right and bottom double padding */
      imageSelector.css({
        'padding-right': imageMargin,
        'padding-bottom': imageMargin
      });

      selectedImageContainer.css({
        'padding-right': imageMargin,
        'padding-bottom': imageMargin
      });

      imageSelector.find('.image-selector-option').css({
        'margin-right': 0,
        'margin-bottom': 0,
        'border-width': imageBorderWidth + "px"
      });
      selectedImage.css({
        'margin-right': 0,
        'margin-bottom': 0,
        'border-width': imageBorderWidth + "px"
      });

      /* selected */
      imageSelector.find('.image-selector-option.selected').css({
        'border-width': (imageBorderWidth + imageSelectedBorderAccent) + "px",
        'padding': imagePadding - imageSelectedBorderAccent
      });

    }


    originalSelector.hide();

    return self;
  };

})(jQuery);
