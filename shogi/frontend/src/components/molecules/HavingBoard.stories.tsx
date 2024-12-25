import type { Meta, StoryObj } from '@storybook/react';
import HavingBoard from './HavingBoard';
import '../../app/globals.css'
import { createKinsho, Ginsho, Hisha, Kakugyo, Kinsho } from '@/domain/Pieces';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'molecules/HavingBoard',
    component: HavingBoard,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof HavingBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const normal: Story = {
    args: {
        pieceList: [],
        playerId: '100003'
    },
};


export const threePieces: Story = {
    args: {
        pieceList: [
            createKinsho('1', '100003'),
            new Ginsho('2', '100003'),
            new Hisha('3', '100003')
        ],
        playerId: '100003'
    },
};

export const fourPieces: Story = {
    args: {
        pieceList: [
            createKinsho('1', '100003'),
            new Ginsho('2', '100003'),
            new Hisha('3', '100003'),
            new Kakugyo('4', '100003')
        ],
        playerId: '100003'
    },
};

export const overPieces: Story = {
    args: {
        pieceList: [
            createKinsho('1', '100003'),
            new Ginsho('2', '100003'),
            new Hisha('3', '100003'),
            new Kakugyo('4', '100003'),
            new Kakugyo('5', '100003'),
            new Kakugyo('6', '100003'),
            new Kakugyo('7', '100003'),
            new Kakugyo('8', '100003'),
        ],
        playerId: '100003'
    },
};

export const overPiecesReverse: Story = {
    args: {
        pieceList: [
            createKinsho('1', '100003'),
            new Ginsho('2', '100003'),
            new Hisha('3', '100003'),
            new Kakugyo('4', '100003'),
            new Kakugyo('5', '100003'),
            new Kakugyo('6', '100003'),
            new Kakugyo('7', '100003'),
            new Kakugyo('8', '100003'),
        ],
        playerId: '100003',
        reverse: true
    },
};
