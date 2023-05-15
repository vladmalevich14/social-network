import React from 'react';
import { render, screen } from '@testing-library/react';
import {SamuraiJSApp} from '../App';
import {createRoot} from "react-dom/client";

it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<SamuraiJSApp/>);
    root.unmount();
});

// test('rendering without crashing', () => {
//     render(<SamuraiJSApp />);
//     const div = screen.getByRole(/main/i);
//     expect(div).toBeInTheDocument();
// });