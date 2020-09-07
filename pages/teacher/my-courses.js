import { Button, Flex, Box } from 'bumbag';
import { useRouter } from 'next/router';
import PageWithHeader from 'components/layout/withHeader';
import CourseList from 'components/courseList';
import LessonList from 'components/lessonList';
import Lesson from 'components/lesson';
import { getParamsFromUrl } from 'utils';

const Courses = () => {
  const router = useRouter();

  const urlParams = getParamsFromUrl(router.asPath);
  const urlLessonId = urlParams.get('lessonId');
  const urlCourseId = urlParams.get('courseId');

  const [courseId, setCourseId] = React.useState(urlCourseId);
  const [lessonId, setLessonId] = React.useState(urlLessonId);

  return (
    <Flex justifyContent="center" padding="40px">
      <CourseList
        activeCourseId={courseId}
        onChange={(id) => {
          setCourseId(id);
          setLessonId();
        }}
      />
      {courseId && (
        <LessonList
          activeLessomId={lessonId}
          courseId={courseId}
          onChange={setLessonId}
        />
      )}
      {lessonId && <Lesson courseId={courseId} lessonId={lessonId} />}
    </Flex>
  );
};

export default Courses;
