import { gql, useQuery, NetworkStatus } from '@apollo/client';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Flex, Box, Heading, Icon, Button } from 'bumbag';
import Link from 'next/link';

export const COURSE_QUERY = gql`
  query course($id: ID!) {
    course(id: $id) {
      lessons {
        id
        title
      }
    }
  }
`;

export default function LessonList(props) {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    COURSE_QUERY,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        id: props.courseId,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  if (error) return <div>Ошибка</div>;
  if (loading && !loadingMorePosts)
    return (
      <Flex
        padding="major-2"
        flexBasis="30%"
        textAlign="center"
        flexDirection="column"
        border="default"
        borderRight="none"
        borderTop="none"
        borderBottom="none"
      ></Flex>
    );

  const { course, _allCoursesMeta } = data;
  return (
    <Flex
      padding="major-2"
      flexBasis="30%"
      textAlign="center"
      flexDirection="column"
      border="default"
      borderRight="none"
      borderTop="none"
      borderBottom="none"
    >
      <Heading marginBottom="major-5" use="h3">
        Уроки
      </Heading>
      {course.lessons.map((item) => (
        <Box
          cursor="pointer"
          _hover={{ backgroundColor: 'primaryTint', color: 'primary800' }}
          borderRadius="4"
          border="default"
          padding="major-2"
          marginBottom="major-2"
          onClick={() => props.onChange(item.id)}
          backgroundColor={
            item.id == props.activeLessomId ? 'primaryTint' : undefined
          }
          color={item.id == props.activLessomeId ? 'primary800' : undefined}
        >
          {item.title}
        </Box>
      ))}
      <Button variant="outlined" palette="primary" size="large">
        <Link href={`/teacher/create-lesson?courseId=${props.courseId}`}>
          <Icon
            aria-label="Settings"
            icon={faPlusSquare}
            type="font-awesome"
            fontSize="600"
            alignSelf="center"
            color="primary"
            cursor="pointer"
            _hover={{ color: 'primary800' }}
          />
        </Link>
      </Button>
    </Flex>
  );
}
