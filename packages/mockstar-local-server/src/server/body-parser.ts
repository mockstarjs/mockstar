import bodyParser from 'body-parser';

export const parser = [bodyParser.json({limit: '10mb'}), bodyParser.urlencoded({extended: false})];
