import { ThemeIcon } from '@mantine/core';
import React from 'react';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

export const generateRunIcon = (status: string) => {
  let icon = null;
  let color = '';

  if (status === 'DIFFERENCE') {
    icon = <FaExclamationCircle />;
    color = 'red'; // Set your desired color for 'DIFFERENCE' status
  } else if (status === 'NO_CHANGE') {
    icon = <FaCheckCircle />;
    color = 'green'; // Set your desired color for 'NO_CHANGE' status
  }

  if (icon) {
    return (
      <ThemeIcon color={color} variant="light">
        {icon}
      </ThemeIcon>
    );
  }

  return null; // Return null or handle any other status values
};
