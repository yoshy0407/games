import type { Meta, StoryObj } from '@storybook/react';
import Square from './Square';
import '../../app/globals.css'
import Piece from '../atoms/Piece';
import { coordinate } from '@/domain/squares/Coordinate';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'atoms/Square',
    component: Square,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Square>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PutPiece: Story = {
    args: {
        children: <Piece pieceId="1" textColor='text-black' displayCanMove={() => { }}>歩</Piece>,
        canMove: false,
        coordinate: coordinate(0, 0)
    },
};

export const noPiece: Story = {
    args: {
        canMove: false,
        coordinate: coordinate(0, 0)
    },
};

export const canMove: Story = {
    args: {
        canMove: true,
        coordinate: coordinate(0, 0)
    },
};
