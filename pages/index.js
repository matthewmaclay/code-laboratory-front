import { Flexб, Box, Flex, Button } from 'bumbag';
import PageWithHeader from 'components/layout/withHeader';

import Link from 'next/link';

const Home = () => {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Button
        marginRight="50px"
        variant="outlined"
        palette="primary"
        size="large"
      >
        <Link href="/teacher/my-courses">Я учитель</Link>
      </Button>

      <Button variant="outlined" palette="primary" size="large">
        <Link href="/student/my-courses">Я ученик</Link>
      </Button>
    </Flex>
  );
};

export default Home;
