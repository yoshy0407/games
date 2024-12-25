import type { Meta, StoryObj } from '@storybook/react';
import Piece from './Piece';
import '../../app/globals.css'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'atoms/Piece',
    component: Piece,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Piece>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Ho: Story = {
    args: {
        pieceId: '1',
        children: '歩',
        textColor: 'text-black',
        displayCanMove: () => { }
    },
};

export const HoReverse: Story = {
    args: {
        pieceId: '1',
        children: '歩',
        textColor: 'text-black',
        displayCanMove: () => { },
        reverse: true
    },
};

export const Ohsho: Story = {
    args: {
        pieceId: '1',
        children: '王将',
        textColor: 'text-red-500',
        displayCanMove: () => { },
        reverse: false
    },
};
