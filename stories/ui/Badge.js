/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { createChapters } from '../utils';
import Badge from 'ui/components/Badge';
import type { Props as BadgeProps } from 'ui/components/Badge';

const label = 'Hello Badge';

const types = [
  'featured',
  'experimental',
  'restart-required',
  'not-compatible',
  'requires-payment',
];

export type Props = {|
  props: BadgeProps,
|};

function createPropsMatrix(chapter): Array<Props> {
  return [
    {
      props: {
        type: chapter,
        label,
      },
    },
  ];
}

storiesOf('Badge', module)
  .add(
    'Badge props',
    withInfo()(() => {
      return <Badge label="" />;
    }),
  )
  .addWithChapters('Badge variations', {
    chapters: createChapters({
      Component: Badge,
      chapters: types,
      children: label,
      createPropsMatrix,
      otherChapterProps: {
        // Since Badge has a simple props matrix we don't need to display
        // a title since there is only 1 item in the group (chapters).
        // TODO: maybe create separate createSections util helper.
        title: undefined,
      },
    }),
  });
