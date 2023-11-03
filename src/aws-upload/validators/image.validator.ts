import { FileTypeValidator } from '@nestjs/common';

export const imageFileValidators = [
  new FileTypeValidator({
    fileType: /^(image\/jpeg|image\/png|image\/webp)$/,
  }),
];

// image\/jpeg|
// image\/tiff|
// image\/png|
// image\/gif|
// image\/bmp|
// image\/webp|