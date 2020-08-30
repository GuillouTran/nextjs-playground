import {Box, Flex, Link, Text, useColorMode} from '@chakra-ui/core';
import React from 'react';

const MetricCard = ({header, link, metric}) => {
  const {colorMode} = useColorMode();
  const borderColor = {light : 'gray.200', dark : 'gray.700'};

  return (
    <Box
  border = "1px solid"
      borderColor={borderColor[colorMode]}
      borderRadius={8}
      p={4}
      minW="300px"
    >
      <Link href={link} isExternal>
        <Flex align="center">{header}</Flex>
      </Link>
      <Text mt={2} fontSize="3xl" fontWeight="bold" lineHeight="short">
        {metric || '-'}
      </Text>
    </Box>
  );
};

export default MetricCard;
