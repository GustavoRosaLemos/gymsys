'use client';

import Header from '@/app/components/Header';
import { Container, Flex, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import { IconGymnastics } from '@tabler/icons-react';
import InitialScale from '@/animations/InitialScale';
import Academia from '../images/academia.png';

export default function Home() {
  return (
    <Container fluid p={0}>
      <Header />
      <Container fluid p={0} w="100vw">
        <Flex
          h="90vh"
          align="center"
          justify="center"
          style={{ overflow: 'hidden' }}
        >
          <Image
            src={Academia}
            alt="Academia"
            style={{ width: '100%', height: 'auto' }}
          />
          <Stack pos="absolute">
            <InitialScale>
              <Text fw="bold" ta="center" size="50px" c="white">
                GYM
                <IconGymnastics size={40} />
                YS
              </Text>
            </InitialScale>
            <InitialScale delay={0.4}>
              <Text c="white" ta="center" fw="500" size="20px">
                Seu sistema de gestão de academia
              </Text>
            </InitialScale>
          </Stack>
        </Flex>
      </Container>
    </Container>
  );
}
