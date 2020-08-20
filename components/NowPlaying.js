import React from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import {
    Box,
    Stack,
    Text,
    Link,
} from '@chakra-ui/core';

const NowPlaying = () => {
  const { data } = useSWR('/api/now-playing', fetcher);
    return (
    <Box
      mb={4}
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      border="1px solid"
      borderRadius={8}
      p={2}
      w="300px"
    >
      <Stack
        spacing={0}
        justifyContent="center"
        alignItems="flex-start"
        display="flex"
        flexDirection="column"
        ml={3}
      >
        <Link
          fontWeight="medium"
          maxWidth="190px"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          href={data?.songUrl}
          isExternal
        >
          {data && (data?.title || 'Not Playing')}
        </Link>
        <Text
          color="gray.500"
          mb={4}
          maxWidth="190px"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {data && (data?.artist || 'Spotify')}
        </Text>
      </Stack>
    </Box>
  );
};

export default NowPlaying;
