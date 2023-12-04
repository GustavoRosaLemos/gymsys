'use client';

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
      {buttons.map((props) => (
        <Button key={props.text} {...props}>
          {props.text}
        </Button>
      ))}
    </Group>
  );
}
