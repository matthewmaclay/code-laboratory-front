import { gql, useQuery, NetworkStatus } from '@apollo/client';
import { Flex, Box, Heading } from 'bumbag';

export const ALL_COURSES_QUERY = gql`
  query {
    courses {
      title
      id
    }
  }
`;

export default function CourseList(props) {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_COURSES_QUERY,
    {
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  if (error) return <div>Ошибка</div>;
  if (loading && !loadingMorePosts) return <div>Loading</div>;

  const { courses, _allCoursesMeta } = data;

  return (
    <Flex
      padding="major-2"
      flexBasis="30%"
      textAlign="center"
      flexDirection="column"
    >
      <Heading marginBottom="major-5" use="h3">
        Курсы
      </Heading>
      {courses.map((item) => (
        <Box
          cursor="pointer"
          _hover={{ backgroundColor: 'primaryTint', color: 'primary800' }}
          borderRadius="4"
          border="default"
          padding="major-2"
          marginBottom="major-2"
          backgroundColor={
            item.id == props.activeCourseId ? 'primaryTint' : undefined
          }
          color={item.id == props.activeCourseId ? 'primary800' : undefined}
          onClick={() => props.onChange(item.id)}
        >
          {item.title}
        </Box>
      ))}
    </Flex>
  );
}
