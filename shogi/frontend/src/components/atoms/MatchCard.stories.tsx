import type { Meta, StoryObj } from '@storybook/react';
import MatchCard from './MatchCard';
import '../../app/globals.css'
import { createKinsho, Ginsho, Hisha, Kakugyo, Kinsho } from '@/domain/Pieces';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'atoms/MatchCard',
    component: MatchCard,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof MatchCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const click: Story = {
    args: {
        handleClick: () => window.alert("clickd"),
        children: (
            <p>Text Message</p>
        )
    },
};


export const notClick: Story = {
    args: {
        children: (
            <p>Text Message</p>
        )
    },
};
