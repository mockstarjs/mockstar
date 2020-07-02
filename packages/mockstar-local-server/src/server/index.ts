import express from 'express';
import middleware from './middleware';
import router from './router';
import {parser as bodyParser} from './body-parser';

export const create = () => express().set('json spaces', 2);
export {middleware, router, bodyParser};
