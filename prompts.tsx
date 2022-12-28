import { Prompt } from './types';
import fs from 'fs';

let prompts: Prompt[] = [];

export const fetchPrompts = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/prompts.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        prompts = JSON.parse(data);
        resolve();
      }
    });
  });
};

export const getRandomPrompt = () => {
  const index = Math.floor(Math.random() * prompts.length);
  return prompts[index];
};