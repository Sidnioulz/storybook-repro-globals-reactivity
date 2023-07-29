import type { Preview } from '@storybook/vue3';

import React from 'react'

export const ColorIcon = (background) =>
  React.createElement('span', {
    style: {
      background,
      borderRadius: '1rem',
      boxShadow: 'hsla(203, 50%, 30%, 0.15) 0 0 0 1px inset',
      display: 'block',
      height: '1rem',
      width: '1rem',
    },
  })

export const MOODS = [
  {
    color: '#eee',
    id: 'base',
    name: 'Base color',
  },
  {
    color: '#111',
    id: 'inverse',
    name: 'Inverse',
  },
  {
    color: '#56db96',
    id: 'emerald',
    name: 'Emerald',
  },
]

const globalTypes = {
  mood: {
    defaultValue: 'base',
    description: "Change this global and watch the background colour change",
    name: 'mood',
    toolbar: {
      dynamicTitle: true,
      icon: 'paintbrush',
      items: MOODS.map((mood) => ({
        right: ColorIcon(mood.color),
        title: mood.name,
        value: mood.color,
      })),
      title: 'Mood',
    },
  },
}

function withMoodRootClass(story, context) {
  return {
    components: { story },
    inheritAttrs: false,
    setup() {
      console.log(context.globals.mood)
      return { mood: `width: 100%; height: 60vh; margin: -20px; padding: 20px; background-color: ${context.globals.mood};` }
    },
    template: `<div :style="mood"><story v-bind="$attrs" /></div>`,
  }
}

const preview: Preview = {
  decorators: [withMoodRootClass],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes,
};

export default preview;
