import type { Meta, StoryObj } from '@storybook/react';
import Board from './Board';
import '../../app/globals.css'
import { initBoard } from '@/domain/squares/Boards';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'molecules/Board',
    component: Board,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const myTurn: Story = {
    args: {
        playerId: '100000001',
        myTurn: true,
        boards: initBoard('100000001', '100000002')
    },
};

export const againstTurn: Story = {
    args: {
        playerId: '100000001',
        myTurn: false,
        boards: initBoard('100000001', '100000002')
    },
};
