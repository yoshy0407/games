import type { Meta, StoryObj } from '@storybook/react';
import GameBoard from './GameBoard';
import '../../app/globals.css'
import Piece from '../atoms/Piece';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'organisms/GameBoard',
    component: GameBoard,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof GameBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const myTurn: Story = {
    args: {
        playerId: '1000000001',
        againstPlayerId: '1000000002',
        myTurn: true
    },
};

export const againstTurn: Story = {
    args: {
        playerId: '1000000001',
        againstPlayerId: '1000000002',
        myTurn: false
    },
};

