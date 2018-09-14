/* @flow */
import React from 'react';
import chaptersAddon from 'react-storybook-addon-chapters';
import { storiesOf } from '@storybook/react';

import Badge from 'ui/components/Badge';

const label = 'Hello Badge';

const sections = [
  {
    type: 'featured',
  },
  {
    type: 'experimental',
  },
  {
    type: 'restart-required',
  },
  {
    type: 'not-compatible',
  },
  {
    type: 'requires-payment',
  },
];

storiesOf('Badge').addWithChapters('Badge variations', {
  useTheme: true,
  chapters: [
    {
      sections: sections.map((section) => {
        return {
          subtitle: `type=${section.type}`,
          sectionFn: () => <Badge {...section} label={label} />,
        };
      }),
    },
  ],
});
