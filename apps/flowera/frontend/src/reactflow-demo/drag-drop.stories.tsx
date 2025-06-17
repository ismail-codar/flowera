import type { Meta, StoryObj } from '@storybook/react-vite';

import { ReactflowDragDropDemo } from './ReactflowDragDropDemo';

const meta = {
  component: ReactflowDragDropDemo,
} satisfies Meta<typeof ReactflowDragDropDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};