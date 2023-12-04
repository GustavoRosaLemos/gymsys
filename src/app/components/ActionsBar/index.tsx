'use client';

import InitialScale from '@/animations/InitialScale';
import {
  Button,
  ButtonProps as MantineButtonProps,
  Group,
} from '@mantine/core';

interface ButtonProps extends MantineButtonProps {
  text: string;
  onClick?: () => void;
}

interface ActionsBarProps {
  buttons: ButtonProps[];
}

export default function ActionsBar({ buttons }: ActionsBarProps) {
  return (
    <Group p={20} justify="end">
      {buttons.map((props, index) => (
        <InitialScale delay={0.1 * index} key={props.text}>
          <Button {...props}>{props.text}</Button>
        </InitialScale>
      ))}
    </Group>
  );
}
