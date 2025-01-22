const FeedDTO = {
    photo: {
      required: true,
      type: 'string',
      maxLength: 500,  // URL of the photo, adjust the length based on your needs
      pattern: /^(http|https):\/\/.*\.(jpg|jpeg|png|gif)$/i,  // Simple URL validation (you can refine this)
    },
    caption: {
      required: false,
      type: 'string',
      maxLength: 1000,  // Caption length
    },
  };

  module.exports = FeedDTO;