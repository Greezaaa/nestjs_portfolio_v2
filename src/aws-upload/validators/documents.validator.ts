import { FileTypeValidator } from '@nestjs/common';

export const documentFileValidators = [
    new FileTypeValidator({
        fileType: /^(application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document|application\/vnd\.ms-excel|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|application\/pdf|text\/plain|application\/rtf|application\/vnd\.oasis\.opendocument\.text)$/,
    }),
];


// application\/msword|
// application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document|
// application\/vnd\.ms-excel|
// application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|
// application\/pdf|
// text\/plain|
// application\/rtf|
// application\/vnd\.oasis\.opendocument\.text
