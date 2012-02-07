/***
 * Image Chooser 0.1
 *  Dependencies
 *   - jQuery 1.6.4 (earlier versions untested)
 *
 *  Turns dropdowns into image selectors.
 *
 ***/

(function($){

  $.fn.imageChooser = function(options) {
    $.each(this, function() {

      /* Private variables */

      var self = $(this),
          originalSelector = self,
          originalOptions = originalSelector.find('option'),
          imageChooser,
          imageSelector, 
          imageOptions, 
          selectedImageContainer, 
          selectedImage;

      initialize();

      /* Private functions */

      /* Structure
       *  .image-chooser
       *    .image-selector
       *      .image-selector-option
       *      ...
       *      .image-selector-option
       *
       *    .selected-image-container
       *      .selected-image
       */
      function initialize() {
        imageChooser = $('<div>').addClass('image-chooser');

        imageSelector = $('<div>').addClass('image-selector');

        imageOptions = constructImageOptions();
        imageOptions.appendTo(imageSelector);
        
        selectedImageContainer = $('<div>').addClass('selected-image-container');
        selectedImage = $('<img>').addClass('selected-image').attr( 'src', imageSelector.find('.image-selector-option.selected').attr('src') );
        selectedImage.appendTo(selectedImageContainer);

        imageChooser
          .append(imageSelector)
          .append(selectedImageContainer)
          .insertAfter(originalSelector);

        imageSelector.hide();

        selectedImageContainer.click(imageSelector_focus);

        $(document).click(imageSelector_blur);

        resetSize();

        originalSelector.hide();
      }

      function imageSelector_focus() {
        selectedImageContainer.hide();
        imageSelector.show();
      }

      function imageSelector_blur(e) {
        var target = $(e.target);

        if (selectedImageContainer[0] != target[0] &&
            imageSelector[0] != target[0] &&
            $.inArray(selectedImageContainer[0], target.parents()) == -1  && 
            $.inArray(imageSelector[0], target.parents()) == -1 ) { 
          imageSelector.hide();
          selectedImageContainer.show();
        }
      }

      function constructImageOptions() {
        result = $( $.map(originalOptions, function(o) {
          var option = $(o),
              id = option.attr('value'),
              url = option.html(),
              selected = option.attr('selected') == 'selected',
              tag = $('<img>')
                      .addClass('image-selector-option')
                      .attr('src', url)
                      .attr('data-image-id', id);

          if (selected) tag.addClass('selected');

          return tag[0]
        }) ).click(imageOption_click);

        return result;
      };

      function imageOption_click() {
        var self = $(this)
            isSelected = self.hasClass('selected'),
            associatedOption = self.hasClass('none') ? originalSelector.find('option:first') : originalSelector.find('option[value=' + self.attr('data-image-id') + ']');

        $(imageOptions).removeClass('selected');
        self.addClass('selected');

        resetSize();

        originalOptions.removeAttr('selected');
        associatedOption.attr('selected', 'selected');

        imageSelector.hide();
        selectedImageContainer.show();
        selectedImage.attr('src', associatedOption.html());
      }


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
    });


    /* Allow chaining */

    return this;
  };
  
})(jQuery);

