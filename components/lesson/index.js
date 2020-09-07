import { gql, useQuery, NetworkStatus } from '@apollo/client';
import { Flex, Box, Heading, Text, Button } from 'bumbag';
import Link from 'next/link';

export const LESSON_QUERY = gql`
  query lesson($id: ID!) {
    lesson(id: $id) {
      id
      title
      description
    }
  }
`;

export default function Lesson(props) {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    LESSON_QUERY,
    {
      variables: {
        id: props.lessonId,
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
        flexGrow="2"
        textAlign="center"
        flexDirection="column"
        border="default"
        borderRight="none"
        borderTop="none"
        borderBottom="none"
      ></Flex>
    );

  const { lesson, _allCoursesMeta } = data;

  return (
    <Flex
      padding="major-2"
      flexGrow="2"
      textAlign="center"
      flexDirection="column"
      border="default"
      borderRight="none"
      borderTop="none"
      borderBottom="none"
    >
      <Heading marginBottom="major-5" use="h3">
        {lesson.title}
      </Heading>
      <Text.Block>{lesson.description}</Text.Block>
      <Link
        href={`/teacher/create-lesson?courseId=${props.courseId}&lessonId=${props.lessonId}`}
      >
        <Button marginTop="major-2" color="primary">
          Изменить
        </Button>
      </Link>
    </Flex>
  );
}
