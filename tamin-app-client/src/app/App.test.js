import React from 'react';
import App from './App';
import {shallow} from "enzyme";


test('This is test', () => {
    console.log('Hello World !');
});

it('renders without crashing', () => {
    shallow(<App />);
});